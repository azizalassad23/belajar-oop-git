/* =========================================================
   Pertemuan 31: Exception Handling
   Modul 6 — Topik Lanjutan
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[31] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Menangani kesalahan dengan <code>try</code>, <code>catch</code>, dan <code>throw</code>.</li>
    <li>Melempar dan menangkap beberapa jenis kesalahan.</li>
    <li>Memakai exception di dalam method class.</li>
  </ul>

  <h2>📖 Kenapa Tidak Cukup <code>if</code> Saja?</h2>
  <p>Sampai sekarang, kalau ada masalah kita hanya mengabaikannya diam-diam:</p>
  <pre><code>void tarik(int j) {
    if (j &lt;= saldo) saldo -= j;    // kalau gagal... tidak ada kabar apa pun
}</code></pre>
  <p>Pemanggilnya tidak pernah tahu penarikannya berhasil atau tidak.
     <strong>Exception</strong> memberi cara melapor bahwa sesuatu gagal.</p>

  <h2>🎯 Tiga Kata Kunci</h2>
  <pre><code>try {
    if (n == 0) throw "Pembagi tidak boleh nol";   // LEMPAR masalahnya
    cout &lt;&lt; 100 / n;
}
catch (const char* pesan) {                        // TANGKAP di sini
    cout &lt;&lt; "Error: " &lt;&lt; pesan;
}</code></pre>
  <ul>
    <li><code>try</code> &mdash; blok yang diawasi.</li>
    <li><code>throw</code> &mdash; melempar masalah; sisa blok <code>try</code> langsung dilewati.</li>
    <li><code>catch</code> &mdash; menangkap dan menanganinya.</li>
  </ul>

  <div class="callout">
    <strong>Analogi Melempar Bola 🏐</strong>
    Saat ada masalah, fungsi melempar bola ke atas sambil berteriak. Siapa pun di bawah
    yang siap menangkap (<code>catch</code>) akan menanganinya. Kalau tidak ada yang
    menangkap, programnya berhenti.
  </div>

  <h2>🎣 Menangkap Beberapa Jenis</h2>
  <p>Tipe yang dilempar menentukan <code>catch</code> mana yang jalan:</p>
  <pre><code>try {
    if (kode == 1) throw 100;                    // int
    if (kode == 2) throw string("kesalahan");    // string
}
catch (int e)    { cout &lt;&lt; "Tertangkap angka: " &lt;&lt; e; }
catch (string e) { cout &lt;&lt; "Tertangkap teks: "  &lt;&lt; e; }</code></pre>

  <h2>🏦 Exception di Dalam Class</h2>
  <p>Inilah pemakaian yang paling berguna &mdash; method melapor kalau tidak bisa
     menjalankan permintaan:</p>
  <pre><code>void tarik(int j) {
    if (j &gt; saldo) throw "Saldo tidak cukup";
    saldo -= j;
}</code></pre>
  <p>Penting: karena <code>throw</code> terjadi <em>sebelum</em> baris pengurangan,
     saldonya tetap utuh. Objeknya tidak tertinggal dalam keadaan setengah jadi.</p>

  <div class="callout warn">
    <strong>⚠️ Yang Sudah Tercetak Tidak Bisa Ditarik Kembali</strong>
    Kalau <code>cout &lt;&lt; "Hasil: "</code> sudah jalan sebelum exception dilempar,
    tulisan itu tetap muncul di layar. Exception menghentikan alur berikutnya, bukan
    membatalkan yang sudah terjadi.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>throw</code> melempar, <code>catch</code> menangkap, <code>try</code> mengawasi.</li>
    <li>Tipe yang dilempar menentukan blok catch yang dipakai.</li>
    <li>Program tetap berjalan setelah exception ditangani.</li>
    <li>Lempar <em>sebelum</em> mengubah data, agar objek tidak rusak separuh jalan.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Try Catch Pertama",
      deskripsi: `<p>Baca sebuah bilangan. Kalau nilainya <code>0</code>, <strong>lempar</strong> teks <code>Pembagi tidak boleh nol</code>. Kalau tidak, cetak <code>Hasil: </code> diikuti <code>100</code> dibagi bilangan itu.</p><p>Tangkap kesalahannya dan cetak <code>Error: &lt;pesan&gt;</code>.</p><p>Untuk input <code>0</code>:</p><pre>Error: Pembagi tidak boleh nol</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    try {\n        // lempar kalau n == 0, selain itu cetak hasilnya\n        \n    } catch (const char* pesan) {\n        // tangani di sini\n        \n    }\n    return 0;\n}\n",
      stdin: "0\n",
      expected: "Error: Pembagi tidak boleh nol",
      uji: [{stdin: "4\n", h: "62d8f21c0f0e3e7ef15cbb17079bbfc74f3bfda68c9068fe997d131751b79f49"}, {stdin: "50\n", h: "82363e40c7d822d9119373d1e9143a977d078095d9485d010694ec6885ad6529"}],
      petunjuk: `Teks yang dilempar ditangkap dengan <code>catch (const char* pesan)</code>.`
    },
    {
      judul: "Melempar Angka",
      deskripsi: `<p>Baca sebuah umur. Kalau negatif, <strong>lempar angkanya sendiri</strong> (bertipe <code>int</code>) dan tangkap dengan <code>catch (int e)</code>, lalu cetak <code>Umur tidak valid: &lt;e&gt;</code>. Kalau tidak negatif, cetak <code>Umur: &lt;umur&gt;</code>.</p><p>Setelah blok try-catch, cetak <code>Program tetap jalan</code> di baris baru.</p><p>Untuk input <code>-5</code>:</p><pre>Umur tidak valid: -5
Program tetap jalan</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int umur;\n    cin >> umur;\n    try {\n        // lempar umur kalau negatif\n        \n    } catch (int e) {\n        \n    }\n    cout << endl << \"Program tetap jalan\";\n    return 0;\n}\n",
      stdin: "-5\n",
      expected: "Umur tidak valid: -5\nProgram tetap jalan",
      uji: [{stdin: "17\n", h: "5aa9fac0de381ed7f001a618f4e2a4f4bd9b4ae07d88572063e7cc688379f1a6"}, {stdin: "-1\n", h: "9d1c04682fa374d6ea092a88acb90e571781029b91d65ce2516d55a3856a448f"}],
      petunjuk: `Baris terakhir tetap jalan — exception yang tertangani tidak menghentikan program.`
    },
    {
      judul: "Melempar dari Fungsi",
      deskripsi: `<p>Buat fungsi <code>bagi(int a, int b)</code> yang <strong>melempar</strong> teks <code>Pembagian dengan nol</code> kalau <code>b</code> bernilai 0, selain itu mengembalikan hasil baginya.</p><p>Di <code>main()</code>, panggil dalam <code>try</code> dengan mencetak <code>Hasil: </code> lebih dulu, dan tangkap dengan mencetak <code>Gagal: &lt;pesan&gt;</code>.</p><p>Untuk input <code>20 0</code>:</p><pre>Hasil: Gagal: Pembagian dengan nol</pre><p>Tulisan <code>Hasil: </code> tetap muncul karena sudah tercetak sebelum exception dilempar.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat fungsi bagi(int a, int b)\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    try { cout << \"Hasil: \" << bagi(a, b); }\n    catch (const char* e) { \n        \n    }\n    return 0;\n}\n",
      stdin: "20 0\n",
      expected: "Hasil: Gagal: Pembagian dengan nol",
      uji: [{stdin: "20 4\n", h: "392f6f164500e636609662f2f4049fdc19b530644d2df1e4e849a138a1ee31d6"}, {stdin: "100 25\n", h: "6055b73f5f20eae96b53af4ae0d96cf9ef585302a8e0de7c8c3b3fc01fbac546"}],
      petunjuk: `Exception dari dalam fungsi tetap bisa ditangkap oleh pemanggilnya.`
    },
    {
      judul: "Dua Jenis Kesalahan",
      deskripsi: `<p>Baca sebuah kode. Kalau <code>1</code>, lempar angka <code>100</code>. Kalau <code>2</code>, lempar <code>string("kesalahan teks")</code>. Selain itu cetak <code>Tidak ada masalah</code>.</p><p>Sediakan <strong>dua blok catch</strong>: untuk <code>int</code> mencetak <code>Tertangkap angka: &lt;e&gt;</code>, untuk <code>string</code> mencetak <code>Tertangkap teks: &lt;e&gt;</code>.</p><p>Untuk input <code>2</code>:</p><pre>Tertangkap teks: kesalahan teks</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int kode;\n    cin >> kode;\n    try {\n        // lempar sesuai kode\n        \n    }\n    // Buat dua catch: int dan string\n    \n    return 0;\n}\n",
      stdin: "2\n",
      expected: "Tertangkap teks: kesalahan teks",
      uji: [{stdin: "1\n", h: "5308f983fff4dbb716af66638c86d7ef9f9645a33a9e959b61b2049f5292c392"}, {stdin: "5\n", h: "dd0c438a4643ec8238529ea3a2a10e7def7805356cc12cd27d284d5e9f122e26"}],
      petunjuk: `C++ memilih blok catch yang tipenya cocok dengan yang dilempar.`
    },
    {
      judul: "Rekening yang Melapor",
      deskripsi: `<p>Buat class <code>Rekening</code> dengan atribut <strong>private</strong> <code>saldo</code>, constructor, method <code>tarik(int)</code> yang <strong>melempar</strong> <code>Saldo tidak cukup</code> kalau jumlahnya melebihi saldo, dan <code>getSaldo()</code>.</p><p>Untuk input <code>1000 5000</code>:</p><pre>Gagal: Saldo tidak cukup
Saldo tetap: 1000</pre><p>Perhatikan saldonya <strong>tidak berubah</strong> — karena <code>throw</code> terjadi sebelum pengurangan.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Rekening {\n    int saldo;\npublic:\n    Rekening(int s) { saldo = s; }\n    // Buat tarik(int) yang melempar, dan getSaldo()\n    \n};\n\nint main() {\n    int awal, ambil;\n    cin >> awal >> ambil;\n    Rekening r(awal);\n    try { r.tarik(ambil); cout << \"Sisa: \" << r.getSaldo(); }\n    catch (const char* e) {\n        \n    }\n    return 0;\n}\n",
      stdin: "1000 5000\n",
      expected: "Gagal: Saldo tidak cukup\nSaldo tetap: 1000",
      uji: [{stdin: "1000 300\n", h: "40c2c17bbf6f08a2a19e0df9f2e904399760f01d096c98b6d3d2e1ad93c227d3"}, {stdin: "500 500\n", h: "4b2af9486774968f436772cf81879675fb0f625e9c660c90f3576ff925189f8e"}],
      petunjuk: `Urutannya penting: periksa dan lempar DULU, baru ubah datanya.`
    }
  ]
};
