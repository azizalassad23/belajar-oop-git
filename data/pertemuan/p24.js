/* =========================================================
   Pertemuan 24: Konsep Polymorphism
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[24] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami arti <strong>polymorphism</strong>: satu perintah, banyak wujud.</li>
    <li>Membedakan polymorphism saat <em>compile</em> dan saat <em>program berjalan</em>.</li>
    <li>Memakai pointer induk untuk memanggil perilaku anak.</li>
  </ul>

  <h2>📖 Satu Perintah, Banyak Wujud</h2>
  <p>Kata <em>polymorphism</em> berarti "banyak bentuk". Dalam OOP: satu nama perintah,
     tapi yang terjadi menyesuaikan objeknya.</p>
  <p>Ada dua jenis:</p>
  <ul>
    <li><strong>Saat compile</strong> — <em>overloading</em>. Compiler sudah tahu versi
        mana yang dipakai dari jumlah/tipe argumennya.</li>
    <li><strong>Saat program jalan</strong> — <em>overriding + virtual</em>. Baru
        ditentukan ketika program berjalan, berdasarkan objek aslinya.</li>
  </ul>

  <div class="callout">
    <strong>Analogi Kata "Bersuara" 🔊</strong>
    Kamu menyuruh sekelompok hewan "bersuara!". Perintahnya satu, tapi anjing menggonggong,
    kucing mengeong, sapi melenguh. Kamu tidak perlu tahu satu per satu jenisnya.
  </div>

  <h2>⚡ Kekuatannya: Pointer Induk</h2>
  <p>Inilah yang membuat polymorphism berguna. Pointer bertipe induk boleh menunjuk objek anak:</p>
  <pre><code>class Hewan { public: virtual void suara() { cout &lt;&lt; "..."; } };
class Anjing : public Hewan { public: void suara() { cout &lt;&lt; "Guk"; } };
class Kucing : public Hewan { public: void suara() { cout &lt;&lt; "Meong"; } };

int main() {
    Hewan* daftar[3] = { new Anjing(), new Kucing(), new Sapi() };
    for (int i = 0; i &lt; 3; i++) daftar[i]-&gt;suara();   // Guk Meong Moo
}</code></pre>
  <p>Satu array, satu perulangan, tiga perilaku berbeda. Menambah jenis hewan baru tidak
     perlu mengubah perulangannya sama sekali.</p>

  <div class="callout warn">
    <strong>⚠️ Tanpa <code>virtual</code>, Tidak Terjadi Apa-apa</strong>
    Kalau method induknya tidak ditandai <code>virtual</code>, pemanggilan lewat pointer
    atau reference induk akan menjalankan <strong>versi induk</strong>, bukan versi anak.
    Ini kesalahan yang sangat sering terjadi. Perhatikan bedanya:
    <br>&bull; tanpa virtual &rarr; <code>Memakai alat</code>
    <br>&bull; dengan virtual &rarr; <code>Memakai palu</code>
  </div>

  <div class="callout tip">
    <strong>💡 Satu Hal Lagi</strong>
    Mengirim objek <em>sebagai salinan</em> (<code>void f(Alat a)</code>) juga membuang
    identitas anaknya. Untuk polymorphism, pakai <strong>pointer</strong> (<code>Alat*</code>)
    atau <strong>reference</strong> (<code>Alat&amp;</code>).
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Polymorphism = satu perintah, wujud perilakunya menyesuaikan objek.</li>
    <li>Overloading terjadi saat compile; overriding + virtual saat program jalan.</li>
    <li>Pointer/reference induk boleh menunjuk objek anak.</li>
    <li>Tanpa <code>virtual</code>, yang jalan tetap versi induk.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Overloading: Wujud Saat Compile",
      deskripsi: `<p>Buat class <code>Hitung</code> dengan <strong>dua method bernama sama</strong> <code>luas()</code>: satu menerima satu argumen (sisi persegi), satu menerima dua argumen (panjang dan lebar).</p><p>Untuk input <code>4 5</code>:</p><pre>Satu argumen: 16
Dua argumen: 20</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hitung {\npublic:\n    // Buat dua method luas() dengan jumlah parameter berbeda\n    \n};\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    Hitung h;\n    cout << \"Satu argumen: \" << h.luas(a) << endl;\n    cout << \"Dua argumen: \" << h.luas(a, b);\n    return 0;\n}\n",
      stdin: "4 5\n",
      expected: "Satu argumen: 16\nDua argumen: 20",
      petunjuk: `Compiler memilih berdasarkan jumlah argumen — sudah pasti sebelum program jalan.`
    },
    {
      judul: "Pointer Induk, Perilaku Anak",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan method <strong><code>virtual</code></strong> <code>gambar()</code> yang mencetak <code>Bentuk umum</code>. Buat <code>Lingkaran</code> dan <code>Kotak</code> yang meng-override-nya.</p><p>Di <code>main()</code>, buat tiga pointer bertipe <code>Bentuk*</code> yang menunjuk objek berbeda.</p><pre>Bentuk umum
Lingkaran
Kotak</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // Buat method VIRTUAL gambar()\n    \n};\n\n// Buat Lingkaran dan Kotak yang meng-override gambar()\n\nint main() {\n    Bentuk* b1 = new Bentuk();\n    Bentuk* b2 = new Lingkaran();\n    Bentuk* b3 = new Kotak();\n    b1->gambar();\n    b2->gambar();\n    b3->gambar();\n    delete b1; delete b2; delete b3;\n    return 0;\n}\n",
      expected: "Bentuk umum\nLingkaran\nKotak",
      petunjuk: `Jangan lupa kata <code>virtual</code> di induk — tanpa itu ketiganya mencetak sama.`
    },
    {
      judul: "Satu Perulangan, Tiga Suara",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan method <strong>virtual</strong> <code>suara()</code>, lalu tiga anak: <code>Anjing</code> (<code>Guk</code>), <code>Kucing</code> (<code>Meong</code>), dan <code>Sapi</code> (<code>Moo</code>). Dua yang pertama diikuti pindah baris.</p><p>Simpan ketiganya dalam <strong>satu array pointer</strong> lalu panggil dalam perulangan.</p><pre>Guk
Meong
Moo</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // Buat method virtual suara()\n    \n};\n\n// Buat Anjing, Kucing, dan Sapi\n\nint main() {\n    Hewan* daftar[3] = { new Anjing(), new Kucing(), new Sapi() };\n    // Panggil suara() untuk tiap isi array\n    \n    for (int i = 0; i < 3; i++) delete daftar[i];\n    return 0;\n}\n",
      expected: "Guk\nMeong\nMoo",
      petunjuk: `Perulangannya tidak tahu jenis hewannya — dan memang tidak perlu tahu.`
    },
    {
      judul: "Ketika Salinan Membuang Identitas",
      deskripsi: `<p>Buat class <code>Alat</code> dengan method <code>pakai()</code> (<strong>tanpa</strong> virtual) yang mencetak <code>Memakai alat</code>, dan <code>Palu</code> yang meng-override-nya jadi <code>Memakai palu</code>. Keduanya diikuti pindah baris.</p><p>Buat fungsi <code>gunakan(Alat a)</code> yang menerima objek <strong>sebagai salinan</strong> lalu memanggil <code>pakai()</code>.</p><pre>Memakai palu
Memakai alat</pre><p>Baris kedua bukan salah ketik — objeknya kehilangan identitas Palu saat disalin.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Alat {\npublic:\n    // method pakai() TANPA virtual\n    \n};\n\n// Buat class Palu yang meng-override pakai()\n\n// Buat fungsi gunakan(Alat a)\n\nint main() {\n    Palu p;\n    p.pakai();\n    gunakan(p);\n    return 0;\n}\n",
      expected: "Memakai palu\nMemakai alat",
      petunjuk: `Fenomena ini disebut <em>object slicing</em> — bagian anaknya terpotong saat disalin.`
    },
    {
      judul: "Memperbaikinya dengan virtual + reference",
      deskripsi: `<p>Ulangi soal sebelumnya, tapi dengan dua perubahan: method <code>pakai()</code> di induk ditandai <strong><code>virtual</code></strong>, dan fungsinya menerima <strong>reference</strong>: <code>gunakan(Alat&amp; a)</code>.</p><pre>Memakai palu
Memakai palu</pre><p>Sekarang identitas Palu-nya bertahan.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Alat {\npublic:\n    // method pakai() DENGAN virtual\n    \n};\n\n// Buat class Palu yang meng-override pakai()\n\n// Buat fungsi gunakan(Alat& a)  <- pakai tanda &\n\nint main() {\n    Palu p;\n    p.pakai();\n    gunakan(p);\n    return 0;\n}\n",
      expected: "Memakai palu\nMemakai palu",
      petunjuk: `Dua syarat harus dipenuhi bersamaan: <code>virtual</code> dan reference (atau pointer).`
    }
  ]
};
