/* =========================================================
   Pertemuan 25: Function Overloading vs Overriding
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[25] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membedakan <strong>overloading</strong> dan <strong>overriding</strong> dengan tepat.</li>
    <li>Mengenali kapan masing-masing dipakai.</li>
    <li>Memahami <em>name hiding</em> pada class anak.</li>
  </ul>

  <h2>📖 Dua Istilah yang Sering Tertukar</h2>
  <table>
    <tr><th></th><th>Overloading</th><th>Overriding</th></tr>
    <tr><td>Arti</td><td>Beban lebih</td><td>Menimpa</td></tr>
    <tr><td>Di mana</td><td>Dalam satu class</td><td>Antara induk dan anak</td></tr>
    <tr><td>Parameter</td><td>Harus <strong>berbeda</strong></td><td>Harus <strong>sama persis</strong></td></tr>
    <tr><td>Butuh pewarisan?</td><td>Tidak</td><td>Ya</td></tr>
    <tr><td>Ditentukan</td><td>Saat compile</td><td>Saat program jalan (dengan virtual)</td></tr>
  </table>

  <h2>➕ Overloading: Nama Sama, Parameter Beda</h2>
  <pre><code>class Cetak {
public:
    void tampil(int n)    { cout &lt;&lt; "Bilangan: " &lt;&lt; n; }
    void tampil(double n) { cout &lt;&lt; "Desimal: "  &lt;&lt; n; }
    void tampil(string n) { cout &lt;&lt; "Teks: "     &lt;&lt; n; }
};</code></pre>
  <p>Boleh berbeda pada <strong>tipe</strong> maupun <strong>jumlah</strong> parameter.</p>

  <div class="callout warn">
    <strong>⚠️ Tipe Kembalian Tidak Dihitung</strong>
    <code>int f(int)</code> dan <code>double f(int)</code> <strong>bukan</strong> overloading
    yang sah — kodenya error. Yang membedakan hanyalah daftar parameternya.
  </div>

  <h2>🔁 Overriding: Parameter Sama, Class Beda</h2>
  <pre><code>class Induk { public: void kerja() { cout &lt;&lt; "Induk bekerja"; } };
class Anak : public Induk {
public:
    void kerja() { cout &lt;&lt; "Anak bekerja"; }   // parameter sama persis
};</code></pre>

  <div class="callout">
    <strong>Cara Mengingat 🧠</strong>
    <em>Overload</em> = menambah <strong>pilihan</strong> di tempat yang sama.
    <em>Override</em> = mengambil <strong>alih</strong> milik induk.
  </div>

  <h2>🫥 Name Hiding: Jebakan yang Jarang Diketahui</h2>
  <p>Kalau class anak membuat method dengan nama yang sama, <strong>semua versi overload
     milik induk ikut tersembunyi</strong> — meski parameternya berbeda:</p>
  <pre><code>class Anak : public Induk {
public:
    using Induk::sapa;         // tanpa baris ini, versi induk hilang
    void sapa(int n) { ... }
};</code></pre>
  <p>Baris <code>using Induk::sapa;</code> memanggil kembali semua versi induk.</p>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Overloading: satu class, nama sama, parameter berbeda.</li>
    <li>Overriding: induk-anak, nama dan parameter sama persis.</li>
    <li>Tipe kembalian tidak pernah menjadi pembeda overloading.</li>
    <li><code>using Induk::nama;</code> mengembalikan versi induk yang tersembunyi.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Overloading Beda Tipe",
      deskripsi: `<p>Buat class <code>Cetak</code> dengan <strong>tiga</strong> method <code>tampil()</code>: menerima <code>int</code>, <code>double</code>, dan <code>string</code>. Dua yang pertama diikuti pindah baris.</p><p>Untuk input <code>7</code>:</p><pre>Bilangan: 7
Desimal: 2.5
Teks: halo</pre><p>Nilai <code>2.5</code> dan <code>halo</code> sudah ditulis di <code>main()</code>.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Cetak {\npublic:\n    // Buat tiga method tampil() dengan tipe parameter berbeda\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    Cetak c;\n    c.tampil(n);\n    c.tampil(2.5);\n    c.tampil(\"halo\");\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Bilangan: 7\nDesimal: 2.5\nTeks: halo",
      petunjuk: `Compiler memilih berdasarkan tipe argumennya, tanpa kamu perlu menyebut versinya.`
    },
    {
      judul: "Overloading Beda Jumlah",
      deskripsi: `<p>Buat class <code>Jumlah</code> dengan dua method <code>hitung()</code>: satu menerima dua bilangan, satu menerima tiga.</p><p>Untuk input <code>3 4 5</code>:</p><pre>Dua angka: 7
Tiga angka: 12</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Jumlah {\npublic:\n    // Buat dua method hitung() dengan jumlah parameter berbeda\n    \n};\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    Jumlah j;\n    cout << \"Dua angka: \" << j.hitung(a, b) << endl;\n    cout << \"Tiga angka: \" << j.hitung(a, b, c);\n    return 0;\n}\n",
      stdin: "3 4 5\n",
      expected: "Dua angka: 7\nTiga angka: 12",
      petunjuk: `Keduanya bernama sama; yang membedakan hanya banyaknya parameter.`
    },
    {
      judul: "Overriding, Bukan Overloading",
      deskripsi: `<p>Buat class <code>Induk</code> dengan method <code>kerja()</code> yang mencetak <code>Induk bekerja</code> lalu pindah baris, dan class <code>Anak</code> yang <strong>meng-override</strong>-nya jadi <code>Anak bekerja</code>.</p><pre>Induk bekerja
Anak bekerja</pre><p>Perhatikan: parameternya sama persis (sama-sama kosong) — itulah tandanya overriding, bukan overloading.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\npublic:\n    // method kerja()\n    \n};\n\n// class Anak yang meng-override kerja()\n\nint main() {\n    Induk i;\n    Anak a;\n    i.kerja();\n    a.kerja();\n    return 0;\n}\n",
      expected: "Induk bekerja\nAnak bekerja",
      petunjuk: `Kalau parameternya kamu buat berbeda, itu berubah jadi overloading, bukan overriding.`
    },
    {
      judul: "Keduanya dalam Satu Program",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan <strong>dua method overload</strong> <code>luas()</code> (satu dan dua parameter) serta satu method <strong>virtual</strong> <code>nama()</code> yang mencetak <code>Bentuk</code>. Buat class <code>Persegi</code> yang <strong>meng-override</strong> <code>nama()</code> jadi <code>Persegi</code>.</p><p>Untuk input <code>6</code>:</p><pre>Overloading 1: 36
Overloading 2: 12
Persegi</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // Dua method luas() (overloading)\n    // Satu method virtual nama()\n    \n};\n\n// class Persegi yang meng-override nama()\n\nint main() {\n    int s;\n    cin >> s;\n    Persegi p;\n    cout << \"Overloading 1: \" << p.luas(s) << endl;\n    cout << \"Overloading 2: \" << p.luas(s, 2) << endl;\n    Bentuk* b = &p;\n    b->nama();\n    return 0;\n}\n",
      stdin: "6\n",
      expected: "Overloading 1: 36\nOverloading 2: 12\nPersegi",
      petunjuk: `Overloading diwariskan apa adanya; <code>nama()</code> yang di-override oleh Persegi.`
    },
    {
      judul: "Mengembalikan Versi Induk yang Tersembunyi",
      deskripsi: `<p>Buat class <code>Induk</code> dengan dua overload <code>sapa()</code>: tanpa parameter (<code>Sapa tanpa nama</code>) dan dengan <code>string</code> (<code>Sapa &lt;nama&gt;</code>). Buat class <code>Anak</code> yang menambah <code>sapa(int)</code> (<code>Sapa nomor &lt;n&gt;</code>).</p><p>Supaya kedua versi induk tidak tersembunyi, tambahkan <code>using Induk::sapa;</code> di dalam Anak. Dua yang pertama diikuti pindah baris.</p><pre>Sapa tanpa nama
Sapa Andi
Sapa nomor 7</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Induk {\npublic:\n    // Dua overload sapa(): tanpa parameter dan dengan string\n    \n};\n\nclass Anak : public Induk {\npublic:\n    // Tambahkan using Induk::sapa; lalu buat sapa(int)\n    \n};\n\nint main() {\n    Anak a;\n    a.sapa();\n    a.sapa(\"Andi\");\n    a.sapa(7);\n    return 0;\n}\n",
      expected: "Sapa tanpa nama\nSapa Andi\nSapa nomor 7",
      petunjuk: `Tanpa <code>using Induk::sapa;</code>, dua baris pertama akan gagal dikompilasi.`
    }
  ]
};
