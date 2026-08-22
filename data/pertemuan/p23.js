/* =========================================================
   Pertemuan 23: Multiple Inheritance & Diamond Problem
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[23] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membuat class yang mewarisi <strong>lebih dari satu induk</strong>.</li>
    <li>Menyelesaikan nama yang bentrok antar induk.</li>
    <li>Memahami <strong>Diamond Problem</strong> dan solusinya.</li>
  </ul>

  <h2>👨‍👩‍👦 Mewarisi Dua Induk Sekaligus</h2>
  <p>Berbeda dari banyak bahasa lain, C++ mengizinkan satu class mewarisi beberapa induk.
     Tulis induknya berurutan, dipisah koma:</p>
  <pre><code>class Mesin { public: void nyala() { ... } };
class Radio { public: void bunyi() { ... } };

class Mobil : public Mesin, public Radio {
public:
    void jalan() { ... }
};</code></pre>
  <p>Constructor dijalankan sesuai <strong>urutan penulisan induknya</strong>: Mesin dulu,
     baru Radio, baru Mobil.</p>

  <h2>⚔️ Kalau Nama Bentrok</h2>
  <p>Bagaimana kalau kedua induk punya method bernama sama? C++ tidak bisa menebak, dan
     kodenya jadi <em>ambigu</em>. Kamu harus menyebut induknya:</p>
  <pre><code>class Ayah { public: void asal() { cout &lt;&lt; "Dari Ayah"; } };
class Ibu  { public: void asal() { cout &lt;&lt; "Dari Ibu"; } };
class Anak : public Ayah, public Ibu { };

int main() {
    Anak a;
    // a.asal();          // ERROR: ambigu
    a.Ayah::asal();       // jelas
    a.Ibu::asal();
}</code></pre>

  <h2>💎 Diamond Problem</h2>
  <p>Masalah paling terkenal dari multiple inheritance. Bayangkan bentuk berlian:</p>
  <pre>      Alat
      /  \
   Pena  Pensil
      \  /
   PenaPensil</pre>
  <p><code>PenaPensil</code> mewarisi <code>Alat</code> lewat <strong>dua jalur</strong>,
     sehingga ia punya <strong>dua salinan</strong> anggota <code>Alat</code>:</p>
  <pre><code>p.Pena::nomor   = 7;      // salinan lewat jalur Pena
p.Pensil::nomor = 14;     // salinan lewat jalur Pensil — TERPISAH!</code></pre>
  <p>Menulis <code>p.nomor</code> saja akan error karena ambigu.</p>

  <h2>✅ Solusinya: <code>virtual</code> pada Pewarisan</h2>
  <p>Tambahkan kata <code>virtual</code> saat mewarisi, agar salinannya cukup satu:</p>
  <pre><code>class Pena   : virtual public Alat { };
class Pensil : virtual public Alat { };
class PenaPensil : public Pena, public Pensil { };

int main() {
    PenaPensil p;
    p.nomor = 9;          // sekarang boleh, hanya ada satu salinan
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Pakai Sehemat Mungkin</strong>
    Multiple inheritance memang kuat, tapi cepat membingungkan. Banyak masalah lebih baik
    diselesaikan dengan <em>composition</em> (Pertemuan 15) atau <em>interface</em>
    (Pertemuan 28). Pakai hanya kalau memang paling masuk akal.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Sintaksnya: <code>class C : public A, public B { };</code></li>
    <li>Constructor jalan sesuai urutan penulisan induk.</li>
    <li>Nama bentrok diselesaikan dengan <code>objek.Induk::method()</code>.</li>
    <li>Diamond Problem = dua salinan induk bersama; diselesaikan dengan
        <code>virtual public</code>.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Dua Induk Sekaligus",
      deskripsi: `<p>Buat class <code>Mesin</code> dengan <code>nyala()</code> dan class <code>Radio</code> dengan <code>bunyi()</code>. Lalu class <code>Mobil</code> yang <strong>mewarisi keduanya</strong> dan punya <code>jalan()</code>. Dua yang pertama diikuti pindah baris.</p><pre>Mesin menyala
Radio berbunyi
Mobil berjalan</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Mesin {\npublic:\n    // method nyala()\n    \n};\n\nclass Radio {\npublic:\n    // method bunyi()\n    \n};\n\n// class Mobil : mewarisi Mesin DAN Radio, tambah jalan()\n\nint main() {\n    Mobil m;\n    m.nyala();\n    m.bunyi();\n    m.jalan();\n    return 0;\n}\n",
      expected: "Mesin menyala\nRadio berbunyi\nMobil berjalan",
      petunjuk: `Sintaksnya: <code>class Mobil : public Mesin, public Radio { ... };</code>`
    },
    {
      judul: "Urutan Constructor",
      deskripsi: `<p>Buat class <code>A</code> dan <code>B</code> yang constructornya mencetak <code>A</code> dan <code>B</code>, lalu class <code>C</code> yang mewarisi keduanya dan mencetak <code>C</code>. Dua yang pertama diikuti pindah baris.</p><pre>A
B
C</pre><p>Urutannya mengikuti urutan penulisan induk pada baris <code>class C : public A, public B</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass A {\npublic:\n    // constructor A\n    \n};\n\nclass B {\npublic:\n    // constructor B\n    \n};\n\n// class C : mewarisi A dan B\n\nint main() {\n    C c;\n    return 0;\n}\n",
      expected: "A\nB\nC",
      petunjuk: `Coba tukar urutannya jadi <code>public B, public A</code> — keluarannya ikut berubah.`
    },
    {
      judul: "Nama yang Bentrok",
      deskripsi: `<p>Buat class <code>Ayah</code> dan <code>Ibu</code> yang <strong>sama-sama</strong> punya method bernama <code>asal()</code>, masing-masing mencetak <code>Dari Ayah</code> (diikuti pindah baris) dan <code>Dari Ibu</code>. Buat class <code>Anak</code> yang mewarisi keduanya tanpa tambahan.</p><pre>Dari Ayah
Dari Ibu</pre><p>Di <code>main()</code>, panggil keduanya dengan menyebut nama induknya.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Ayah {\npublic:\n    // method asal()\n    \n};\n\nclass Ibu {\npublic:\n    // method asal()\n    \n};\n\n// class Anak : mewarisi Ayah dan Ibu\n\nint main() {\n    Anak a;\n    // Panggil kedua versi asal() dengan menyebut induknya\n    \n    return 0;\n}\n",
      expected: "Dari Ayah\nDari Ibu",
      petunjuk: `Bentuknya <code>a.Ayah::asal();</code> — menulis <code>a.asal();</code> saja akan error ambigu.`
    },
    {
      judul: "Diamond Problem",
      deskripsi: `<p>Buat class <code>Alat</code> dengan atribut <code>nomor</code>. Lalu <code>Pena</code> dan <code>Pensil</code> yang <strong>keduanya</strong> mewarisi Alat (tanpa <code>virtual</code>). Lalu <code>PenaPensil</code> yang mewarisi Pena dan Pensil.</p><p>Karena ada <strong>dua salinan</strong> <code>nomor</code>, keduanya harus diisi terpisah lewat nama jalurnya.</p><p>Untuk input <code>7</code>:</p><pre>Salinan Pena: 7
Salinan Pensil: 14</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Alat {\npublic:\n    int nomor;\n};\n\n// Buat Pena dan Pensil yang mewarisi Alat (TANPA virtual)\n\n// Buat PenaPensil yang mewarisi Pena dan Pensil\n\nint main() {\n    int n;\n    cin >> n;\n    PenaPensil p;\n    // Isi kedua salinan: Pena::nomor = n, Pensil::nomor = n*2\n    \n    cout << \"Salinan Pena: \" << p.Pena::nomor << endl;\n    cout << \"Salinan Pensil: \" << p.Pensil::nomor;\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Salinan Pena: 7\nSalinan Pensil: 14",
      petunjuk: `Menulis <code>p.nomor</code> saja akan error — C++ tidak tahu salinan yang mana.`
    },
    {
      judul: "Menyelesaikan dengan virtual",
      deskripsi: `<p>Ulangi soal sebelumnya, tapi kali ini <code>Pena</code> dan <code>Pensil</code> mewarisi <code>Alat</code> secara <strong><code>virtual public</code></strong>. Sekarang hanya ada <strong>satu salinan</strong>, sehingga <code>p.nomor</code> langsung boleh dipakai.</p><p>Untuk input <code>9</code>:</p><pre>Hanya satu salinan: 9</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Alat {\npublic:\n    int nomor;\n};\n\n// Buat Pena dan Pensil yang mewarisi Alat secara virtual public\n\n// Buat PenaPensil yang mewarisi Pena dan Pensil\n\nint main() {\n    int n;\n    cin >> n;\n    PenaPensil p;\n    p.nomor = n;\n    cout << \"Hanya satu salinan: \" << p.nomor;\n    return 0;\n}\n",
      stdin: "9\n",
      expected: "Hanya satu salinan: 9",
      petunjuk: `<code>class Pena : virtual public Alat {};</code> — kata virtual ditulis di kedua jalur.`
    }
  ]
};
