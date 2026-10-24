/* =========================================================
   KUIS 1 — Gabungan Pertemuan 1 s.d. 9
   10 soal, 105 menit.

   Dibuka otomatis sesuai 'bukaPada' di assets/js/kurikulum.js.
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[101] = {
  waktuMenit: 105,

  konten: `
  <div class="callout">
    <strong>Tentang Kuis Ini</strong>
    Kuis 1 menguji <strong>seluruh materi Pertemuan 1 sampai 9</strong> sekaligus.
    Berbeda dari ujian harian yang fokus pada satu topik, di sini kamu perlu
    menggabungkan beberapa konsep dalam satu soal.
  </div>

  <h2>📋 Ketentuan</h2>
  <ul>
    <li><strong>10 soal</strong>, dikerjakan dalam <strong>105 menit</strong>.</li>
    <li>Semua soal dinilai otomatis dengan membandingkan keluaran programmu.</li>
    <li>Kuis dinyatakan lulus kalau <strong>seluruh soal</strong> benar.</li>
    <li>Berpindah tab lebih dari 2 kali akan <strong>mengunci</strong> kuis.</li>
  </ul>

  <h2>🗺️ Materi yang Diuji</h2>
  <table>
    <tr><th>Soal</th><th>Materi</th><th>Pertemuan</th></tr>
    <tr><td>1</td><td>Input, output, dan operasi dasar</td><td>1–2</td></tr>
    <tr><td>2</td><td>Operator bilangan bulat</td><td>2</td></tr>
    <tr><td>3</td><td>Fungsi dan percabangan bertingkat</td><td>3</td></tr>
    <tr><td>4</td><td>Perulangan</td><td>3</td></tr>
    <tr><td>5</td><td>Array</td><td>4</td></tr>
    <tr><td>6</td><td>Reference sebagai parameter</td><td>4</td></tr>
    <tr><td>7</td><td>Struct dan fungsi</td><td>5</td></tr>
    <tr><td>8</td><td>Class, atribut, dan method</td><td>6–7</td></tr>
    <tr><td>9</td><td>Encapsulation dan validasi</td><td>8</td></tr>
    <tr><td>10</td><td>Constructor dan gabungan semuanya</td><td>9</td></tr>
  </table>

  <div class="callout tip">
    <strong>💡 Saran Mengerjakan</strong>
    Kerjakan yang kamu yakini dulu, jangan tertahan di satu soal. Kamu bebas
    berpindah antar soal, dan kode yang sudah kamu tulis tetap tersimpan.
    Pakai tombol <em>Jalankan</em> untuk mencoba sebelum mengumpulkan.
  </div>

  <div class="callout warn">
    <strong>⚠️ Perhatikan Format Keluaran</strong>
    Penilaian membandingkan tulisan <strong>persis</strong>. Perhatikan huruf besar-kecil,
    spasi, titik dua, dan letak pindah baris. Contoh keluaran selalu diberikan di tiap soal.
  </div>
  `,

  soal: [
    {
      judul: "Biodata dan Tahun Lahir",
      deskripsi: `<p>Baca <strong>nama</strong> (satu kata), <strong>umur</strong>, dan <strong>tahun sekarang</strong>. Cetak biodata beserta tahun lahirnya.</p><p>Untuk input <code>Andi 17 2026</code>:</p><pre>Nama  : Andi
Umur  : 17 tahun
Lahir : 2009</pre><p>Perhatikan: ada <strong>dua spasi</strong> setelah kata <code>Nama</code> dan <code>Umur</code> agar titik duanya sejajar.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    int umur, tahun;\n    cin >> nama >> umur >> tahun;\n    // Cetak tiga baris biodata\n    \n    return 0;\n}\n",
      stdin: "Andi 17 2026\n",
      expected: "Nama  : Andi\nUmur  : 17 tahun\nLahir : 2009",
      uji: [{stdin: "Sari 16 2026\n", h: "c0d9d2302a0b042ad996c9d9873da50702ace43a4f0912b1982cfef0e8d62768"}, {stdin: "Budi 18 2025\n", h: "ef401b1799b26d172f1222cf01e47b869000820d152769fbf77b61d198a537df"}],
      petunjuk: `Tahun lahir = tahun sekarang dikurangi umur.`
    },
    {
      judul: "Operasi Bilangan Bulat",
      deskripsi: `<p>Baca dua bilangan bulat, lalu cetak hasil bagi, sisa bagi, dan hasil kalinya.</p><p>Untuk input <code>17 5</code>:</p><pre>Hasil bagi: 3
Sisa bagi: 2
Hasil kali: 85</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    // Cetak hasil bagi, sisa bagi, dan hasil kali\n    \n    return 0;\n}\n",
      stdin: "17 5\n",
      expected: "Hasil bagi: 3\nSisa bagi: 2\nHasil kali: 85",
      uji: [{stdin: "23 4\n", h: "f68727d66cc8b3c53829e14480e5334794a79c23cab2e629b87b5e65a7b4dcb2"}, {stdin: "100 7\n", h: "f6201a6c2a39fd886962d345d19c43b02a3b1c46e493622ae621c0f9c71f79d6"}],
      petunjuk: `Sisa bagi memakai operator <code>%</code>.`
    },
    {
      judul: "Fungsi Nilai Huruf",
      deskripsi: `<p>Buat <strong>fungsi</strong> <code>nilaiHuruf(int n)</code> yang mengembalikan <code>char</code> sesuai aturan:</p><ul><li>90 ke atas &rarr; <code>A</code></li><li>80–89 &rarr; <code>B</code></li><li>70–79 &rarr; <code>C</code></li><li>60–69 &rarr; <code>D</code></li><li>di bawah 60 &rarr; <code>E</code></li></ul><p>Untuk input <code>85</code>:</p><pre>Nilai 85 = B</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nchar nilaiHuruf(int n) {\n    // Kembalikan huruf sesuai rentang nilainya\n    \n}\n\nint main() {\n    int n;\n    cin >> n;\n    // Cetak: Nilai <n> = <huruf>\n    \n    return 0;\n}\n",
      stdin: "85\n",
      expected: "Nilai 85 = B",
      uji: [{stdin: "92\n", h: "adfea3e6079e7fd9f3ba95af4bb88510bfcc0b55431644baa9d68c10319aad63"}, {stdin: "67\n", h: "1470b0f27af13b217dd9ca86b754baf70657fad9582f9a1dcd165013ba2474c1"}, {stdin: "45\n", h: "ee5aa002ee93295b11e9494da07e9c5905d4656adc5bf0df29a1c646de322a2f"}],
      petunjuk: `Periksa dari nilai terbesar dulu, pakai <code>if</code> berantai.`
    },
    {
      judul: "Deret Kelipatan",
      deskripsi: `<p>Baca sebuah bilangan <code>n</code> dan banyaknya suku. Cetak deret kelipatan <code>n</code> dipisah satu spasi (<strong>tanpa spasi di akhir</strong>), lalu totalnya di baris berikutnya.</p><p>Untuk input <code>3 5</code>:</p><pre>3 6 9 12 15
Total: 45</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, banyak;\n    cin >> n >> banyak;\n    int total = 0;\n    // Cetak deretnya sambil menjumlahkan\n    \n    return 0;\n}\n",
      stdin: "3 5\n",
      expected: "3 6 9 12 15\nTotal: 45",
      uji: [{stdin: "7 4\n", h: "8779687028db1114147e95da8ad793c4d2076ebff1ed8cac26deb6b992f29dd0"}, {stdin: "12 6\n", h: "86052f406975337f780b4f4529bf2d2e15bdbbf1377d5c09b0cd8042d97c614d"}],
      petunjuk: `Cetak spasi hanya kalau <code>i &lt; banyak</code>, supaya tidak ada spasi di ujung.`
    },
    {
      judul: "Nilai Tertinggi dan Terendah",
      deskripsi: `<p>Baca banyaknya data lalu data itu sendiri ke dalam array. Cetak nilai tertinggi, terendah, dan selisihnya.</p><p>Untuk input <code>5</code> lalu <code>7 3 9 1 5</code>:</p><pre>Tertinggi: 9
Terendah: 1
Selisih: 8</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int a[100];\n    for (int i = 0; i < n; i++) cin >> a[i];\n    // Cari tertinggi dan terendah, lalu cetak ketiganya\n    \n    return 0;\n}\n",
      stdin: "5\n7 3 9 1 5\n",
      expected: "Tertinggi: 9\nTerendah: 1\nSelisih: 8",
      uji: [{stdin: "6\n12 45 7 33 28 20\n", h: "27c8358160a78feefd0035287856a5e7cc2bafd5a0c7b3cea55364bd1f48f081"}, {stdin: "3\n50 50 10\n", h: "8371231374ec270db9eaa93daa98ae67551d1f3696df0443996f9691152e92fa"}],
      petunjuk: `Mulai dengan menganggap <code>a[0]</code> sebagai keduanya, lalu bandingkan sisanya.`
    },
    {
      judul: "Tukar dan Gandakan",
      deskripsi: `<p>Buat dua fungsi yang memakai <strong>reference</strong>: <code>tukar(int&amp;, int&amp;)</code> untuk menukar isi, dan <code>gandakan(int&amp;)</code> untuk mengalikan dua.</p><p>Cetak nilai awal, setelah ditukar, lalu setelah <code>x</code> digandakan.</p><p>Untuk input <code>4 6</code>:</p><pre>Awal: 4 6
Setelah tukar: 6 4
Setelah gandakan x: 12 4</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Buat fungsi tukar(int &a, int &b) dan gandakan(int &a)\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    // Cetak awal, tukar, cetak, gandakan x, cetak\n    \n    return 0;\n}\n",
      stdin: "4 6\n",
      expected: "Awal: 4 6\nSetelah tukar: 6 4\nSetelah gandakan x: 12 4",
      uji: [{stdin: "3 10\n", h: "ca615fbbd11486e2ca43d1b984f5cc2754b92b7828bf66b81194dd97ef88dc13"}, {stdin: "15 2\n", h: "c132f41242742ea477f6e5d1511a2965708fb293b65e2f6dbe8f2a82e1cf297c"}],
      petunjuk: `Tanda <code>&amp;</code> pada parameter membuat fungsinya mengubah variabel aslinya.`
    },
    {
      judul: "Struct Buku dan Total Harga",
      deskripsi: `<p>Buat <code>struct Buku</code> beranggota <code>judul</code>, <code>harga</code>, dan <code>jumlah</code>. Buat <strong>fungsi terpisah</strong> <code>total(Buku)</code> yang mengembalikan harga dikali jumlah.</p><p>Untuk input <code>Fisika 50000 3</code>:</p><pre>Buku: Fisika
Total: 150000</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct Buku {\n    // Tulis anggota struct di sini\n    \n};\n\nint total(Buku b) {\n    // Kembalikan harga dikali jumlah\n    \n}\n\nint main() {\n    Buku b;\n    cin >> b.judul >> b.harga >> b.jumlah;\n    // Cetak judul dan totalnya\n    \n    return 0;\n}\n",
      stdin: "Fisika 50000 3\n",
      expected: "Buku: Fisika\nTotal: 150000",
      uji: [{stdin: "Kimia 45000 2\n", h: "2e3d10f698b26e27d7a8c40a9b21fac735ae212f8efc2a2377cb162013fa6d72"}, {stdin: "Biologi 30000 5\n", h: "29264133f61a471ea983cde323b2459c4e3faa2d84272edb022f14964e4502a3"}],
      petunjuk: `Di sini data dan fungsinya masih terpisah — bandingkan dengan class di soal berikutnya.`
    },
    {
      judul: "Class Kotak",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan atribut <code>panjang</code> dan <code>lebar</code>, method <code>luas()</code>, <code>keliling()</code>, serta <code>tampil()</code> yang mencetak keduanya.</p><p>Untuk input <code>8 3</code>:</p><pre>Luas: 24
Keliling: 22</pre><p>Perhatikan: <code>tampil()</code> harus <strong>memanggil</strong> <code>luas()</code> dan <code>keliling()</code>, bukan menghitung ulang.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    int panjang, lebar;\n    // Buat luas(), keliling(), dan tampil()\n    \n};\n\nint main() {\n    Kotak k;\n    cin >> k.panjang >> k.lebar;\n    k.tampil();\n    return 0;\n}\n",
      stdin: "8 3\n",
      expected: "Luas: 24\nKeliling: 22",
      uji: [{stdin: "5 5\n", h: "eddfaa214f33d9c7ae4aefbee3ee82db09ab1904fe77eaec51e08000f76f3221"}, {stdin: "12 7\n", h: "3af5b7cea979e7a76a6057459868c8fc006e4cb128081333ce5bc16ef3d1482f"}],
      petunjuk: `Method boleh memanggil method lain di class yang sama tanpa titik.`
    },
    {
      judul: "Nilai Ter-validasi",
      deskripsi: `<p>Buat class <code>Nilai</code> dengan atribut <strong>private</strong> <code>skor</code>. Sediakan:</p><ul><li><code>setSkor(int)</code> — batasi ke rentang 0–100;</li><li><code>getSkor()</code> — kembalikan skornya;</li><li><code>lulus()</code> — kembalikan <code>true</code> kalau skor minimal 75.</li></ul><p>Untuk input <code>105</code>:</p><pre>Skor tersimpan: 100
Status: Lulus</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Nilai {\nprivate:\n    int skor;\npublic:\n    // Buat setSkor(int), getSkor(), dan lulus()\n    \n};\n\nint main() {\n    Nilai n;\n    int x;\n    cin >> x;\n    n.setSkor(x);\n    cout << \"Skor tersimpan: \" << n.getSkor() << endl;\n    cout << \"Status: \" << (n.lulus() ? \"Lulus\" : \"Belum lulus\");\n    return 0;\n}\n",
      stdin: "105\n",
      expected: "Skor tersimpan: 100\nStatus: Lulus",
      uji: [{stdin: "-10\n", h: "f36db7c5743803d99b90c6c9281d4a574e3d70c154b0e3d01adb3be239e1427b"}, {stdin: "75\n", h: "56094295ac41c28691d933b2d432f25a5bbd3bcacf2afc03614e51fba770c577"}],
      petunjuk: `Nilai 105 dipotong jadi 100 oleh setter — itulah gunanya validasi.`
    },
    {
      judul: "Rapor Siswa",
      deskripsi: `<p>Soal penutup, menggabungkan semuanya. Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nama</code>, <code>tugas</code>, dan <code>ujian</code>. Isi ketiganya lewat <strong>constructor</strong>.</p><p>Sediakan <code>nilaiAkhir()</code> (rata-rata tugas dan ujian) serta <code>rapor()</code> yang mencetak tiga baris.</p><p>Untuk input <code>Andi 80 90</code>:</p><pre>Nama: Andi
Nilai akhir: 85
Keterangan: Lulus</pre><p>Keterangan <code>Lulus</code> kalau nilai akhir minimal 75, selain itu <code>Remedial</code>.</p>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\n    int tugas, ujian;\npublic:\n    // Buat constructor Siswa(string, int, int),\n    // method nilaiAkhir() dan rapor()\n    \n};\n\nint main() {\n    string n;\n    int t, u;\n    cin >> n >> t >> u;\n    Siswa s(n, t, u);\n    s.rapor();\n    return 0;\n}\n",
      stdin: "Andi 80 90\n",
      expected: "Nama: Andi\nNilai akhir: 85\nKeterangan: Lulus",
      uji: [{stdin: "Rina 70 75\n", h: "a9bfe19daf3ffdf33aa1b8ea899259dd2f70a85530ad80e5b49c2a4150dc7a31"}, {stdin: "Doni 90 95\n", h: "904ef6cde5165d0bf5c74f9dadad244d9cdbe7acb742e013d99b10f34d884f54"}],
      petunjuk: `Rata-rata memakai pembagian bilangan bulat: <code>(tugas + ujian) / 2</code>.`
    }
  ]
};
