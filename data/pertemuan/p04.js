/* =========================================================
   Pertemuan 4: Array, Pointer & Reference
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[4] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Menyimpan banyak nilai sejenis dalam sebuah <strong>array</strong>.</li>
    <li>Memahami <strong>pointer</strong> sebagai penyimpan alamat memori.</li>
    <li>Menggunakan <strong>reference</strong> untuk mengubah nilai asli lewat fungsi.</li>
  </ul>

  <h2>📖 Array</h2>
  <p>Array adalah kumpulan variabel bertipe sama yang disimpan berurutan dan diakses lewat <strong>indeks</strong>
     (dimulai dari <code>0</code>).</p>
  <pre><code>int nilai[5] = {90, 85, 70, 60, 100};
cout &lt;&lt; nilai[0];   // 90 (elemen pertama)
cout &lt;&lt; nilai[4];   // 100 (elemen terakhir)

// menjumlahkan seluruh elemen
int total = 0;
for (int i = 0; i &lt; 5; i++) {
    total += nilai[i];
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Batas indeks</strong>
    Array berukuran 5 memiliki indeks <code>0</code>..<code>4</code>. Mengakses <code>nilai[5]</code>
    berada di luar batas dan menyebabkan perilaku tak terduga.
  </div>

  <h2>🧭 Pointer</h2>
  <p>Setiap variabel disimpan di suatu <strong>alamat</strong> memori. <strong>Pointer</strong> adalah variabel
     yang menyimpan alamat tersebut.</p>
  <pre><code>int x = 10;
int* p = &amp;x;      // p menyimpan ALAMAT x  ( &amp; = "alamat dari" )
cout &lt;&lt; *p;        // 10  ( * = "nilai yang ditunjuk" )
*p = 20;           // mengubah nilai x lewat pointer
cout &lt;&lt; x;         // 20</code></pre>
  <p>Pointer sangat penting di OOP: objek sering diakses lewat pointer (mis. <code>Hewan* h = new Kucing();</code>),
     dan ini menjadi dasar <em>polymorphism</em> nanti.</p>

  <h2>🔗 Reference</h2>
  <p><strong>Reference</strong> adalah "nama lain" (alias) untuk sebuah variabel. Berbeda dengan pointer,
     reference lebih sederhana dan tidak perlu <code>*</code> atau <code>&amp;</code> saat dipakai.</p>
  <pre><code>int x = 10;
int&amp; r = x;       // r adalah alias dari x
r = 99;
cout &lt;&lt; x;         // 99</code></pre>

  <h3>Pass by Value vs Pass by Reference</h3>
  <p>Secara default, parameter fungsi berupa <em>salinan</em> (pass by value) — perubahan di dalam fungsi
     tidak memengaruhi variabel asli. Dengan <strong>reference</strong> (<code>&amp;</code>), fungsi dapat
     mengubah nilai aslinya.</p>
  <pre><code>void tambahSatu(int a)  { a++; }      // salinan, tak berpengaruh
void tambahDua(int&amp; a)  { a += 2; }   // reference, mengubah asli

int n = 5;
tambahSatu(n);   // n tetap 5
tambahDua(n);    // n menjadi 7</code></pre>

  <div class="callout tip">
    <strong>💡 Kapan pakai reference?</strong>
    Gunakan reference saat fungsi perlu <em>mengubah</em> argumen aslinya, atau untuk menghindari
    penyalinan data besar (lebih efisien).
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Array menyimpan banyak nilai sejenis; indeks mulai dari <code>0</code>.</li>
    <li>Pointer menyimpan alamat; <code>&amp;</code> = alamat, <code>*</code> = nilai yang ditunjuk.</li>
    <li>Reference adalah alias; ideal untuk pass-by-reference agar fungsi bisa mengubah nilai asli.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Total Nilai dalam Array",
      deskripsi: `<p>Baca sebuah bilangan <code>N</code> (banyaknya data), lalu baca <code>N</code> bilangan bulat.
                  Hitung dan cetak jumlah seluruhnya dengan format <code>Total: &lt;jumlah&gt;</code>.</p>
                  <p>Contoh input:</p>
                  <pre>5
10 20 30 40 50</pre>
                  <p>Output:</p>
                  <pre>Total: 150</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    // Baca n angka ke dalam array, lalu jumlahkan\n    \n    return 0;\n}\n",
      stdin: "5\n10 20 30 40 50\n",
      expected: "Total: 150",
      petunjuk: "Gunakan perulangan: <code>cin >> a[i];</code> lalu <code>total += a[i];</code>."
    },
    {
      judul: "Tukar Nilai dengan Reference",
      deskripsi: `<p>Buat fungsi <code>tukar</code> yang menerima dua parameter <strong>reference</strong>
                  (<code>int&amp; a, int&amp; b</code>) dan menukar isinya. Baca dua bilangan, panggil fungsi,
                  lalu cetak hasilnya dengan format <code>Setelah tukar: &lt;a&gt; &lt;b&gt;</code>.</p>
                  <p>Contoh: input <code>3 7</code> menghasilkan:</p>
                  <pre>Setelah tukar: 7 3</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat fungsi tukar(int& a, int& b) di sini\n\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Panggil tukar(a, b), lalu cetak hasilnya\n    \n    return 0;\n}\n",
      stdin: "3 7\n",
      expected: "Setelah tukar: 7 3",
      petunjuk: "Di dalam fungsi: gunakan variabel sementara -> <code>int t = a; a = b; b = t;</code>."
    },
    {
      judul: "Nilai Terbesar dalam Array",
      deskripsi: `<p>Baca banyaknya data, lalu baca data itu ke dalam array. Cetak nilai terbesarnya.</p><p>Untuk input <code>5</code> lalu <code>3 9 2 8 5</code>:</p><pre>Terbesar: 9</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    // Baca n data, lalu cari yang terbesar\n    \n    return 0;\n}\n",
      stdin: "5\n3 9 2 8 5\n",
      expected: "Terbesar: 9",
      petunjuk: `Anggap dulu <code>a[0]</code> yang terbesar, lalu bandingkan sisanya dalam perulangan.`
    },
    {
      judul: "Ubah Nilai lewat Pointer",
      deskripsi: `<p>Baca sebuah bilangan dan cetak nilainya. Lalu <strong>gandakan lewat pointer</strong>, dan cetak lagi.</p><p>Untuk input <code>10</code>:</p><pre>Sebelum: 10
Sesudah: 20</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    cin >> x;\n    // Cetak sebelum, gandakan lewat pointer, cetak sesudah\n    \n    return 0;\n}\n",
      stdin: "10\n",
      expected: "Sebelum: 10\nSesudah: 20",
      petunjuk: `<code>int* p = &amp;x;</code> lalu ubah isinya dengan <code>*p = x * 2;</code>`
    },
    {
      judul: "Rata-rata Isi Array",
      deskripsi: `<p>Baca banyaknya data lalu data itu sendiri, dan cetak rata-ratanya (pembagian bilangan bulat).</p><p>Untuk input <code>4</code> lalu <code>10 20 30 40</code>:</p><pre>Rata-rata: 25</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100], total = 0;\n    // Baca sambil menjumlahkan, lalu bagi n\n    \n    return 0;\n}\n",
      stdin: "4\n10 20 30 40\n",
      expected: "Rata-rata: 25",
      petunjuk: `Jumlahkan langsung saat membaca, baru bagi dengan <code>n</code>.`
    }
  ]
};
