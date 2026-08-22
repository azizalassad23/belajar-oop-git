/* =========================================================
   Pertemuan 17: Operator Overloading
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[17] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami apa itu <strong>operator overloading</strong>.</li>
    <li>Membuat operator <code>+</code>, <code>-</code>, dan <code>==</code> bekerja pada objek.</li>
    <li>Membuat objek bisa dicetak langsung dengan <code>cout</code>.</li>
  </ul>

  <h2>📖 Kenapa Operator Perlu Di-<em>overload</em>?</h2>
  <p>C++ sudah tahu cara menjumlahkan dua <code>int</code>. Tapi ia tidak tahu apa artinya
     menjumlahkan dua objek <code>Titik</code> buatanmu. Kalau dibiarkan, kamu harus menulis:</p>
  <pre><code>Titik h = tambahTitik(p, q);      // panjang dan kaku</code></pre>
  <p>Dengan operator overloading, kamu bisa menulis yang jauh lebih wajar:</p>
  <pre><code>Titik h = p + q;                  // langsung terbaca maksudnya</code></pre>

  <div class="callout">
    <strong>Analogi Kata "Tambah" ➕</strong>
    "Tambah" untuk uang berarti menjumlahkan nominal. "Tambah" untuk gerbong kereta berarti
    menyambung rangkaian. Katanya sama, artinya menyesuaikan bendanya. Operator overloading
    membuat <code>+</code> berperilaku begitu.
  </div>

  <h2>➕ Overload Operator +</h2>
  <pre><code>class Titik {
public:
    int x, y;
    Titik(int a = 0, int b = 0) { x = a; y = b; }

    Titik operator+(Titik lain) {
        return Titik(x + lain.x, y + lain.y);
    }
};

int main() {
    Titik p(3, 4), q(10, 20);
    Titik h = p + q;              // memanggil p.operator+(q)
    cout &lt;&lt; h.x &lt;&lt; ", " &lt;&lt; h.y;   // 13, 24
}</code></pre>
  <p>Objek di <strong>kiri</strong> tanda <code>+</code> adalah pemilik method-nya; objek di
     kanan masuk sebagai parameter.</p>

  <h2>🟰 Overload Operator ==</h2>
  <p>Untuk perbandingan, kembalikan <code>bool</code>:</p>
  <pre><code>    bool operator==(Persegi lain) {
        return sisi == lain.sisi;
    }</code></pre>

  <h2>🖨️ Overload Operator &lt;&lt; agar Bisa Dicetak Langsung</h2>
  <p>Yang ini sedikit berbeda. Objek di kiri <code>&lt;&lt;</code> adalah <code>cout</code>,
     bukan objekmu — jadi operatornya <strong>tidak bisa jadi method</strong>. Ia ditulis di
     luar class sebagai <code>friend</code>:</p>
  <pre><code>class Siswa {
private:
    string nama; int nilai;
public:
    Siswa(string n, int v) { nama = n; nilai = v; }
    friend ostream&amp; operator&lt;&lt;(ostream&amp; out, Siswa s);
};

ostream&amp; operator&lt;&lt;(ostream&amp; out, Siswa s) {
    out &lt;&lt; s.nama &lt;&lt; " (" &lt;&lt; s.nilai &lt;&lt; ")";
    return out;                   // WAJIB, supaya bisa dirangkai
}

int main() {
    Siswa s("Andi", 90);
    cout &lt;&lt; s;                    // Andi (90)
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Jangan Lupa <code>return out;</code></strong>
    Tanpa itu, <code>cout &lt;&lt; a &lt;&lt; b;</code> tidak bisa disambung dan programnya error.
    Alasannya sama dengan <code>return *this;</code> pada method berantai di Pertemuan 12.
  </div>

  <div class="callout tip">
    <strong>💡 Jangan Berlebihan</strong>
    Overload operator hanya kalau maknanya <em>jelas dan wajar</em>. Membuat <code>+</code>
    pada class <code>Siswa</code> berarti apa? Menjumlahkan nilainya? Menggabungkan namanya?
    Kalau pembaca kode harus menebak, lebih baik pakai method bernama jelas seperti
    <code>gabungkan()</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Operator overloading membuat operator biasa bekerja pada objek buatan sendiri.</li>
    <li>Ditulis sebagai method: <code>Tipe operator+(Tipe lain)</code>.</li>
    <li>Objek di kiri operator adalah pemilik method-nya.</li>
    <li><code>&lt;&lt;</code> ditulis di luar class sebagai <code>friend</code> dan wajib
        <code>return out;</code></li>
  </ul>
  `,

  soal: [
    {
      judul: "Operator + untuk Titik",
      deskripsi: `<p>Buat class <code>Titik</code> dengan atribut <code>x</code> dan <code>y</code>, constructor <code>Titik(int a = 0, int b = 0)</code>, dan <strong>overload operator +</strong> yang menjumlahkan keduanya.</p><p>Baca dua titik (empat angka), lalu cetak hasil penjumlahannya.</p><p>Untuk input <code>3 4 10 20</code>:</p><pre>Hasil: (13, 24)</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Titik {\npublic:\n    int x, y;\n    Titik(int a = 0, int b = 0) { x = a; y = b; }\n    // Buat operator+ di sini\n    \n};\n\nint main() {\n    int a, b, c, d;\n    cin >> a >> b >> c >> d;\n    Titik p(a, b), q(c, d);\n    Titik h = p + q;\n    cout << \"Hasil: (\" << h.x << \", \" << h.y << \")\";\n    return 0;\n}\n",
      stdin: "3 4 10 20\n",
      expected: "Hasil: (13, 24)",
      petunjuk: `<code>Titik operator+(Titik lain) { return Titik(x + lain.x, y + lain.y); }</code>`
    },
    {
      judul: "Operator == untuk Persegi",
      deskripsi: `<p>Buat class <code>Persegi</code> dengan atribut <code>sisi</code> yang diisi lewat constructor, lalu <strong>overload operator ==</strong> yang mengembalikan <code>bool</code>.</p><p>Untuk input <code>5 5</code>:</p><pre>Sama: ya</pre><p>Kalau sisinya berbeda, cetak <code>tidak</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    Persegi(int s) { sisi = s; }\n    // Buat operator== di sini\n    \n};\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    Persegi p(a), q(b);\n    cout << \"Sama: \" << ((p == q) ? \"ya\" : \"tidak\");\n    return 0;\n}\n",
      stdin: "5 5\n",
      expected: "Sama: ya",
      petunjuk: `Tipe kembaliannya <code>bool</code>: <code>return sisi == lain.sisi;</code>`
    },
    {
      judul: "Mencetak Objek Langsung",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nama</code> dan <code>nilai</code>. <strong>Overload operator &lt;&lt;</strong> sebagai <code>friend</code> agar objeknya bisa dicetak langsung dengan <code>cout &lt;&lt; s;</code></p><p>Untuk input <code>Andi 90</code>:</p><pre>Andi (90)</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\n    int nilai;\npublic:\n    Siswa(string n, int v) { nama = n; nilai = v; }\n    // Beri izin friend pada operator<< di sini\n    \n};\n\n// Tulis operator<< di sini (di LUAR class), jangan lupa return out;\n\nint main() {\n    string n;\n    int v;\n    cin >> n >> v;\n    Siswa s(n, v);\n    cout << s;\n    return 0;\n}\n",
      stdin: "Andi 90\n",
      expected: "Andi (90)",
      petunjuk: `Bentuknya: <code>ostream&amp; operator&lt;&lt;(ostream&amp; out, Siswa s)</code> dan diakhiri <code>return out;</code>`
    },
    {
      judul: "Operator + dan - untuk Uang",
      deskripsi: `<p>Buat class <code>Uang</code> dengan atribut <code>jumlah</code>, constructor <code>Uang(int j = 0)</code>, serta <strong>overload operator +</strong> dan <strong>-</strong>.</p><p>Untuk input <code>5000 7500</code>:</p><pre>Jumlah: 12500
Selisih: 2500</pre><p>Selisih dihitung dari uang kedua dikurangi uang pertama.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Uang {\npublic:\n    int jumlah;\n    Uang(int j = 0) { jumlah = j; }\n    // Buat operator+ dan operator- di sini\n    \n};\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    Uang x(a), y(b);\n    Uang tambah = x + y;\n    Uang kurang = y - x;\n    cout << \"Jumlah: \" << tambah.jumlah << endl;\n    cout << \"Selisih: \" << kurang.jumlah;\n    return 0;\n}\n",
      stdin: "5000 7500\n",
      expected: "Jumlah: 12500\nSelisih: 2500",
      petunjuk: `Keduanya mengembalikan objek <code>Uang</code> yang baru, bukan mengubah objek asalnya.`
    },
    {
      judul: "Operator ++ untuk Penghitung",
      deskripsi: `<p>Buat class <code>Penghitung</code> dengan atribut <code>nilai</code> dan constructor <code>Penghitung(int n = 0)</code>. <strong>Overload operator ++</strong> (bentuk awalan) yang menambah nilai sebanyak 1 dan mengembalikan <code>Penghitung&amp;</code>.</p><p>Di <code>main()</code>, panggil <code>++c</code> sebanyak dua kali.</p><p>Untuk input <code>7</code>:</p><pre>Setelah dua kali naik: 9</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Penghitung {\npublic:\n    int nilai;\n    Penghitung(int n = 0) { nilai = n; }\n    // Buat operator++ di sini (kembalikan Penghitung&)\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    Penghitung c(n);\n    ++c;\n    ++c;\n    cout << \"Setelah dua kali naik: \" << c.nilai;\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Setelah dua kali naik: 9",
      petunjuk: `Sama seperti method berantai: naikkan nilainya lalu <code>return *this;</code>`
    }
  ]
};
