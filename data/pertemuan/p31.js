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
      petunjuk: `Teks yang dilempar ditangkap dengan <code>catch (const char* pesan)</code>.`
    },
    {
      judul: "Melempar Angka",
      deskripsi: `<p>Baca sebuah umur. Kalau negatif, <strong>lempar angkanya sendiri</strong> (bertipe <code>int</code>) dan tangkap dengan <code>catch (int e)</code>, lalu cetak <code>Umur tidak valid: &lt;e&gt;</code>. Kalau tidak negatif, cetak <code>Umur: &lt;umur&gt;</code>.</p><p>Setelah blok try-catch, cetak <code>Program tetap jalan</code> di baris baru.</p><p>Untuk input <code>-5</code>:</p><pre>Umur tidak valid: -5
Program tetap jalan</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int umur;\n    cin >> umur;\n    try {\n        // lempar umur kalau negatif\n        \n    } catch (int e) {\n        \n    }\n    cout << endl << \"Program tetap jalan\";\n    return 0;\n}\n",
      stdin: "-5\n",
      expected: "Umur tidak valid: -5\nProgram tetap jalan",
      petunjuk: `Baris terakhir tetap jalan — exception yang tertangani tidak menghentikan program.`
    },
    {
      judul: "Melempar dari Fungsi",
      deskripsi: `<p>Buat fungsi <code>bagi(int a, int b)</code> yang <strong>melempar</strong> teks <code>Pembagian dengan nol</code> kalau <code>b</code> bernilai 0, selain itu mengembalikan hasil baginya.</p><p>Di <code>main()</code>, panggil dalam <code>try</code> dengan mencetak <code>Hasil: </code> lebih dulu, dan tangkap dengan mencetak <code>Gagal: &lt;pesan&gt;</code>.</p><p>Untuk input <code>20 0</code>:</p><pre>Hasil: Gagal: Pembagian dengan nol</pre><p>Tulisan <code>Hasil: </code> tetap muncul karena sudah tercetak sebelum exception dilempar.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat fungsi bagi(int a, int b)\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    try { cout << \"Hasil: \" << bagi(a, b); }\n    catch (const char* e) { \n        \n    }\n    return 0;\n}\n",
      stdin: "20 0\n",
      expected: "Hasil: Gagal: Pembagian dengan nol",
      petunjuk: `Exception dari dalam fungsi tetap bisa ditangkap oleh pemanggilnya.`
    },
    {
      judul: "Dua Jenis Kesalahan",
      deskripsi: `<p>Baca sebuah kode. Kalau <code>1</code>, lempar angka <code>100</code>. Kalau <code>2</code>, lempar <code>string("kesalahan teks")</code>. Selain itu cetak <code>Tidak ada masalah</code>.</p><p>Sediakan <strong>dua blok catch</strong>: untuk <code>int</code> mencetak <code>Tertangkap angka: &lt;e&gt;</code>, untuk <code>string</code> mencetak <code>Tertangkap teks: &lt;e&gt;</code>.</p><p>Untuk input <code>2</code>:</p><pre>Tertangkap teks: kesalahan teks</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int kode;\n    cin >> kode;\n    try {\n        // lempar sesuai kode\n        \n    }\n    // Buat dua catch: int dan string\n    \n    return 0;\n}\n",
      stdin: "2\n",
      expected: "Tertangkap teks: kesalahan teks",
      petunjuk: `C++ memilih blok catch yang tipenya cocok dengan yang dilempar.`
    },
    {
      judul: "Rekening yang Melapor",
      deskripsi: `<p>Buat class <code>Rekening</code> dengan atribut <strong>private</strong> <code>saldo</code>, constructor, method <code>tarik(int)</code> yang <strong>melempar</strong> <code>Saldo tidak cukup</code> kalau jumlahnya melebihi saldo, dan <code>getSaldo()</code>.</p><p>Untuk input <code>1000 5000</code>:</p><pre>Gagal: Saldo tidak cukup
Saldo tetap: 1000</pre><p>Perhatikan saldonya <strong>tidak berubah</strong> — karena <code>throw</code> terjadi sebelum pengurangan.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Rekening {\n    int saldo;\npublic:\n    Rekening(int s) { saldo = s; }\n    // Buat tarik(int) yang melempar, dan getSaldo()\n    \n};\n\nint main() {\n    int awal, ambil;\n    cin >> awal >> ambil;\n    Rekening r(awal);\n    try { r.tarik(ambil); cout << \"Sisa: \" << r.getSaldo(); }\n    catch (const char* e) {\n        \n    }\n    return 0;\n}\n",
      stdin: "1000 5000\n",
      expected: "Gagal: Saldo tidak cukup\nSaldo tetap: 1000",
      petunjuk: `Urutannya penting: periksa dan lempar DULU, baru ubah datanya.`
    }
  ]
};
