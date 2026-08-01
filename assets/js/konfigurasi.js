/* =========================================================
   konfigurasi.js — SATU-SATUNYA berkas yang perlu diubah guru
   untuk menyalakan penyimpanan progres ke Google Sheets.

   Langkah lengkapnya ada di: PANDUAN-SINKRON.md
   ========================================================= */

window.KONFIGURASI = {
  // Tempel URL Web App dari Apps Script di sini.
  // Bentuknya: https://script.google.com/macros/s/AKfycb..../exec
  // Biarkan kosong ("") kalau belum dipakai — situs tetap jalan normal,
  // progres hanya tersimpan di browser masing-masing siswa.
  urlSheet: "https://script.google.com/macros/s/AKfycbzlz3_wknGMOdjkk2qwo7pQTUCapGv6Jar_iXiv1ieK36rA5-Lz0MkXtA1cJSaL54U3oA/exec",

  // Kode kelas. HARUS sama persis dengan KODE_KELAS di Code.gs.
  // Ini bukan pengaman kuat: berkas ini terbuka untuk siapa pun yang
  // membuka situs. Fungsinya sekadar menyaring kiriman iseng dari luar.
  kodeKelas: "OOPCPP2026",

  // Wajib isi nama & NIS sebelum boleh membuka ujian?
  wajibIdentitas: true,

  // Jangan kirim apa pun ke Google Sheets saat situs dibuka dari komputer
  // sendiri (localhost / 127.0.0.1 / file://).
  //
  // Tanpa ini, setiap kali Anda mencoba-coba di localhost, barisnya masuk
  // ke sheet yang sama dengan data siswa asli dan ikut terhitung di rekap.
  //
  // Untuk sekali-sekali menguji alur kirim sungguhan dari localhost, tidak
  // perlu mengubah berkas ini — cukup buka alamatnya dengan tambahan
  // ?sinkron=paksa , misalnya:
  //   http://localhost:8099/index.html?sinkron=paksa
  lokalTanpaKirim: true,
};
