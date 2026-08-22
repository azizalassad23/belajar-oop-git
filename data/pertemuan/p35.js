/* =========================================================
   Pertemuan 35: Finalisasi & Presentasi Proyek
   Modul 7 — Proyek Akhir
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[35] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Menyatukan seluruh materi menjadi program yang utuh.</li>
    <li>Menyusun laporan hasil dari kumpulan objek.</li>
    <li>Menyiapkan proyek untuk dipresentasikan.</li>
  </ul>

  <h2>🏁 Selamat, Kamu Sampai di Sini</h2>
  <p>Mari lihat ke belakang sebentar. Kamu memulai dari <code>cout &lt;&lt; "Halo"</code>,
     dan sekarang sudah bisa merancang sistem berorientasi objek yang lengkap:</p>
  <table>
    <tr><th>Modul</th><th>Yang kamu kuasai</th></tr>
    <tr><td>1</td><td>Dasar C++ dan cara berpikir OOP</td></tr>
    <tr><td>2</td><td>Class, object, constructor, destructor, encapsulation</td></tr>
    <tr><td>3</td><td>this, static, composition, friend, operator overloading</td></tr>
    <tr><td>4</td><td>Inheritance dan seluk-beluk pewarisan</td></tr>
    <tr><td>5</td><td>Polymorphism, virtual, abstract class, interface</td></tr>
    <tr><td>6</td><td>Template, exception, STL, smart pointer</td></tr>
  </table>

  <h2>🧱 Ciri Program Akhir yang Baik</h2>
  <ol>
    <li><strong>Data terlindungi</strong> &mdash; atribut private, diakses lewat method.</li>
    <li><strong>Tidak ada kode kembar</strong> &mdash; yang sama diangkat ke class induk.</li>
    <li><strong>Perbedaan lewat polymorphism</strong> &mdash; bukan tumpukan <code>if</code>.</li>
    <li><strong>Kesalahan dilaporkan</strong> &mdash; bukan diabaikan diam-diam.</li>
    <li><strong>Memori aman</strong> &mdash; smart pointer, virtual destructor.</li>
  </ol>

  <h2>💼 Contoh Rangka Sistem Penggajian</h2>
  <pre><code>class Pegawai {                          // abstract
protected:
    int gajiPokok;
public:
    Pegawai(int g) { gajiPokok = g; }
    virtual int gajiTotal() = 0;         // beda tiap jabatan
    virtual string jabatan() = 0;
    virtual ~Pegawai() {}                // wajib!
};

class Staf    : public Pegawai { ... };  // gaji pokok saja
class Manager : public Pegawai { ... };  // + tunjangan 50%

int main() {
    vector&lt;unique_ptr&lt;Pegawai&gt;&gt; daftar;  // aman dari kebocoran
    ...
    for (auto&amp; p : daftar)               // satu perulangan untuk semua
        cout &lt;&lt; p-&gt;jabatan() &lt;&lt; ": " &lt;&lt; p-&gt;gajiTotal();
}</code></pre>
  <p>Perhatikan: perulangannya tidak peduli ada jabatan apa saja. Menambah "Direktur"
     besok cukup satu class baru.</p>

  <h2>🎤 Menyiapkan Presentasi</h2>
  <ul>
    <li>Jelaskan <strong>masalahnya</strong> dulu, baru kodenya.</li>
    <li>Tunjukkan <strong>daftar class</strong> dan hubungannya.</li>
    <li>Tunjukkan satu bagian yang memakai polymorphism, dan jelaskan kenapa.</li>
    <li>Ceritakan satu <strong>kesulitan</strong> yang kamu temui dan cara mengatasinya
        &mdash; bagian ini sering paling menarik bagi pendengar.</li>
  </ul>

  <div class="callout tip">
    <strong>💡 Perjalanan Belum Berhenti</strong>
    Setelah ini kamu bisa melanjutkan ke STL lanjutan (<code>map</code>, <code>algorithm</code>),
    membaca-menulis berkas, atau design pattern. Fondasinya sudah kamu punya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Program akhir menggabungkan seluruh pilar OOP.</li>
    <li>Rancangan yang baik mudah ditambah tanpa mengubah kode lama.</li>
    <li>Data dilindungi, kesalahan dilaporkan, memori dijaga.</li>
    <li>Saat presentasi: masalah dulu, rancangan, baru kode.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Laporan Kelulusan",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nama</code> dan <code>nilai</code>, constructor, <code>getNama()</code>, <code>getNilai()</code>, dan <code>lulus()</code> (minimal 75).</p><p>Baca <code>n</code> pasang data ke <code>vector&lt;Siswa&gt;</code>, cetak status tiap siswa, lalu rekapnya.</p><p>Untuk input <code>3</code> lalu <code>Andi 85 Budi 60 Sari 90</code>:</p><pre>Andi: Lulus
Budi: Remedial
Sari: Lulus
Lulus: 2 dari 3</pre>`,
      starter: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\n    int nilai;\npublic:\n    // constructor, getNama(), getNilai(), lulus()\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Siswa> kelas;\n    // Baca n pasang data\n    \n    // Cetak status tiap siswa dan hitung yang lulus\n    \n    return 0;\n}\n",
      stdin: "3\nAndi 85 Budi 60 Sari 90\n",
      expected: "Andi: Lulus\nBudi: Remedial\nSari: Lulus\nLulus: 2 dari 3",
      petunjuk: `Aturan kelulusan disimpan di dalam class, bukan diulang-ulang di <code>main()</code>.`
    },
    {
      judul: "Struk Belanja",
      deskripsi: `<p>Buat class <code>Barang</code> dengan atribut <strong>private</strong> <code>nama</code>, <code>jumlah</code>, <code>harga</code>, constructor, <code>subtotal()</code>, dan <code>getNama()</code>.</p><p>Baca <code>n</code> data ke <code>vector&lt;Barang&gt;</code>, cetak subtotal tiap barang, lalu totalnya.</p><p>Untuk input <code>2</code> lalu <code>Pensil 3 2000 Buku 5 5000</code>:</p><pre>Pensil: 6000
Buku: 25000
Total belanja: 31000</pre>`,
      starter: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Barang {\nprivate:\n    string nama;\n    int jumlah, harga;\npublic:\n    // constructor, subtotal(), getNama()\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Barang> keranjang;\n    // Baca n data (nama, jumlah, harga)\n    \n    // Cetak subtotal tiap barang dan jumlahkan totalnya\n    \n    return 0;\n}\n",
      stdin: "2\nPensil 3 2000 Buku 5 5000\n",
      expected: "Pensil: 6000\nBuku: 25000\nTotal belanja: 31000",
      petunjuk: `Perhitungan subtotal ada di dalam class — <code>main()</code> cukup memanggilnya.`
    },
    {
      judul: "Sistem Penggajian",
      deskripsi: `<p>Gabungkan abstract class, polymorphism, dan smart pointer. Buat <code>Pegawai</code> (abstract, atribut protected <code>gajiPokok</code>, pure virtual <code>gajiTotal()</code> dan <code>jabatan()</code>, virtual destructor). Buat <code>Staf</code> (gaji pokok saja) dan <code>Manager</code> (gaji pokok + setengahnya).</p><p>Simpan dalam <code>vector&lt;unique_ptr&lt;Pegawai&gt;&gt;</code>.</p><p>Untuk input <code>2000000</code>:</p><pre>Staf: 2000000
Manager: 3000000
Total gaji: 5000000</pre>`,
      starter: "#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Pegawai {\nprotected:\n    int gajiPokok;\npublic:\n    Pegawai(int g) { gajiPokok = g; }\n    // dua pure virtual dan virtual destructor\n    \n};\n\n// Buat Staf dan Manager\n\nint main() {\n    int g;\n    cin >> g;\n    vector<unique_ptr<Pegawai>> daftar;\n    daftar.push_back(make_unique<Staf>(g));\n    daftar.push_back(make_unique<Manager>(g));\n    // Cetak tiap pegawai dan jumlahkan totalnya\n    \n    return 0;\n}\n",
      stdin: "2000000\n",
      expected: "Staf: 2000000\nManager: 3000000\nTotal gaji: 5000000",
      petunjuk: `Perulangannya sama untuk semua jabatan — itulah nilai polymorphism.`
    },
    {
      judul: "Stok dengan Penjagaan",
      deskripsi: `<p>Buat class <code>Stok</code> dengan atribut <strong>private</strong> <code>jumlah</code>, constructor, method <code>keluar(int)</code> yang <strong>melempar</strong> <code>Stok tidak mencukupi</code> kalau permintaannya melebihi stok, dan <code>getJumlah()</code>.</p><p>Untuk input <code>5 100</code>:</p><pre>Gagal: Stok tidak mencukupi
Stok tetap 5</pre><p>Kalau berhasil, cetak <code>Berhasil, sisa &lt;jumlah&gt;</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Stok {\nprivate:\n    int jumlah;\npublic:\n    Stok(int j) { jumlah = j; }\n    // keluar(int) yang melempar, dan getJumlah()\n    \n};\n\nint main() {\n    int awal, minta;\n    cin >> awal >> minta;\n    Stok s(awal);\n    try {\n        s.keluar(minta);\n        cout << \"Berhasil, sisa \" << s.getJumlah();\n    } catch (const char* e) {\n        \n    }\n    return 0;\n}\n",
      stdin: "5 100\n",
      expected: "Gagal: Stok tidak mencukupi\nStok tetap 5",
      petunjuk: `Blok catch mencetak pesan gagal lalu pindah baris, baru stok yang tetap utuh.`
    },
    {
      judul: "Proyek Penutup: Kalkulator Bangun Datar",
      deskripsi: `<p>Soal terakhir. Buat class abstract <code>Bentuk</code> dengan pure virtual <code>luas()</code> dan <code>nama()</code> (mengembalikan <code>string</code>), plus virtual destructor. Buat <code>Persegi</code> (satu parameter) dan <code>Segitiga</code> (dua parameter: alas dan tinggi).</p><p>Simpan dalam <code>vector&lt;unique_ptr&lt;Bentuk&gt;&gt;</code>, cetak masing-masing, lalu total luasnya.</p><p>Untuk input <code>3</code> &mdash; Persegi bersisi 3, Segitiga beralas 3 tinggi 4:</p><pre>Persegi: 9
Segitiga: 6
Total luas: 15</pre>`,
      starter: "#include <iostream>\n#include <memory>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // pure virtual luas() dan nama(), plus virtual destructor\n    \n};\n\n// Buat Persegi(int) dan Segitiga(int alas, int tinggi)\n\nint main() {\n    int n;\n    cin >> n;\n    vector<unique_ptr<Bentuk>> d;\n    d.push_back(make_unique<Persegi>(n));\n    d.push_back(make_unique<Segitiga>(n, n + 1));\n    // Cetak tiap bentuk dan jumlahkan luasnya\n    \n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Persegi: 9\nSegitiga: 6\nTotal luas: 15",
      petunjuk: `Luas segitiga <code>alas * tinggi / 2</code>. Selamat, ini soal terakhirmu!`
    }
  ]
};
