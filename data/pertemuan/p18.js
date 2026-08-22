/* =========================================================
   Pertemuan 18: Konsep Inheritance
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[18] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami hubungan <strong>"adalah"</strong> (is-a) antar class.</li>
    <li>Membuat class anak yang mewarisi class induk.</li>
    <li>Memakai atribut dan method warisan, serta menambah yang baru.</li>
  </ul>

  <h2>📖 Pewarisan: Hubungan "Adalah"</h2>
  <p>Di Pertemuan 15 kita belajar <em>composition</em>, hubungan <strong>"punya"</strong>:
     Motor <em>punya</em> Mesin. Sekarang hubungannya berbeda —
     <strong>"adalah"</strong>: Kucing <em>adalah</em> Hewan.</p>
  <p>Kalau Kucing adalah Hewan, maka semua yang bisa dilakukan Hewan otomatis bisa
     dilakukan Kucing. Itulah <strong>inheritance</strong>.</p>

  <pre><code>class Hewan {                      // class INDUK (base class)
public:
    void bernapas() { cout &lt;&lt; "Hewan bernapas" &lt;&lt; endl; }
};

class Kucing : public Hewan {      // class ANAK (derived class)
public:
    void mengeong() { cout &lt;&lt; "Kucing mengeong"; }
};

int main() {
    Kucing k;
    k.bernapas();     // warisan dari Hewan
    k.mengeong();     // milik Kucing sendiri
}</code></pre>
  <p>Perhatikan tanda titik dua: <code>class Kucing : public Hewan</code>. Itulah cara
     menyatakan "Kucing mewarisi Hewan".</p>

  <div class="callout">
    <strong>Analogi Silsilah Keluarga 👨‍👩‍👦</strong>
    Anak mewarisi ciri dari orang tuanya — dan tetap boleh punya ciri khasnya sendiri.
    Yang tidak berlaku: orang tua tidak ikut mewarisi apa pun dari anaknya. Pewarisan
    berjalan satu arah.
  </div>

  <h2>🧩 Membedakan "Punya" dan "Adalah"</h2>
  <p>Cara mudah mengujinya: susun jadi kalimat, lalu lihat mana yang masuk akal.</p>
  <ul>
    <li>"Mobil <strong>punya</strong> Mesin" — masuk akal → <em>composition</em>.</li>
    <li>"Mobil <strong>adalah</strong> Mesin" — janggal → bukan inheritance.</li>
    <li>"Kucing <strong>adalah</strong> Hewan" — masuk akal → <em>inheritance</em>.</li>
    <li>"Kucing <strong>punya</strong> Hewan" — janggal → bukan composition.</li>
  </ul>

  <h2>👨‍👩‍👧 Satu Induk, Banyak Anak</h2>
  <p>Satu class induk boleh diwarisi banyak class anak sekaligus:</p>
  <pre><code>class Anjing : public Hewan { };
class Kucing : public Hewan { };</code></pre>
  <p>Keduanya mendapat semua anggota <code>Hewan</code>, tapi masing-masing berdiri sendiri.</p>

  <div class="callout warn">
    <strong>⚠️ Anggota <code>private</code> Tidak Bisa Disentuh Anak</strong>
    Class anak mewarisi anggota private induknya, tapi <strong>tidak boleh mengaksesnya
    langsung</strong>. Untuk itu ada <code>protected</code>, yang dibahas di pertemuan berikutnya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Inheritance = hubungan <strong>"adalah"</strong>, berbeda dari composition yang "punya".</li>
    <li>Sintaksnya: <code>class Anak : public Induk { };</code></li>
    <li>Anak otomatis mendapat atribut dan method induknya.</li>
    <li>Anak boleh menambah anggotanya sendiri.</li>
    <li>Pewarisan searah: induk tidak mendapat apa pun dari anaknya.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Class Anak Pertama",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan method <code>bernapas()</code> yang mencetak <code>Hewan bernapas</code> lalu pindah baris. Buat class <code>Kucing</code> yang <strong>mewarisi</strong> <code>Hewan</code> dan punya method <code>mengeong()</code> yang mencetak <code>Kucing mengeong</code>.</p><pre>Hewan bernapas
Kucing mengeong</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // Buat method bernapas()\n    \n};\n\n// Buat class Kucing yang mewarisi Hewan, dengan method mengeong()\n\nint main() {\n    Kucing k;\n    k.bernapas();\n    k.mengeong();\n    return 0;\n}\n",
      expected: "Hewan bernapas\nKucing mengeong",
      petunjuk: `Sintaksnya: <code>class Kucing : public Hewan { ... };</code>`
    },
    {
      judul: "Mewarisi Atribut",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan atribut <code>nama</code> dan <code>kaki</code>. Buat class <code>Kucing</code> yang mewarisinya dan punya method <code>info()</code> yang memakai <strong>atribut warisan</strong> itu.</p><p>Untuk input <code>Bimo 4</code>:</p><pre>Bimo punya 4 kaki</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hewan {\npublic:\n    string nama;\n    int kaki;\n};\n\n// Buat class Kucing yang mewarisi Hewan, dengan method info()\n\nint main() {\n    string n;\n    int k;\n    cin >> n >> k;\n    Kucing c;\n    c.nama = n;\n    c.kaki = k;\n    c.info();\n    return 0;\n}\n",
      stdin: "Bimo 4\n",
      expected: "Bimo punya 4 kaki",
      petunjuk: `Di dalam <code>info()</code>, tulis <code>nama</code> dan <code>kaki</code> langsung — keduanya sudah jadi milik Kucing.`
    },
    {
      judul: "Mewarisi Method",
      deskripsi: `<p>Buat class <code>Kendaraan</code> dengan atribut <code>kecepatan</code> dan method <code>gas(int n)</code> yang menambah kecepatan. Buat class <code>Motor</code> yang mewarisinya dan punya method <code>tampil()</code>.</p><p>Kecepatan awal dibaca dari input, lalu <code>gas(20)</code> dipanggil. Untuk input <code>100</code>:</p><pre>Kecepatan: 120</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kendaraan {\npublic:\n    int kecepatan;\n    // Buat method gas(int n)\n    \n};\n\n// Buat class Motor yang mewarisi Kendaraan, dengan method tampil()\n\nint main() {\n    int n;\n    cin >> n;\n    Motor m;\n    m.kecepatan = n;\n    m.gas(20);\n    m.tampil();\n    return 0;\n}\n",
      stdin: "100\n",
      expected: "Kecepatan: 120",
      petunjuk: `Method <code>gas()</code> ditulis sekali di induk, tapi bisa dipakai objek Motor.`
    },
    {
      judul: "Anak Menambah Kemampuan",
      deskripsi: `<p>Buat class <code>Orang</code> dengan atribut <code>nama</code> dan method <code>perkenalan()</code> yang mencetak <code>Saya &lt;nama&gt;</code> lalu pindah baris. Buat class <code>Siswa</code> yang mewarisinya dan <strong>menambah</strong> method <code>belajar()</code> yang mencetak <code>&lt;nama&gt; sedang belajar OOP</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Saya Andi
Andi sedang belajar OOP</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Orang {\npublic:\n    string nama;\n    // Buat method perkenalan()\n    \n};\n\n// Buat class Siswa yang mewarisi Orang, dengan tambahan method belajar()\n\nint main() {\n    string n;\n    cin >> n;\n    Siswa s;\n    s.nama = n;\n    s.perkenalan();\n    s.belajar();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Saya Andi\nAndi sedang belajar OOP",
      petunjuk: `Method baru di anak tetap boleh memakai atribut warisan seperti <code>nama</code>.`
    },
    {
      judul: "Satu Induk, Dua Anak",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan atribut <code>suara</code> dan method <code>bersuara()</code> yang mencetak suaranya lalu pindah baris. Buat <strong>dua class anak</strong>: <code>Anjing</code> dan <code>Kucing</code>, keduanya mewarisi <code>Hewan</code> tanpa tambahan apa pun.</p><p>Untuk input <code>Guk Meong</code>:</p><pre>Guk
Meong</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hewan {\npublic:\n    string suara;\n    // Buat method bersuara()\n    \n};\n\n// Buat class Anjing dan Kucing yang keduanya mewarisi Hewan\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Anjing d;\n    Kucing c;\n    d.suara = a;\n    c.suara = b;\n    d.bersuara();\n    c.bersuara();\n    return 0;\n}\n",
      stdin: "Guk Meong\n",
      expected: "Guk\nMeong",
      petunjuk: `Class anak yang tidak menambah apa pun cukup ditulis <code>class Anjing : public Hewan {};</code>`
    }
  ]
};
