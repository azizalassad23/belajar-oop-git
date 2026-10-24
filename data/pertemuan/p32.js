/* =========================================================
   Pertemuan 32: STL Dasar: vector & string
   Modul 6 — Topik Lanjutan
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[32] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memakai <code>vector</code> sebagai pengganti array biasa.</li>
    <li>Memakai method bawaan <code>string</code>.</li>
    <li>Menyimpan objek buatan sendiri di dalam vector.</li>
  </ul>

  <h2>📖 STL: Perkakas yang Sudah Disediakan</h2>
  <p><strong>STL</strong> (Standard Template Library) adalah kumpulan class template siap
     pakai bawaan C++. Kamu sudah tahu cara kerjanya &mdash; itulah template dari
     pertemuan lalu.</p>

  <h2>📦 vector: Array yang Bisa Membesar</h2>
  <p>Array biasa harus ditentukan ukurannya sejak awal. <code>vector</code> tidak:</p>
  <pre><code>#include &lt;vector&gt;

vector&lt;int&gt; v;              // kosong, ukurannya belum ditentukan
v.push_back(10);            // tambah di belakang
v.push_back(20);

cout &lt;&lt; v.size();           // 2   -> berapa isinya sekarang
cout &lt;&lt; v[0];               // 10  -> diakses seperti array biasa</code></pre>

  <p>Cara singkat menelusuri isinya:</p>
  <pre><code>for (int x : v) cout &lt;&lt; x &lt;&lt; " ";      // "range-based for"</code></pre>

  <div class="callout">
    <strong>Analogi Tas vs Kardus 🎒</strong>
    Array itu kardus: ukurannya ditentukan sejak dibeli. Vector itu tas serbaguna:
    isinya bertambah sesuai kebutuhan, dan ia selalu tahu berapa isinya.
  </div>

  <h2>✍️ string dan Method Bawaannya</h2>
  <pre><code>string s = "Pemrograman";
s.length()        // 11
s.substr(0, 5)    // "Pemro"  -> mulai dari 0, ambil 5 huruf
s[0]              // 'P'      -> seperti array
s + " C++"        // "Pemrograman C++"</code></pre>

  <h2>🧩 vector Berisi Objek Sendiri</h2>
  <p>Vector bisa menampung apa saja, termasuk class buatanmu:</p>
  <pre><code>vector&lt;Siswa&gt; daftar;
daftar.push_back(Siswa("Andi", 80));

for (int i = 0; i &lt; daftar.size(); i++)
    cout &lt;&lt; daftar[i].nama;</code></pre>

  <div class="callout warn">
    <strong>⚠️ Hati-hati Membandingkan size()</strong>
    <code>v.size()</code> bertipe <em>unsigned</em>. Membaginya dengan int bisa memicu
    peringatan. Kalau perlu, ubah dulu: <code>total / (int)v.size()</code>.
  </div>

  <div class="callout tip">
    <strong>💡 Kenapa Ini Penting</strong>
    Dengan vector kamu tidak perlu lagi menebak-nebak ukuran array, dan tidak ada risiko
    keluar batas seperti <code>a[100]</code> yang cuma muat 5 data.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>#include &lt;vector&gt;</code> lalu <code>vector&lt;tipe&gt; nama;</code></li>
    <li><code>push_back()</code> menambah, <code>size()</code> menghitung, <code>[]</code> mengakses.</li>
    <li><code>string</code> punya <code>length()</code>, <code>substr()</code>, dan bisa disambung dengan <code>+</code>.</li>
    <li>Vector bisa menyimpan objek dari class buatanmu sendiri.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Vector Pertama",
      deskripsi: `<p>Baca sebuah angka <code>n</code>, lalu baca <code>n</code> bilangan ke dalam sebuah <code>vector</code>. Cetak jumlah datanya dan seluruh isinya.</p><p>Untuk input <code>4</code> lalu <code>10 20 30 40</code>:</p><pre>Jumlah data: 4
Isi: 10 20 30 40</pre><p>Perhatikan ada spasi sebelum tiap angka.</p>`,
      starter: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    // Baca n bilangan lalu push_back ke v\n    \n    cout << \"Jumlah data: \" << v.size() << endl;\n    cout << \"Isi:\";\n    // Cetak tiap isi didahului spasi\n    \n    return 0;\n}\n",
      stdin: "4\n10 20 30 40\n",
      expected: "Jumlah data: 4\nIsi: 10 20 30 40",
      uji: [{stdin: "3\n7 8 9\n", h: "a1645e702ae9d5b255a0a5305c6f8c9e579b595864574180f66ab3a693416c01"}, {stdin: "1\n42\n", h: "a5690542c0e6d9652c0a693892bba393b482953a77b19cac9b549a6a639a72d6"}],
      petunjuk: `<code>cout &lt;&lt; " " &lt;&lt; v[i];</code> — spasi di depan angka, bukan di belakang.`
    },
    {
      judul: "Total dan Terbesar",
      deskripsi: `<p>Baca <code>n</code> lalu <code>n</code> bilangan ke dalam vector. Hitung totalnya dan cari nilai terbesarnya.</p><p>Untuk input <code>5</code> lalu <code>3 9 2 8 5</code>:</p><pre>Total: 27
Terbesar: 9</pre>`,
      starter: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> v;\n    // Baca n bilangan\n    \n    // Hitung total dan cari terbesar\n    \n    cout << \"Total: \" << total << endl;\n    cout << \"Terbesar: \" << maks;\n    return 0;\n}\n",
      stdin: "5\n3 9 2 8 5\n",
      expected: "Total: 27\nTerbesar: 9",
      uji: [{stdin: "4\n10 40 20 30\n", h: "73331e8dd785a83d2cc82efce06c9ade23a9bb3491e3bf8884b01cefbb662d93"}, {stdin: "3\n5 5 1\n", h: "d0fe2ad660545b4431539ceccb45a7e42834a4a7116663bd93bcd1ce8f6910fd"}],
      petunjuk: `Bisa pakai <code>for (int x : v)</code> supaya lebih ringkas.`
    },
    {
      judul: "Bermain dengan String",
      deskripsi: `<p>Baca sebuah kata, lalu cetak panjangnya, lima huruf pertamanya, dan huruf pertamanya.</p><p>Untuk input <code>Pemrograman</code>:</p><pre>Panjang: 11
Lima huruf pertama: Pemro
Huruf pertama: P</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Cetak length(), substr(0,5), dan s[0]\n    \n    return 0;\n}\n",
      stdin: "Pemrograman\n",
      expected: "Panjang: 11\nLima huruf pertama: Pemro\nHuruf pertama: P",
      uji: [{stdin: "Komputer\n", h: "a0cdb8bf6ec76bc5c9fcd9103c975a852d9f0a068bf36f8fd8c7e7f478e06c2d"}, {stdin: "Algoritma\n", h: "bb20331f6235f7bdf98898251b5ad8fd881e96b9bf94280ac882c216445485ab"}],
      petunjuk: `<code>s.substr(0, 5)</code> berarti mulai dari indeks 0, ambil 5 huruf.`
    },
    {
      judul: "Daftar Nama",
      deskripsi: `<p>Baca <code>n</code> lalu <code>n</code> nama ke dalam <code>vector&lt;string&gt;</code>. Cetak bernomor, lalu jumlah totalnya.</p><p>Untuk input <code>3</code> lalu <code>Andi Budi Sari</code>:</p><pre>1. Andi
2. Budi
3. Sari
Total 3 siswa</pre>`,
      starter: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> nama;\n    // Baca n nama\n    \n    // Cetak bernomor mulai dari 1\n    \n    cout << \"Total \" << nama.size() << \" siswa\";\n    return 0;\n}\n",
      stdin: "3\nAndi Budi Sari\n",
      expected: "1. Andi\n2. Budi\n3. Sari\nTotal 3 siswa",
      uji: [{stdin: "2\nRina Eko\n", h: "fcdf9488b2ba1fdb206608b90ccc99fd1566e828083386c41829e80a9eb07285"}, {stdin: "4\nAgus Bela Cici Doni\n", h: "c994a7de70260a2ad00754026838d2feb98d04a679048167c207271877c67ab4"}],
      petunjuk: `Nomornya <code>(i+1)</code> karena indeks vector mulai dari 0.`
    },
    {
      judul: "Vector Berisi Objek",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <code>nama</code> dan <code>nilai</code> serta constructor. Baca <code>n</code> pasang data ke dalam <code>vector&lt;Siswa&gt;</code>, cetak semuanya, lalu cetak rata-rata nilainya.</p><p>Untuk input <code>3</code> lalu <code>Andi 80 Budi 90 Sari 70</code>:</p><pre>Andi: 80
Budi: 90
Sari: 70
Rata-rata: 80</pre>`,
      starter: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    int nilai;\n    // Buat constructor Siswa(string, int)\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Siswa> daftar;\n    // Baca n pasang data lalu push_back\n    \n    // Cetak tiap siswa dan hitung total\n    \n    cout << \"Rata-rata: \" << total / (int)daftar.size();\n    return 0;\n}\n",
      stdin: "3\nAndi 80 Budi 90 Sari 70\n",
      expected: "Andi: 80\nBudi: 90\nSari: 70\nRata-rata: 80",
      uji: [{stdin: "2\nRina 75 Eko 95\n", h: "622bde272e536c5f4a9ac0dc64a9090843a3c62615a82b22b30dc12a82de4680"}, {stdin: "4\nAgus 60 Bela 70 Cici 80 Doni 90\n", h: "28eb0ec61123e670a0ac43d06ff507a7a88d247e428048dde21c3f9330ff0917"}],
      petunjuk: `<code>daftar.push_back(Siswa(s, v));</code> membuat objek sekaligus memasukkannya.`
    }
  ]
};
