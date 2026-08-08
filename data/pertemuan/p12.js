/* =========================================================
   Pertemuan 12: Keyword this
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[12] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami apa yang ditunjuk oleh <code>this</code>.</li>
    <li>Memakai <code>this</code> saat nama parameter sama dengan nama atribut.</li>
    <li>Mengembalikan <code>*this</code> agar method bisa dirangkai.</li>
  </ul>

  <h2>📖 Apa itu <code>this</code>?</h2>
  <p><code>this</code> adalah <strong>pointer ke objek yang sedang menjalankan method itu</strong>.
     Saat kamu memanggil <code>andi.tampil()</code>, di dalam <code>tampil()</code> nilai
     <code>this</code> menunjuk ke objek <code>andi</code>.</p>

  <div class="callout">
    <strong>Analogi Kata "Saya" 🗣️</strong>
    Kalau Andi berkata "nama saya", kata <em>saya</em> berarti Andi. Kalau Sari yang berkata,
    kata yang sama berarti Sari. <code>this</code> bekerja persis begitu — artinya berubah
    tergantung siapa yang sedang berbicara.
  </div>

  <h2>⚡ Masalah Nama Kembar</h2>
  <p>Inilah alasan <code>this</code> paling sering dipakai. Perhatikan kode yang <em>salah</em> ini:</p>
  <pre><code>class Persegi {
public:
    int sisi;
    void setSisi(int sisi) {
        sisi = sisi;      // SALAH! Keduanya menunjuk parameter,
    }                     // atribut objeknya tidak pernah berubah.
};</code></pre>
  <p>Parameter menutupi atribut yang namanya sama. Perbaikannya dengan <code>this</code>:</p>
  <pre><code>    void setSisi(int sisi) {
        this-&gt;sisi = sisi;   // kiri = atribut objek, kanan = parameter
    }</code></pre>
  <p>Karena <code>this</code> berupa pointer, anggotanya diakses dengan tanda panah
     <code>-&gt;</code>, bukan titik.</p>

  <h2>🔗 Merangkai Method dengan <code>*this</code></h2>
  <p>Kalau sebuah method mengembalikan objeknya sendiri, pemanggilannya bisa disambung:</p>
  <pre><code>class Kotak {
public:
    int panjang, lebar;

    Kotak&amp; setPanjang(int panjang) {
        this-&gt;panjang = panjang;
        return *this;            // kembalikan objek ini sendiri
    }
    Kotak&amp; setLebar(int lebar) {
        this-&gt;lebar = lebar;
        return *this;
    }
    int luas() { return panjang * lebar; }
};

int main() {
    Kotak k;
    k.setPanjang(5).setLebar(3);   // dirangkai jadi satu baris
    cout &lt;&lt; k.luas();              // 15
}</code></pre>
  <p>Perhatikan bedanya: <code>this</code> adalah <em>pointer</em>-nya, sedangkan
     <code>*this</code> adalah <em>objeknya</em>. Tipe kembaliannya <code>Kotak&amp;</code>
     dengan tanda <code>&amp;</code>, artinya objek yang sama dikembalikan — bukan salinannya.</p>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Umum</strong>
    Menulis <code>this.sisi</code> akan error. <code>this</code> itu pointer, jadi harus
    <code>this-&gt;sisi</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>this</code> menunjuk objek yang sedang menjalankan method.</li>
    <li>Diakses dengan panah <code>-&gt;</code> karena berupa pointer.</li>
    <li>Wajib dipakai saat nama parameter sama dengan nama atribut.</li>
    <li><code>return *this;</code> membuat method bisa dirangkai.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Menggunakan this",
      deskripsi: `<p>Buat class <code>Persegi</code> dengan atribut <code>sisi</code> dan method <code>setSisi(int sisi)</code> — <strong>nama parameternya sengaja dibuat sama</strong> dengan nama atributnya. Pakai <code>this</code> supaya nilainya benar-benar tersimpan. Tambahkan juga method <code>luas()</code>.</p><p>Untuk input <code>6</code>:</p><pre>Luas: 36</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    // Buat setSisi(int sisi) memakai this, dan luas()\n    \n};\n\nint main() {\n    Persegi p;\n    int s;\n    cin >> s;\n    p.setSisi(s);\n    cout << \"Luas: \" << p.luas();\n    return 0;\n}\n",
      stdin: "6\n",
      expected: "Luas: 36",
      petunjuk: `<code>this-&gt;sisi = sisi;</code> — kiri atribut objek, kanan parameter.`
    },
    {
      judul: "this untuk Nama",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <code>nama</code>, method <code>setNama(string nama)</code> yang memakai <code>this</code>, dan method <code>tampil()</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Nama: Andi</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    // Buat setNama(string nama) memakai this, dan tampil()\n    \n};\n\nint main() {\n    Siswa s;\n    string n;\n    cin >> n;\n    s.setNama(n);\n    s.tampil();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Nama: Andi",
      petunjuk: `Di dalam <code>tampil()</code> kamu boleh menulis <code>this-&gt;nama</code> atau <code>nama</code> saja.`
    },
    {
      judul: "Method Berantai",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan atribut <code>panjang</code> dan <code>lebar</code>. Buat <code>setPanjang()</code> dan <code>setLebar()</code> yang mengembalikan <code>Kotak&amp;</code> supaya bisa <strong>dirangkai</strong>, lalu method <code>luas()</code>.</p><p>Untuk input <code>5 3</code>:</p><pre>Luas: 15</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    int panjang, lebar;\n    // Buat setPanjang() & setLebar() yang mengembalikan Kotak&,\n    // lalu luas()\n    \n};\n\nint main() {\n    Kotak k;\n    int p, l;\n    cin >> p >> l;\n    k.setPanjang(p).setLebar(l);\n    cout << \"Luas: \" << k.luas();\n    return 0;\n}\n",
      stdin: "5 3\n",
      expected: "Luas: 15",
      petunjuk: `Tipe kembaliannya <code>Kotak&amp;</code> dan barisnya diakhiri <code>return *this;</code>`
    },
    {
      judul: "Dua Objek, Satu this",
      deskripsi: `<p>Buat class <code>Siswa</code> yang constructornya <code>Siswa(string nama)</code> memakai <code>this</code>, dan method <code>perkenalan()</code> yang mencetak <code>Saya &lt;nama&gt;</code> diikuti pindah baris.</p><p>Untuk input <code>Andi Sari</code>:</p><pre>Saya Andi
Saya Sari</pre><p>Method yang sama menghasilkan nama berbeda — karena <code>this</code> menunjuk objek yang berbeda.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    // Buat constructor Siswa(string nama) memakai this,\n    // dan perkenalan()\n    \n};\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Siswa s1(a), s2(b);\n    s1.perkenalan();\n    s2.perkenalan();\n    return 0;\n}\n",
      stdin: "Andi Sari\n",
      expected: "Saya Andi\nSaya Sari",
      petunjuk: `Constructor juga boleh memakai <code>this-&gt;nama = nama;</code>`
    },
    {
      judul: "Penghitung Berantai",
      deskripsi: `<p>Buat class <code>Penghitung</code> dengan atribut <code>nilai</code>. Buat <code>mulai(int nilai)</code> dan <code>naik()</code> yang keduanya mengembalikan <code>Penghitung&amp;</code>, serta <code>hasil()</code>.</p><p>Baca nilai awal, lalu rangkai: <code>mulai(awal).naik().naik().naik()</code> — naik tiga kali.</p><p>Untuk input <code>10</code>:</p><pre>Hitungan: 13</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Penghitung {\npublic:\n    int nilai;\n    // Buat mulai(int nilai) & naik() yang mengembalikan Penghitung&,\n    // lalu hasil()\n    \n};\n\nint main() {\n    Penghitung c;\n    int awal;\n    cin >> awal;\n    c.mulai(awal).naik().naik().naik();\n    cout << \"Hitungan: \" << c.hasil();\n    return 0;\n}\n",
      stdin: "10\n",
      expected: "Hitungan: 13",
      petunjuk: `Tiap method diakhiri <code>return *this;</code> supaya bisa disambung method berikutnya.`
    }
  ]
};
