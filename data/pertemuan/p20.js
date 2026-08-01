/* =========================================================
   Pertemuan 20: Constructor & Destructor pada Inheritance
   Modul 4 — Inheritance (Pewarisan)
   STATUS: STUB (kerangka). Isi 'konten' dan 'soal' di bawah.

   PANDUAN PENGISIAN (tidak tampil di halaman siswa):
     - 'konten' diisi HTML materi: <h2>, <p>, <ul>, <pre><code>, <div class="callout">
     - Tulis analogi & kesalahan umum siswa di dalam <div class="callout tip">
     - Setelah terisi, ubah status pertemuan ini jadi "ready" di assets/js/kurikulum.js

   Format tiap soal:
     { judul, deskripsi(HTML), starter, stdin?, expected? | cek?, petunjuk? }
     - expected : string  -> output dibandingkan persis (setelah normalisasi)
     - cek(output,res)    -> fungsi penilaian custom: return true / {pass, message}
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[20] = {
  waktuMenit: 20,
  konten: "<div class=\"stub-note\">\n  <strong>Materi ini belum diisi</strong>\n  Penjelasan dan soal ujiannya belum disiapkan gurumu.\n</div>\n\n<h2>🎯 Yang akan kamu pelajari</h2>\n<ul>\n  <li><strong>Constructor & Destructor pada Inheritance</strong> — Siapa yang dipanggil lebih dulu antara class induk dan class anak.</li>\n</ul>",
  // Belum ada soal, jadi materi ini TERKUNCI di situs: ujiannya tidak bisa
  // dibuka, dan tidak ada cara lain bagi siswa untuk menandainya selesai.
  //
  // Cara membuka: isi array soal di bawah, lalu ubah status pertemuan ini
  // menjadi "ready" di assets/js/kurikulum.js.
  //
  // Bentuk satu soal (lihat p01.js untuk contoh yang sudah jadi):
  //   judul     -> judul soal
  //   deskripsi -> penjelasan soal dalam HTML
  //   starter   -> kode awal di editor
  //   stdin     -> input untuk program (opsional)
  //   expected  -> output yang benar, dibandingkan otomatis
  //   petunjuk  -> petunjuk singkat (opsional)
  soal: []
};
