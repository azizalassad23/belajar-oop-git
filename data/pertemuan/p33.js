/* =========================================================
   Pertemuan 33: Smart Pointer & Manajemen Memori
   Modul 6 — Topik Lanjutan
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[33] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami masalah <code>new</code> dan <code>delete</code> manual.</li>
    <li>Memakai <code>unique_ptr</code> dan <code>shared_ptr</code>.</li>
    <li>Memahami prinsip <strong>RAII</strong>.</li>
  </ul>

  <h2>⚠️ Masalah Memori Manual</h2>
  <p>Selama ini kita menulis <code>new</code> lalu wajib ingat menulis <code>delete</code>.
     Kalau lupa &mdash; atau kalau program keluar lebih dulu karena exception &mdash;
     memorinya bocor:</p>
  <pre><code>Data* d = new Data(1);
if (adaMasalah) return;      // BOCOR: delete tidak pernah jalan
delete d;</code></pre>

  <h2>✅ Smart Pointer: Membersihkan Sendiri</h2>
  <p><code>unique_ptr</code> adalah objek yang memegang pointer dan
     <strong>otomatis menghapusnya</strong> lewat destructor-nya:</p>
  <pre><code>#include &lt;memory&gt;

{
    unique_ptr&lt;Berkas&gt; b = make_unique&lt;Berkas&gt;();
    b-&gt;baca();
}                     // keluar blok -> otomatis dihapus, tanpa delete</code></pre>
  <p>Pemakaiannya sama seperti pointer biasa: <code>-&gt;</code> untuk anggota,
     <code>*</code> untuk isinya.</p>

  <div class="callout">
    <strong>Analogi Kunci Loker 🔑</strong>
    <code>unique_ptr</code> itu kunci loker yang <em>hanya satu</em>. Saat kamu pergi,
    lokernya otomatis dikosongkan. Kamu tidak bisa menggandakan kuncinya &mdash; kalau
    mau memberikannya, kunci lamamu hilang.
  </div>

  <h2>🤝 shared_ptr: Kunci yang Boleh Digandakan</h2>
  <p>Kalau beberapa bagian program perlu memakai objek yang sama, pakai
     <code>shared_ptr</code>. Ia menghitung berapa pemiliknya, dan baru menghapus objeknya
     saat pemilik terakhir pergi:</p>
  <pre><code>shared_ptr&lt;int&gt; a = make_shared&lt;int&gt;(50);
cout &lt;&lt; a.use_count();        // 1
{
    shared_ptr&lt;int&gt; b = a;
    cout &lt;&lt; a.use_count();    // 2
}
cout &lt;&lt; a.use_count();        // 1  -> b sudah pergi</code></pre>

  <h2>🛡️ RAII: Prinsip di Baliknya</h2>
  <p><strong>RAII</strong> berarti sumber daya diikat pada masa hidup objek: didapat saat
     objek lahir, dilepas saat objek mati. Kamu sudah memakainya sejak Pertemuan 10 tanpa
     tahu namanya &mdash; itulah gunanya destructor.</p>

  <div class="callout tip">
    <strong>💡 Aturan Praktis</strong>
    Di C++ modern, <code>new</code> dan <code>delete</code> hampir tidak pernah ditulis
    langsung. Pakai <code>make_unique</code> secara default; naik ke
    <code>make_shared</code> hanya kalau kepemilikannya memang harus dibagi.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>#include &lt;memory&gt;</code> untuk memakai smart pointer.</li>
    <li><code>unique_ptr</code>: satu pemilik, otomatis terhapus.</li>
    <li><code>shared_ptr</code>: banyak pemilik, dihitung dengan <code>use_count()</code>.</li>
    <li>RAII: sumber daya hidup dan mati bersama objeknya.</li>
  </ul>
  `,

  soal: [
    {
      judul: "unique_ptr Pertama",
      deskripsi: `<p>Baca sebuah bilangan, simpan dalam <code>unique_ptr&lt;int&gt;</code> memakai <code>make_unique</code>, lalu cetak nilainya dan nilainya dikali dua.</p><p>Untuk input <code>7</code>:</p><pre>Nilai: 7
Dikali dua: 14</pre>`,
      starter: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // Buat unique_ptr<int> dengan make_unique\n    \n    // Cetak *p dan (*p)*2\n    \n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Nilai: 7\nDikali dua: 14",
      petunjuk: `Isinya diakses dengan bintang: <code>*p</code>. Untuk dikali, tulis <code>(*p) * 2</code>.`
    },
    {
      judul: "Membersihkan Sendiri",
      deskripsi: `<p>Buat class <code>Berkas</code> dengan constructor mencetak <code>Berkas dibuka</code>, destructor mencetak <code>Berkas ditutup</code>, dan method <code>baca()</code> mencetak <code>Membaca isi</code>. Semua diikuti pindah baris.</p><p>Di <code>main()</code>, buat objeknya dengan <code>unique_ptr</code> <strong>di dalam blok kurung kurawal</strong>, lalu cetak <code>Selesai</code> setelah blok itu.</p><pre>Berkas dibuka
Membaca isi
Berkas ditutup
Selesai</pre><p>Tidak ada satu pun <code>delete</code> yang kamu tulis.</p>`,
      starter: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Berkas {\npublic:\n    // constructor, destructor, dan method baca()\n    \n};\n\nint main() {\n    {\n        // Buat unique_ptr<Berkas> dengan make_unique, lalu panggil baca()\n        \n    }\n    cout << \"Selesai\";\n    return 0;\n}\n",
      expected: "Berkas dibuka\nMembaca isi\nBerkas ditutup\nSelesai",
      petunjuk: `<code>unique_ptr&lt;Berkas&gt; b = make_unique&lt;Berkas&gt;();</code> lalu <code>b-&gt;baca();</code>`
    },
    {
      judul: "Menghitung Pemilik",
      deskripsi: `<p>Buat <code>shared_ptr&lt;int&gt;</code> berisi <code>50</code>. Cetak jumlah pemiliknya, lalu di dalam blok buat salinan pointer-nya dan cetak lagi, lalu cetak sekali lagi setelah keluar blok.</p><pre>Pemilik: 1
Setelah dibagi: 2
Setelah keluar blok: 1</pre>`,
      starter: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main() {\n    // Buat shared_ptr<int> berisi 50 dengan make_shared\n    \n    cout << \"Pemilik: \" << a.use_count() << endl;\n    {\n        // Buat shared_ptr kedua dari a\n        \n        cout << \"Setelah dibagi: \" << a.use_count() << endl;\n    }\n    cout << \"Setelah keluar blok: \" << a.use_count();\n    return 0;\n}\n",
      expected: "Pemilik: 1\nSetelah dibagi: 2\nSetelah keluar blok: 1",
      petunjuk: `<code>shared_ptr&lt;int&gt; b = a;</code> — menyalin shared_ptr menambah hitungannya.`
    },
    {
      judul: "Tidak Ada yang Bocor",
      deskripsi: `<p>Buat class <code>Data</code> dengan atribut <code>id</code>, constructor mencetak <code>Data &lt;id&gt; dibuat</code>, dan destructor mencetak <code>Data &lt;id&gt; dibebaskan</code>. Keduanya diikuti pindah baris.</p><p>Baca <code>n</code>, lalu dalam perulangan buat objeknya dengan <code>unique_ptr</code> untuk id 1 sampai n. Akhiri dengan <code>Tidak ada kebocoran</code>.</p><p>Untuk input <code>3</code>:</p><pre>Data 1 dibuat
Data 1 dibebaskan
Data 2 dibuat
Data 2 dibebaskan
Data 3 dibuat
Data 3 dibebaskan
Tidak ada kebocoran</pre>`,
      starter: "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Data {\n    int id;\npublic:\n    // constructor Data(int) dan destructor\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // Buat unique_ptr<Data> di sini\n        \n    }\n    cout << \"Tidak ada kebocoran\";\n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Data 1 dibuat\nData 1 dibebaskan\nData 2 dibuat\nData 2 dibebaskan\nData 3 dibuat\nData 3 dibebaskan\nTidak ada kebocoran",
      petunjuk: `Tiap putaran objeknya dibuat dan dibebaskan sendiri, tanpa <code>delete</code>.`
    },
    {
      judul: "Vector Berisi Smart Pointer",
      deskripsi: `<p>Gabungkan semuanya: buat class abstract <code>Hewan</code> dengan pure virtual <code>suara()</code> dan <strong>virtual destructor</strong> yang mencetak <code>(dibebaskan)</code> lalu pindah baris. Buat <code>Anjing</code> (<code>Guk </code>) dan <code>Kucing</code> (<code>Meong </code>) &mdash; perhatikan ada spasi di akhir.</p><p>Simpan keduanya dalam <code>vector&lt;unique_ptr&lt;Hewan&gt;&gt;</code>, panggil suaranya, lalu pindah baris.</p><pre>Guk Meong
(dibebaskan)
(dibebaskan)</pre>`,
      starter: "#include <iostream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // pure virtual suara() dan virtual destructor\n    \n};\n\n// Buat Anjing dan Kucing\n\nint main() {\n    vector<unique_ptr<Hewan>> d;\n    d.push_back(make_unique<Anjing>());\n    d.push_back(make_unique<Kucing>());\n    for (auto& h : d) h->suara();\n    cout << endl;\n    return 0;\n}\n",
      expected: "Guk Meong\n(dibebaskan)\n(dibebaskan)",
      petunjuk: `Vector membersihkan isinya sendiri saat program berakhir — destructornya ikut jalan.`
    }
  ]
};
