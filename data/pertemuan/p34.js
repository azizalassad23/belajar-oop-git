/* =========================================================
   Pertemuan 34: Studi Kasus: Merancang Sistem OOP
   Modul 7 — Proyek Akhir
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[34] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Menggabungkan encapsulation, inheritance, dan polymorphism dalam satu sistem.</li>
    <li>Menentukan class apa saja yang dibutuhkan dari sebuah masalah nyata.</li>
    <li>Merancang class yang menjaga datanya sendiri.</li>
  </ul>

  <h2>📖 Studi Kasus: Sistem Perpustakaan Sekolah</h2>
  <p>Sekarang saatnya memakai semua yang sudah dipelajari. Kita rancang sistem perpustakaan
     sederhana.</p>

  <h3>Langkah 1 &mdash; Cari Kata Bendanya</h3>
  <p>Baca deskripsi masalahnya, lalu tandai kata bendanya. Itu kandidat class-mu:</p>
  <blockquote>"<strong>Anggota</strong> meminjam <strong>buku</strong> dari perpustakaan.
     Anggota bisa <strong>siswa</strong> atau <strong>guru</strong>, dengan batas pinjam
     berbeda. Keterlambatan dikenai <strong>denda</strong>."</blockquote>
  <p>Kandidatnya: <code>Buku</code>, <code>Anggota</code>, <code>Siswa</code>,
     <code>Guru</code>, <code>Denda</code>.</p>

  <h3>Langkah 2 &mdash; Tentukan Hubungannya</h3>
  <ul>
    <li>Siswa <strong>adalah</strong> Anggota &rarr; <em>inheritance</em>.</li>
    <li>Perpustakaan <strong>punya</strong> banyak Buku &rarr; <em>composition</em>.</li>
    <li>Batas pinjam berbeda tiap jenis &rarr; <em>pure virtual</em>.</li>
  </ul>

  <h3>Langkah 3 &mdash; Lindungi Datanya</h3>
  <pre><code>class Buku {
private:
    string judul;
    int stok;                      // tidak boleh diubah sembarangan
public:
    Buku(string j, int s) { judul = j; stok = s; }

    void pinjam() {
        if (stok &lt;= 0) throw "Stok habis";   // melapor, bukan diam
        stok--;
    }
    int getStok() { return stok; }
};</code></pre>

  <h3>Langkah 4 &mdash; Manfaatkan Polymorphism</h3>
  <pre><code>class Anggota {
protected:
    string nama;
public:
    Anggota(string n) { nama = n; }
    virtual int batasPinjam() = 0;      // tiap jenis punya aturannya
    void info() { cout &lt;&lt; nama &lt;&lt; " boleh pinjam " &lt;&lt; batasPinjam() &lt;&lt; " buku"; }
};

class Siswa : public Anggota { public: int batasPinjam() { return 3; } };
class Guru  : public Anggota { public: int batasPinjam() { return 10; } };</code></pre>
  <p>Method <code>info()</code> ditulis <strong>sekali</strong> di induk, tapi hasilnya
     menyesuaikan jenis anggotanya.</p>

  <div class="callout tip">
    <strong>💡 Tanda Rancangan yang Baik</strong>
    Kalau menambah jenis anggota baru (misalnya "Alumni") hanya perlu membuat satu class
    baru <em>tanpa mengubah kode lama</em> &mdash; rancanganmu sudah bagus.
  </div>

  <div class="callout warn">
    <strong>⚠️ Jangan Buat Satu Class Raksasa</strong>
    Godaan terbesar pemula adalah membuat satu class <code>Perpustakaan</code> yang
    mengurus segalanya. Pecah berdasarkan tanggung jawab: Buku mengurus stoknya sendiri,
    Anggota mengurus aturannya sendiri.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Kata benda pada deskripsi masalah adalah kandidat class.</li>
    <li>"Adalah" &rarr; inheritance; "punya" &rarr; composition.</li>
    <li>Data dibuat private dan dijaga oleh methodnya sendiri.</li>
    <li>Perbedaan aturan antar jenis diselesaikan dengan pure virtual.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Class Buku yang Terlindungi",
      deskripsi: `<p>Buat class <code>Buku</code> dengan atribut <strong>private</strong> <code>judul</code> dan <code>stok</code>. Sediakan constructor, method <code>pinjam()</code> yang mengurangi stok kalau masih ada, serta <code>getJudul()</code> dan <code>getStok()</code>.</p><p>Untuk input <code>Fisika 3</code> (lalu dipinjam sekali):</p><pre>Buku: Fisika
Sisa stok: 2</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Buku {\nprivate:\n    string judul;\n    int stok;\npublic:\n    // constructor, pinjam(), getJudul(), getStok()\n    \n};\n\nint main() {\n    string j;\n    int s;\n    cin >> j >> s;\n    Buku b(j, s);\n    b.pinjam();\n    cout << \"Buku: \" << b.getJudul() << endl;\n    cout << \"Sisa stok: \" << b.getStok();\n    return 0;\n}\n",
      stdin: "Fisika 3\n",
      expected: "Buku: Fisika\nSisa stok: 2",
      petunjuk: `Stok bersifat private supaya tidak bisa diubah tanpa lewat <code>pinjam()</code>.`
    },
    {
      judul: "Anggota dengan Aturan Berbeda",
      deskripsi: `<p>Buat class abstract <code>Anggota</code> dengan atribut <strong>protected</strong> <code>nama</code>, constructor, <strong>pure virtual</strong> <code>batasPinjam()</code>, dan method <code>info()</code> yang mencetak <code>&lt;nama&gt; boleh pinjam &lt;batas&gt; buku</code> lalu pindah baris.</p><p>Buat <code>Siswa</code> (batas 3) dan <code>Guru</code> (batas 10).</p><p>Untuk input <code>Andi 5</code>:</p><pre>Andi boleh pinjam 3 buku
Andi boleh pinjam 10 buku
Kode uji: 5</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Anggota {\nprotected:\n    string nama;\npublic:\n    Anggota(string n) { nama = n; }\n    // pure virtual batasPinjam() dan method info()\n    \n};\n\n// Buat Siswa (3) dan Guru (10)\n\nint main() {\n    string n;\n    int x;\n    cin >> n >> x;\n    Siswa s(n);\n    Guru g(n);\n    s.info();\n    g.info();\n    cout << \"Kode uji: \" << x;\n    return 0;\n}\n",
      stdin: "Andi 5\n",
      expected: "Andi boleh pinjam 3 buku\nAndi boleh pinjam 10 buku\nKode uji: 5",
      petunjuk: `<code>info()</code> ditulis sekali di induk tapi hasilnya berbeda per jenis anggota.`
    },
    {
      judul: "Denda Berbeda per Jenis",
      deskripsi: `<p>Buat class abstract <code>Denda</code> dengan pure virtual <code>hitung(int hariTelat)</code> dan virtual destructor. Buat <code>DendaSiswa</code> (Rp500 per hari) dan <code>DendaGuru</code> (Rp200 per hari).</p><p>Untuk input <code>7</code>:</p><pre>Denda siswa: 3500
Denda guru: 1400</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Denda {\npublic:\n    // pure virtual hitung(int) dan virtual destructor\n    \n};\n\n// Buat DendaSiswa (500/hari) dan DendaGuru (200/hari)\n\nint main() {\n    int h;\n    cin >> h;\n    Denda* d[2] = { new DendaSiswa(), new DendaGuru() };\n    cout << \"Denda siswa: \" << d[0]->hitung(h) << endl;\n    cout << \"Denda guru: \" << d[1]->hitung(h);\n    for (int i = 0; i < 2; i++) delete d[i];\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Denda siswa: 3500\nDenda guru: 1400",
      petunjuk: `Aturan denda yang berbeda dipisah jadi class masing-masing, bukan ditumpuk dengan <code>if</code>.`
    },
    {
      judul: "Rak Buku",
      deskripsi: `<p>Buat class <code>Buku</code> dengan atribut <code>judul</code>, <code>stok</code>, constructor, dan method <code>tersedia()</code> yang mengembalikan <code>true</code> kalau stoknya lebih dari 0.</p><p>Baca <code>n</code> pasang data ke dalam <code>vector&lt;Buku&gt;</code>, cetak status tiap buku, lalu hitung berapa judul yang tersedia.</p><p>Untuk input <code>3</code> lalu <code>Fisika 2 Kimia 0 Biologi 5</code>:</p><pre>Fisika: tersedia
Kimia: kosong
Biologi: tersedia
Judul tersedia: 2</pre>`,
      starter: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Buku {\npublic:\n    string judul;\n    int stok;\n    // constructor dan method tersedia()\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Buku> rak;\n    // Baca n pasang data\n    \n    // Cetak status tiap buku, lalu hitung yang tersedia\n    \n    return 0;\n}\n",
      stdin: "3\nFisika 2 Kimia 0 Biologi 5\n",
      expected: "Fisika: tersedia\nKimia: kosong\nBiologi: tersedia\nJudul tersedia: 2",
      petunjuk: `Gunakan <code>(rak[i].tersedia() ? "tersedia" : "kosong")</code>.`
    },
    {
      judul: "Peminjaman yang Melapor",
      deskripsi: `<p>Gabungkan encapsulation dan exception. Buat class <code>Buku</code> dengan atribut <strong>private</strong>, dan method <code>pinjam()</code> yang <strong>melempar</strong> <code>Stok habis</code> kalau stoknya nol.</p><p>Di <code>main()</code>, pinjam <strong>dua kali</strong> dalam blok try.</p><p>Untuk input <code>Fisika 1</code>:</p><pre>Pinjam 1: berhasil, sisa 0
Pinjam 2: gagal - Stok habis</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Buku {\nprivate:\n    string judul;\n    int stok;\npublic:\n    Buku(string j, int s) { judul = j; stok = s; }\n    // pinjam() yang melempar, getStok(), getJudul()\n    \n};\n\nint main() {\n    string j;\n    int s;\n    cin >> j >> s;\n    Buku b(j, s);\n    try {\n        b.pinjam();\n        cout << \"Pinjam 1: berhasil, sisa \" << b.getStok() << endl;\n        b.pinjam();\n        cout << \"Pinjam 2: berhasil\" << endl;\n    } catch (const char* e) {\n        \n    }\n    return 0;\n}\n",
      stdin: "Fisika 1\n",
      expected: "Pinjam 1: berhasil, sisa 0\nPinjam 2: gagal - Stok habis",
      petunjuk: `Blok catch mencetak <code>"Pinjam 2: gagal - "</code> diikuti pesannya.`
    }
  ]
};
