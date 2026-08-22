/* =========================================================
   Pertemuan 22: Multilevel & Hierarchical Inheritance
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[22] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membuat pewarisan <strong>bertingkat</strong> (multilevel).</li>
    <li>Membuat pewarisan <strong>bercabang</strong> (hierarchical).</li>
    <li>Memahami urutan constructor pada rantai pewarisan.</li>
  </ul>

  <h2>🪜 Multilevel: Rantai ke Bawah</h2>
  <p>Class anak boleh punya anak lagi. Cucu mendapat warisan dari kakek <em>dan</em> ayahnya.</p>
  <pre><code>class Hewan   { public: void bernapas() { ... } };
class Mamalia : public Hewan   { public: void menyusui() { ... } };
class Kucing  : public Mamalia { public: void mengeong() { ... } };

int main() {
    Kucing k;
    k.bernapas();   // dari Hewan (kakek)
    k.menyusui();   // dari Mamalia (ayah)
    k.mengeong();   // miliknya sendiri
}</code></pre>

  <h2>🌳 Hierarchical: Cabang ke Samping</h2>
  <p>Satu induk boleh punya banyak anak yang sederajat. Ini yang paling sering dipakai
     untuk berbagi kode:</p>
  <pre><code>class Bentuk   { public: int sisi; };
class Persegi  : public Bentuk { public: int luas()   { return sisi*sisi; } };
class Segitiga : public Bentuk { public: int luas()   { return sisi*sisi/2; } };
class Kubus    : public Bentuk { public: int volume() { return sisi*sisi*sisi; } };</code></pre>
  <p>Atribut <code>sisi</code> cukup ditulis sekali di induk, dipakai ketiganya.</p>

  <div class="callout">
    <strong>Analogi Silsilah 🌳</strong>
    Multilevel itu garis lurus: kakek &rarr; ayah &rarr; anak.
    Hierarchical itu melebar: satu ayah dengan beberapa anak yang bersaudara.
  </div>

  <h2>🔢 Urutan Constructor Tetap dari Atas</h2>
  <p>Berapa pun tingkatnya, constructor selalu jalan dari yang paling atas:</p>
  <pre>A dibuat
B dibuat
C dibuat</pre>
  <p>Dan tiap cabang berjalan sendiri-sendiri. Membuat objek <code>C</code> lalu <code>D</code>
     yang sama-sama turunan <code>B</code> akan menjalankan <code>A</code> dan <code>B</code>
     dua kali — sekali untuk tiap objek.</p>

  <div class="callout warn">
    <strong>⚠️ Jangan Terlalu Dalam</strong>
    Rantai pewarisan yang terlalu panjang membuat kode susah dilacak: untuk tahu apa yang
    dilakukan sebuah method, kamu harus menelusuri banyak berkas. Tiga tingkat biasanya
    sudah cukup.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><strong>Multilevel</strong>: pewarisan bertingkat, cucu mewarisi dari kakek juga.</li>
    <li><strong>Hierarchical</strong>: satu induk, banyak anak sederajat.</li>
    <li>Constructor selalu dijalankan dari class paling atas ke bawah.</li>
    <li>Tiap objek menjalankan rantainya sendiri.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Tiga Tingkat",
      deskripsi: `<p>Buat rantai bertingkat: <code>Hewan</code> dengan <code>bernapas()</code>, <code>Mamalia</code> yang mewarisi Hewan dengan <code>menyusui()</code>, dan <code>Kucing</code> yang mewarisi Mamalia dengan <code>mengeong()</code>. Dua yang pertama diikuti pindah baris.</p><pre>Bernapas
Menyusui
Mengeong</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // method bernapas()\n    \n};\n\n// class Mamalia : mewarisi Hewan, tambah menyusui()\n\n// class Kucing : mewarisi Mamalia, tambah mengeong()\n\nint main() {\n    Kucing k;\n    k.bernapas();\n    k.menyusui();\n    k.mengeong();\n    return 0;\n}\n",
      expected: "Bernapas\nMenyusui\nMengeong",
      petunjuk: `Objek Kucing bisa memanggil ketiganya walau hanya satu yang miliknya sendiri.`
    },
    {
      judul: "Atribut dari Dua Tingkat",
      deskripsi: `<p>Buat <code>Makhluk</code> dengan atribut <code>nama</code>, <code>Hewan</code> yang mewarisinya dengan atribut <code>kaki</code>, dan <code>Anjing</code> yang mewarisi Hewan dengan method <code>info()</code>.</p><p>Untuk input <code>Bimo 3</code>:</p><pre>Bimo berkaki 3</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Makhluk {\npublic:\n    string nama;\n};\n\n// class Hewan : mewarisi Makhluk, tambah atribut kaki\n\n// class Anjing : mewarisi Hewan, tambah method info()\n\nint main() {\n    string n;\n    int k;\n    cin >> n >> k;\n    Anjing a;\n    a.nama = n;\n    a.kaki = k;\n    a.info();\n    return 0;\n}\n",
      stdin: "Bimo 3\n",
      expected: "Bimo berkaki 3",
      petunjuk: `<code>nama</code> datang dari kakek, <code>kaki</code> dari ayah — keduanya jadi milik Anjing.`
    },
    {
      judul: "Satu Induk, Tiga Cabang",
      deskripsi: `<p>Buat <code>Bentuk</code> dengan atribut <code>sisi</code>. Lalu tiga class anak: <code>Persegi</code> dengan <code>luas()</code>, <code>Segitiga</code> dengan <code>luas()</code> (yaitu <code>sisi*sisi/2</code>), dan <code>Kubus</code> dengan <code>volume()</code>.</p><p>Untuk input <code>10</code>:</p><pre>Persegi: 100
Segitiga: 50
Kubus: 1000</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    int sisi;\n};\n\n// Buat Persegi, Segitiga, dan Kubus yang mewarisi Bentuk\n\nint main() {\n    int s;\n    cin >> s;\n    Persegi p;\n    Segitiga t;\n    Kubus k;\n    p.sisi = s;\n    t.sisi = s;\n    k.sisi = s;\n    cout << \"Persegi: \" << p.luas() << endl;\n    cout << \"Segitiga: \" << t.luas() << endl;\n    cout << \"Kubus: \" << k.volume();\n    return 0;\n}\n",
      stdin: "10\n",
      expected: "Persegi: 100\nSegitiga: 50\nKubus: 1000",
      petunjuk: `Atribut <code>sisi</code> cukup ditulis sekali di induk untuk dipakai ketiganya.`
    },
    {
      judul: "Rantai Berjalan Sendiri-sendiri",
      deskripsi: `<p>Buat <code>A</code>, <code>B</code> yang mewarisi A, lalu <strong>dua</strong> class yang sama-sama mewarisi B: <code>C</code> dan <code>D</code>. Constructor mencetak <code>A dibuat</code>, <code>B dibuat</code>, <code>C dibuat</code>, <code>D dibuat</code>. Tiga yang pertama diikuti pindah baris.</p><p>Perhatikan A dan B dijalankan dua kali — sekali untuk tiap objek:</p><pre>A dibuat
B dibuat
C dibuat
---
A dibuat
B dibuat
D dibuat</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass A {\npublic:\n    // constructor A\n    \n};\n\n// class B : mewarisi A\n\n// class C : mewarisi B\n\n// class D : mewarisi B\n\nint main() {\n    C c;\n    cout << \"---\" << endl;\n    D d;\n    return 0;\n}\n",
      expected: "A dibuat\nB dibuat\nC dibuat\n---\nA dibuat\nB dibuat\nD dibuat",
      petunjuk: `Objek C dan D masing-masing membangun rantainya sendiri dari paling atas.`
    },
    {
      judul: "Harga Bertingkat",
      deskripsi: `<p>Buat <code>Produk</code> dengan atribut <strong>protected</strong> <code>harga</code> dan method <code>setHarga(int)</code>. Lalu <code>Makanan</code> yang mewarisinya dengan <code>total()</code> = harga + 10% harga. Lalu <code>MakananBeku</code> yang mewarisi Makanan dengan <code>totalPlusOngkir()</code> = <code>total()</code> + 2000.</p><p>Untuk input <code>5000</code>:</p><pre>Harga akhir: 7500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Produk {\nprotected:\n    int harga;\npublic:\n    void setHarga(int h) { harga = h; }\n};\n\n// class Makanan : mewarisi Produk, method total()\n\n// class MakananBeku : mewarisi Makanan, method totalPlusOngkir()\n\nint main() {\n    int h;\n    cin >> h;\n    MakananBeku m;\n    m.setHarga(h);\n    cout << \"Harga akhir: \" << m.totalPlusOngkir();\n    return 0;\n}\n",
      stdin: "5000\n",
      expected: "Harga akhir: 7500",
      petunjuk: `<code>totalPlusOngkir()</code> boleh memanggil <code>total()</code> milik ayahnya.`
    }
  ]
};
