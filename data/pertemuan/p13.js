/* =========================================================
   Pertemuan 13: Member Static
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[13] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membedakan anggota <strong>milik objek</strong> dan <strong>milik class</strong>.</li>
    <li>Membuat atribut <code>static</code> dan mendefinisikannya dengan benar.</li>
    <li>Membuat dan memanggil <strong>method static</strong>.</li>
  </ul>

  <h2>📖 Milik Objek vs Milik Class</h2>
  <p>Sampai sekarang, tiap objek punya salinan atributnya sendiri. Ubah satu objek,
     objek lain tidak terpengaruh.</p>
  <p>Anggota <code>static</code> berbeda: ia <strong>hanya ada satu</strong>, dan
     <em>dipakai bersama</em> oleh semua objek dari class itu.</p>

  <div class="callout">
    <strong>Analogi Papan Tulis Kelas 🧑‍🏫</strong>
    Tiap siswa punya buku catatan sendiri — itu atribut biasa. Tapi papan tulis di depan
    cuma ada satu, dipakai bersama sekelas. Kalau seorang siswa menghapus tulisan di papan,
    semua orang melihat papan yang sudah terhapus. Papan tulis itulah anggota <code>static</code>.
  </div>

  <h2>🏗️ Atribut Static</h2>
  <p>Menulisnya butuh <strong>dua bagian</strong>, dan bagian kedua paling sering terlupa:</p>
  <pre><code>class Siswa {
public:
    static int jumlah;      // 1. DEKLARASI di dalam class
    Siswa() { jumlah++; }
};

int Siswa::jumlah = 0;      // 2. DEFINISI di luar class — WAJIB!

int main() {
    Siswa a, b, c;
    cout &lt;&lt; Siswa::jumlah;  // 3
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Paling Sering</strong>
    Lupa menulis <code>int Siswa::jumlah = 0;</code> di luar class. Programnya akan gagal
    saat proses <em>linking</em> dengan pesan seperti
    <code>undefined reference to 'Siswa::jumlah'</code>. Deklarasi di dalam class hanya
    memberitahu bahwa variabelnya ada; definisi di luarlah yang benar-benar menyediakan tempatnya.
  </div>

  <h2>⚙️ Method Static</h2>
  <p>Method <code>static</code> bisa dipanggil <strong>tanpa membuat objek</strong>, cukup
     lewat nama class-nya:</p>
  <pre><code>class Hitung {
public:
    static int tambah(int a, int b) { return a + b; }
};

int main() {
    cout &lt;&lt; Hitung::tambah(5, 3);   // 8, tanpa membuat objek apa pun
}</code></pre>
  <p>Konsekuensinya: method static <strong>tidak boleh menyentuh atribut biasa</strong>,
     karena ia tidak tahu sedang bekerja untuk objek yang mana. Ia juga tidak punya
     <code>this</code>.</p>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Anggota <code>static</code> hanya ada satu, dipakai bersama semua objek.</li>
    <li>Atribut static butuh definisi di luar class: <code>Tipe Class::nama = nilai;</code></li>
    <li>Diakses lewat nama class: <code>Class::anggota</code>.</li>
    <li>Method static tidak punya <code>this</code> dan tidak bisa membaca atribut biasa.</li>
    <li>Gunanya: menghitung jumlah objek, membuat nomor urut, atau menyimpan data bersama.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Menghitung Jumlah Objek",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <strong>static</strong> <code>jumlah</code>. Setiap kali objek dibuat, constructor menambah <code>jumlah</code> sebanyak 1.</p><p>Baca sebuah angka <code>n</code>, buat objek sebanyak itu di dalam perulangan, lalu cetak totalnya.</p><p>Untuk input <code>3</code>:</p><pre>Jumlah objek: 3</pre><p>Jangan lupa mendefinisikan atribut static-nya di luar class.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Siswa {\npublic:\n    static int jumlah;\n    // Buat constructor yang menambah jumlah\n    \n};\n\n// Definisikan atribut static di sini (WAJIB)\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        Siswa s;\n    }\n    cout << \"Jumlah objek: \" << Siswa::jumlah;\n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Jumlah objek: 3",
      petunjuk: `Definisi di luar class: <code>int Siswa::jumlah = 0;</code>`
    },
    {
      judul: "Papan Tulis Bersama",
      deskripsi: `<p>Buat class <code>Kelas</code> dengan atribut <strong>static</strong> <code>spidol</code>. Buat dua objek, lalu ubah nilainya <strong>lewat objek pertama saja</strong>.</p><p>Cetak nilainya lewat kedua objek — hasilnya harus sama, karena atribut static dipakai bersama.</p><p>Untuk input <code>100</code>:</p><pre>Lewat objek a: 100
Lewat objek b: 100</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kelas {\npublic:\n    static int spidol;\n};\n\n// Definisikan atribut static di sini\n\nint main() {\n    int n;\n    cin >> n;\n    Kelas a, b;\n    // Isi lewat objek a saja, lalu cetak lewat a dan b\n    \n    return 0;\n}\n",
      stdin: "100\n",
      expected: "Lewat objek a: 100\nLewat objek b: 100",
      petunjuk: `Objek b tidak pernah diisi, tapi nilainya ikut berubah — itulah maksud <em>dipakai bersama</em>.`
    },
    {
      judul: "Method Static",
      deskripsi: `<p>Buat class <code>Hitung</code> dengan <strong>method static</strong> <code>tambah(int, int)</code>. Panggil lewat nama class-nya <strong>tanpa membuat objek</strong>.</p><p>Untuk input <code>5 3</code>:</p><pre>Hasil: 8</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hitung {\npublic:\n    // Buat method static tambah(int, int)\n    \n};\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Panggil lewat Hitung::tambah(...)\n    \n    return 0;\n}\n",
      stdin: "5 3\n",
      expected: "Hasil: 8",
      petunjuk: `Perhatikan: di <code>main()</code> tidak ada satu pun objek <code>Hitung</code> yang dibuat.`
    },
    {
      judul: "Nama Sekolah Bersama",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut biasa <code>nama</code> dan atribut <strong>static</strong> <code>sekolah</code> berisi <code>SMK Negeri 1</code>. Tambahkan method <code>info()</code> yang mencetak keduanya lalu pindah baris.</p><p>Untuk input <code>Andi Sari</code>:</p><pre>Andi - SMK Negeri 1
Sari - SMK Negeri 1</pre><p>Nama berbeda tiap objek, tapi sekolahnya satu untuk semua.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    static string sekolah;\n    // Buat constructor Siswa(string) dan method info()\n    \n};\n\n// Definisikan sekolah di sini, isi \"SMK Negeri 1\"\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Siswa s1(a), s2(b);\n    s1.info();\n    s2.info();\n    return 0;\n}\n",
      stdin: "Andi Sari\n",
      expected: "Andi - SMK Negeri 1\nSari - SMK Negeri 1",
      petunjuk: `Definisinya: <code>string Siswa::sekolah = "SMK Negeri 1";</code>`
    },
    {
      judul: "Nomor Anggota Otomatis",
      deskripsi: `<p>Buat class <code>Anggota</code> dengan atribut <strong>static</strong> <code>berikutnya</code> (mulai dari 1) dan atribut biasa <code>id</code> serta <code>nama</code>.</p><p>Setiap objek baru mengambil nilai <code>berikutnya</code> sebagai <code>id</code>-nya, lalu menaikkan <code>berikutnya</code> untuk objek sesudahnya.</p><p>Untuk input <code>Andi Sari</code>:</p><pre>Andi: ID 1
Sari: ID 2</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Anggota {\npublic:\n    static int berikutnya;\n    int id;\n    string nama;\n    // Buat constructor Anggota(string) yang memberi id otomatis\n    \n};\n\n// Definisikan berikutnya di sini, mulai dari 1\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Anggota x(a), y(b);\n    cout << x.nama << \": ID \" << x.id << endl;\n    cout << y.nama << \": ID \" << y.id;\n    return 0;\n}\n",
      stdin: "Andi Sari\n",
      expected: "Andi: ID 1\nSari: ID 2",
      petunjuk: `Di constructor: ambil dulu <code>id = berikutnya;</code> baru <code>berikutnya++;</code>`
    }
  ]
};
