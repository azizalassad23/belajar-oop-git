/* =========================================================
   runner.js — Eksekusi C++ untuk ujian live coding.

   TIGA MESIN BERURUTAN. Kalau mesin pertama bermasalah, kode
   otomatis dicoba ke mesin berikutnya tanpa siswa perlu tahu:

     1. Compiler Explorer (godbolt.org)  — GCC 13.2
     2. Judge0 CE (ce.judge0.com)        — GCC 9
     3. Wandbox (wandbox.org)            — GCC 13.2

   Kenapa berlapis: sebelumnya hanya Wandbox, dan saat layanannya
   bermasalah SELURUH ujian ikut mati. Ketiganya gratis, tanpa API
   key, dan mengizinkan CORS — jadi tetap cocok untuk situs statis
   di GitHub Pages tanpa server sendiri.

   Konsekuensi: ujian tetap membutuhkan koneksi internet.

   >> Titik pertukaran mesin <<
   Untuk menambah/mengganti mesin, tulis satu fungsi adapter yang
   mengembalikan bentuk baku di bawah, lalu daftarkan di MESIN.
   Kontrak runCpp() tidak berubah:
       runCpp(code, stdin) -> Promise<{
         ok: boolean,        // true jika program berhasil DIJALANKAN
         output: string,     // stdout program
         error: string,      // error kompilasi / runtime (bila ada)
         exitCode: number|null,
         mesin: string,      // mesin yang akhirnya dipakai
         gangguanServer?: true   // semua mesin gagal — BUKAN salah siswa
       }>
   ========================================================= */

const RUN_TIMEOUT_MS = 25000;

/* Pembungkus fetch dengan batas waktu, supaya satu mesin yang
   menggantung tidak menahan giliran mesin berikutnya. */
async function _ambil(url, opsi) {
  const kendali = new AbortController();
  const batas = setTimeout(() => kendali.abort(), RUN_TIMEOUT_MS);
  try {
    return await fetch(url, Object.assign({ signal: kendali.signal }, opsi));
  } finally {
    clearTimeout(batas);
  }
}

/* Penanda "mesinnya yang bermasalah", bukan kodenya siswa.
   Hanya kondisi seperti ini yang boleh dialihkan ke mesin berikutnya —
   kesalahan kompilasi siswa HARUS dilaporkan apa adanya, jangan
   dicoba ulang ke mesin lain seolah-olah masalah jaringan. */
function _gangguan(pesan) {
  return { _gangguan: true, error: pesan };
}


/* ---------- Mesin 1: Compiler Explorer ---------- */
async function _viaGodbolt(code, stdin) {
  const res = await _ambil("https://godbolt.org/api/compiler/g132/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      source: code,
      lang: "c++",
      options: {
        userArguments: "-O2 -std=gnu++17",
        executeParameters: { args: [], stdin: stdin },
        compilerOptions: { executorRequest: true },
        filters: { execute: true },
      },
    }),
  });
  if (!res.ok) return _gangguan("HTTP " + res.status);

  const data = await res.json();
  /* Compiler Explorer mengirim pesan berwarna. Kode escape ANSI-nya tidak
     dirender di <pre> biasa dan muncul sebagai sampah seperti
     "<-[01m<-[K<source>:" di layar siswa, jadi dibuang. */
  const buangAnsi = (s) => s.replace(/\[[0-9;]*[A-Za-z]/g, "").replace(/\[K/g, "");
  const gabung = (arr) => buangAnsi((arr || []).map((x) => x.text).join("\n"));

  const build = data.buildResult || {};
  if (build.code !== 0) {
    return { ok: false, output: "", exitCode: null,
      error: "Kesalahan kompilasi:\n" + (gabung(build.stderr) || gabung(data.stderr)) };
  }

  return { ok: true, output: gabung(data.stdout), exitCode: data.code,
    error: gabung(data.stderr) };
}


/* ---------- Mesin 2: Judge0 CE ---------- */
async function _viaJudge0(code, stdin) {
  const res = await _ambil(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language_id: 54, source_code: code, stdin: stdin }),
    });
  if (!res.ok) return _gangguan("HTTP " + res.status);

  const data = await res.json();
  const id = (data.status && data.status.id) || 0;

  if (id === 6) {
    return { ok: false, output: "", exitCode: null,
      error: "Kesalahan kompilasi:\n" + (data.compile_output || "") };
  }
  // 13 Internal Error, 14 Exec Format Error -> masalah mesin
  if (id === 13 || id === 14) return _gangguan(data.status.description);
  if (id === 5) {
    return { ok: false, output: data.stdout || "", exitCode: null,
      error: "Waktu eksekusi habis. Mungkin ada perulangan tak terbatas?" };
  }

  return { ok: id === 3, output: data.stdout || "", exitCode: data.exit_code,
    error: data.stderr || "" };
}


