/* =========================================================
   Pertemuan 9: Constructor
   Modul 2 — Class & Object
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[9] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami apa itu <strong>constructor</strong> dan kapan ia dijalankan.</li>
    <li>Membuat constructor tanpa parameter dan dengan parameter.</li>
    <li>Memakai constructor untuk mengisi nilai awal objek.</li>
  </ul>

  <h2>📖 Apa itu Constructor?</h2>
  <p><strong>Constructor</strong> adalah method khusus yang dijalankan <em>otomatis</em>
     tepat saat objek dibuat. Kamu tidak perlu memanggilnya sendiri.</p>
  <p>Ciri-cirinya ada dua, dan keduanya wajib:</p>
  <ul>
    <li>Namanya <strong>persis sama</strong> dengan nama class-nya.</li>
    <li><strong>Tidak punya tipe kembalian</strong> — bahkan <code>void</code> pun tidak boleh.</li>
  </ul>

  <div class="callout">
    <strong>Analogi Pabrik Motor 🏍️</strong>
    Constructor itu seperti bagian perakitan di pabrik. Begitu satu motor selesai dirakit,
    tangkinya sudah terisi, nomor rangkanya sudah tertempel. Kamu tidak perlu mengisi
    semuanya satu per satu setelah motornya keluar pabrik.
  </div>

  <h2>🏗️ Constructor Tanpa Parameter</h2>
  <pre><code>class Rekening {
public:
    int saldo;

    Rekening() {          // nama sama dengan class, tanpa tipe kembalian
        saldo = 0;        // nilai awal ditentukan di sini
        cout &lt;&lt; "Rekening baru dibuat" &lt;&lt; endl;
    }
};

int main() {
    Rekening r;           // constructor jalan OTOMATIS di baris ini
    cout &lt;&lt; r.saldo;      // 0
}</code></pre>

  <h2>🎯 Constructor dengan Parameter</h2>
  <p>Supaya tiap objek bisa lahir dengan nilai berbeda, constructor boleh menerima parameter:</p>
  <pre><code>class Siswa {
public:
    string nama;
    int umur;

    Siswa(string n, int u) {
        nama = n;
        umur = u;
    }
};

int main() {
    Siswa a("Andi", 16);   // nilainya diberikan saat objek dibuat
    Siswa b("Sari", 17);
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Umum</strong>
    Begitu kamu membuat constructor <em>berparameter</em>, C++ tidak lagi menyediakan
    constructor kosong secara gratis. Jadi <code>Siswa c;</code> akan error kecuali kamu
    juga menuliskan <code>Siswa() { }</code> sendiri.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Constructor jalan <strong>otomatis</strong> saat objek dibuat.</li>
    <li>Namanya sama dengan class, dan tidak punya tipe kembalian.</li>
    <li>Gunanya: mengisi nilai awal supaya objek tidak berisi sampah.</li>
    <li>Boleh menerima parameter agar tiap objek lahir dengan nilai berbeda.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Constructor Pertama",
      deskripsi: `<p>Buat class <code>Sapaan</code> yang punya <strong>constructor</strong>. Di dalam constructor, cetak kalimat berikut:</p><pre>Objek berhasil dibuat!</pre><p>Di <code>main()</code>, cukup buat satu objeknya — jangan panggil method apa pun.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Sapaan {\npublic:\n    // Buat constructor di sini\n    \n};\n\nint main() {\n    Sapaan s;   // constructor jalan otomatis di sini\n    return 0;\n}\n",
      expected: "Objek berhasil dibuat!",
      petunjuk: `Constructor bernama sama dengan class dan tanpa tipe: <code>Sapaan() { ... }</code>`
    },
    {
      judul: "Constructor dengan Parameter",
      deskripsi: `<p>Buat class <code>Mobil</code> dengan atribut <code>merek</code> dan <code>kursi</code>. Isi keduanya lewat <strong>constructor berparameter</strong>, lalu buat method <code>info()</code> untuk menampilkannya.</p><p>Untuk input <code>Avanza 7</code>:</p><pre>Mobil Avanza, 7 kursi</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Mobil {\npublic:\n    string merek;\n    int kursi;\n    // Buat constructor Mobil(string, int) dan method info()\n    \n};\n\nint main() {\n    string m;\n    int k;\n    cin >> m >> k;\n    Mobil mob(m, k);\n    mob.info();\n    return 0;\n}\n",
      stdin: "Avanza 7\n",
      expected: "Mobil Avanza, 7 kursi",
      petunjuk: `<code>Mobil(string m, int k) { merek = m; kursi = k; }</code>`
    },
    {
      judul: "Constructor Persegi",
      deskripsi: `<p>Buat class <code>Persegi</code> yang menerima panjang sisi lewat <strong>constructor</strong>, lalu punya method <code>luas()</code>.</p><p>Untuk input <code>7</code>:</p><pre>Luas: 49</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    // Buat constructor Persegi(int) dan method luas()\n    \n};\n\nint main() {\n    int s;\n    cin >> s;\n    Persegi p(s);\n    // Cetak luasnya\n    \n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Luas: 49",
      petunjuk: `Objek dibuat dengan nilai: <code>Persegi p(s);</code> — nilainya masuk ke constructor.`
    },
    {
      judul: "Nilai Awal dari Constructor",
      deskripsi: `<p>Buat class <code>Rekening</code> dengan atribut <strong>private</strong> <code>saldo</code>. Constructor tanpa parameter harus mengisi saldo dengan <strong>0</strong>. Sediakan juga <code>setor(int)</code> dan <code>getSaldo()</code>.</p><p>Untuk input <code>500</code>:</p><pre>Saldo awal 0, setelah setor: 500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Rekening {\nprivate:\n    int saldo;\npublic:\n    // Buat constructor yang mengisi saldo = 0,\n    // lalu setor(int) dan getSaldo()\n    \n};\n\nint main() {\n    int j;\n    cin >> j;\n    Rekening r;\n    r.setor(j);\n    cout << \"Saldo awal 0, setelah setor: \" << r.getSaldo();\n    return 0;\n}\n",
      stdin: "500\n",
      expected: "Saldo awal 0, setelah setor: 500",
      petunjuk: `Tanpa constructor, isi <code>saldo</code> tidak menentu — bisa berupa angka sampah.`
    },
    {
      judul: "Dua Objek, Dua Sapaan",
      deskripsi: `<p>Buat class <code>Siswa</code> yang constructornya menerima nama dan langsung mencetak sapaan diikuti pindah baris.</p><p>Untuk input <code>Andi Sari</code>:</p><pre>Halo, Andi!
Halo, Sari!</pre><p>Perhatikan: kamu hanya membuat dua objek — sapaan muncul sendiri.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    // Buat constructor Siswa(string) yang mencetak sapaan\n    \n};\n\nint main() {\n    string a, b;\n    cin >> a >> b;\n    Siswa s1(a);\n    Siswa s2(b);\n    return 0;\n}\n",
      stdin: "Andi Sari\n",
      expected: "Halo, Andi!\nHalo, Sari!",
      petunjuk: `Di dalam constructor: <code>cout &lt;&lt; "Halo, " &lt;&lt; nama &lt;&lt; "!" &lt;&lt; endl;</code>`
    }
  ]
};
