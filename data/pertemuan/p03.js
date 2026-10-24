/* =========================================================
   Pertemuan 3: Kontrol Alur & Fungsi
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[3] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Mengendalikan alur program dengan <strong>percabangan</strong> (<code>if</code>, <code>else</code>, <code>switch</code>).</li>
    <li>Mengulang perintah dengan <strong>perulangan</strong> (<code>for</code>, <code>while</code>).</li>
    <li>Memecah program menjadi <strong>fungsi</strong> yang dapat dipakai ulang.</li>
  </ul>

  <h2>📖 Percabangan (Decision)</h2>
  <p>Percabangan membuat program mengambil keputusan berdasarkan kondisi (bernilai <code>true</code>/<code>false</code>).</p>
  <pre><code>int nilai = 75;
if (nilai &gt;= 70) {
    cout &lt;&lt; "Lulus";
} else {
    cout &lt;&lt; "Tidak Lulus";
}</code></pre>
  <p>Operator perbandingan: <code>==</code> (sama dengan), <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>,
     <code>&gt;=</code>, <code>&lt;=</code>. Operator logika: <code>&amp;&amp;</code> (dan), <code>||</code> (atau), <code>!</code> (tidak).</p>

  <div class="callout warn">
    <strong>⚠️ Jangan tertukar</strong>
    <code>=</code> adalah <em>penugasan</em> (mengisi nilai), sedangkan <code>==</code> adalah <em>perbandingan</em>.
    <code>if (x = 5)</code> hampir selalu salah!
  </div>

  <h3>Operator Ternary (?:)</h3>
  <p>Bentuk singkat dari if-else untuk memilih satu dari dua nilai:</p>
  <pre><code>string status = (nilai &gt;= 70) ? "Lulus" : "Tidak Lulus";</code></pre>

  <h2>🔁 Perulangan (Loop)</h2>
  <p>Perulangan menjalankan blok kode berkali-kali.</p>
  <pre><code>// for: saat jumlah pengulangan diketahui
for (int i = 1; i &lt;= 5; i++) {
    cout &lt;&lt; i &lt;&lt; " ";        // 1 2 3 4 5
}

// while: saat berhenti berdasarkan kondisi
int n = 5;
while (n &gt; 0) {
    cout &lt;&lt; n &lt;&lt; " ";        // 5 4 3 2 1
    n--;
}</code></pre>
  <p>Bagian <code>for</code>: <code>(inisialisasi; kondisi; perubahan)</code>. Loop berjalan selama kondisi bernilai benar.</p>

  <h2>🧩 Fungsi</h2>
  <p>Fungsi adalah blok kode bernama yang mengerjakan satu tugas. Fungsi membuat kode
     lebih rapi, mudah dibaca, dan <strong>dapat digunakan ulang</strong> — ini adalah fondasi
     langsung menuju <em>method</em> pada OOP nanti.</p>
  <pre><code>// tipeKembalian namaFungsi(parameter) { ... }
int tambah(int a, int b) {
    return a + b;          // mengembalikan hasil
}

int main() {
    int hasil = tambah(3, 4);   // memanggil fungsi -> 7
    cout &lt;&lt; hasil;

    // fungsi tanpa nilai kembali memakai 'void'
    return 0;
}</code></pre>

  <div class="callout tip">
    <strong>💡 Jembatan ke OOP</strong>
    Ingat: sebuah <strong>method</strong> di dalam class (yang akan kita pelajari) pada dasarnya
    adalah <strong>fungsi</strong> yang menempel pada sebuah objek.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>if/else</code> &amp; <code>switch</code> untuk mengambil keputusan.</li>
    <li><code>for</code> &amp; <code>while</code> untuk mengulang.</li>
    <li>Fungsi mengelompokkan kode agar rapi &amp; dapat dipakai ulang.</li>
    <li>Bedakan <code>=</code> (isi) dengan <code>==</code> (banding).</li>
  </ul>
  `,

  soal: [
    {
      judul: "Deret Genap-Ganjil",
      deskripsi: `<p>Baca sebuah bilangan bulat <code>N</code>. Untuk setiap angka dari <code>1</code> sampai <code>N</code>,
                  cetak angka tersebut diikuti keterangan <code>Genap</code> atau <code>Ganjil</code>, satu per baris.</p>
                  <p>Contoh untuk input <code>3</code>:</p>
                  <pre>1 Ganjil
2 Genap
3 Ganjil</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Gunakan perulangan dan percabangan\n    \n    return 0;\n}\n",
      stdin: "3\n",
      expected: "1 Ganjil\n2 Genap\n3 Ganjil",
      uji: [{stdin: "5\n", h: "190c8377e2073337073e2f567332f330c21b22886780de556a27c73c40ec547c"}, {stdin: "8\n", h: "e30c59ec317b50756599609a67e5a829e6c60122a886d83635c90c54a1e04afd"}],
      petunjuk: "Sebuah angka genap jika <code>i % 2 == 0</code>. Gunakan <code>for</code> dari 1 sampai n."
    },
    {
      judul: "Fungsi Pangkat",
      deskripsi: `<p>Buat sebuah <strong>fungsi</strong> bernama <code>pangkat</code> yang menerima dua bilangan bulat
                  <code>basis</code> dan <code>eksponen</code>, lalu mengembalikan hasil <code>basis</code> pangkat
                  <code>eksponen</code> (gunakan perulangan, tanpa <code>pow</code>).</p>
                  <p>Baca <code>basis</code> lalu <code>eksponen</code>, cetak hasilnya.
                     Contoh: input <code>2 5</code> menghasilkan <code>32</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat fungsi pangkat(int basis, int eksponen) di sini\n\n\nint main() {\n    int basis, eksponen;\n    cin >> basis >> eksponen;\n    // Panggil dan cetak hasil pangkat(basis, eksponen)\n    \n    return 0;\n}\n",
      stdin: "2 5\n",
      expected: "32",
      uji: [{stdin: "3 4\n", h: "8cf603203ca59c2f9a32ff7ae13a564c73110f644f3c49a55cdfc0727401ee64"}, {stdin: "7 3\n", h: "6e308ec1b1a40d3c597304d6e6a928cb29d31264bf58ca7e9cf0fe0c36081355"}],
      petunjuk: "Mulai hasil = 1, lalu kalikan dengan basis sebanyak eksponen kali."
    },
    {
      judul: "Bilangan Terbesar dari Tiga",
      deskripsi: `<p>Baca tiga bilangan, lalu cetak yang paling besar.</p><p>Untuk input <code>7 12 9</code>:</p><pre>Terbesar: 12</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    // Cari yang terbesar lalu cetak\n    \n    return 0;\n}\n",
      stdin: "7 12 9\n",
      expected: "Terbesar: 12",
      uji: [{stdin: "15 4 9\n", h: "7d966d40d346812e23191c16dc11607f6cc5166072a1a130d9429fb351143c18"}, {stdin: "2 8 20\n", h: "c45a3e7adc4e45d847ac3205fd91658b07bf63ad00cde262805ad412cea38c64"}],
      petunjuk: `Mulai dari <code>int m = a;</code> lalu bandingkan dengan b dan c pakai <code>if</code>.`
    },
    {
      judul: "Tabel Perkalian",
      deskripsi: `<p>Baca sebuah bilangan, lalu cetak tabel perkaliannya <strong>dari 1 sampai 5</strong>.</p><p>Untuk input <code>3</code>:</p><pre>3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Perulangan dari 1 sampai 5\n    \n    return 0;\n}\n",
      stdin: "3\n",
      expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
      uji: [{stdin: "7\n", h: "4ae65d00af42bf3c9baa0a7e89f72bb4bd7bab405459485f3d97efeb2aa0e1b1"}, {stdin: "12\n", h: "e81eeba19852f96e3b9689ae8292b498e7e7bfb33cb79bcd22b68f0812704850"}],
      petunjuk: `<code>for (int i = 1; i &lt;= 5; i++)</code>, lalu cetak <code>n</code>, <code>i</code>, dan <code>n*i</code>.`
    },
    {
      judul: "Fungsi Cek Prima",
      deskripsi: `<p>Buat <strong>fungsi</strong> bernama <code>prima()</code> yang menentukan apakah sebuah bilangan prima. Lalu cetak bilangannya diikuti keterangan.</p><p>Untuk input <code>17</code>:</p><pre>17 Prima</pre><p>Kalau bukan prima, tulis <code>Bukan prima</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nbool prima(int n) {\n    // Kembalikan true kalau n prima\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n    // Cetak: <n> Prima  atau  <n> Bukan prima\n    \n    return 0;\n}\n",
      stdin: "17\n",
      expected: "17 Prima",
      uji: [{stdin: "21\n", h: "4dc520a6af668e12fca3ce70e261a003322d91eb4d609615b9437a4d628b0cf2"}, {stdin: "29\n", h: "b8c7146d07153a9ca6c3f92e697cdae2fb4368451576cae87a34f858aa1ccf0d"}],
      petunjuk: `Bilangan &lt; 2 bukan prima. Selain itu, coba bagi dengan 2 sampai akar n.`
    }
  ]
};
