/* =========================================================
   Pertemuan 2: Review C++ Dasar — Variabel, Tipe Data & I/O
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY (contoh materi terisi penuh)
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[2] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Mendeklarasikan variabel dengan tipe data yang tepat.</li>
    <li>Membaca input dengan <code>cin</code> dan menampilkan output dengan <code>cout</code>.</li>
    <li>Menggunakan operator aritmetika dasar.</li>
  </ul>

  <h2>📖 Variabel & Tipe Data</h2>
  <p><strong>Variabel</strong> adalah wadah bernama untuk menyimpan nilai. Setiap variabel punya <strong>tipe data</strong>
     yang menentukan jenis nilai yang bisa disimpan.</p>
  <table style="width:100%;border-collapse:collapse;font-size:.9rem">
    <tr style="text-align:left;border-bottom:2px solid var(--border)">
      <th style="padding:6px">Tipe</th><th>Contoh Nilai</th><th>Kegunaan</th>
    </tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>int</code></td><td>-3, 0, 42</td><td>Bilangan bulat</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>double</code></td><td>3.14, -0.5</td><td>Bilangan desimal</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>char</code></td><td>'A', 'z'</td><td>Satu karakter</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>bool</code></td><td>true, false</td><td>Logika (benar/salah)</td></tr>
    <tr><td style="padding:6px"><code>string</code></td><td>"Halo"</td><td>Teks (perlu <code>#include &lt;string&gt;</code>)</td></tr>
  </table>

  <pre><code>int umur = 17;
double tinggi = 168.5;
char golongan = 'B';
bool lulus = true;
string nama = "Sinta";</code></pre>

  <h2>⌨️ Input dengan <code>cin</code></h2>
  <p><code>cin</code> membaca nilai dari keyboard dan menyimpannya ke variabel menggunakan operator <code>&gt;&gt;</code>.</p>
  <pre><code>int a, b;
cout &lt;&lt; "Masukkan dua angka: ";
cin &gt;&gt; a &gt;&gt; b;          // membaca dua angka dipisah spasi/enter
cout &lt;&lt; "Total: " &lt;&lt; a + b;</code></pre>

  <div class="callout warn">
    <strong>⚠️ Hati-hati</strong>
    <code>cin &gt;&gt; nama</code> hanya membaca <em>satu kata</em> (berhenti di spasi). Untuk membaca
    satu baris penuh berisi spasi, gunakan <code>getline(cin, nama)</code>.
  </div>

  <h2>➗ Operator Aritmetika</h2>
  <ul>
    <li><code>+</code> penjumlahan, <code>-</code> pengurangan, <code>*</code> perkalian</li>
    <li><code>/</code> pembagian — <strong>ingat:</strong> <code>7 / 2</code> = <code>3</code> (bilangan bulat!), tapi <code>7.0 / 2</code> = <code>3.5</code></li>
    <li><code>%</code> modulo (sisa bagi) — <code>7 % 2</code> = <code>1</code></li>
  </ul>

  <div class="callout tip">
    <strong>💡 Pembagian Bulat</strong>
    Jika kedua operan bertipe <code>int</code>, hasil <code>/</code> juga dibulatkan ke bawah.
    Untuk hasil desimal, minimal satu operan harus <code>double</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Pilih tipe data sesuai jenis nilai: <code>int</code>, <code>double</code>, <code>char</code>, <code>bool</code>, <code>string</code>.</li>
    <li><code>cin &gt;&gt;</code> untuk input, <code>cout &lt;&lt;</code> untuk output.</li>
    <li>Waspadai pembagian bilangan bulat dan pembacaan input yang berhenti di spasi.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Kalkulator Sederhana",
      deskripsi: `<p>Baca <strong>dua bilangan bulat</strong> dari input, lalu cetak jumlah, selisih, dan hasil kalinya
                  dalam <strong>tiga baris</strong> berikut (untuk input <code>8 3</code>):</p>
                  <pre>Jumlah: 11
Selisih: 5
Hasil kali: 24</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Cetak jumlah, selisih, dan hasil kali\n    \n    return 0;\n}\n",
      stdin: "8 3\n",
      expected: "Jumlah: 11\nSelisih: 5\nHasil kali: 24",
      uji: [{stdin: "20 7\n", h: "f4c9b2d57637d2d5dfb62f8328e5f920ef203dd12bc5ff4f8d3d83413e9b9144"}, {stdin: "15 15\n", h: "5b172592804047e6deeb560a57b0f8e009d5c59b998eb718f154acf27560afbb"}],
      petunjuk: "Selisih = a - b (asumsikan a &ge; b pada uji ini)."
    },
    {
      judul: "Konversi Suhu",
      deskripsi: `<p>Baca sebuah suhu dalam <strong>Celsius</strong> (bilangan bulat), lalu ubah ke <strong>Fahrenheit</strong>
                  dengan rumus <code>F = C &times; 9 / 5 + 32</code>.</p>
                  <p>Contoh: input <code>100</code> menghasilkan:</p>
                  <pre>Fahrenheit: 212</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int c;\n    cin >> c;\n    // Hitung dan cetak hasil konversi\n    \n    return 0;\n}\n",
      stdin: "100\n",
      expected: "Fahrenheit: 212",
      uji: [{stdin: "25\n", h: "737e2b1c6882a513598d02a5bac76b989fd7841944145087b7337d8f2572ad57"}, {stdin: "40\n", h: "ed71191d6bc11e957ffa97fb66378eaa5f1b0d712a9a64fd293182efa04cdd94"}],
      petunjuk: "Gunakan <code>c * 9 / 5 + 32</code>. Karena semua int, urutan operasi tetap benar untuk uji ini."
    },
    {
      judul: "Rata-rata Tiga Nilai",
      deskripsi: `<p>Baca tiga nilai ulangan (bilangan bulat), lalu cetak rata-ratanya. Gunakan pembagian bilangan bulat biasa.</p><p>Untuk input <code>80 90 85</code>:</p><pre>Rata-rata: 85</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // Baca tiga nilai lalu cetak rata-ratanya\n    \n    return 0;\n}\n",
      stdin: "80 90 85\n",
      expected: "Rata-rata: 85",
      uji: [{stdin: "70 75 80\n", h: "a14acc4445f5ecc7ff6840e4f9ab0a8ea15f6d216b6436023e70771ae7d60e56"}, {stdin: "90 85 88\n", h: "881f852365cce15ec750c8ae363efdf0cfbad8f7d4893a1f963c4aa00b7b8c78"}],
      petunjuk: `Jumlahkan dulu, baru bagi 3: <code>(a + b + c) / 3</code>.`
    },
    {
      judul: "Tukar Isi Dua Variabel",
      deskripsi: `<p>Baca dua bilangan, tampilkan nilainya, lalu <strong>tukar isinya</strong> dan tampilkan lagi.</p><p>Untuk input <code>5 9</code>:</p><pre>Sebelum: 5 9
Sesudah: 9 5</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Cetak sebelum, tukar, cetak sesudah\n    \n    return 0;\n}\n",
      stdin: "5 9\n",
      expected: "Sebelum: 5 9\nSesudah: 9 5",
      uji: [{stdin: "12 3\n", h: "4d17e6be2512c8a63b7727ca393434a24017adde211d023558abbf52a85082a3"}, {stdin: "100 200\n", h: "54aa4ea4cdb1251eb44d8ffaac21812d03eee207e4db230db9c3ae17c458f582"}],
      petunjuk: `Butuh satu variabel bantu: <code>int t = a; a = b; b = t;</code>`
    },
    {
      judul: "Biodata Singkat",
      deskripsi: `<p>Baca nama (satu kata) dan umur, lalu cetak biodata. Perhatikan ada <strong>spasi sebelum tanda titik dua</strong>.</p><p>Untuk input <code>Sari 16</code>:</p><pre>Nama : Sari
Umur : 16 tahun</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    int umur;\n    // Baca lalu cetak dua baris biodata\n    \n    return 0;\n}\n",
      stdin: "Sari 16\n",
      expected: "Nama : Sari\nUmur : 16 tahun",
      uji: [{stdin: "Budi 17\n", h: "4038259904b370349a16d0d90d8a8be602ce182d843bf40c017d616f2548ce15"}, {stdin: "Ayu 15\n", h: "89139dd7d0f46a7f93f47de33c5956f253af77615053c72ab7c26174c684e806"}],
      petunjuk: `Tulis persis <code>"Nama : "</code> dengan spasi sebelum titik dua.`
    }
  ]
};
