/* =========================================================
   Pertemuan 30: Templates (Function & Class Template)
   Modul 6 — Topik Lanjutan
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[30] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membuat <strong>function template</strong> yang bekerja untuk banyak tipe.</li>
    <li>Membuat <strong>class template</strong>.</li>
    <li>Memahami kapan template lebih baik daripada overloading.</li>
  </ul>

  <h2>📖 Masalahnya: Kode yang Sama Berulang-ulang</h2>
  <p>Fungsi penjumlahan untuk <code>int</code>, <code>double</code>, dan tipe lain isinya
     sama persis &mdash; hanya tipenya berbeda:</p>
  <pre><code>int    tambah(int a, int b)       { return a + b; }
double tambah(double a, double b) { return a + b; }   // isinya identik</code></pre>
  <p><strong>Template</strong> membuatnya cukup ditulis sekali:</p>
  <pre><code>template &lt;typename T&gt;
T tambah(T a, T b) { return a + b; }

int main() {
    cout &lt;&lt; tambah(7, 3);          // 10     (T menjadi int)
    cout &lt;&lt; tambah(1.5, 2.25);     // 3.75   (T menjadi double)
}</code></pre>
  <p><code>T</code> hanyalah nama &mdash; boleh apa saja. Compiler menebaknya sendiri dari
     argumen yang kamu berikan.</p>

  <div class="callout">
    <strong>Analogi Cetakan Kue yang Bisa Diatur 🍪</strong>
    Alih-alih membeli cetakan terpisah untuk tiap ukuran, kamu punya satu cetakan yang
    bisa disetel. Bentuk kuenya tetap sama, ukurannya menyesuaikan.
  </div>

  <h2>📦 Class Template</h2>
  <p>Class juga bisa dibuat generik. Bedanya, tipenya harus <strong>disebut</strong>
     saat membuat objek:</p>
  <pre><code>template &lt;typename T&gt;
class Kotak {
    T isi;
public:
    void set(T n) { isi = n; }
    T get()       { return isi; }
};

int main() {
    Kotak&lt;int&gt; a;        // tipe ditulis dalam &lt; &gt;
    Kotak&lt;string&gt; b;
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Tipe Harus Mendukung Operasinya</strong>
    <code>tambah(T a, T b)</code> memakai <code>+</code>. Kalau <code>T</code> adalah class
    buatanmu yang belum meng-<em>overload</em> <code>+</code>, kodenya error. Pesan error
    template biasanya panjang dan menakutkan &mdash; baca <strong>baris pertamanya</strong>,
    di situ biasanya letak masalahnya.
  </div>

  <div class="callout tip">
    <strong>💡 Inilah Fondasi STL</strong>
    <code>vector&lt;int&gt;</code>, <code>vector&lt;string&gt;</code> yang akan dipelajari
    di pertemuan berikutnya adalah class template. Sekarang kamu tahu apa arti tanda
    <code>&lt; &gt;</code> itu.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>template &lt;typename T&gt;</code> ditulis tepat di atas fungsi/class.</li>
    <li>Function template: tipenya ditebak otomatis dari argumen.</li>
    <li>Class template: tipenya ditulis sendiri, misal <code>Kotak&lt;int&gt;</code>.</li>
    <li>Menghindari penulisan kode yang sama berulang untuk tiap tipe.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Function Template Pertama",
      deskripsi: `<p>Buat <strong>function template</strong> <code>tambah(T a, T b)</code> yang mengembalikan hasil penjumlahannya.</p><p>Untuk input <code>7 3</code>:</p><pre>Bilangan: 10
Desimal: 3.75</pre><p>Nilai desimalnya sudah ditulis di <code>main()</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat function template tambah(T a, T b)\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << \"Bilangan: \" << tambah(a, b) << endl;\n    cout << \"Desimal: \" << tambah(1.5, 2.25);\n    return 0;\n}\n",
      stdin: "7 3\n",
      expected: "Bilangan: 10\nDesimal: 3.75",
      uji: [{stdin: "20 22\n", h: "3adb0ebd472b515c0206465cc2f4166bb0a8e1937960092f95316522cbe0ac16"}, {stdin: "-5 5\n", h: "1418c2036a27e7b0b30e4ff3293b83169e1b1f16a130390466a23cfb68c3e9cf"}],
      petunjuk: `<code>template &lt;typename T&gt;</code> lalu <code>T tambah(T a, T b) { return a + b; }</code>`
    },
    {
      judul: "Template Mencari Terbesar",
      deskripsi: `<p>Buat function template <code>terbesar(T a, T b)</code> yang mengembalikan nilai yang lebih besar. Uji dengan bilangan dan dengan karakter.</p><p>Untuk input <code>9 4</code>:</p><pre>Terbesar int: 9
Terbesar char: z</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat function template terbesar(T a, T b)\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << \"Terbesar int: \" << terbesar(a, b) << endl;\n    cout << \"Terbesar char: \" << terbesar('z', 'a');\n    return 0;\n}\n",
      stdin: "9 4\n",
      expected: "Terbesar int: 9\nTerbesar char: z",
      uji: [{stdin: "3 11\n", h: "2639546da99df752ff853eaa32333652192e0d400fd493d17a1e3c890f7da268"}, {stdin: "-2 -7\n", h: "62ecfab713c6e0d19aeb73517e39b8e00617339232c223d87856e15c1c35fbbf"}],
      petunjuk: `<code>return (a &gt; b) ? a : b;</code> — perbandingan berlaku juga untuk char.`
    },
    {
      judul: "Class Template",
      deskripsi: `<p>Buat <strong>class template</strong> <code>Kotak</code> dengan atribut <code>isi</code> bertipe <code>T</code>, method <code>set(T)</code> dan <code>get()</code>.</p><p>Di <code>main()</code>, buat <code>Kotak&lt;int&gt;</code> dan <code>Kotak&lt;string&gt;</code>.</p><p>Untuk input <code>5</code>:</p><pre>Isi angka: 5
Isi teks: halo</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\n// Buat class template Kotak\n\nint main() {\n    int n;\n    cin >> n;\n    Kotak<int> a;\n    Kotak<string> b;\n    a.set(n);\n    b.set(\"halo\");\n    cout << \"Isi angka: \" << a.get() << endl;\n    cout << \"Isi teks: \" << b.get();\n    return 0;\n}\n",
      stdin: "5\n",
      expected: "Isi angka: 5\nIsi teks: halo",
      uji: [{stdin: "42\n", h: "c74cf9850b1fcfa1b7d6e84995263e986d8f500d5f2f0ac9cf38c85e74ae0b22"}, {stdin: "0\n", h: "402923f1084fae5c03b3ec45065d5ab347f92dcae44d30101d0762a24e94e531"}],
      petunjuk: `Untuk class, tipenya wajib ditulis: <code>Kotak&lt;int&gt; a;</code>`
    },
    {
      judul: "Template untuk Tiga Tipe",
      deskripsi: `<p>Buat function template <code>cetakTiga(T n)</code> yang mencetak nilai itu <strong>tiga kali</strong> dipisah spasi, diakhiri pindah baris. Perhatikan ada spasi setelah nilai terakhir.</p><p>Untuk input <code>4</code>:</p><pre>4 4 4
2.5 2.5 2.5
x x x</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat function template cetakTiga(T n)\n\nint main() {\n    int n;\n    cin >> n;\n    cetakTiga(n);\n    cetakTiga(2.5);\n    cetakTiga('x');\n    return 0;\n}\n",
      stdin: "4\n",
      expected: "4 4 4\n2.5 2.5 2.5\nx x x",
      uji: [{stdin: "9\n", h: "1d746c77462c3efd7f626d94b402c9068d8a4e2c98ededa00d425e108a8e23a0"}, {stdin: "15\n", h: "f904a65cfb97b17a7678e39409def614640b2416e336a25a279b50307c83afa8"}],
      petunjuk: `Perulangan tiga kali, tiap kali cetak nilai lalu spasi, lalu <code>endl</code> di akhir.`
    },
    {
      judul: "Class Template Pasangan",
      deskripsi: `<p>Buat class template <code>Pasangan</code> dengan dua atribut bertipe <code>T</code>, constructor <code>Pasangan(T, T)</code>, serta method <code>jumlah()</code> dan <code>selisih()</code>.</p><p>Untuk input <code>8 2</code>:</p><pre>Jumlah: 10
Selisih: 6</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat class template Pasangan\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    Pasangan<int> p(x, y);\n    cout << \"Jumlah: \" << p.jumlah() << endl;\n    cout << \"Selisih: \" << p.selisih();\n    return 0;\n}\n",
      stdin: "8 2\n",
      expected: "Jumlah: 10\nSelisih: 6",
      uji: [{stdin: "15 4\n", h: "6c02411fa62665a407390311426e5c7f987c481a5d9b79f9d22fcae74dbf3670"}, {stdin: "6 6\n", h: "ab899ac28af8a4ac2d2cc0a7a89a5d3d866ee0075019ed9d526d416ad949f42e"}],
      petunjuk: `Constructor dan method tetap ditulis biasa; hanya tipenya yang diganti <code>T</code>.`
    }
  ]
};
