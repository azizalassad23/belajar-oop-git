/* =========================================================
   Pertemuan 28: Interface dengan Abstract Class
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[28] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami <strong>interface</strong> sebagai kesepakatan antar class.</li>
    <li>Membuat class yang memenuhi <strong>lebih dari satu</strong> interface.</li>
    <li>Merancang program yang mudah ditambah tanpa mengubah kode lama.</li>
  </ul>

  <h2>📖 Interface = Daftar Kewajiban</h2>
  <p>C++ tidak punya kata kunci <code>interface</code> seperti Java. Yang dipakai adalah
     abstract class yang <strong>seluruh</strong> methodnya pure virtual dan tidak punya
     atribut:</p>
  <pre><code>class Terbang {
public:
    virtual void terbang() = 0;
    virtual ~Terbang() {}
};</code></pre>
  <p>Ia tidak menyediakan kode apa pun &mdash; hanya menyatakan: "siapa pun yang mewarisi
     saya <strong>wajib</strong> bisa terbang."</p>

  <div class="callout">
    <strong>Analogi Colokan Listrik 🔌</strong>
    Bentuk colokan adalah kesepakatan. Kipas, lampu, atau charger boleh berbeda isinya,
    asal colokannya sesuai. Stopkontak tidak perlu tahu alat apa yang dipasang.
  </div>

  <h2>🔗 Satu Class, Banyak Interface</h2>
  <p>Di sinilah multiple inheritance justru sangat masuk akal &mdash; karena interface tidak
     punya atribut, tidak ada Diamond Problem:</p>
  <pre><code>class Terbang  { public: virtual void terbang() = 0; };
class Berenang { public: virtual void berenang() = 0; };

class Bebek : public Terbang, public Berenang {
public:
    void terbang()  { cout &lt;&lt; "Bebek terbang"; }
    void berenang() { cout &lt;&lt; "Bebek berenang"; }
};</code></pre>

  <h2>💡 Manfaat Nyatanya: Mudah Ditambah</h2>
  <pre><code>class Pembayaran { public: virtual void bayar(int jumlah) = 0; };

class Tunai    : public Pembayaran { ... };
class Transfer : public Pembayaran { ... };
class QRIS     : public Pembayaran { ... };</code></pre>
  <p>Kode kasir cukup memegang <code>Pembayaran*</code>. Besok mau menambah metode
     pembayaran baru? Buat satu class baru &mdash; <strong>kode kasirnya tidak perlu
     disentuh sama sekali</strong>. Inilah alasan utama orang memakai interface.</p>

  <div class="callout tip">
    <strong>💡 Beda Interface dan Abstract Class Biasa</strong>
    Abstract class biasa boleh punya atribut dan method berisi &mdash; ia berbagi
    <em>kode</em>. Interface hanya berbagi <em>kesepakatan</em>. Pilih interface kalau
    yang kamu butuhkan cuma jaminan "class ini pasti bisa melakukan X".
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Interface = abstract class yang semua methodnya pure virtual, tanpa atribut.</li>
    <li>Satu class boleh memenuhi beberapa interface sekaligus.</li>
    <li>Interface menyatakan kewajiban, bukan menyediakan kode.</li>
    <li>Membuat program mudah ditambah tanpa mengubah kode yang sudah jalan.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Interface Pertama",
      deskripsi: `<p>Buat interface <code>Terbang</code> &mdash; abstract class dengan satu pure virtual <code>terbang()</code>. Buat class <code>Burung</code> yang memenuhinya dengan mencetak <code>Burung terbang</code>.</p><p>Panggil lewat pointer bertipe <code>Terbang*</code>.</p><pre>Burung terbang</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Terbang {\npublic:\n    // pure virtual terbang()\n    \n};\n\n// Buat class Burung yang memenuhi Terbang\n\nint main() {\n    Terbang* t = new Burung();\n    t->terbang();\n    delete t;\n    return 0;\n}\n",
      expected: "Burung terbang",
      petunjuk: `Interface hanya menyatakan kewajiban; isinya ditulis di class yang memenuhinya.`
    },
    {
      judul: "Memenuhi Dua Interface",
      deskripsi: `<p>Buat dua interface: <code>Terbang</code> (pure virtual <code>terbang()</code>) dan <code>Berenang</code> (pure virtual <code>berenang()</code>). Buat class <code>Bebek</code> yang memenuhi <strong>keduanya</strong>.</p><pre>Bebek terbang
Bebek berenang</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Terbang {\npublic:\n    // pure virtual terbang()\n    \n};\n\nclass Berenang {\npublic:\n    // pure virtual berenang()\n    \n};\n\n// Buat class Bebek yang memenuhi KEDUA interface\n\nint main() {\n    Bebek b;\n    b.terbang();\n    b.berenang();\n    return 0;\n}\n",
      expected: "Bebek terbang\nBebek berenang",
      petunjuk: `<code>class Bebek : public Terbang, public Berenang { ... };</code>`
    },
    {
      judul: "Tiga Metode Pembayaran",
      deskripsi: `<p>Buat interface <code>Pembayaran</code> dengan pure virtual <code>bayar(int jumlah)</code>. Buat tiga class yang memenuhinya: <code>Tunai</code> (<code>Bayar tunai &lt;jumlah&gt;</code>), <code>Transfer</code> (<code>Transfer &lt;jumlah&gt;</code>), dan <code>QRIS</code> (<code>QRIS &lt;jumlah&gt;</code>). Dua yang pertama diikuti pindah baris.</p><p>Simpan dalam array lalu panggil semuanya dengan jumlah <code>50000</code>.</p><pre>Bayar tunai 50000
Transfer 50000
QRIS 50000</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Pembayaran {\npublic:\n    // pure virtual bayar(int jumlah)\n    \n};\n\n// Buat Tunai, Transfer, dan QRIS\n\nint main() {\n    Pembayaran* m[3] = { new Tunai(), new Transfer(), new QRIS() };\n    for (int i = 0; i < 3; i++) m[i]->bayar(50000);\n    for (int i = 0; i < 3; i++) delete m[i];\n    return 0;\n}\n",
      expected: "Bayar tunai 50000\nTransfer 50000\nQRIS 50000",
      petunjuk: `Menambah metode keempat besok cukup membuat satu class baru, tanpa mengubah main().`
    },
    {
      judul: "Aturan Diskon yang Bisa Ditukar",
      deskripsi: `<p>Buat interface <code>Diskon</code> dengan pure virtual <code>hitung(int harga)</code> yang mengembalikan harga akhir. Buat <code>TanpaDiskon</code> (mengembalikan apa adanya) dan <code>DiskonSepuluh</code> (potong 10%).</p><p>Buat fungsi <code>tampilkan(Diskon* d, int harga)</code> yang mencetak <code>Bayar: &lt;hasil&gt;</code> lalu pindah baris.</p><p>Untuk input <code>25000</code>:</p><pre>Bayar: 25000
Bayar: 22500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Diskon {\npublic:\n    // pure virtual hitung(int harga)\n    \n};\n\n// Buat TanpaDiskon dan DiskonSepuluh\n\n// Buat fungsi tampilkan(Diskon* d, int harga)\n\nint main() {\n    int h;\n    cin >> h;\n    TanpaDiskon a;\n    DiskonSepuluh b;\n    tampilkan(&a, h);\n    tampilkan(&b, h);\n    return 0;\n}\n",
      stdin: "25000\n",
      expected: "Bayar: 25000\nBayar: 22500",
      petunjuk: `Potong 10%: <code>return h - h/10;</code>`
    },
    {
      judul: "Interface Bisa Dicetak",
      deskripsi: `<p>Buat interface <code>BisaDicetak</code> dengan pure virtual <code>keTeks()</code> yang mengembalikan <code>string</code>. Buat <code>Titik</code> (dua angka, hasilnya <code>(x, y)</code>) dan <code>Nama</code> (satu teks, hasilnya teks itu sendiri).</p><p>Objeknya sudah disiapkan di <code>main()</code>. Keduanya diikuti pindah baris.</p><pre>(3, 4)
Andi</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass BisaDicetak {\npublic:\n    // pure virtual keTeks() yang mengembalikan string\n    \n};\n\n// class Titik : Titik(int,int), keTeks() -> \"(x, y)\"\n\n// class Nama : Nama(string), keTeks() -> teksnya\n\nint main() {\n    BisaDicetak* d[2] = { new Titik(3, 4), new Nama(\"Andi\") };\n    for (int i = 0; i < 2; i++) cout << d[i]->keTeks() << endl;\n    for (int i = 0; i < 2; i++) delete d[i];\n    return 0;\n}\n",
      expected: "(3, 4)\nAndi",
      petunjuk: `Angka digabung ke teks dengan <code>to_string(x)</code>.`
    }
  ]
};
