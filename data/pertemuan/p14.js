/* =========================================================
   Pertemuan 14: Constructor Overloading & Default Argument
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[14] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membuat <strong>beberapa constructor</strong> dalam satu class.</li>
    <li>Memahami cara C++ memilih constructor yang dipakai.</li>
    <li>Memakai <strong>default argument</strong> untuk memperpendek kode.</li>
  </ul>

  <h2>📖 Satu Class, Banyak Cara Membuat Objek</h2>
  <p><strong>Overloading</strong> artinya membuat beberapa fungsi bernama sama, tapi
     <em>daftar parameternya berbeda</em>. C++ memilih sendiri yang cocok berdasarkan
     argumen yang kamu berikan.</p>
  <pre><code>class Persegi {
public:
    int sisi;

    Persegi()       { sisi = 1; }   // dipakai saat: Persegi a;
    Persegi(int s)  { sisi = s; }   // dipakai saat: Persegi b(7);
};</code></pre>

  <div class="callout">
    <strong>Analogi Pesan Minuman ☕</strong>
    Kamu bisa bilang "kopi" saja (ukurannya standar), atau "kopi ukuran besar".
    Kata pesanannya sama, tapi keterangannya berbeda — dan pelayannya tahu bedanya.
  </div>

  <h2>⚡ Default Argument</h2>
  <p>Kalau perbedaannya cuma soal "diisi atau tidak", tidak perlu menulis dua constructor.
     Beri saja nilai bawaan pada parameternya:</p>
  <pre><code>class Kotak {
public:
    int panjang, lebar;
    Kotak(int p, int l = 2) {   // lebar boleh tidak diisi
        panjang = p;
        lebar = l;
    }
};

int main() {
    Kotak a(5);        // lebar otomatis 2
    Kotak b(5, 10);    // lebar diisi 10
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Aturan yang Sering Dilanggar</strong>
    Parameter bernilai bawaan <strong>harus berada di paling kanan</strong>.
    Menulis <code>Kotak(int p = 2, int l)</code> akan error, karena C++ jadi tidak tahu
    angka pertama yang kamu kirim itu untuk <code>p</code> atau untuk <code>l</code>.
  </div>

  <div class="callout tip">
    <strong>💡 Hati-hati Bentrok</strong>
    Kalau kamu punya <code>Kotak()</code> dan sekaligus <code>Kotak(int p = 5)</code>,
    lalu menulis <code>Kotak a;</code> — C++ bingung harus pakai yang mana, dan
    programnya error. Pilih salah satu gaya saja.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Satu class boleh punya banyak constructor asal parameternya berbeda.</li>
    <li>C++ memilih otomatis berdasarkan argumen yang diberikan.</li>
    <li>Default argument memberi nilai cadangan kalau argumennya tidak dikirim.</li>
    <li>Parameter bawaan wajib ditulis di posisi paling kanan.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Dua Constructor",
      deskripsi: `<p>Buat class <code>Persegi</code> dengan <strong>dua constructor</strong>: tanpa parameter (sisi menjadi 1) dan dengan satu parameter. Tambahkan method <code>luas()</code>.</p><p>Untuk input <code>7</code>:</p><pre>Tanpa parameter: 1
Dengan parameter: 49</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    // Buat dua constructor dan method luas()\n    \n};\n\nint main() {\n    int s;\n    cin >> s;\n    Persegi a;\n    Persegi b(s);\n    cout << \"Tanpa parameter: \" << a.luas() << endl;\n    cout << \"Dengan parameter: \" << b.luas();\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Tanpa parameter: 1\nDengan parameter: 49",
      uji: [{stdin: "4\n", h: "6698ca50328c66e16c1c768f1f66a67af7f6562d31a5374a4bae449d0ab1f409"}, {stdin: "10\n", h: "720f96fce4a8a6be95e029640438be0e63bb7bee101a99531c963846a4b773be"}],
      petunjuk: `Keduanya bernama <code>Persegi</code>, yang membedakan hanya daftar parameternya.`
    },
    {
      judul: "Tiga Cara Membuat Mobil",
      deskripsi: `<p>Buat class <code>Mobil</code> dengan <strong>tiga constructor</strong>:</p><ul><li>tanpa parameter — merek <code>Belum diisi</code>, kursi <code>0</code>;</li><li>satu parameter (merek) — kursi otomatis <code>4</code>;</li><li>dua parameter (merek dan kursi).</li></ul><p>Tambahkan <code>info()</code> yang mencetak <code>&lt;merek&gt; (&lt;kursi&gt; kursi)</code> lalu pindah baris.</p><p>Untuk input <code>Avanza 7</code>:</p><pre>Belum diisi (0 kursi)
Avanza (4 kursi)
Avanza (7 kursi)</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Mobil {\npublic:\n    string merek;\n    int kursi;\n    // Buat tiga constructor dan method info()\n    \n};\n\nint main() {\n    string m;\n    int k;\n    cin >> m >> k;\n    Mobil a;\n    Mobil b(m);\n    Mobil c(m, k);\n    a.info();\n    b.info();\n    c.info();\n    return 0;\n}\n",
      stdin: "Avanza 7\n",
      expected: "Belum diisi (0 kursi)\nAvanza (4 kursi)\nAvanza (7 kursi)",
      uji: [{stdin: "Brio 5\n", h: "f5efb2a6467ba286021db8b2af80a17c9ca5f266c5c001ad6aa74649f77f1b1d"}, {stdin: "Innova 8\n", h: "f208e4e23cd7fa1a535682f8cfccecf35571edbd871da3d45079c9d46440aef8"}],
      petunjuk: `C++ memilih constructor berdasarkan jumlah argumen yang kamu tulis di dalam kurung.`
    },
    {
      judul: "Default Argument",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan <strong>satu</strong> constructor saja: <code>Kotak(int p, int l = 2)</code>. Tambahkan method <code>luas()</code>.</p><p>Untuk input <code>5</code>:</p><pre>Lebar bawaan: 10
Lebar diisi: 50</pre><p>Objek pertama dibuat dengan <code>Kotak a(p)</code>, yang kedua dengan <code>Kotak b(p, 10)</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    int panjang, lebar;\n    // Buat satu constructor dengan default argument, dan luas()\n    \n};\n\nint main() {\n    int p;\n    cin >> p;\n    Kotak a(p);\n    Kotak b(p, 10);\n    cout << \"Lebar bawaan: \" << a.luas() << endl;\n    cout << \"Lebar diisi: \" << b.luas();\n    return 0;\n}\n",
      stdin: "5\n",
      expected: "Lebar bawaan: 10\nLebar diisi: 50",
      uji: [{stdin: "7\n", h: "29c83c1155828dd028a107d88bafa37b77ccd2dafe0e548909cc59552552adf9"}, {stdin: "3\n", h: "7ba09bf7074f9053dc2865f06b65987addb44471db69d34b7c32b0cd63d2d17a"}],
      petunjuk: `Nilai bawaan ditulis langsung di parameternya: <code>int l = 2</code>.`
    },
    {
      judul: "Siswa dengan atau tanpa Nilai",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan dua constructor: satu hanya menerima nama (nilai jadi <code>0</code>), satu lagi menerima nama dan nilai. Tambahkan <code>tampil()</code> yang mencetak <code>&lt;nama&gt;: &lt;nilai&gt;</code> lalu pindah baris.</p><p>Untuk input <code>Andi</code>:</p><pre>Andi: 0
Andi: 90</pre><p>Objek kedua dibuat dengan nilai 90.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    int nilai;\n    // Buat dua constructor dan method tampil()\n    \n};\n\nint main() {\n    string n;\n    cin >> n;\n    Siswa a(n);\n    Siswa b(n, 90);\n    a.tampil();\n    b.tampil();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Andi: 0\nAndi: 90",
      uji: [{stdin: "Sari\n", h: "c1aca527265aac82b4ae98f32b2c8451de50b4db822b7508a72da0fc049aae4b"}, {stdin: "Budi\n", h: "38892ea03ef0e02b746989fc5166a9255b1ed8efd496b69883222e90e277f7d0"}],
      petunjuk: `Constructor pertama cukup mengisi <code>nilai = 0;</code> sendiri.`
    },
    {
      judul: "Deret dengan Nilai Bawaan",
      deskripsi: `<p>Buat class <code>Deret</code> dengan atribut <code>mulai</code> dan <code>langkah</code>. Constructornya <code>Deret(int m = 1, int l = 1)</code> — <strong>kedua parameternya punya nilai bawaan</strong>.</p><p>Tambahkan <code>cetak(int n)</code> yang mencetak <code>n</code> bilangan, dipisah satu spasi, <strong>tanpa spasi di akhir</strong>.</p><p>Untuk input <code>3</code>:</p><pre>Bawaan: 1 2 3
Diisi: 10 15 20</pre><p>Objek kedua dibuat dengan <code>Deret b(10, 5)</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Deret {\npublic:\n    int mulai, langkah;\n    // Buat constructor dengan dua default argument,\n    // dan method cetak(int n)\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    Deret a;\n    Deret b(10, 5);\n    cout << \"Bawaan: \";\n    a.cetak(n);\n    cout << endl << \"Diisi: \";\n    b.cetak(n);\n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Bawaan: 1 2 3\nDiisi: 10 15 20",
      uji: [{stdin: "5\n", h: "4ca675c1589caedced70ebeec3359739699e59f2e0019797d6060eded855b573"}, {stdin: "1\n", h: "48e6f595a8b671d0e1cf1a7762d7ea5f35495c757e6939fedc38a103e70666b0"}],
      petunjuk: `Supaya tidak ada spasi berlebih di akhir: cetak spasi hanya kalau <code>i &lt; n-1</code>.`
    }
  ]
};
