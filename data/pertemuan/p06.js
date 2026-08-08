/* =========================================================
   Pertemuan 6: Class & Object Pertama
   Modul 2 — Class & Object
   STATUS: READY (contoh materi terisi penuh)
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[6] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami perbedaan <strong>class</strong> dan <strong>object</strong>.</li>
    <li>Mendefinisikan sebuah class dengan atribut dan method.</li>
    <li>Membuat objek dan mengakses anggotanya.</li>
  </ul>

  <h2>📖 Class vs Object</h2>
  <p>Sebuah <strong>class</strong> adalah <em>cetakan / blueprint</em>. Sebuah <strong>object</strong> adalah
     <em>wujud nyata</em> yang dibuat dari cetakan itu.</p>
  <div class="callout">
    <strong>Analogi Kue 🧁</strong>
    <em>Class</em> = cetakan kue. <em>Object</em> = kue-kue yang dihasilkan dari cetakan tersebut.
    Satu cetakan (class) bisa menghasilkan banyak kue (object) yang serupa namun masing-masing berdiri sendiri.
  </div>

  <h2>🏗️ Mendefinisikan Class</h2>
  <p>Sebuah class terdiri dari <strong>atribut</strong> (data / kata benda) dan <strong>method</strong>
     (perilaku / kata kerja).</p>
  <pre><code>#include &lt;iostream&gt;
using namespace std;

class Mobil {              // definisi class
public:                    // agar bisa diakses dari luar (dibahas di pert. 8)
    string merek;          // atribut
    int kecepatan;         // atribut

    void gas() {           // method
        kecepatan += 10;
        cout &lt;&lt; merek &lt;&lt; " melaju " &lt;&lt; kecepatan &lt;&lt; " km/jam" &lt;&lt; endl;
    }
};                         // JANGAN lupa titik koma setelah class!</code></pre>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Umum</strong>
    Definisi class <strong>harus diakhiri titik koma</strong> <code>};</code>. Ini berbeda dari fungsi biasa.
  </div>

  <h2>🚗 Membuat & Menggunakan Object</h2>
  <pre><code>int main() {
    Mobil avanza;              // membuat object bernama 'avanza'
    avanza.merek = "Avanza";   // mengisi atribut (pakai titik .)
    avanza.kecepatan = 0;
    avanza.gas();              // memanggil method

    Mobil brio;                // object kedua, mandiri
    brio.merek = "Brio";
    brio.kecepatan = 50;
    brio.gas();
    return 0;
}</code></pre>
  <p>Perhatikan: <code>avanza</code> dan <code>brio</code> adalah dua object berbeda dari class yang sama.
     Mengubah salah satu tidak memengaruhi yang lain.</p>

  <div class="callout tip">
    <strong>💡 Operator Titik <code>.</code></strong>
    Gunakan tanda titik untuk mengakses atribut atau method sebuah object:
    <code>namaObject.namaAnggota</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><strong>Class</strong> = blueprint; <strong>Object</strong> = wujud nyata dari class.</li>
    <li>Class berisi <strong>atribut</strong> (data) dan <strong>method</strong> (perilaku).</li>
    <li>Buat object: <code>NamaClass namaObject;</code> lalu akses dengan <code>.</code></li>
    <li>Selalu akhiri definisi class dengan <code>};</code></li>
  </ul>
  `,

  soal: [
    {
      judul: "Class Persegi",
      deskripsi: `<p>Buat sebuah class bernama <code>Persegi</code> yang memiliki:</p>
                  <ul>
                    <li>atribut <code>sisi</code> (bilangan bulat),</li>
                    <li>method <code>luas()</code> yang mengembalikan luas (sisi &times; sisi).</li>
                  </ul>
                  <p>Di <code>main()</code>, baca nilai <code>sisi</code> dari input, lalu cetak luasnya.
                     Untuk input <code>5</code>, output harus:</p>
                  <pre>Luas persegi: 25</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    // Buat method luas() di sini\n    \n};\n\nint main() {\n    Persegi p;\n    cin >> p.sisi;\n    // Cetak: Luas persegi: <hasil>\n    \n    return 0;\n}\n",
      stdin: "5\n",
      expected: "Luas persegi: 25",
      petunjuk: "Method: <code>int luas() { return sisi * sisi; }</code>. Cetak dengan <code>cout &lt;&lt; \"Luas persegi: \" &lt;&lt; p.luas();</code>"
    },
    {
      judul: "Class Mahasiswa",
      deskripsi: `<p>Buat class <code>Mahasiswa</code> dengan atribut <code>nama</code> dan <code>nim</code> (keduanya teks),
                  serta method <code>perkenalan()</code> yang mencetak identitasnya.</p>
                  <p>Baca <code>nama</code> lalu <code>nim</code> (masing-masing satu kata) dari input.
                     Untuk input <code>Andi 210101</code>, output harus:</p>
                  <pre>Nama: Andi, NIM: 210101</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Mahasiswa {\npublic:\n    string nama, nim;\n    // Buat method perkenalan() di sini\n    \n};\n\nint main() {\n    Mahasiswa m;\n    cin >> m.nama >> m.nim;\n    // Panggil method perkenalan()\n    \n    return 0;\n}\n",
      stdin: "Andi 210101\n",
      expected: "Nama: Andi, NIM: 210101",
      petunjuk: "Method: <code>void perkenalan() { cout &lt;&lt; \"Nama: \" &lt;&lt; nama &lt;&lt; \", NIM: \" &lt;&lt; nim; }</code>"
    },
    {
      judul: "Class Segitiga",
      deskripsi: `<p>Buat class <code>Segitiga</code> dengan atribut <code>alas</code> dan <code>tinggi</code>, serta method <code>luas()</code> yang mengembalikan <code>alas &times; tinggi / 2</code>.</p><p>Untuk input <code>8 5</code>:</p><pre>Luas segitiga: 20</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Segitiga {\npublic:\n    int alas, tinggi;\n    // Buat method luas() di sini\n    \n};\n\nint main() {\n    Segitiga s;\n    cin >> s.alas >> s.tinggi;\n    // Cetak luasnya\n    \n    return 0;\n}\n",
      stdin: "8 5\n",
      expected: "Luas segitiga: 20",
      petunjuk: `<code>int luas() { return alas * tinggi / 2; }</code>`
    },
    {
      judul: "Dua Objek Mandiri",
      deskripsi: `<p>Buat class <code>Motor</code> dengan atribut <code>kecepatan</code> dan method <code>gas(int n)</code> yang menambah kecepatan sebanyak <code>n</code>.</p><p>Buat <strong>dua objek</strong>, isi kecepatan awalnya dari input, lalu panggil <code>gas(5)</code> <strong>hanya pada motor A</strong>.</p><p>Untuk input <code>10 20</code>:</p><pre>Motor A: 15
Motor B: 20</pre><p>Motor B tidak berubah — itulah bukti tiap objek berdiri sendiri.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Motor {\npublic:\n    int kecepatan;\n    // Buat method gas(int n) di sini\n    \n};\n\nint main() {\n    Motor a, b;\n    cin >> a.kecepatan >> b.kecepatan;\n    // Panggil a.gas(5), lalu cetak keduanya\n    \n    return 0;\n}\n",
      stdin: "10 20\n",
      expected: "Motor A: 15\nMotor B: 20",
      petunjuk: `<code>void gas(int n) { kecepatan += n; }</code>`
    },
    {
      judul: "Class Buku",
      deskripsi: `<p>Buat class <code>Buku</code> dengan atribut <code>judul</code> dan <code>halaman</code>, serta method <code>info()</code> yang mencetak keduanya.</p><p>Untuk input <code>Fisika 250</code>:</p><pre>Fisika, 250 halaman</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Buku {\npublic:\n    string judul;\n    int halaman;\n    // Buat method info() di sini\n    \n};\n\nint main() {\n    Buku b;\n    cin >> b.judul >> b.halaman;\n    // Panggil b.info()\n    \n    return 0;\n}\n",
      stdin: "Fisika 250\n",
      expected: "Fisika, 250 halaman",
      petunjuk: `Method langsung mencetak: <code>cout &lt;&lt; judul &lt;&lt; ", " &lt;&lt; halaman &lt;&lt; " halaman";</code>`
    }
  ]
};
