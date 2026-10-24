/* =========================================================
   REMEDIAL TERM-QUIZ — satu soal dari tiap Pertemuan 1 s.d. 11
   11 soal, 90 menit.

   Setara Term-Quiz: topik per pertemuan sama, tingkat kesulitan
   sama, tapi soalnya berbeda semua — siswa yang menghafal jawaban
   Term-Quiz tidak terbantu di sini. Kode bantuan tetap diberikan,
   bagian yang diuji selalu dikosongkan.

   Dibuka sesuai 'bukaPada' di assets/js/kurikulum.js (kalau ada).
   Hasilnya masuk ke sheet 'remedial', terpisah dari 'term-quiz'.

   --- Pasangan soal dengan Term-Quiz (tidak tampil ke siswa) ----
    1. banyak objek       -> daftar atribut bernomor
    2. pecahan uang       -> hari ke tahun/minggu/hari
    3. bilangan prima     -> bilangan palindrom
    4. membalik array     -> menggeser array ke kanan
    5. juara kelas        -> stok habis & nilai stok
    6. dua lampu          -> dua penghitung
    7. bandingkan luas    -> titik terdekat
    8. rekening           -> pemesanan kursi
    9. detik ke JJ:MM:DD  -> menyederhanakan pecahan
   10. A, B (new), C      -> X, Y (new), Z (blok), W (fungsi)
   11. nilai & predikat   -> harga & diskon

   Soal 10 dinilai dari keluarannya saja. Siswa yang langsung
   mencetak delapan baris tanpa class memang akan lolos penilaian
   otomatis — periksa kodenya kalau ragu.
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[104] = {
  waktuMenit: 90,

  konten: `
  <h2>Yang Diuji</h2>
  <table>
    <tr><th>Soal</th><th>Materi</th><th>Pertemuan</th></tr>
    <tr><td>1</td><td>Class dan atribut</td><td>1</td></tr>
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
      judul: "Daftar Atribut Class",
      deskripsi: `<p>Baca <strong>nama class</strong>, lalu <strong>banyaknya atribut</strong>, lalu <strong>nama tiap atribut</strong>. Cetak judulnya, lalu daftar atribut bernomor.</p><p>Untuk input <code>Mobil 3 warna merek tahun</code>:</p><pre>Class Mobil punya 3 atribut:
1. warna
2. merek
3. tahun</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string namaClass;\n    int n;\n    cin >> namaClass >> n;\n\n    // Cetak baris judul, lalu baca n nama atribut\n    // dan cetak masing-masing dengan nomor urutnya.\n    \n    return 0;\n}\n",
      stdin: "Mobil 3 warna merek tahun\n",
      expected: "Class Mobil punya 3 atribut:\n1. warna\n2. merek\n3. tahun",
      uji: [{stdin: "Laptop 2 merk ram\n", h: "47f97fe237ff98177e82b251f2bc3f930a261843b1c9c4411e7f559f054a50a8"}, {stdin: "Siswa 4 nama nis kelas alamat\n", h: "f47a97ffc680b6cf68c006c79e04d56b3baeb1b5d41a84b4e4679824066e22ea"}],
      petunjuk: `Nomor urut dimulai dari 1, sedangkan perulangan biasanya dimulai dari 0.`
    },
    {
      judul: "Hari ke Tahun dan Minggu",
      deskripsi: `<p>Baca jumlah hari, lalu ubah ke <strong>tahun</strong> (1 tahun = 365 hari), <strong>minggu</strong> (1 minggu = 7 hari), dan <strong>sisa hari</strong> — selalu pakai satuan terbesar dulu.</p><p>Untuk input <code>1000</code>:</p><pre>Tahun: 2
Minggu: 38
Hari: 4</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int hari;\n    cin >> hari;\n\n    // Hitung tahun lebih dulu, lalu minggu dari sisanya,\n    // lalu hari yang masih tersisa.\n    \n    return 0;\n}\n",
      stdin: "1000\n",
      expected: "Tahun: 2\nMinggu: 38\nHari: 4",
      uji: [{stdin: "400\n", h: "aceea94c6c15fb107141ebba7fad9d84f4615bcd3be938353d06d95ce62f3059"}, {stdin: "30\n", h: "56a09e24b998ab3ce63a902bfaf2b17932357e51188a5b5305ce1d3d68004222"}],
      petunjuk: `<code>/</code> memberi banyaknya satuan, <code>%</code> memberi sisanya untuk langkah berikutnya.`
    },
    {
      judul: "Bilangan Palindrom",
      deskripsi: `<p>Buat <strong>fungsi</strong> <code>balik(int x)</code> yang mengembalikan angka <code>x</code> dengan urutan digit terbalik (contoh: 123 jadi 321). Bilangan disebut <strong>palindrom</strong> kalau sama dengan kebalikannya.</p><p>Baca <code>a</code> dan <code>b</code>, lalu cetak semua palindrom dari <code>a</code> sampai <code>b</code> dalam satu baris, lalu jumlahnya.</p><p>Untuk input <code>100 200</code>:</p><pre>101 111 121 131 141 151 161 171 181 191
Jumlah palindrom: 10</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint balik(int x) {\n    // Kembalikan x dengan urutan digit terbalik\n    \n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n\n    // Cetak semua palindrom dari a sampai b, pisahkan dengan spasi,\n    // lalu di baris berikutnya cetak jumlahnya.\n    \n    return 0;\n}\n",
      stdin: "100 200\n",
      expected: "101 111 121 131 141 151 161 171 181 191\nJumlah palindrom: 10",
      uji: [{stdin: "1 20\n", h: "5a9fac010d5397a0af8c44b17133d1a0c7943ab11f89be08b571b187fdc03820"}, {stdin: "990 1010\n", h: "52b667973310f9515336b1ee40407dbfdd49bf191ef22aab464680626806bf4f"}],
      petunjuk: `<code>x % 10</code> memberi digit terakhir, <code>x / 10</code> membuangnya. Ulangi selama <code>x &gt; 0</code>.`
    },
    {
      judul: "Menggeser Array ke Kanan",
      deskripsi: `<p>Lengkapi fungsi <code>tukar(int&amp;, int&amp;)</code>, lalu pakai fungsi itu untuk <strong>menggeser isi array satu langkah ke kanan</strong>: elemen terakhir pindah ke depan, sisanya bergeser satu posisi. Kerjakan di array yang sama, tanpa array kedua.</p><p>Untuk input <code>5</code> lalu <code>1 2 3 4 5</code>:</p><pre>5 1 2 3 4</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nvoid tukar(int &a, int &b) {\n    // Tukar isi a dan b\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n\n    // Geser isi array satu langkah ke kanan memakai tukar(),\n    // lalu cetak isinya\n    \n    return 0;\n}\n",
      stdin: "5\n1 2 3 4 5\n",
      expected: "5 1 2 3 4",
      uji: [{stdin: "4\n9 8 7 6\n", h: "74949ec0f24f071fbb174d64c069e3fb0aeb174db6c871de61f4545f2a2897a6"}, {stdin: "2\n5 10\n", h: "9e84146580a6a79565566f6d0222010bc23cbc61e59b2a2006f3f21e55b7d1d9"}],
      petunjuk: `Mulai dari belakang: tukar elemen terakhir dengan elemen sebelumnya, lalu terus mundur sampai ke depan.`
    },
    {
      judul: "Stok Habis dan Nilai Stok",
      deskripsi: `<p>Buat <code>struct Barang</code> beranggota <code>nama</code>, <code>harga</code>, dan <code>stok</code>. Baca banyaknya barang lalu data tiap barang ke dalam <strong>array of struct</strong>.</p><p>Cetak nama semua barang yang stoknya 0, lalu <strong>nilai stok</strong> seluruhnya (jumlah harga × stok tiap barang).</p><p>Untuk input:</p><pre>4
Pensil 2000 10
Buku 5000 0
Penghapus 1000 25
Spidol 8000 0</pre><p>Keluarannya:</p><pre>Habis: Buku Spidol
Nilai stok: 45000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Barang {\n    string nama;\n    int harga;\n    int stok;\n};\n\nint main() {\n    int n;\n    cin >> n;\n    Barang b[50];\n\n    // Baca n data barang ke array b.\n    // Cetak barang yang stoknya habis, lalu nilai stok seluruhnya.\n    \n    return 0;\n}\n",
      stdin: "4\nPensil 2000 10\nBuku 5000 0\nPenghapus 1000 25\nSpidol 8000 0\n",
      expected: "Habis: Buku Spidol\nNilai stok: 45000",
      uji: [{stdin: "3\nTas 150000 2\nTopi 50000 0\nSabuk 75000 4\n", h: "e5a4166dc77c9b8357f615c8c3cfbf6f9ac1d852c8c74e05649e1904909e9262"}, {stdin: "2\nPena 3000 0\nMap 4000 0\n", h: "826d6446181ba402093b8e6c9e8ff86ca53665f047885ae3932b1d6bebeec787"}],
      petunjuk: `Baca semua data dulu, baru cetak — baris "Habis:" harus selesai sebelum baris "Nilai stok:".`
    },
    {
      judul: "Dua Penghitung Mandiri",
      deskripsi: `<p>Class <code>Penghitung</code> punya atribut <code>nilai</code> yang awalnya 0. Lengkapi method <code>tambah()</code>, <code>kurang()</code> — yang <strong>tidak boleh</strong> membuat nilainya di bawah 0 — dan <code>getNilai()</code>.</p><p>Program membaca banyaknya perintah lalu tiap perintah: <code>A+</code>, <code>A-</code>, <code>B+</code>, atau <code>B-</code>. Untuk input:</p><pre>7
A+ A+ B+ A- B- B- A+</pre><p>Keluarannya:</p><pre>A: 2
B: 0</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Penghitung {\npublic:\n    int nilai = 0;\n\n    // Buat method tambah(), kurang(), dan getNilai()\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    Penghitung a, b;\n    for (int i = 0; i < n; i++) {\n        string p;\n        cin >> p;\n\n        // Jalankan perintah p pada penghitung a atau b\n        \n    }\n    cout << \"A: \" << a.getNilai() << endl;\n    cout << \"B: \" << b.getNilai() << endl;\n    return 0;\n}\n",
      stdin: "7\nA+ A+ B+ A- B- B- A+\n",
      expected: "A: 2\nB: 0",
      uji: [{stdin: "5\nB+ B+ B+ A- B-\n", h: "64307342855987088d0eeea9745e4e67a562645011db4b1ec2f1f49bc79da0ca"}, {stdin: "4\nA+ B+ A+ A+\n", h: "9712100c436c55f01e23a562e02fa7d6cf8a553c661764dccf56ddcbf7c09695"}],
      petunjuk: `Bandingkan seluruh perintah, misalnya <code>p == "A+"</code>. B yang dikurangi saat sudah 0 tetap 0.`
    },
    {
      judul: "Titik Terdekat",
      deskripsi: `<p>Class <code>Titik</code> punya atribut <code>x</code> dan <code>y</code>. Lengkapi method <code>jarakKuadrat(Titik lain)</code> yang mengembalikan kuadrat jarak ke titik <code>lain</code>, yaitu (x₁ − x₂)² + (y₁ − y₂)².</p><p>Program membaca tiga titik A, B, dan C, lalu menentukan mana yang lebih dekat ke A. Untuk input <code>0 0 3 4 1 1</code>:</p><pre>A ke B: 25
A ke C: 2
Titik terdekat dari A: C</pre><p>Kalau jaraknya sama, baris terakhirnya <code>B dan C sama dekat</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Titik {\npublic:\n    int x, y;\n\n    // Buat method jarakKuadrat(Titik lain)\n    \n};\n\nint main() {\n    Titik a, b, c;\n    cin >> a.x >> a.y >> b.x >> b.y >> c.x >> c.y;\n\n    cout << \"A ke B: \" << a.jarakKuadrat(b) << endl;\n    cout << \"A ke C: \" << a.jarakKuadrat(c) << endl;\n    // Cetak titik mana yang lebih dekat ke A\n    \n    return 0;\n}\n",
      stdin: "0 0 3 4 1 1\n",
      expected: "A ke B: 25\nA ke C: 2\nTitik terdekat dari A: C",
      uji: [{stdin: "1 1 4 5 -2 -3\n", h: "1ac07c4a6586b4e4d26a1a1bea9d03ad8df526246808c2b2ef188eddcb3ed1d3"}, {stdin: "2 2 3 3 10 10\n", h: "e6c28cbd2ef062a0dc63cc1b96126bc926183af41071c8bc99eed4c1adb6d0fd"}],
      petunjuk: `Di dalam method, <code>x</code> adalah milik objek ini dan <code>lain.x</code> milik objek lain. Kuadrat cukup ditulis <code>d * d</code>.`
    },
    {
      judul: "Pemesanan Kursi",
      deskripsi: `<p>Class <code>Bioskop</code> menyimpan <code>kapasitas</code> dan <code>tersisa</code> secara <strong>private</strong>. Lengkapi:</p><ul><li><code>setKapasitas(int)</code> — mengisi kapasitas, dan semua kursi masih tersisa;</li><li><code>pesan(int)</code> — tolak kalau jumlahnya 0, negatif, atau melebihi kursi yang tersisa;</li><li><code>batal(int)</code> — tolak kalau jumlahnya 0, negatif, atau melebihi kursi yang <strong>sudah dipesan</strong>;</li><li><code>getTersisa()</code>.</li></ul><p><code>pesan()</code> dan <code>batal()</code> mengembalikan <code>bool</code>. Program membaca kapasitas, banyaknya transaksi, lalu tiap transaksi. Untuk input:</p><pre>50
5
pesan 20
pesan 40
batal 5
pesan 30
batal 100</pre><p>Keluarannya:</p><pre>pesan 20: OK
pesan 40: DITOLAK
batal 5: OK
pesan 30: OK
batal 100: DITOLAK
Kursi tersisa: 5</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Bioskop {\nprivate:\n    int kapasitas = 0;\n    int tersisa = 0;\npublic:\n    // Buat setKapasitas(int), pesan(int), batal(int), dan getTersisa()\n    \n};\n\nint main() {\n    Bioskop b;\n    int kap, n;\n    cin >> kap >> n;\n    b.setKapasitas(kap);\n    for (int i = 0; i < n; i++) {\n        string perintah;\n        int jumlah;\n        cin >> perintah >> jumlah;\n\n        // Panggil pesan() atau batal() sesuai perintahnya,\n        // lalu cetak OK atau DITOLAK\n        \n    }\n    cout << \"Kursi tersisa: \" << b.getTersisa() << endl;\n    return 0;\n}\n",
      stdin: "50\n5\npesan 20\npesan 40\nbatal 5\npesan 30\nbatal 100\n",
      expected: "pesan 20: OK\npesan 40: DITOLAK\nbatal 5: OK\npesan 30: OK\nbatal 100: DITOLAK\nKursi tersisa: 5",
      uji: [{stdin: "10\n3\npesan 10\nbatal 10\nbatal 1\n", h: "cfe0c5c634835aedacc0050e1f17a8e3fcdc799dc8cc3b8d5418e65ebb5e4e62"}, {stdin: "20\n4\npesan 0\npesan 5\nbatal 6\npesan 15\n", h: "2fd8bf43e413d1c49bce15cb37452518b565958f0301b58f777b4b487a1c5145"}],
      petunjuk: `Kursi yang sudah dipesan = <code>kapasitas - tersisa</code>.`
    },
    {
      judul: "Menyederhanakan Pecahan",
      deskripsi: `<p>Class <code>Pecahan</code> menyimpan <code>atas</code> dan <code>bawah</code>. Lengkapi <strong>constructor</strong> <code>Pecahan(int a, int b)</code> yang langsung <strong>menyederhanakan</strong> pecahan itu sebelum menyimpannya, dan method <code>tampil()</code> yang mencetaknya.</p><p>Untuk input <code>12 18</code>:</p><pre>12/18 = 2/3</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Pecahan {\n    int atas, bawah;\npublic:\n    // Buat constructor Pecahan(int a, int b) yang menyederhanakan,\n    // dan method tampil() yang mencetak atas/bawah\n    \n};\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    Pecahan p(a, b);\n    cout << a << \"/\" << b << \" = \";\n    p.tampil();\n    return 0;\n}\n",
      stdin: "12 18\n",
      expected: "12/18 = 2/3",
      uji: [{stdin: "7 13\n", h: "54768910a6c13e67cbd29cab735be723cebfba3da15a6f895a57b4fcc46584ee"}, {stdin: "40 10\n", h: "529facea728727113b4eba654d37411ea6e5d3ca0751d7ea25c3fbaed7308843"}],
      petunjuk: `Cari bilangan terbesar yang membagi habis <code>a</code> dan <code>b</code> sekaligus, lalu bagi keduanya dengan bilangan itu.`
    },
    {
      judul: "Empat Objek, Empat Masa Hidup",
      deskripsi: `<p>Lengkapi class <code>Objek</code>: constructor <code>Objek(string nama)</code> mencetak <code>Buat &lt;nama&gt;</code> dan destructor mencetak <code>Hapus &lt;nama&gt;</code>.</p><p>Lalu susun programnya dengan aturan berikut:</p><ul><li>objek <code>X</code> dibuat biasa dan hidup sampai program selesai;</li><li>objek <code>Y</code> dibuat dengan <code>new</code>, dan baru dihapus dengan <code>delete</code> <strong>setelah</strong> blok berisi <code>Z</code> selesai;</li><li>objek <code>Z</code> dibuat di dalam blok <code>{ }</code>;</li><li>objek <code>W</code> dibuat di dalam fungsi <code>tugas()</code>, yang dipanggil di akhir <code>main()</code>.</li></ul><p>Soal ini tidak memakai input. Keluarannya harus persis:</p><pre>Buat X
Buat Y
Buat Z
Hapus Z
Hapus Y
Buat W
Hapus W
Hapus X</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Objek {\n    string nama;\npublic:\n    // Buat constructor Objek(string) dan destructor-nya\n    \n};\n\nvoid tugas() {\n    // Buat objek W di sini\n    \n}\n\nint main() {\n    // Susun X, Y (pakai new/delete), Z (di dalam blok),\n    // lalu panggil tugas() supaya urutan keluarannya sama dengan soal.\n    \n    return 0;\n}\n",
      stdin: "",
      expected: "Buat X\nBuat Y\nBuat Z\nHapus Z\nHapus Y\nBuat W\nHapus W\nHapus X",
      petunjuk: `Objek di dalam fungsi dihapus begitu fungsinya selesai — sama seperti objek di dalam blok.`
    },
    {
      judul: "Harga dan Diskon",
      deskripsi: `<p>Class <code>Produk</code> menyimpan <code>nama</code>, <code>harga</code>, dan <code>diskon</code> (dalam persen) secara <strong>private</strong>. Lengkapi:</p><ul><li><code>setHarga(int)</code> — terima hanya harga lebih dari 0;</li><li><code>setDiskon(int)</code> — terima hanya 0 sampai 50;</li><li><code>hargaAkhir()</code> — harga setelah dipotong diskon.</li></ul><p>Kedua setter mengembalikan <code>true</code> kalau diterima dan <code>false</code> kalau ditolak (nilai lama tidak berubah). Program membaca nama, satu harga, lalu dua diskon yang dicoba berurutan. Untuk input <code>Sepatu 200000 70 25</code>:</p><pre>Harga 200000 diterima
Diskon 70 ditolak
Diskon 25 diterima
Sepatu: 150000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Produk {\nprivate:\n    string nama;\n    int harga = 0;\n    int diskon = 0;\npublic:\n    Produk(string n) { nama = n; }\n    string getNama() { return nama; }\n\n    // Buat setHarga(int), setDiskon(int), dan hargaAkhir()\n    \n};\n\nint main() {\n    string nama;\n    int h, d1, d2;\n    cin >> nama >> h >> d1 >> d2;\n    Produk p(nama);\n\n    if (p.setHarga(h)) cout << \"Harga \" << h << \" diterima\" << endl;\n    else               cout << \"Harga \" << h << \" ditolak\" << endl;\n\n    int coba[2] = {d1, d2};\n    for (int i = 0; i < 2; i++) {\n        if (p.setDiskon(coba[i])) cout << \"Diskon \" << coba[i] << \" diterima\" << endl;\n        else                      cout << \"Diskon \" << coba[i] << \" ditolak\" << endl;\n    }\n    cout << p.getNama() << \": \" << p.hargaAkhir() << endl;\n    return 0;\n}\n",
      stdin: "Sepatu 200000 70 25\n",
      expected: "Harga 200000 diterima\nDiskon 70 ditolak\nDiskon 25 diterima\nSepatu: 150000",
      uji: [{stdin: "Kaos 80000 50 0\n", h: "2a256b10597ffd3a8c176eb6f090a51f26615898fc98a4fccfe588d512751d0a"}, {stdin: "Jaket 150000 10 51\n", h: "622b300038f8e8d5a2927ba963f74fdf22e2f37cf111cd95e931a28f6bf03911"}],
      petunjuk: `Potongan = <code>harga * diskon / 100</code>. Kalikan dulu baru bagi, supaya tidak jadi 0.`
    }
  ]
};
