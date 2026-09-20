/* =========================================================
   PRA TERM-QUIZ — satu soal ringan dari tiap Pertemuan 1 s.d. 11
   11 soal, 60 menit.

   Sifatnya pemanasan: soalnya sengaja pendek dan langsung, supaya
   siswa mengecek dulu bagian mana yang masih goyah sebelum
   Term-Quiz yang sesungguhnya.

   Dibuka otomatis sesuai 'bukaPada' di assets/js/kurikulum.js,
   dan hanya setelah Pertemuan 11 lulus ujian.

   --- Tips Mengajar (tidak tampil ke siswa) -------------------
   Soal 3, 8, dan 11 adalah penanda paling berguna: kalau siswa
   tersendat di situ, biasanya yang belum nyantol adalah fungsi,
   access modifier, dan validasi di setter — tiga hal yang paling
   banyak dipakai di Term-Quiz nanti.
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[102] = {
  waktuMenit: 60,

  konten: `
  <h2>Yang Diuji</h2>
  <table>
    <tr><th>Soal</th><th>Materi</th><th>Pertemuan</th></tr>
    <tr><td>1</td><td>Istilah dasar OOP</td><td>1</td></tr>
    <tr><td>2</td><td>Variabel, tipe data, dan I/O</td><td>2</td></tr>
    <tr><td>3</td><td>Fungsi dan percabangan</td><td>3</td></tr>
    <tr><td>4</td><td>Array</td><td>4</td></tr>
    <tr><td>5</td><td>Struct</td><td>5</td></tr>
    <tr><td>6</td><td>Class dan object pertama</td><td>6</td></tr>
    <tr><td>7</td><td>Atribut dan method</td><td>7</td></tr>
    <tr><td>8</td><td>Access modifier</td><td>8</td></tr>
    <tr><td>9</td><td>Constructor</td><td>9</td></tr>
    <tr><td>10</td><td>Destructor</td><td>10</td></tr>
    <tr><td>11</td><td>Encapsulation dan getter/setter</td><td>11</td></tr>
  </table>
  `,

  soal: [
    {
      judul: "Class dan Perilakunya",
      deskripsi: `<p>Baca <strong>nama class</strong> dan <strong>satu perilakunya</strong>, lalu cetak keduanya.</p><p>Untuk input <code>Mobil melaju</code>:</p><pre>Class: Mobil
Perilaku: melaju</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string namaClass, perilaku;\n    cin >> namaClass >> perilaku;\n    // Cetak dua barisnya\n    \n    return 0;\n}\n",
      stdin: "Mobil melaju\n",
      expected: "Class: Mobil\nPerilaku: melaju",
      petunjuk: `Dua baris terpisah — pakai <code>endl</code> di baris pertama.`
    },
    {
      judul: "Menjumlahkan Dua Bilangan",
      deskripsi: `<p>Baca dua bilangan bulat, lalu cetak jumlahnya.</p><p>Untuk input <code>12 30</code>:</p><pre>Jumlah: 42</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Cetak jumlahnya\n    \n    return 0;\n}\n",
      stdin: "12 30\n",
      expected: "Jumlah: 42",
      petunjuk: `Cukup satu baris <code>cout</code>.`
    },
    {
      judul: "Fungsi Ganjil atau Genap",
      deskripsi: `<p>Buat <strong>fungsi</strong> <code>jenis(int n)</code> yang mengembalikan <code>string</code>: <code>"ganjil"</code> atau <code>"genap"</code>. Panggil fungsi itu dari <code>main()</code>.</p><p>Untuk input <code>7</code>:</p><pre>7 adalah ganjil</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring jenis(int n) {\n    // Kembalikan \"ganjil\" atau \"genap\"\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n    // Cetak: <n> adalah <jenis>\n    \n    return 0;\n}\n",
      stdin: "7\n",
      expected: "7 adalah ganjil",
      petunjuk: `Sisa bagi dua: <code>n % 2</code>. Kalau hasilnya 0 berarti genap.`
    },
    {
      judul: "Total Isi Array",
      deskripsi: `<p>Baca 5 bilangan ke dalam sebuah array, lalu cetak totalnya.</p><p>Untuk input <code>4 8 15 16 23</code>:</p><pre>Total: 66</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a[5];\n    for (int i = 0; i < 5; i++) cin >> a[i];\n    // Jumlahkan isinya, lalu cetak\n    \n    return 0;\n}\n",
      stdin: "4 8 15 16 23\n",
      expected: "Total: 66",
      petunjuk: `Siapkan <code>int total = 0;</code> dulu, baru dijumlahkan di dalam perulangan.`
    },
    {
      judul: "Struct Siswa",
      deskripsi: `<p>Buat <code>struct Siswa</code> beranggota <code>nama</code> dan <code>nilai</code>. Isi dari input, lalu cetak isinya.</p><p>Untuk input <code>Rina 88</code>:</p><pre>Nama: Rina
Nilai: 88</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Siswa {\n    // Tulis anggota struct di sini\n    \n};\n\nint main() {\n    Siswa s;\n    cin >> s.nama >> s.nilai;\n    // Cetak nama dan nilainya\n    \n    return 0;\n}\n",
      stdin: "Rina 88\n",
      expected: "Nama: Rina\nNilai: 88",
      petunjuk: `Anggota struct diakses dengan titik: <code>s.nama</code>.`
    },
    {
      judul: "Class Pertama",
      deskripsi: `<p>Buat class <code>Sapaan</code> dengan satu method <code>halo(string nama)</code> yang mencetak sapaan.</p><p>Untuk input <code>Budi</code>:</p><pre>Halo, Budi!</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Sapaan {\npublic:\n    // Buat method halo(string nama)\n    \n};\n\nint main() {\n    string n;\n    cin >> n;\n    Sapaan s;\n    s.halo(n);\n    return 0;\n}\n",
      stdin: "Budi\n",
      expected: "Halo, Budi!",
      petunjuk: `Method-nya bertipe <code>void</code> karena hanya mencetak, tidak mengembalikan nilai.`
    },
    {
      judul: "Atribut dan Method",
      deskripsi: `<p>Buat class <code>Persegi</code> dengan atribut <code>sisi</code> dan method <code>luas()</code> yang mengembalikan luasnya.</p><p>Untuk input <code>6</code>:</p><pre>Luas: 36</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Persegi {\npublic:\n    int sisi;\n    // Buat method luas()\n    \n};\n\nint main() {\n    Persegi p;\n    cin >> p.sisi;\n    cout << \"Luas: \" << p.luas();\n    return 0;\n}\n",
      stdin: "6\n",
      expected: "Luas: 36",
      petunjuk: `<code>luas()</code> mengembalikan <code>int</code>, bukan mencetak sendiri.`
    },
    {
      judul: "Private dan Public",
      deskripsi: `<p>Buat class <code>Akun</code> dengan atribut <strong>private</strong> <code>nama</code>, serta method <strong>public</strong> <code>setNama(string)</code> dan <code>getNama()</code>.</p><p>Untuk input <code>Dewi</code>:</p><pre>Nama: Dewi</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Akun {\nprivate:\n    string nama;\npublic:\n    // Buat setNama(string) dan getNama()\n    \n};\n\nint main() {\n    string n;\n    cin >> n;\n    Akun a;\n    a.setNama(n);\n    cout << \"Nama: \" << a.getNama();\n    return 0;\n}\n",
      stdin: "Dewi\n",
      expected: "Nama: Dewi",
      petunjuk: `<code>getNama()</code> mengembalikan <code>string</code>.`
    },
    {
      judul: "Constructor Buku",
      deskripsi: `<p>Buat class <code>Buku</code> yang atributnya diisi lewat <strong>constructor</strong> <code>Buku(string, int)</code>, lalu method <code>tampil()</code> untuk mencetaknya.</p><p>Untuk input <code>Fisika 25000</code>:</p><pre>Judul: Fisika
Harga: 25000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Buku {\n    string judul;\n    int harga;\npublic:\n    // Buat constructor Buku(string, int) dan method tampil()\n    \n};\n\nint main() {\n    string j;\n    int h;\n    cin >> j >> h;\n    Buku b(j, h);\n    b.tampil();\n    return 0;\n}\n",
      stdin: "Fisika 25000\n",
      expected: "Judul: Fisika\nHarga: 25000",
      petunjuk: `Nama constructor harus sama persis dengan nama class, dan tidak punya tipe kembalian.`
    },
    {
      judul: "Constructor dan Destructor",
      deskripsi: `<p>Buat class <code>Kotak</code> yang <strong>constructor</strong>-nya mencetak <code>Objek dibuat</code> dan <strong>destructor</strong>-nya mencetak <code>Objek dihapus</code>.</p><p>Soal ini tidak memakai input. Keluarannya:</p><pre>Objek dibuat
Objek dihapus</pre><p>Destructor berjalan sendiri saat objeknya habis masa pakai — kamu tidak perlu memanggilnya.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    // Buat constructor dan destructor\n    \n};\n\nint main() {\n    Kotak k;\n    return 0;\n}\n",
      stdin: "",
      expected: "Objek dibuat\nObjek dihapus",
      petunjuk: `Destructor ditulis dengan tanda <code>~</code> di depan nama class.`
    },
    {
      judul: "Setter yang Memeriksa",
      deskripsi: `<p>Buat class <code>Dompet</code> dengan atribut <strong>private</strong> <code>saldo</code>. Method <code>setSaldo(int)</code> harus <strong>menolak nilai negatif</strong> — kalau yang masuk kurang dari 0, simpan 0 saja. Sediakan juga <code>getSaldo()</code>.</p><p>Untuk input <code>-500</code>:</p><pre>Saldo: 0</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Dompet {\nprivate:\n    int saldo;\npublic:\n    // Buat setSaldo(int) yang menolak nilai negatif, dan getSaldo()\n    \n};\n\nint main() {\n    int x;\n    cin >> x;\n    Dompet d;\n    d.setSaldo(x);\n    cout << \"Saldo: \" << d.getSaldo();\n    return 0;\n}\n",
      stdin: "-500\n",
      expected: "Saldo: 0",
      petunjuk: `Inilah gunanya atribut dibuat private: nilainya hanya bisa masuk lewat pintu yang kamu periksa sendiri.`
    }
  ]
};
