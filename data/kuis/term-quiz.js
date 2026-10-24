/* =========================================================
   TERM-QUIZ — satu soal dari tiap Pertemuan 1 s.d. 11
   11 soal, 90 menit.

   Satu tingkat di atas Pra Term-Quiz: tiap soal menggabungkan
   konsep pertemuannya dengan satu langkah logika tambahan
   (perulangan, perbandingan, atau validasi). Kode bantuan tetap
   diberikan, tapi bagian yang diuji selalu dikosongkan.

   Dibuka otomatis sesuai 'bukaPada' di assets/js/kurikulum.js.
   Hasilnya masuk ke sheet 'term-quiz', terpisah dari 'Progress'.

   --- Tips Mengajar (tidak tampil ke siswa) -------------------
   Soal 4, 8, dan 10 paling membedakan siswa yang paham dari yang
   menghafal: reference di dalam perulangan, method yang
   mengembalikan bool untuk menolak transaksi, dan urutan hidup
   objek (new/delete dan blok). Kalau banyak yang gagal di situ,
   tiga topik itu yang perlu diulang sebelum masuk Pertemuan 12.

   Soal 10 dinilai dari keluarannya saja. Siswa yang langsung
   mencetak enam baris tanpa class memang akan lolos penilaian
   otomatis — periksa kodenya kalau ragu.
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[103] = {
  waktuMenit: 90,

  konten: `
  <h2>Yang Diuji</h2>
  <table>
    <tr><th>Soal</th><th>Materi</th><th>Pertemuan</th></tr>
    <tr><td>1</td><td>Class dan objek</td><td>1</td></tr>
    <tr><td>2</td><td>Operator bagi dan sisa bagi</td><td>2</td></tr>
    <tr><td>3</td><td>Fungsi dan perulangan</td><td>3</td></tr>
    <tr><td>4</td><td>Array dan reference</td><td>4</td></tr>
    <tr><td>5</td><td>Array of struct</td><td>5</td></tr>
    <tr><td>6</td><td>Objek yang mandiri</td><td>6</td></tr>
    <tr><td>7</td><td>Method dengan parameter objek</td><td>7</td></tr>
    <tr><td>8</td><td>Access modifier dan validasi</td><td>8</td></tr>
    <tr><td>9</td><td>Constructor yang menghitung</td><td>9</td></tr>
    <tr><td>10</td><td>Masa hidup objek</td><td>10</td></tr>
    <tr><td>11</td><td>Getter, setter, dan aturan</td><td>11</td></tr>
  </table>
  `,

  soal: [
    {
      judul: "Satu Class, Banyak Objek",
      deskripsi: `<p>Baca <strong>nama class</strong>, lalu <strong>banyaknya objek</strong>, lalu <strong>nama tiap objek</strong>. Cetak satu baris untuk tiap objek, lalu jumlah seluruhnya.</p><p>Untuk input <code>Kucing 3 tom garfield oyen</code>:</p><pre>tom adalah objek dari class Kucing
garfield adalah objek dari class Kucing
oyen adalah objek dari class Kucing
Total objek: 3</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string namaClass;\n    int n;\n    cin >> namaClass >> n;\n\n    // Baca n nama objek satu per satu, cetak barisnya,\n    // lalu cetak total objek di akhir.\n    \n    return 0;\n}\n",
      stdin: "Kucing 3 tom garfield oyen\n",
      expected: "tom adalah objek dari class Kucing\ngarfield adalah objek dari class Kucing\noyen adalah objek dari class Kucing\nTotal objek: 3",
      uji: [{stdin: "Mobil 2 avanza brio\n", h: "bb7c8c4d4a03262b23a395430abb2d8d17709d7fb10fbe1ba7010ed8c296117e"}, {stdin: "Burung 4 kakatua beo merpati elang\n", h: "6dbbab7e4b3c9cf9360a046b062eea946d82d7fdd2a7ec910e5704191886d509"}],
      petunjuk: `Nama objek dibaca di dalam perulangan, bukan sekaligus di awal.`
    },
    {
      judul: "Pecahan Uang",
      deskripsi: `<p>Baca sejumlah uang, lalu pecah ke lembaran <strong>50000</strong>, <strong>20000</strong>, dan <strong>10000</strong> — selalu pakai lembaran terbesar dulu. Cetak banyaknya tiap lembaran dan sisa yang tidak bisa dipecah.</p><p>Untuk input <code>187000</code>:</p><pre>50000: 3
20000: 1
10000: 1
Sisa: 7000</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int uang;\n    cin >> uang;\n\n    // Hitung banyaknya lembaran 50000, lalu 20000, lalu 10000.\n    // Sisa uang setelah tiap langkah dipakai untuk langkah berikutnya.\n    \n    return 0;\n}\n",
      stdin: "187000\n",
      expected: "50000: 3\n20000: 1\n10000: 1\nSisa: 7000",
      uji: [{stdin: "95000\n", h: "b9c20e059e0c514037aeeac4df77aa9771270d83ea65d702f2805e291dbd5f9c"}, {stdin: "260000\n", h: "4042e3938572d4eeb6c849a6bc79ec4ff15de8db05439279afb9c2c0b2c37754"}],
      petunjuk: `<code>/</code> memberi banyaknya lembaran, <code>%</code> memberi sisa uangnya.`
    },
    {
      judul: "Daftar Bilangan Prima",
      deskripsi: `<p>Buat <strong>fungsi</strong> <code>prima(int x)</code> yang mengembalikan <code>bool</code>. Pakai fungsi itu untuk mencetak semua bilangan prima dari 2 sampai <code>n</code> dalam satu baris, lalu jumlahnya.</p><p>Untuk input <code>20</code>:</p><pre>2 3 5 7 11 13 17 19
Jumlah prima: 8</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nbool prima(int x) {\n    // Kembalikan true kalau x bilangan prima\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n\n    // Cetak semua prima dari 2 sampai n, pisahkan dengan spasi,\n    // lalu di baris berikutnya cetak jumlahnya.\n    \n    return 0;\n}\n",
      stdin: "20\n",
      expected: "2 3 5 7 11 13 17 19\nJumlah prima: 8",
      uji: [{stdin: "10\n", h: "dff720214eb8abd0c87f74d368c750520536fc002a5493d0d959c7903a293678"}, {stdin: "30\n", h: "09674be3f04723a4bd437ed6bb029fd9ab8b3fb7de38e134e46db9316562c65d"}],
      petunjuk: `Bilangan prima hanya habis dibagi 1 dan dirinya sendiri. Cukup periksa pembagi dari 2 sampai <code>x - 1</code>.`
    },
    {
      judul: "Membalik Array dengan Reference",
      deskripsi: `<p>Lengkapi fungsi <code>tukar(int&amp;, int&amp;)</code>, lalu pakai fungsi itu untuk <strong>membalik urutan isi array</strong> di tempatnya sendiri — tanpa array kedua.</p><p>Untuk input <code>5</code> lalu <code>1 2 3 4 5</code>:</p><pre>5 4 3 2 1</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nvoid tukar(int &a, int &b) {\n    // Tukar isi a dan b\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // Balik isi array memakai tukar(), lalu cetak isinya\n    \n    return 0;\n}\n",
      stdin: "5\n1 2 3 4 5\n",
      expected: "5 4 3 2 1",
      uji: [{stdin: "6\n10 20 30 40 50 60\n", h: "6f6953969c29d8d0000154470a6843bff29a10d0c6f68522991f320836e40118"}, {stdin: "3\n7 8 9\n", h: "f091a030d7bbae83260686059555dc2ad058bc94a0511ed37d00e918bd1bcc28"}],
      petunjuk: `Tukar elemen pertama dengan terakhir, kedua dengan kedua dari akhir, dan seterusnya — cukup sampai tengah array.`
    },
    {
      judul: "Juara Kelas",
      deskripsi: `<p>Buat <code>struct Siswa</code> beranggota <code>nama</code> dan <code>nilai</code>. Baca banyaknya siswa lalu data tiap siswa ke dalam <strong>array of struct</strong>. Cetak siswa bernilai tertinggi dan rata-rata kelas (bilangan bulat).</p><p>Untuk input:</p><pre>3
Rina 88
Budi 75
Sari 92</pre><p>Keluarannya:</p><pre>Tertinggi: Sari (92)
Rata-rata: 85</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Siswa {\n    string nama;\n    int nilai;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Siswa s[50];\n\n    // Baca n data siswa ke array s.\n    // Cari siswa bernilai tertinggi dan hitung rata-ratanya.\n    \n    return 0;\n}\n",
      stdin: "3\nRina 88\nBudi 75\nSari 92\n",
      expected: "Tertinggi: Sari (92)\nRata-rata: 85",
      uji: [{stdin: "4\nAgus 70\nDina 95\nEko 80\nFira 88\n", h: "bda07db8183699e17712fdc1523b2884fee38cec1d83a34dbcb38d6fa0302b5b"}, {stdin: "2\nGita 60\nHadi 61\n", h: "42e8971325bcdcce0a9bc741a10109a5aec2cedd32c39694d7480dc9c96bf526"}],
      petunjuk: `Simpan <strong>posisi</strong> siswa tertinggi, bukan hanya nilainya — namanya juga harus dicetak.`
    },
    {
      judul: "Dua Lampu Mandiri",
      deskripsi: `<p>Class <code>Lampu</code> punya atribut <code>nyala</code> yang awalnya <code>false</code>. Lengkapi method <code>tekan()</code> yang <strong>membalik</strong> keadaannya (mati jadi nyala, nyala jadi mati) dan <code>status()</code> yang mengembalikan <code>"nyala"</code> atau <code>"mati"</code>.</p><p>Program membaca berapa kali lampu A ditekan dan berapa kali lampu B ditekan. Untuk input <code>3 2</code>:</p><pre>Lampu A: nyala
Lampu B: mati</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Lampu {\npublic:\n    bool nyala = false;\n\n    // Buat method tekan() dan status()\n    \n};\n\nint main() {\n    int tekanA, tekanB;\n    cin >> tekanA >> tekanB;\n    Lampu a, b;\n\n    // Tekan lampu a sebanyak tekanA kali, lampu b sebanyak tekanB kali\n    \n    cout << \"Lampu A: \" << a.status() << endl;\n    cout << \"Lampu B: \" << b.status() << endl;\n    return 0;\n}\n",
      stdin: "3 2\n",
      expected: "Lampu A: nyala\nLampu B: mati",
      uji: [{stdin: "4 5\n", h: "6e123fcd811ecb7e718edd031c849c67ccbd9585ec06b75bed3d0a9a60ad7892"}, {stdin: "1 1\n", h: "b6d92778ff6860fcb7385bd3ecf50ac238a1e8a94e0b068684f5e6aadd24c57b"}],
      petunjuk: `Tanda <code>!</code> membalik nilai <code>bool</code>. Menekan lampu A tidak boleh mengubah lampu B.`
    },
    {
      judul: "Membandingkan Dua Persegi Panjang",
      deskripsi: `<p>Class <code>PersegiPanjang</code> punya atribut <code>panjang</code> dan <code>lebar</code>. Lengkapi method <code>luas()</code> dan method <code>lebihBesar(PersegiPanjang lain)</code> yang mengembalikan <code>true</code> kalau luas objek ini <strong>lebih besar</strong> dari luas objek <code>lain</code>.</p><p>Untuk input <code>4 5 3 6</code> (A = 4×5, B = 3×6):</p><pre>Luas A: 20
Luas B: 18
A lebih besar dari B</pre><p>Kalau luas A tidak lebih besar, baris terakhirnya <code>A tidak lebih besar dari B</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass PersegiPanjang {\npublic:\n    int panjang, lebar;\n\n    // Buat method luas() dan lebihBesar(PersegiPanjang lain)\n    \n};\n\nint main() {\n    PersegiPanjang a, b;\n    cin >> a.panjang >> a.lebar >> b.panjang >> b.lebar;\n\n    cout << \"Luas A: \" << a.luas() << endl;\n    cout << \"Luas B: \" << b.luas() << endl;\n    // Cetak baris terakhir memakai a.lebihBesar(b)\n    \n    return 0;\n}\n",
      stdin: "4 5 3 6\n",
      expected: "Luas A: 20\nLuas B: 18\nA lebih besar dari B",
      uji: [{stdin: "2 3 6 1\n", h: "6f7e47493ff9c104352f9f4b54520ae379c9de87218f7e9f72f9c5075638763a"}, {stdin: "3 3 10 2\n", h: "f4082e0fa7cbec6d5ee9516de56d8c3284e0c7aa923eeba52b5e4ae26b8a92d6"}],
      petunjuk: `Di dalam <code>lebihBesar()</code>, luas objek ini adalah <code>luas()</code>, dan luas objek lain adalah <code>lain.luas()</code>.`
    },
    {
      judul: "Rekening dengan Riwayat Transaksi",
      deskripsi: `<p>Class <code>Rekening</code> menyimpan <code>saldo</code> secara <strong>private</strong>, awalnya 0. Lengkapi dua method yang mengembalikan <code>bool</code>:</p><ul><li><code>setor(int)</code> — tolak kalau jumlahnya 0 atau negatif;</li><li><code>tarik(int)</code> — tolak kalau jumlahnya 0, negatif, atau melebihi saldo.</li></ul><p>Program membaca banyaknya transaksi, lalu tiap transaksi berupa perintah dan jumlahnya. Untuk input:</p><pre>5
setor 50000
tarik 20000
tarik 40000
setor -100
tarik 10000</pre><p>Keluarannya:</p><pre>setor 50000: OK
tarik 20000: OK
tarik 40000: DITOLAK
setor -100: DITOLAK
tarik 10000: OK
Saldo akhir: 20000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Rekening {\nprivate:\n    int saldo = 0;\npublic:\n    // Buat setor(int) dan tarik(int) yang mengembalikan bool,\n    // serta getSaldo()\n    \n};\n\nint main() {\n    Rekening r;\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        string perintah;\n        int jumlah;\n        cin >> perintah >> jumlah;\n\n        // Panggil setor() atau tarik() sesuai perintahnya,\n        // lalu cetak OK atau DITOLAK\n        \n    }\n    cout << \"Saldo akhir: \" << r.getSaldo() << endl;\n    return 0;\n}\n",
      stdin: "5\nsetor 50000\ntarik 20000\ntarik 40000\nsetor -100\ntarik 10000\n",
      expected: "setor 50000: OK\ntarik 20000: OK\ntarik 40000: DITOLAK\nsetor -100: DITOLAK\ntarik 10000: OK\nSaldo akhir: 20000",
      uji: [{stdin: "4\nsetor 10000\ntarik 10000\ntarik 1\nsetor 0\n", h: "7a56cc32a5d2cc4db4f6f5f80b311f88b200bb2d8626cb652ab890e96bb28975"}, {stdin: "3\ntarik 500\nsetor 25000\ntarik 5000\n", h: "2e86457031de872b7e0fe6a6c472a3bf8aa0a94ba21680a9bf6af969a909ba8d"}],
      petunjuk: `<code>main()</code> tidak bisa menyentuh <code>saldo</code> langsung — semua perubahan harus lewat method.`
    },
    {
      judul: "Constructor yang Menghitung",
      deskripsi: `<p>Class <code>Waktu</code> menyimpan <code>jam</code>, <code>menit</code>, dan <code>detik</code>. Lengkapi <strong>constructor</strong> <code>Waktu(int total)</code> yang menerima jumlah detik lalu <strong>mengubahnya</strong> ke jam, menit, dan detik. Lengkapi juga <code>tampil()</code> yang mencetaknya dalam format <code>JJ:MM:DD</code>.</p><p>Untuk input <code>3725</code>:</p><pre>01:02:05</pre><p>Fungsi <code>dua()</code> sudah disediakan untuk mencetak angka dengan nol di depan.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Mencetak angka selalu dua digit: 5 jadi 05\nvoid dua(int x) {\n    if (x < 10) cout << \"0\";\n    cout << x;\n}\n\nclass Waktu {\n    int jam, menit, detik;\npublic:\n    // Buat constructor Waktu(int total) dan method tampil()\n    \n};\n\nint main() {\n    int total;\n    cin >> total;\n    Waktu w(total);\n    w.tampil();\n    return 0;\n}\n",
      stdin: "3725\n",
      expected: "01:02:05",
      uji: [{stdin: "45\n", h: "a634eb5bf26edd0ae59c6374c18fe9b70217cc64f8b96ff01ca687d2e3695083"}, {stdin: "86399\n", h: "e9c332e6a457bef75be953341c976649fe6a9eb9239c7e9fdebda6d32e838b6f"}],
      petunjuk: `Satu jam = 3600 detik, satu menit = 60 detik. Pakai <code>/</code> dan <code>%</code> seperti di soal 2.`
    },
    {
      judul: "Mengatur Masa Hidup Objek",
      deskripsi: `<p>Lengkapi class <code>Objek</code>: constructor <code>Objek(string nama)</code> mencetak <code>Buat &lt;nama&gt;</code> dan destructor mencetak <code>Hapus &lt;nama&gt;</code>.</p><p>Lalu susun isi <code>main()</code> dengan aturan berikut:</p><ul><li>objek <code>A</code> dibuat biasa dan hidup sampai program selesai;</li><li>objek <code>B</code> dibuat dengan <code>new</code> dan dihapus dengan <code>delete</code>;</li><li>objek <code>C</code> dibuat di dalam blok <code>{ }</code>.</li></ul><p>Soal ini tidak memakai input. Keluarannya harus persis:</p><pre>Buat A
Buat B
Hapus B
Buat C
Hapus C
Hapus A</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Objek {\n    string nama;\npublic:\n    // Buat constructor Objek(string) dan destructor-nya\n    \n};\n\nint main() {\n    // Susun A, B (pakai new/delete), dan C (di dalam blok)\n    // supaya urutan keluarannya sama dengan soal.\n    \n    return 0;\n}\n",
      stdin: "",
      expected: "Buat A\nBuat B\nHapus B\nBuat C\nHapus C\nHapus A",
      petunjuk: `Objek biasa dihapus saat blok tempatnya dibuat berakhir. Objek dari <code>new</code> baru dihapus saat kamu memanggil <code>delete</code>.`
    },
    {
      judul: "Nilai dan Predikat",
      deskripsi: `<p>Class <code>Siswa</code> menyimpan <code>nama</code> dan <code>nilai</code> secara <strong>private</strong>. Lengkapi:</p><ul><li><code>setNilai(int)</code> — terima hanya 0 sampai 100, kembalikan <code>true</code> kalau diterima dan <code>false</code> kalau ditolak (nilai lama tidak berubah);</li><li><code>getNilai()</code>;</li><li><code>predikat()</code> — kembalikan <code>'A'</code> untuk 90 ke atas, <code>'B'</code> untuk 80–89, <code>'C'</code> untuk 70–79, selain itu <code>'D'</code>.</li></ul><p>Program membaca nama lalu dua nilai yang dicoba berurutan. Untuk input <code>Andi 150 85</code>:</p><pre>Nilai 150 ditolak
Nilai 85 diterima
Andi: 85 (B)</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\n    int nilai = 0;\npublic:\n    Siswa(string n) { nama = n; }\n    string getNama() { return nama; }\n\n    // Buat setNilai(int), getNilai(), dan predikat()\n    \n};\n\nint main() {\n    string nama;\n    int x, y;\n    cin >> nama >> x >> y;\n    Siswa s(nama);\n\n    int coba[2] = {x, y};\n    for (int i = 0; i < 2; i++) {\n        if (s.setNilai(coba[i])) cout << \"Nilai \" << coba[i] << \" diterima\" << endl;\n        else                     cout << \"Nilai \" << coba[i] << \" ditolak\" << endl;\n    }\n    cout << s.getNama() << \": \" << s.getNilai() << \" (\" << s.predikat() << \")\" << endl;\n    return 0;\n}\n",
      stdin: "Andi 150 85\n",
      expected: "Nilai 150 ditolak\nNilai 85 diterima\nAndi: 85 (B)",
      uji: [{stdin: "Budi 92 -5\n", h: "6cefc3ef4ca0cc6272810a50676df9222add6df044155f85455760fcd14d0868"}, {stdin: "Cici 70 101\n", h: "c62fdaa8bad2496e3348ef64e6c6a7033f11392c8347667ad359ae5cf619fa6a"}],
      petunjuk: `Kalau nilainya ditolak, jangan ubah atribut <code>nilai</code> sama sekali — langsung kembalikan <code>false</code>.`
    }
  ]
};
