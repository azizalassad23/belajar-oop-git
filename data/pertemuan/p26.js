/* =========================================================
   Pertemuan 26: Virtual Function & Dynamic Binding
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[26] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami cara kerja kata kunci <code>virtual</code>.</li>
    <li>Membedakan <strong>static binding</strong> dan <strong>dynamic binding</strong>.</li>
    <li>Memakai pointer induk untuk mengelola banyak objek anak.</li>
  </ul>

  <h2>📖 Binding: Kapan Versi Method Ditentukan?</h2>
  <p><em>Binding</em> adalah proses menentukan method mana yang akan dijalankan.</p>
  <ul>
    <li><strong>Static binding</strong> — ditentukan saat <em>compile</em>, berdasarkan
        <strong>tipe pointer</strong>-nya. Ini yang terjadi tanpa <code>virtual</code>.</li>
    <li><strong>Dynamic binding</strong> — ditentukan saat <em>program berjalan</em>,
        berdasarkan <strong>objek aslinya</strong>. Ini yang terjadi dengan <code>virtual</code>.</li>
  </ul>

  <pre><code>Hewan* a = new Kucing();      // pointer Hewan, objek asli Kucing

// tanpa virtual  -> "Suara hewan"   (ikut tipe pointer)
// dengan virtual -> "Meong"         (ikut objek asli)
a-&gt;suara();</code></pre>

  <div class="callout">
    <strong>Analogi Amplop dan Isinya ✉️</strong>
    Pointer adalah amplopnya, objek adalah suratnya. Tanpa <code>virtual</code>, C++ hanya
    membaca tulisan di amplop. Dengan <code>virtual</code>, ia membuka dan membaca isinya.
  </div>

  <h2>🔑 Aturan Penulisan</h2>
  <ul>
    <li>Kata <code>virtual</code> ditulis <strong>di induk</strong>, cukup sekali.</li>
    <li>Class anak otomatis ikut virtual, tidak perlu ditulis lagi (boleh, untuk kejelasan).</li>
    <li>Boleh menambahkan <code>override</code> di anak agar compiler memeriksa
        ejaanmu: <code>void suara() override { ... }</code></li>
  </ul>

  <h2>💪 Kekuatannya di Program Nyata</h2>
  <pre><code>void jalankan(Karyawan* k) { k-&gt;tugas(); }   // satu fungsi

int main() {
    Guru g; Sopir s;
    jalankan(&amp;g);    // Mengajar
    jalankan(&amp;s);    // Menyetir
}</code></pre>
  <p>Fungsi <code>jalankan()</code> tidak perlu tahu ada jenis karyawan apa saja. Menambah
     jenis baru besok pun, fungsi ini tidak perlu diubah sebaris pun.</p>

  <div class="callout warn">
    <strong>⚠️ Biaya Kecilnya</strong>
    Method virtual sedikit lebih lambat karena harus dicek saat program jalan, dan objeknya
    sedikit lebih besar. Untuk program biasa perbedaannya tidak terasa &mdash; jangan
    menghindari <code>virtual</code> karena alasan ini.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>virtual</code> mengaktifkan dynamic binding.</li>
    <li>Tanpa virtual: yang dilihat tipe pointer. Dengan virtual: objek aslinya.</li>
    <li>Ditulis di induk; anak otomatis mengikuti.</li>
    <li>Memungkinkan satu fungsi melayani semua jenis turunan.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Virtual Pertama",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan method <strong><code>virtual</code></strong> <code>suara()</code> yang mencetak <code>Suara hewan</code>, dan class <code>Kucing</code> yang meng-override-nya jadi <code>Meong</code>.</p><p>Di <code>main()</code>, buat pointer bertipe <code>Hewan*</code> yang menunjuk objek <code>Kucing</code>.</p><pre>Meong</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // Buat method virtual suara()\n    \n};\n\n// Buat class Kucing yang meng-override suara()\n\nint main() {\n    Hewan* h = new Kucing();\n    h->suara();\n    delete h;\n    return 0;\n}\n",
      expected: "Meong",
      petunjuk: `Coba hapus kata <code>virtual</code>-nya — keluarannya berubah jadi <code>Suara hewan</code>.`
    },
    {
      judul: "Membandingkan Langsung",
      deskripsi: `<p>Buat <strong>dua pasang</strong> class untuk membandingkan. Pasangan pertama tanpa virtual: <code>Hewan</code> &rarr; <code>Kucing</code>. Pasangan kedua dengan virtual: <code>HewanV</code> &rarr; <code>KucingV</code>. Semua mencetak <code>Suara hewan</code> atau <code>Meong</code>.</p><pre>Tanpa virtual: Suara hewan
Dengan virtual: Meong</pre><p>Kode yang sama persis, hasilnya berbeda hanya karena satu kata.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Pasangan TANPA virtual\nclass Hewan {\npublic:\n    void suara() { cout << \"Suara hewan\" << endl; }\n};\n\n// class Kucing : public Hewan, override suara() jadi Meong\n\n// Pasangan DENGAN virtual\nclass HewanV {\npublic:\n    virtual void suara() { cout << \"Suara hewan\" << endl; }\n};\n\n// class KucingV : public HewanV, override suara() jadi Meong\n\nint main() {\n    Hewan* a = new Kucing();\n    HewanV* b = new KucingV();\n    cout << \"Tanpa virtual: \"; a->suara();\n    cout << \"Dengan virtual: \"; b->suara();\n    delete a; delete b;\n    return 0;\n}\n",
      expected: "Tanpa virtual: Suara hewan\nDengan virtual: Meong",
      petunjuk: `Versi KucingV mencetak Meong tanpa <code>endl</code> karena ia yang terakhir.`
    },
    {
      judul: "Menghitung Luas Beragam Bentuk",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan method <strong>virtual</strong> <code>luas()</code> yang mengembalikan 0. Buat <code>Persegi</code> (constructor satu parameter) dan <code>Kotak</code> (constructor dua parameter), keduanya meng-override <code>luas()</code>.</p><p>Simpan dalam array <code>Bentuk*</code> lalu cetak luas keduanya.</p><p>Untuk input <code>5 3</code>:</p><pre>Luas: 25
Luas: 15</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // method virtual luas() yang mengembalikan 0\n    \n};\n\n// class Persegi : constructor Persegi(int), override luas()\n\n// class Kotak : constructor Kotak(int,int), override luas()\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    Bentuk* d[2] = { new Persegi(a), new Kotak(a, b) };\n    for (int i = 0; i < 2; i++) cout << \"Luas: \" << d[i]->luas() << endl;\n    for (int i = 0; i < 2; i++) delete d[i];\n    return 0;\n}\n",
      stdin: "5 3\n",
      expected: "Luas: 25\nLuas: 15",
      petunjuk: `Perulangannya sama untuk kedua bentuk — rumusnya yang menyesuaikan sendiri.`
    },
    {
      judul: "Satu Fungsi untuk Semua",
      deskripsi: `<p>Buat class <code>Karyawan</code> dengan method <strong>virtual</strong> <code>tugas()</code> (<code>Bekerja umum</code>), lalu <code>Guru</code> (<code>Mengajar</code>) dan <code>Sopir</code> (<code>Menyetir</code>). Dua yang pertama diikuti pindah baris.</p><p>Buat <strong>satu fungsi</strong> <code>jalankan(Karyawan* k)</code> yang dipakai untuk ketiganya.</p><pre>Bekerja umum
Mengajar
Menyetir</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Karyawan {\npublic:\n    // method virtual tugas()\n    \n};\n\n// Buat class Guru dan Sopir\n\n// Buat fungsi jalankan(Karyawan* k)\n\nint main() {\n    Guru g;\n    Sopir s;\n    Karyawan k;\n    jalankan(&k);\n    jalankan(&g);\n    jalankan(&s);\n    return 0;\n}\n",
      expected: "Bekerja umum\nMengajar\nMenyetir",
      petunjuk: `Tanda <code>&amp;</code> di <code>jalankan(&amp;g)</code> berarti mengirim alamat objeknya.`
    },
    {
      judul: "Gaji dengan Tunjangan",
      deskripsi: `<p>Buat class <code>Pegawai</code> dengan atribut <strong>protected</strong> <code>gaji</code>, constructor <code>Pegawai(int)</code>, dan method <strong>virtual</strong> <code>total()</code> yang mengembalikan gaji apa adanya. Buat <code>Manager</code> yang meng-override <code>total()</code> menjadi gaji ditambah setengahnya.</p><p>Untuk input <code>1000</code>:</p><pre>Pegawai: 1000
Manager: 1500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Pegawai {\nprotected:\n    int gaji;\npublic:\n    Pegawai(int g) { gaji = g; }\n    // method virtual total()\n    \n};\n\n// class Manager : mewarisi Pegawai, override total()\n\nint main() {\n    int g;\n    cin >> g;\n    Pegawai* a = new Pegawai(g);\n    Pegawai* b = new Manager(g);\n    cout << \"Pegawai: \" << a->total() << endl;\n    cout << \"Manager: \" << b->total();\n    delete a; delete b;\n    return 0;\n}\n",
      stdin: "1000\n",
      expected: "Pegawai: 1000\nManager: 1500",
      petunjuk: `Constructor Manager harus mengirim gaji ke induk: <code>Manager(int g) : Pegawai(g) {}</code>`
    }
  ]
};
