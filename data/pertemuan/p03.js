/* =========================================================
   Pertemuan 3: Kontrol Alur & Fungsi
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[3] = {
  waktuMenit: 25,

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
      petunjuk: "Mulai hasil = 1, lalu kalikan dengan basis sebanyak eksponen kali."
    }
  ]
};
