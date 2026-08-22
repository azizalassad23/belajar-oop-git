/* =========================================================
   Pertemuan 20: Constructor & Destructor pada Inheritance
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[20] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami <strong>urutan</strong> constructor dan destructor pada pewarisan.</li>
    <li>Mengirim nilai ke constructor induk lewat <em>initializer list</em>.</li>
    <li>Memahami urutan pada pewarisan bertingkat dan gabungan dengan composition.</li>
  </ul>

  <h2>📖 Siapa Duluan?</h2>
  <p>Saat objek anak dibuat, <strong>constructor induk selalu jalan lebih dulu</strong>.
     Saat dihapus, urutannya justru dibalik.</p>
  <pre><code>class Induk {
public:
    Induk()  { cout &lt;&lt; "Induk dibuat" &lt;&lt; endl; }
    ~Induk() { cout &lt;&lt; "Induk dihapus" &lt;&lt; endl; }
};
class Anak : public Induk {
public:
    Anak()  { cout &lt;&lt; "Anak dibuat" &lt;&lt; endl; }
    ~Anak() { cout &lt;&lt; "Anak dihapus" &lt;&lt; endl; }
};

int main() { Anak a; }</code></pre>
  <p>Hasilnya:</p>
  <pre>Induk dibuat
Anak dibuat
Anak dihapus
Induk dihapus</pre>

  <div class="callout">
    <strong>Analogi Membangun Rumah 🏠</strong>
    Fondasi dicor dulu, baru dindingnya berdiri. Saat dibongkar, dindingnya dirobohkan
    dulu, fondasinya paling akhir. Induk adalah fondasinya.
  </div>

  <h2>🎁 Mengirim Nilai ke Constructor Induk</h2>
  <p>Kalau constructor induk butuh parameter, anak harus mengirimnya lewat
     <strong>initializer list</strong> — bagian setelah tanda titik dua:</p>
  <pre><code>class Hewan {
public:
    string nama;
    Hewan(string n) { nama = n; }
};

class Kucing : public Hewan {
public:
    Kucing(string n) : Hewan(n) {      // kirim n ke constructor Hewan
        cout &lt;&lt; "Kucing " &lt;&lt; nama &lt;&lt; " siap";
    }
};</code></pre>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Umum</strong>
    Menulis <code>Kucing(string n) { nama = n; }</code> tanpa <code>: Hewan(n)</code> akan
    error kalau <code>Hewan</code> tidak punya constructor tanpa parameter. C++ butuh tahu
    cara membangun bagian induknya <em>sebelum</em> badan constructor anak dijalankan.
  </div>

  <h2>🪜 Pewarisan Bertingkat</h2>
  <p>Kalau C mewarisi B, dan B mewarisi A, urutannya mengikuti pola yang sama —
     dari paling atas ke bawah, lalu dibalik saat dihapus:</p>
  <pre>A
B
C
~C
~B
~A</pre>

  <h2>🔗 Digabung dengan Composition</h2>
  <p>Kalau sebuah class mewarisi induk <em>dan</em> punya objek anggota, urutannya:
     <strong>induk dulu, baru objek anggota, baru badan constructor sendiri</strong>.</p>
  <pre><code>class Mobil : public Kendaraan {
public:
    Mesin mesin;
    Mobil() { cout &lt;&lt; "Mobil jadi" &lt;&lt; endl; }
};</code></pre>
  <pre>Kendaraan dibuat
Mesin siap
Mobil jadi</pre>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Constructor: induk dulu, lalu objek anggota, lalu anak.</li>
    <li>Destructor: urutan kebalikannya.</li>
    <li>Nilai dikirim ke induk lewat <code>: Induk(nilai)</code> setelah nama constructor.</li>
    <li>Pada pewarisan bertingkat, polanya berlaku berulang dari atas ke bawah.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Urutan Induk dan Anak",
      deskripsi: `<p>Buat class <code>Induk</code> dan <code>Anak</code>, masing-masing dengan constructor dan destructor yang mencetak <code>Induk dibuat</code>, <code>Induk dihapus</code>, <code>Anak dibuat</code>, <code>Anak dihapus</code>, semuanya diikuti pindah baris.</p><p>Buat satu objek <code>Anak</code>. Perhatikan urutan hasilnya:</p><pre>Induk dibuat
Anak dibuat
Anak dihapus
Induk dihapus</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\npublic:\n    // Buat constructor dan destructor\n    \n};\n\n// Buat class Anak yang mewarisi Induk, dengan constructor & destructor\n\nint main() {\n    Anak a;\n    return 0;\n}\n",
      expected: "Induk dibuat\nAnak dibuat\nAnak dihapus\nInduk dihapus",
      petunjuk: `Kamu tidak memanggil constructor induk sama sekali — C++ yang menjalankannya duluan.`
    },
    {
      judul: "Mengirim Nilai ke Induk",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan atribut <code>nama</code> dan constructor <code>Hewan(string n)</code> yang mencetak <code>Hewan &lt;nama&gt; lahir</code> lalu pindah baris.</p><p>Buat class <code>Kucing</code> yang mewarisinya, dengan constructor <code>Kucing(string n)</code> yang <strong>mengirim n ke constructor Hewan</strong> lalu mencetak <code>Kucing &lt;nama&gt; siap</code>.</p><p>Untuk input <code>Bimo</code>:</p><pre>Hewan Bimo lahir
Kucing Bimo siap</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hewan {\npublic:\n    string nama;\n    // Buat constructor Hewan(string n)\n    \n};\n\n// Buat class Kucing yang mewarisi Hewan.\n// Constructornya harus mengirim n ke Hewan lewat : Hewan(n)\n\nint main() {\n    string n;\n    cin >> n;\n    Kucing k(n);\n    return 0;\n}\n",
      stdin: "Bimo\n",
      expected: "Hewan Bimo lahir\nKucing Bimo siap",
      petunjuk: `Bentuknya: <code>Kucing(string n) : Hewan(n) { ... }</code>`
    },
    {
      judul: "Pewarisan Bertingkat",
      deskripsi: `<p>Buat tiga class berantai: <code>A</code>, lalu <code>B</code> yang mewarisi <code>A</code>, lalu <code>C</code> yang mewarisi <code>B</code>. Constructor masing-masing mencetak <code>A</code>, <code>B</code>, <code>C</code>; destructornya mencetak <code>~A</code>, <code>~B</code>, <code>~C</code>. Semua diikuti pindah baris.</p><p>Buat satu objek <code>C</code>:</p><pre>A
B
C
~C
~B
~A</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass A {\npublic:\n    // constructor & destructor A\n    \n};\n\n// Buat class B yang mewarisi A\n\n// Buat class C yang mewarisi B\n\nint main() {\n    C c;\n    return 0;\n}\n",
      expected: "A\nB\nC\n~C\n~B\n~A",
      petunjuk: `Polanya berulang: yang paling atas dibangun duluan dan dibongkar paling akhir.`
    },
    {
      judul: "Kotak dari Bentuk",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan atribut <strong>protected</strong> <code>panjang</code> dan constructor <code>Bentuk(int p)</code>. Buat class <code>Kotak</code> yang mewarisinya, punya atribut <strong>private</strong> <code>lebar</code>, constructor <code>Kotak(int p, int l)</code> yang mengirim <code>p</code> ke induk, dan method <code>luas()</code>.</p><p>Untuk input <code>5 3</code>:</p><pre>Luas: 15</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\nprotected:\n    int panjang;\npublic:\n    Bentuk(int p) { panjang = p; }\n};\n\n// Buat class Kotak yang mewarisi Bentuk.\n// Constructornya: Kotak(int p, int l) : Bentuk(p) { ... }\n\nint main() {\n    int p, l;\n    cin >> p >> l;\n    Kotak k(p, l);\n    cout << \"Luas: \" << k.luas();\n    return 0;\n}\n",
      stdin: "5 3\n",
      expected: "Luas: 15",
      petunjuk: `Karena <code>Bentuk</code> tidak punya constructor kosong, <code>: Bentuk(p)</code> wajib ditulis.`
    },
    {
      judul: "Pewarisan Bertemu Composition",
      deskripsi: `<p>Buat class <code>Mesin</code> (constructor mencetak <code>Mesin siap</code>) dan class <code>Kendaraan</code> (constructor mencetak <code>Kendaraan dibuat</code>). Lalu buat class <code>Mobil</code> yang <strong>mewarisi <code>Kendaraan</code></strong> sekaligus <strong>punya objek <code>Mesin</code></strong>, dengan constructor yang mencetak <code>Mobil jadi</code>. Semua diikuti pindah baris.</p><p>Perhatikan urutannya — induk dulu, baru objek anggota, baru dirinya sendiri:</p><pre>Kendaraan dibuat
Mesin siap
Mobil jadi</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Mesin {\npublic:\n    // constructor Mesin\n    \n};\n\nclass Kendaraan {\npublic:\n    // constructor Kendaraan\n    \n};\n\n// Buat class Mobil: mewarisi Kendaraan DAN punya atribut Mesin\n\nint main() {\n    Mobil m;\n    return 0;\n}\n",
      expected: "Kendaraan dibuat\nMesin siap\nMobil jadi",
      petunjuk: `Urutannya tetap begitu meski kamu menulis atribut Mesin di baris paling atas class.`
    }
  ]
};
