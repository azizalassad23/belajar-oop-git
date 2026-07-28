/* =========================================================
   Code.gs — Penyimpan progres siswa (Google Apps Script)
   Untuk situs "Kelas OOP C++".

   Cara pasang ada di: PANDUAN-SINKRON.md
   ========================================================= */

// HARUS sama persis dengan kodeKelas di assets/js/konfigurasi.js
const KODE_KELAS = "OOP2026";

const NAMA_SHEET = "Progress";
const JUDUL_KOLOM = [
  "Waktu", "NIS", "Nama", "Kelas", "Pertemuan", "Judul",
  "Status", "Skor", "Sisa Waktu", "Keterangan"
];


/* ---------------------------------------------------------
   Titik masuk.

   Semua permintaan lewat doPost, termasuk yang sifatnya membaca.
   Alasannya: Apps Script tidak bisa menjawab preflight OPTIONS,
   jadi sisi situs mengirim Content-Type text/plain agar dianggap
   "simple request" — dan itu hanya berlaku untuk POST.
   --------------------------------------------------------- */
function doPost(e) {
  try {
    const minta = JSON.parse(e.postData.contents);

    if (minta.kodeKelas !== KODE_KELAS) {
      return balas({ ok: false, error: "Kode kelas salah." });
    }

    if (minta.aksi === "simpan") return simpan(minta);
    if (minta.aksi === "ambil")  return ambil(minta);

    return balas({ ok: false, error: "Aksi tidak dikenal: " + minta.aksi });
  } catch (err) {
    return balas({ ok: false, error: String(err) });
  }
}

// Dibuka lewat browser untuk memastikan Web App sudah hidup.
function doGet() {
  return balas({ ok: true, pesan: "Penyimpan progres Kelas OOP C++ aktif." });
}


/* ---------------------------------------------------------
   Menyimpan kejadian progres.

   Ditulis sebagai catatan beruntun (append), bukan menimpa baris
   yang sudah ada. Dengan begitu tidak ada operasi baca-ubah-tulis
   yang bisa saling menimpa, dan guru tetap punya riwayat lengkap
   kapan siswa mengerjakan apa.
   --------------------------------------------------------- */
function simpan(minta) {
  const daftar = minta.data || [];
  if (!daftar.length) return balas({ ok: true, diterima: [] });

  // Dua siswa bisa menekan "Kumpulkan" pada detik yang sama.
  // Tanpa kunci ini, appendRow bisa menulis ke baris yang sama.
  const kunci = LockService.getScriptLock();
  try {
    kunci.waitLock(25000);
  } catch (err) {
    return balas({ ok: false, error: "Server sedang sibuk, coba lagi." });
  }

  try {
    const sheet = sheetProgress();
    const sudahAda = kumpulanIdTersimpan();

    const baris = [];
    const diterima = [];

    daftar.forEach(function (d) {
      // Kalau jawaban server sebelumnya tidak sampai ke siswa, data yang
      // sama akan dikirim ulang. Cek ID supaya tidak dobel di sheet.
      if (d.id && sudahAda[d.id]) { diterima.push(d.id); return; }

      baris.push([
        d.waktu ? new Date(d.waktu) : new Date(),
        String(d.nis || ""),
        d.nama || "",
        d.kelas || "",
        d.pertemuan || "",
        d.judul || "",
        d.status || "",
        d.skor || "",
        d.sisaWaktu || "",
        d.detail || d.sumber || ""
      ]);
      diterima.push(d.id);
      if (d.id) sudahAda[d.id] = true;
    });

    if (baris.length) {
      sheet.getRange(sheet.getLastRow() + 1, 1, baris.length, JUDUL_KOLOM.length)
           .setValues(baris);
      simpanIdBaru(daftar.map(function (d) { return d.id; })
                        .filter(function (x) { return !!x; }));
    }

    return balas({ ok: true, diterima: diterima });
  } finally {
    kunci.releaseLock();
  }
}


/* ---------------------------------------------------------
   Mengambil daftar pertemuan yang sudah selesai untuk satu NIS.
   --------------------------------------------------------- */
function ambil(minta) {
  const nis = String(minta.nis || "").trim();
  if (!nis) return balas({ ok: false, error: "NIS kosong." });

  const sheet = sheetProgress();
  if (sheet.getLastRow() < 2) return balas({ ok: true, selesai: [] });

  const nilai = sheet.getRange(2, 1, sheet.getLastRow() - 1, JUDUL_KOLOM.length)
                     .getValues();

  const selesai = {};
  nilai.forEach(function (r) {
    if (String(r[1]).trim() !== nis) return;
    const pertemuan = Number(r[4]);
    const status = String(r[6]);
    if (!pertemuan) return;
    // "batal" berarti siswa mencabut tanda selesai — hormati urutannya.
    if (status === "selesai" || status === "lulus-ujian") selesai[pertemuan] = true;
    else if (status === "batal") delete selesai[pertemuan];
  });

  return balas({
    ok: true,
    selesai: Object.keys(selesai).map(Number).sort(function (a, b) { return a - b; })
  });
}


/* ---------------------------------------------------------
   Pembantu
   --------------------------------------------------------- */
function sheetProgress() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NAMA_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(NAMA_SHEET);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(JUDUL_KOLOM);
    sheet.getRange(1, 1, 1, JUDUL_KOLOM.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ID kejadian yang sudah masuk, disimpan di properti skrip supaya
// pengecekan duplikat tidak perlu membaca seluruh sheet tiap kali.
function kumpulanIdTersimpan() {
  try {
    const mentah = PropertiesService.getScriptProperties().getProperty("id_terpakai");
    const daftar = mentah ? JSON.parse(mentah) : [];
    const peta = {};
    daftar.forEach(function (x) { peta[x] = true; });
    return peta;
  } catch (err) {
    return {};
  }
}

function simpanIdBaru(idBaru) {
  try {
    const props = PropertiesService.getScriptProperties();
    const mentah = props.getProperty("id_terpakai");
    let daftar = mentah ? JSON.parse(mentah) : [];

    // Satu properti Apps Script dibatasi 9 KB. Satu ID makan ~32 byte,
    // jadi 250 ID sudah mendekati 8 KB — lebih dari itu setProperty
    // akan gagal dengan "Argument too large". Yang perlu dicegah hanya
    // kiriman ulang beberapa menit terakhir, jadi 250 sudah cukup.
    daftar = daftar.concat(idBaru).slice(-250);

    props.setProperty("id_terpakai", JSON.stringify(daftar));
  } catch (err) {
    // Bukan masalah kritis: kalau gagal, paling-paling ada baris dobel.
  }
}

function balas(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