/* ---------- Mesin 3: Wandbox ---------- */
async function _viaWandbox(code, stdin) {
  const res = await _ambil("https://wandbox.org/api/compile.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ compiler: "gcc-13.2.0", code: code, stdin: stdin,
      "compiler-option-raw": "-std=gnu++17", save: false }),
  });
  if (res.status === 429) return _gangguan("Terlalu banyak permintaan (429)");
  if (!res.ok) return _gangguan("HTTP " + res.status);

  const data = await res.json();
  const compilerErr = (data.compiler_error || "").trim();
  const compilerMsg = data.compiler_message || data.compiler_error || "";
  if (/:\s*error:/.test(compilerMsg) || /^error:/m.test(compilerMsg)) {
    return { ok: false, output: "", exitCode: null,
      error: "Kesalahan kompilasi:\n" + (compilerErr || compilerMsg) };
  }

  const stdout = data.program_output || "";
  const stderr = (data.program_error || "").trim();
  const signal = (data.signal || "").trim();
  const exitCode = data.status != null ? parseInt(data.status, 10) : null;

  /* Wandbox bisa berhasil mengompilasi tetapi gagal menjalankan saat
     container runtime-nya kehabisan resource: exit 126/127 dengan
     stdout kosong. Ini gangguan mesin, bukan kesalahan siswa. */
  if (/OCI runtime|Resource temporarily unavailable|cannot execute/i.test(stderr) ||
      ((exitCode === 126 || exitCode === 127) && !stdout)) {
    return _gangguan("Server tidak dapat menjalankan program (exit " + exitCode + ")");
  }

  if (signal) {
    return { ok: false, output: stdout, exitCode: exitCode,
      error: "Program berhenti tak wajar (signal: " + signal + ").\n" + stderr };
  }
  return { ok: true, output: stdout, exitCode: exitCode,
    error: stderr || compilerErr };
}


const MESIN = [
  { nama: "Compiler Explorer (GCC 13.2)", jalan: _viaGodbolt },
  { nama: "Judge0 (GCC 9)",               jalan: _viaJudge0 },
  { nama: "Wandbox (GCC 13.2)",           jalan: _viaWandbox },
];


async function runCpp(code, stdin) {
  stdin = stdin || "";
  const catatanGagal = [];

  for (const m of MESIN) {
    let hasil;
    try {
      hasil = await m.jalan(code, stdin);
    } catch (e) {
      catatanGagal.push(m.nama + ": " +
        (e.name === "AbortError" ? "melebihi batas waktu" : "tidak dapat dihubungi"));
      continue;
    }

    if (hasil && hasil._gangguan) {
      catatanGagal.push(m.nama + ": " + hasil.error);
      continue;   // coba mesin berikutnya
    }

    hasil.mesin = m.nama;
    if (catatanGagal.length) {
      console.info("[runner] Dialihkan ke " + m.nama + ". Yang gagal: " +
                   catatanGagal.join(" | "));
    }
    return hasil;
  }

  return { ok: false, output: "", exitCode: null, gangguanServer: true,
    mesin: "(tidak ada)",
    error: "Semua server compiler sedang bermasalah, jadi programmu tidak sempat " +
           "dijalankan. Ini BUKAN kesalahan kodemu. Tunggu sebentar lalu coba lagi.\n\n" +
           "Rincian: " + catatanGagal.join(" | ") };
}


/* Normalisasi output untuk perbandingan penilaian */
function normalizeOutput(s) {
  return (s || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

window.runCpp = runCpp;
window.normalizeOutput = normalizeOutput;
