/* =========================================================
   Pertemuan 27: Pure Virtual & Abstract Class
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[27] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membuat <strong>pure virtual function</strong>.</li>
    <li>Memahami apa itu <strong>abstract class</strong> dan kenapa tidak bisa dijadikan objek.</li>
    <li>Menggabungkan method wajib dan method biasa dalam satu class.</li>
  </ul>

  <h2>📖 Method yang Wajib Diisi Anak</h2>
  <p>Kadang class induk tahu <em>apa</em> yang harus bisa dilakukan turunannya, tapi tidak
     tahu <em>bagaimana</em> caranya. Apa isi <code>luas()</code> untuk "Bentuk" secara umum?
     Tidak ada jawabannya.</p>
  <p>Untuk itu ada <strong>pure virtual function</strong> &mdash; method tanpa isi, ditandai
     <code>= 0</code>:</p>
  <pre><code>class Bentuk {
public:
    virtual int luas() = 0;      // tanpa isi, WAJIB diisi anak
};</code></pre>

  <p>Class yang punya minimal satu pure virtual disebut <strong>abstract class</strong>.
     Ia <strong>tidak bisa dijadikan objek</strong>:</p>
  <pre><code>Bentuk b;              // ERROR: Bentuk itu abstract
Bentuk* p = new Persegi(5);   // BOLEH: pointer ke turunannya</code></pre>

  <div class="callout">
    <strong>Analogi Formulir Kosong 📋</strong>
    Abstract class itu seperti formulir pendaftaran: ia menentukan kolom apa saja yang wajib
    diisi, tapi formulir kosong itu sendiri bukan data siapa pun. Yang bernilai adalah
    formulir yang sudah diisi &mdash; yaitu class turunannya.
  </div>

  <h2>🧩 Boleh Dicampur dengan Method Biasa</h2>
  <p>Abstract class tetap boleh punya atribut dan method biasa yang sudah ada isinya:</p>
  <pre><code>class Pegawai {
protected:
    string nama;
public:
    Pegawai(string n) { nama = n; }
    void absen() { cout &lt;&lt; nama &lt;&lt; " hadir"; }   // sudah ada isinya
    virtual void tugas() = 0;                     // wajib diisi anak
};</code></pre>
  <p>Ini pola yang sangat berguna: bagian yang sama ditulis sekali di induk, bagian yang
     berbeda diwajibkan pada tiap anak.</p>

  <div class="callout warn">
    <strong>⚠️ Anak Wajib Mengisi Semuanya</strong>
    Kalau class anak tidak mengisi <em>semua</em> pure virtual milik induknya, anak itu
    ikut menjadi abstract dan juga tidak bisa dijadikan objek.
  </div>

  <div class="callout tip">
    <strong>💡 Selalu Sertakan Virtual Destructor</strong>
    Abstract class hampir selalu dipakai lewat pointer. Karena itu tambahkan
    <code>virtual ~NamaClass() {}</code> agar objeknya terhapus dengan benar &mdash;
    alasannya dibahas di Pertemuan 29.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Pure virtual: <code>virtual tipe nama() = 0;</code> &mdash; tanpa isi.</li>
    <li>Class dengan pure virtual = abstract, tidak bisa dijadikan objek.</li>
    <li>Dipakai lewat pointer/reference ke turunannya.</li>
    <li>Boleh dicampur dengan atribut dan method biasa.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Abstract Class Pertama",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan <strong>pure virtual</strong> <code>gambar()</code>, lalu class <code>Lingkaran</code> yang mengisinya dengan mencetak <code>Menggambar lingkaran</code>.</p><pre>Menggambar lingkaran</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // Buat pure virtual gambar()  -> pakai = 0\n    \n};\n\n// Buat class Lingkaran yang mengisi gambar()\n\nint main() {\n    Lingkaran l;\n    l.gambar();\n    return 0;\n}\n",
      expected: "Menggambar lingkaran",
      petunjuk: `<code>virtual void gambar() = 0;</code> — perhatikan <code>= 0</code> dan titik komanya.`
    },
    {
      judul: "Abstract Lewat Pointer",
      deskripsi: `<p>Buat class abstract <code>Bentuk</code> dengan pure virtual <code>luas()</code>, dan <code>Persegi</code> dengan constructor <code>Persegi(int)</code> yang mengisinya.</p><p>Di <code>main()</code>, buat pointer bertipe <code>Bentuk*</code> yang menunjuk objek <code>Persegi</code>.</p><p>Untuk input <code>6</code>:</p><pre>Luas: 36</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // pure virtual luas()\n    \n};\n\n// class Persegi : constructor Persegi(int), isi luas()\n\nint main() {\n    int s;\n    cin >> s;\n    Bentuk* b = new Persegi(s);\n    cout << \"Luas: \" << b->luas();\n    delete b;\n    return 0;\n}\n",
      stdin: "6\n",
      expected: "Luas: 36",
      petunjuk: `Menulis <code>Bentuk b;</code> akan error — abstract class tidak bisa dijadikan objek.`
    },
    {
      judul: "Tiga Turunan Wajib Mengisi",
      deskripsi: `<p>Buat class abstract <code>Hewan</code> dengan pure virtual <code>suara()</code>, lalu tiga turunan: <code>Anjing</code> (<code>Guk</code>), <code>Kucing</code> (<code>Meong</code>), dan <code>Sapi</code> (<code>Moo</code>). Dua yang pertama diikuti pindah baris.</p><p>Simpan dalam array <code>Hewan*</code> lalu panggil dalam perulangan.</p><pre>Guk
Meong
Moo</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // pure virtual suara()\n    \n};\n\n// Buat Anjing, Kucing, dan Sapi yang mengisi suara()\n\nint main() {\n    Hewan* d[3] = { new Anjing(), new Kucing(), new Sapi() };\n    for (int i = 0; i < 3; i++) d[i]->suara();\n    for (int i = 0; i < 3; i++) delete d[i];\n    return 0;\n}\n",
      expected: "Guk\nMeong\nMoo",
      petunjuk: `Kalau salah satu turunan lupa mengisi <code>suara()</code>, ia ikut jadi abstract dan error.`
    },
    {
      judul: "Mencampur Wajib dan Biasa",
      deskripsi: `<p>Buat class abstract <code>Pegawai</code> dengan atribut <strong>protected</strong> <code>nama</code>, constructor, method <strong>biasa</strong> <code>absen()</code> yang mencetak <code>&lt;nama&gt; hadir</code>, dan <strong>pure virtual</strong> <code>tugas()</code>.</p><p>Buat <code>Guru</code> yang mengisi <code>tugas()</code> jadi <code>&lt;nama&gt; mengajar</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Andi hadir
Andi mengajar</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Pegawai {\nprotected:\n    string nama;\npublic:\n    Pegawai(string n) { nama = n; }\n    // method biasa absen() dan pure virtual tugas()\n    \n};\n\n// class Guru : mewarisi Pegawai, isi tugas()\n\nint main() {\n    string n;\n    cin >> n;\n    Guru g(n);\n    g.absen();\n    g.tugas();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Andi hadir\nAndi mengajar",
      petunjuk: `Constructor Guru harus mengirim nama ke induk: <code>Guru(string n) : Pegawai(n) {}</code>`
    },
    {
      judul: "Dua Method Wajib",
      deskripsi: `<p>Buat class abstract <code>Bangun</code> dengan <strong>dua</strong> pure virtual: <code>luas()</code> dan <code>nama()</code>. Buat <code>Persegi</code> (satu parameter, mencetak <code>Persegi: </code>) dan <code>Kotak</code> (dua parameter, mencetak <code>Kotak: </code>).</p><p>Untuk input <code>4 5 3</code>:</p><pre>Persegi: 16
Kotak: 15</pre><p>Persegi dibuat dari angka pertama, Kotak dari dua angka berikutnya.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bangun {\npublic:\n    // dua pure virtual: luas() dan nama()\n    \n};\n\n// class Persegi : Persegi(int), isi luas() dan nama()\n\n// class Kotak : Kotak(int,int), isi luas() dan nama()\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    Bangun* d[2] = { new Persegi(a), new Kotak(b, c) };\n    for (int i = 0; i < 2; i++) {\n        d[i]->nama();\n        cout << d[i]->luas() << endl;\n    }\n    for (int i = 0; i < 2; i++) delete d[i];\n    return 0;\n}\n",
      stdin: "4 5 3\n",
      expected: "Persegi: 16\nKotak: 15",
      petunjuk: `Method <code>nama()</code> mencetak tanpa pindah baris supaya angkanya menyambung.`
    }
  ]
};
