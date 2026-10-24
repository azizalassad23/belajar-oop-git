/* =========================================================
   Pertemuan 15: Composition (Objek di dalam Objek)
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[15] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami hubungan <strong>"punya"</strong> (has-a) antar class.</li>
    <li>Menjadikan objek sebagai atribut dari class lain.</li>
    <li>Memahami urutan constructor dan destructor pada composition.</li>
  </ul>

  <h2>📖 Class yang Punya Class Lain</h2>
  <p>Sampai sekarang atribut kita berupa angka atau teks. Padahal atribut juga boleh berupa
     <strong>objek dari class lain</strong>. Inilah <strong>composition</strong>.</p>
  <pre><code>class Mesin {
public:
    int cc;
    void nyala() { cout &lt;&lt; "Mesin " &lt;&lt; cc &lt;&lt; " cc menyala"; }
};

class Motor {
public:
    Mesin mesin;        // Motor PUNYA sebuah Mesin
};

int main() {
    Motor m;
    m.mesin.cc = 150;   // titik dua kali: motor -> mesin -> cc
    m.mesin.nyala();
}</code></pre>
  <p>Perhatikan <code>m.mesin.cc</code> — titik pertama masuk ke objek mesin,
     titik kedua masuk ke atributnya.</p>

  <div class="callout">
    <strong>Analogi Motor dan Mesin 🏍️</strong>
    Motor <em>punya</em> mesin. Mesin bukan jenis motor, dan motor bukan jenis mesin —
    yang satu bagian dari yang lain. Bedakan dengan hubungan "adalah" (Motor <em>adalah</em>
    Kendaraan), yang nanti dipelajari sebagai <em>inheritance</em>.
  </div>

  <h2>🔄 Urutan Constructor dan Destructor</h2>
  <p>Bagian ini sering ditebak salah. Objek anggota <strong>dibangun lebih dulu</strong>
     sebelum objek pembungkusnya, dan <strong>dihapus paling belakang</strong>:</p>
  <pre><code>class Roda {
public:
    Roda()  { cout &lt;&lt; "Roda dipasang" &lt;&lt; endl; }
    ~Roda() { cout &lt;&lt; "Roda dilepas" &lt;&lt; endl; }
};

class Sepeda {
public:
    Roda roda;
    Sepeda()  { cout &lt;&lt; "Sepeda jadi" &lt;&lt; endl; }
    ~Sepeda() { cout &lt;&lt; "Sepeda dibongkar" &lt;&lt; endl; }
};

int main() { Sepeda s; }</code></pre>
  <p>Hasilnya:</p>
  <pre>Roda dipasang
Sepeda jadi
Sepeda dibongkar
Roda dilepas</pre>
  <p>Masuk akal kalau dipikir: rodanya harus siap dulu sebelum sepedanya bisa dirakit,
     dan saat dibongkar, sepedanya dulu yang dilepas baru rodanya diambil.</p>

  <div class="callout tip">
    <strong>💡 Tetap Hormati Encapsulation</strong>
    Kalau atribut objek dalam bersifat <code>private</code>, kamu tetap harus lewat
    getter/setter-nya: <code>b.harga.setNilai(5000)</code>, bukan <code>b.harga.nilai = 5000</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Composition = hubungan <strong>"punya"</strong>: satu class memuat objek class lain.</li>
    <li>Aksesnya bertingkat dengan titik: <code>luar.dalam.anggota</code>.</li>
    <li>Objek anggota dibangun duluan, dihapus paling belakang.</li>
    <li>Aturan <code>private</code> pada objek dalam tetap berlaku.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Motor Punya Mesin",
      deskripsi: `<p>Buat class <code>Mesin</code> dengan atribut <code>cc</code> dan method <code>nyala()</code> yang mencetak <code>Mesin &lt;cc&gt; cc menyala</code>. Lalu buat class <code>Motor</code> yang <strong>punya</strong> sebuah objek <code>Mesin</code>.</p><p>Untuk input <code>150</code>:</p><pre>Mesin 150 cc menyala</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Mesin {\npublic:\n    int cc;\n    // Buat method nyala()\n    \n};\n\nclass Motor {\npublic:\n    // Jadikan Mesin sebagai atribut di sini\n    \n};\n\nint main() {\n    int c;\n    cin >> c;\n    Motor m;\n    // Isi cc lewat objek mesin, lalu panggil nyala()\n    \n    return 0;\n}\n",
      stdin: "150\n",
      expected: "Mesin 150 cc menyala",
      uji: [{stdin: "125\n", h: "8aa14136563cfb9f9fb500c448e5f7c6e78776de328bf02665316adb4d2299f4"}, {stdin: "250\n", h: "45eb26fcb161b74f5787a99520a82ff65be50e7dfe1ce6e4061b5ce0a20d4c2e"}],
      petunjuk: `Aksesnya bertingkat: <code>m.mesin.cc = c;</code> lalu <code>m.mesin.nyala();</code>`
    },
    {
      judul: "Siswa Punya Alamat",
      deskripsi: `<p>Buat class <code>Alamat</code> dengan atribut <code>kota</code>. Lalu class <code>Siswa</code> dengan atribut <code>nama</code> dan sebuah objek <code>Alamat</code>, serta method <code>info()</code>.</p><p>Untuk input <code>Andi Bandung</code>:</p><pre>Andi tinggal di Bandung</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Alamat {\npublic:\n    string kota;\n};\n\nclass Siswa {\npublic:\n    string nama;\n    // Jadikan Alamat sebagai atribut, lalu buat info()\n    \n};\n\nint main() {\n    string n, k;\n    cin >> n >> k;\n    Siswa s;\n    // Isi nama dan kota, lalu panggil info()\n    \n    return 0;\n}\n",
      stdin: "Andi Bandung\n",
      expected: "Andi tinggal di Bandung",
      uji: [{stdin: "Sari Surabaya\n", h: "efa32103d74dd11ec28d9198eaaa06d867745e13e406ed7a32e88755db86162e"}, {stdin: "Budi Medan\n", h: "d8de2586fbcc0da5d7cd0caa7eab896a245a1b1042992ea5ad132aaff3dc2810"}],
      petunjuk: `Di dalam <code>info()</code>, kota diakses dengan <code>alamat.kota</code>.`
    },
    {
      judul: "Urutan Merakit Sepeda",
      deskripsi: `<p>Buat class <code>Roda</code> (constructor mencetak <code>Roda dipasang</code>, destructor <code>Roda dilepas</code>) dan class <code>Sepeda</code> yang punya sebuah <code>Roda</code> (constructor <code>Sepeda jadi</code>, destructor <code>Sepeda dibongkar</code>). Semua diikuti pindah baris.</p><p>Buat satu objek <code>Sepeda</code> di <code>main()</code>. Perhatikan urutan hasilnya:</p><pre>Roda dipasang
Sepeda jadi
Sepeda dibongkar
Roda dilepas</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Roda {\npublic:\n    // Buat constructor dan destructor\n    \n};\n\nclass Sepeda {\npublic:\n    Roda roda;\n    // Buat constructor dan destructor\n    \n};\n\nint main() {\n    Sepeda s;\n    return 0;\n}\n",
      expected: "Roda dipasang\nSepeda jadi\nSepeda dibongkar\nRoda dilepas",
      petunjuk: `Kamu tidak mengatur urutannya sama sekali — C++ yang menentukan.`
    },
    {
      judul: "Barang Punya Harga",
      deskripsi: `<p>Buat class <code>Harga</code> dengan atribut <strong>private</strong> <code>nilai</code>, plus <code>setNilai(int)</code> dan <code>getNilai()</code>. Lalu class <code>Barang</code> yang punya objek <code>Harga</code> dan atribut <code>jumlah</code>, serta method <code>total()</code>.</p><p>Untuk input <code>5000 3</code>:</p><pre>Total: 15000</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Harga {\nprivate:\n    int nilai;\npublic:\n    // Buat setNilai(int) dan getNilai()\n    \n};\n\nclass Barang {\npublic:\n    Harga harga;\n    int jumlah;\n    // Buat method total()\n    \n};\n\nint main() {\n    int h, j;\n    cin >> h >> j;\n    Barang b;\n    b.harga.setNilai(h);\n    b.jumlah = j;\n    cout << \"Total: \" << b.total();\n    return 0;\n}\n",
      stdin: "5000 3\n",
      expected: "Total: 15000",
      uji: [{stdin: "12000 4\n", h: "331abcc965ebb149ecda166694dea9c0958f7956bbc4f9a0af26b8c56ac7cad2"}, {stdin: "2500 10\n", h: "a1033a407156efb719a0563e5eefa018e2ebaabed995f71f03200809639845b6"}],
      petunjuk: `Karena <code>nilai</code> private, <code>total()</code> harus lewat <code>harga.getNilai()</code>.`
    },
    {
      judul: "Komposisi Bertingkat",
      deskripsi: `<p>Objek boleh berlapis lebih dari dua tingkat. Buat <code>Jantung</code> dengan method <code>detak()</code> yang mencetak <code>berdetak</code>; <code>Tubuh</code> yang punya <code>Jantung</code>; dan <code>Manusia</code> yang punya <code>nama</code> dan <code>Tubuh</code>.</p><p>Method <code>periksa()</code> pada <code>Manusia</code> mencetak <code>Jantung &lt;nama&gt; </code> lalu memanggil <code>detak()</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Jantung Andi berdetak</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Jantung {\npublic:\n    // Buat method detak()\n    \n};\n\nclass Tubuh {\npublic:\n    // Jadikan Jantung sebagai atribut\n    \n};\n\nclass Manusia {\npublic:\n    string nama;\n    // Jadikan Tubuh sebagai atribut, lalu buat periksa()\n    \n};\n\nint main() {\n    string n;\n    cin >> n;\n    Manusia m;\n    m.nama = n;\n    m.periksa();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Jantung Andi berdetak",
      uji: [{stdin: "Sari\n", h: "7ac1bb340c92891761a217521d4401a0747da9fd2655054ddeaa2f16c7d12a2c"}, {stdin: "Budi\n", h: "aac80eb2b41eb9e17e851f80258f374eb06078371876840227fc278ac290f142"}],
      petunjuk: `Jalur aksesnya: <code>tubuh.jantung.detak()</code> — perhatikan spasi sebelum kata berdetak.`
    }
  ]
};
