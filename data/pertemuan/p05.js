/* =========================================================
   Pertemuan 5: Struct & Pengenalan Objek
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[5] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Mengelompokkan data yang berkaitan menggunakan <strong>struct</strong>.</li>
    <li>Mengakses dan mengisi anggota struct.</li>
    <li>Memahami struct sebagai <strong>jembatan menuju class &amp; objek</strong>.</li>
  </ul>

  <h2>📖 Masalah: Data yang Berserakan</h2>
  <p>Bayangkan menyimpan data seorang mahasiswa. Tanpa struct, datanya terpisah-pisah:</p>
  <pre><code>string nama = "Andi";
int    umur = 20;
double ipk  = 3.75;
// Bagaimana kalau ada 100 mahasiswa? Sangat merepotkan!</code></pre>

  <h2>🗂️ Solusi: <code>struct</code></h2>
  <p><strong>Struct</strong> (structure) menggabungkan beberapa variabel yang berkaitan menjadi
     satu tipe data baru buatan kita sendiri.</p>
  <pre><code>struct Mahasiswa {
    string nama;
    int    umur;
    double ipk;
};   // jangan lupa titik koma

int main() {
    Mahasiswa m;          // membuat satu variabel bertipe Mahasiswa
    m.nama = "Andi";      // akses anggota dengan titik ( . )
    m.umur = 20;
    m.ipk  = 3.75;

    cout &lt;&lt; m.nama &lt;&lt; " (" &lt;&lt; m.umur &lt;&lt; " th)";
    return 0;
}</code></pre>

  <div class="callout tip">
    <strong>💡 Sudah terasa familier?</strong>
    Sintaks <code>m.nama</code> ini persis seperti mengakses anggota objek! Struct adalah
    langkah kecil sebelum class.
  </div>

  <h2>🔑 Dari Struct ke Object</h2>
  <p>Struct menyatukan <strong>data</strong>. Tetapi dalam OOP, sebuah objek menyatukan
     <strong>data DAN perilaku (fungsi)</strong> sekaligus. Perhatikan perbandingannya:</p>
  <table style="width:100%;border-collapse:collapse;font-size:.9rem">
    <tr style="text-align:left;border-bottom:2px solid var(--border)">
      <th style="padding:6px"></th><th>Struct (dasar)</th><th>Class / Object (OOP)</th>
    </tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><strong>Data (atribut)</strong></td><td>✅ Ya</td><td>✅ Ya</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><strong>Perilaku (method)</strong></td><td>Jarang dipakai</td><td>✅ Inti utamanya</td></tr>
    <tr><td style="padding:6px"><strong>Penyembunyian data</strong></td><td>Default terbuka</td><td>✅ Bisa <code>private</code></td></tr>
  </table>
  <p>Sebenarnya di C++, <code>struct</code> dan <code>class</code> hampir identik — bedanya hanya
     <code>struct</code> bersifat <code>public</code> secara default. Mulai Pertemuan 6, kita akan
     resmi menggunakan <code>class</code>.</p>

  <div class="callout">
    <strong>Analogi 🧱</strong>
    Struct itu seperti <em>kotak berlabel</em> berisi beberapa data. Class/Object menambahkan
    <em>"kemampuan"</em> pada kotak itu — ia bukan hanya menyimpan data, tetapi juga bisa
    <em>melakukan sesuatu</em> terhadap datanya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>struct</code> menggabungkan beberapa data terkait menjadi satu tipe baru.</li>
    <li>Akses anggota dengan operator titik <code>.</code></li>
    <li>Struct = data saja; Object (class) = data + perilaku + penyembunyian data.</li>
    <li>Ini adalah gerbang menuju class di pertemuan berikutnya.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Struct Titik Koordinat",
      deskripsi: `<p>Definisikan sebuah <code>struct</code> bernama <code>Titik</code> dengan dua anggota bertipe
                  bilangan bulat: <code>x</code> dan <code>y</code>. Baca nilai <code>x</code> dan <code>y</code>,
                  lalu cetak dengan format <code>(x, y)</code>.</p>
                  <p>Contoh: input <code>3 4</code> menghasilkan:</p>
                  <pre>(3, 4)</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Definisikan struct Titik di sini\n\n\nint main() {\n    Titik t;\n    cin >> t.x >> t.y;\n    // Cetak dengan format (x, y)\n    \n    return 0;\n}\n",
      stdin: "3 4\n",
      expected: "(3, 4)",
      petunjuk: "Perhatikan ada spasi setelah koma: <code>cout &lt;&lt; \"(\" &lt;&lt; t.x &lt;&lt; \", \" &lt;&lt; t.y &lt;&lt; \")\";</code>"
    },
    {
      judul: "Struct Mahasiswa & Kelulusan",
      deskripsi: `<p>Definisikan <code>struct Mahasiswa</code> dengan anggota <code>nama</code> (teks) dan
                  <code>nilai</code> (bilangan bulat). Baca <code>nama</code> lalu <code>nilai</code>.
                  Jika <code>nilai</code> &ge; 70 cetak <code>Lulus</code>, selain itu <code>Tidak Lulus</code>,
                  dengan format <code>&lt;nama&gt;: &lt;status&gt;</code>.</p>
                  <p>Contoh: input <code>Andi 85</code> menghasilkan:</p>
                  <pre>Andi: Lulus</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Definisikan struct Mahasiswa di sini\n\n\nint main() {\n    Mahasiswa m;\n    cin >> m.nama >> m.nilai;\n    // Tentukan dan cetak status kelulusan\n    \n    return 0;\n}\n",
      stdin: "Andi 85\n",
      expected: "Andi: Lulus",
      petunjuk: "Gunakan ternary: <code>(m.nilai &gt;= 70) ? \"Lulus\" : \"Tidak Lulus\"</code>."
    },
    {
      judul: "Struct Buku",
      deskripsi: `<p>Buat <code>struct Buku</code> dengan anggota <code>judul</code> (teks) dan <code>harga</code> (bilangan bulat). Baca keduanya lalu tampilkan.</p><p>Untuk input <code>Fisika 75000</code>:</p><pre>Buku: Fisika
Harga: 75000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Buku {\n    // Tulis anggota struct di sini\n    \n};\n\nint main() {\n    Buku b;\n    // Baca lalu cetak\n    \n    return 0;\n}\n",
      stdin: "Fisika 75000\n",
      expected: "Buku: Fisika\nHarga: 75000",
      petunjuk: `Akses anggota struct dengan titik: <code>b.judul</code>, <code>b.harga</code>.`
    },
    {
      judul: "Struct dengan Fungsi Luas",
      deskripsi: `<p>Buat <code>struct Persegi</code> beranggota <code>sisi</code>, lalu buat <strong>fungsi terpisah</strong> <code>luas(Persegi)</code> yang mengembalikan luasnya.</p><p>Untuk input <code>6</code>:</p><pre>Luas: 36</pre><p>Ini gambaran sebelum masuk ke class: di sini data dan fungsinya masih terpisah.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nstruct Persegi {\n    int sisi;\n};\n\nint luas(Persegi p) {\n    // Kembalikan luasnya\n    \n}\n\nint main() {\n    Persegi p;\n    cin >> p.sisi;\n    // Cetak luasnya\n    \n    return 0;\n}\n",
      stdin: "6\n",
      expected: "Luas: 36",
      petunjuk: `Fungsi menerima struct-nya sebagai parameter: <code>return p.sisi * p.sisi;</code>`
    },
    {
      judul: "Dua Struct Mandiri",
      deskripsi: `<p>Buat <code>struct Titik</code> beranggota <code>x</code> dan <code>y</code>. Baca dua titik, lalu tampilkan keduanya.</p><p>Untuk input <code>3 4 10 20</code>:</p><pre>A = (3, 4)
B = (10, 20)</pre><p>Perhatikan: mengubah titik A tidak memengaruhi titik B.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nstruct Titik {\n    int x, y;\n};\n\nint main() {\n    Titik a, b;\n    // Baca empat angka, lalu cetak dua baris\n    \n    return 0;\n}\n",
      stdin: "3 4 10 20\n",
      expected: "A = (3, 4)\nB = (10, 20)",
      petunjuk: `Cetak persis dengan kurung dan koma: <code>"A = (" &lt;&lt; a.x &lt;&lt; ", " &lt;&lt; a.y &lt;&lt; ")"</code>`
    }
  ]
};
