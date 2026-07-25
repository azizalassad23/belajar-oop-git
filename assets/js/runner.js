/* =========================================================
   runner.js — Eksekusi C++ untuk ujian live coding.

   Mesin: Wandbox API (https://wandbox.org) — g++ 13 ASLI.
   Mendukung OOP penuh: class, inheritance, polymorphism,
   template, STL, smart pointer, exception, dll.
   Kode dikirim ke server Wandbox, dikompilasi & dijalankan,
   lalu output asli dikembalikan. CORS aktif, gratis, tanpa API key.

   Konsekuensi: ujian membutuhkan koneksi internet.

   >> Titik pertukaran mesin <<
   Untuk mengganti ke mesin lain (mis. clang-wasm offline atau
   API lain), cukup ubah implementasi runCpp() di bawah.
   Kontraknya tetap:
       runCpp(code, stdin) -> Promise<{
         ok: boolean,       // true jika BERHASIL kompilasi & jalan tanpa crash
         output: string,    // stdout program
         error: string,     // error kompilasi / runtime (bila ada)
         exitCode: number|null
       }>
   ========================================================= */

const WANDBOX_URL = "https://wandbox.org/api/compile.json";
const WANDBOX_COMPILER = "gcc-13.2.0";
const RUN_TIMEOUT_MS = 20000;

async function runCpp(code, stdin) {
  stdin = stdin || "";

  const payload = {
    compiler: WANDBOX_COMPILER,
    code: code,
    stdin: stdin,
    "compiler-option-raw": "-std=gnu++17",
    save: false,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RUN_TIMEOUT_MS);

  let data;
  try {
    const resp = await fetch(WANDBOX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (resp.status === 429) {
      return { ok: false, output: "", exitCode: null,
        error: "Server compiler sedang sibuk (terlalu banyak permintaan). Tunggu beberapa detik lalu coba lagi." };
    }
    if (!resp.ok) {
      return { ok: false, output: "", exitCode: null,
        error: "Gagal menghubungi server compiler (HTTP " + resp.status + ")." };
    }
    data = await resp.json();
  } catch (e) {
    clearTimeout(timer);
    if (e.name === "AbortError") {
      return { ok: false, output: "", exitCode: null,
        error: "Waktu eksekusi habis (lebih dari " + (RUN_TIMEOUT_MS / 1000) + " detik). Mungkin ada perulangan tak terbatas?" };
    }
    return { ok: false, output: "", exitCode: null,
      error: "Tidak dapat terhubung ke server compiler. Periksa koneksi internet Anda." };
  }

  // ---- Petakan respons Wandbox ke kontrak runCpp ----
  const compilerErr = (data.compiler_error || "").trim();
  const compilerMsg = (data.compiler_message || data.compiler_error || "");
  const isCompileError = /:\s*error:/.test(compilerMsg) || /^error:/m.test(compilerMsg);

  if (isCompileError) {
    return { ok: false, output: "", exitCode: null,
      error: "Kesalahan kompilasi:\n" + (compilerErr || compilerMsg) };
  }

  const stdout = data.program_output || "";
  const stderr = (data.program_error || "").trim();
  const signal = (data.signal || "").trim();
  const exitCode = data.status != null ? parseInt(data.status, 10) : null;

  if (signal) {
    return { ok: false, output: stdout, exitCode: exitCode,
      error: "Program berhenti tak wajar (signal: " + signal + ").\n" + stderr };
  }

  // Peringatan kompilasi (bukan error) tetap dianggap sukses
  const warn = (!isCompileError && compilerErr) ? compilerErr : "";
  return { ok: true, output: stdout, exitCode: exitCode,
    error: stderr || warn };
}

/* Normalisasi output untuk perbandingan penilaian */
function normalizeOutput(s) {
  return (s || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map(line => line.replace(/\s+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim();
}

window.runCpp = runCpp;
window.normalizeOutput = normalizeOutput;
