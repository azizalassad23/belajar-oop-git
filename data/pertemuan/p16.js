/* =========================================================
   Pertemuan 16: Friend Function & Friend Class
   Modul 3 — Fitur & Relasi Class
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[16] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami untuk apa <code>friend</code> ada.</li>
    <li>Membuat <strong>friend function</strong> yang bisa membaca anggota private.</li>
    <li>Membuat <strong>friend class</strong>.</li>
    <li>Tahu kapan sebaiknya <code>friend</code> TIDAK dipakai.</li>
  </ul>

  <h2>📖 Izin Khusus Menembus Private</h2>
  <p>Anggota <code>private</code> hanya bisa disentuh dari dalam class. Kadang ada fungsi
     di luar yang benar-benar perlu membacanya. Untuk itu class bisa memberi
     <strong>izin khusus</strong> dengan kata kunci <code>friend</code>.</p>

  <div class="callout">
    <strong>Analogi Kunci Cadangan 🔑</strong>
    Rumahmu terkunci untuk umum. Tapi kamu boleh menitipkan kunci cadangan pada satu
    tetangga yang kamu percaya. Yang penting: <strong>kamu</strong> yang memilih siapa,
    bukan tetangganya yang memaksa masuk.
  </div>

  <h2>🤝 Friend Function</h2>
  <pre><code>class Nilai {
private:
    int skor;
public:
    void setSkor(int s) { skor = s; }
    friend void lihatSkor(Nilai n);   // beri izin pada fungsi ini
};

void lihatSkor(Nilai n) {
    cout &lt;&lt; "Skor: " &lt;&lt; n.skor;      // boleh, karena sudah jadi friend
}</code></pre>
  <p>Perhatikan dua hal penting:</p>
  <ul>
    <li>Deklarasi <code>friend</code> ditulis <strong>di dalam</strong> class yang memberi izin.</li>
    <li>Fungsinya sendiri <strong>bukan anggota class</strong> — ia ditulis di luar, tanpa
        <code>Nilai::</code>, dan tidak punya <code>this</code>. Karena itu ia butuh objeknya
        dikirim sebagai parameter.</li>
  </ul>

  <h2>👥 Friend Class</h2>
  <p>Kalau seluruh method sebuah class perlu akses, izinkan class-nya sekaligus:</p>
  <pre><code>class Siswa {
private:
    string nama;
    int nilai;
public:
    Siswa(string n, int v) { nama = n; nilai = v; }
    friend class WaliKelas;      // seluruh method WaliKelas boleh masuk
};

class WaliKelas {
public:
    void lihatRapor(Siswa s) {
        cout &lt;&lt; "Rapor " &lt;&lt; s.nama &lt;&lt; ": " &lt;&lt; s.nilai;
    }
};</code></pre>

  <div class="callout warn">
    <strong>⚠️ Pakai Seperlunya</strong>
    <code>friend</code> sengaja membuka lubang pada encapsulation yang susah payah kamu bangun.
    Kalau sebuah getter biasa sudah cukup, <strong>pakai getter</strong>. <code>friend</code>
    baru masuk akal kalau sebuah fungsi di luar benar-benar perlu membaca isi
    <em>dua objek sekaligus</em> — misalnya membandingkan keduanya.
  </div>

  <div class="callout tip">
    <strong>💡 Izin Itu Searah</strong>
    Kalau A menjadikan B sebagai friend, B bisa melihat isi A — tapi A <em>tidak</em>
    otomatis bisa melihat isi B. Persahabatan di C++ tidak timbal balik.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>friend</code> memberi izin khusus menembus <code>private</code>.</li>
    <li>Deklarasinya di dalam class pemberi izin; fungsinya ditulis di luar.</li>
    <li>Friend function bukan anggota class, jadi tidak punya <code>this</code>.</li>
    <li><code>friend class</code> memberi izin ke seluruh method class itu.</li>
    <li>Sifatnya searah, dan sebaiknya dipakai sehemat mungkin.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Friend Function Dasar",
      deskripsi: `<p>Buat class <code>Nilai</code> dengan atribut <strong>private</strong> <code>skor</code> dan method <code>setSkor(int)</code>. Buat <strong>friend function</strong> <code>lihatSkor(Nilai)</code> yang mencetak skornya.</p><p>Untuk input <code>75</code>:</p><pre>Skor: 75</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Nilai {\nprivate:\n    int skor;\npublic:\n    void setSkor(int s) { skor = s; }\n    // Beri izin friend pada lihatSkor di sini\n    \n};\n\n// Tulis fungsi lihatSkor(Nilai n) di sini (di LUAR class)\n\nint main() {\n    Nilai n;\n    int x;\n    cin >> x;\n    n.setSkor(x);\n    lihatSkor(n);\n    return 0;\n}\n",
      stdin: "75\n",
      expected: "Skor: 75",
      uji: [{stdin: "88\n", h: "1fff5c24d2fd2e65d543c3fbb299b16609ca3bff6b8dd99b79d64c3ed8cf0d8c"}, {stdin: "40\n", h: "0795258337be0a246c1ab3a9c7b27c8f2ea9b55731c009b23b9eb6c78362f690"}],
      petunjuk: `Di dalam class: <code>friend void lihatSkor(Nilai n);</code> — perhatikan titik komanya.`
    },
    {
      judul: "Auditor Memeriksa Saldo",
      deskripsi: `<p>Buat class <code>Rekening</code> dengan atribut <strong>private</strong> <code>saldo</code> yang diisi lewat constructor. Buat friend function <code>auditor(Rekening)</code> yang mencetak saldo lalu statusnya: <code>Aman</code> kalau saldo minimal 500, selain itu <code>Kurang</code>.</p><p>Untuk input <code>1000</code>:</p><pre>Auditor membaca saldo: 1000
Status: Aman</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Rekening {\nprivate:\n    int saldo;\npublic:\n    Rekening(int s) { saldo = s; }\n    // Beri izin friend pada auditor\n    \n};\n\n// Tulis fungsi auditor(Rekening r) di sini\n\nint main() {\n    int s;\n    cin >> s;\n    Rekening r(s);\n    auditor(r);\n    return 0;\n}\n",
      stdin: "1000\n",
      expected: "Auditor membaca saldo: 1000\nStatus: Aman",
      uji: [{stdin: "500\n", h: "1041dd744f88e25e1d4e94c74a1ff3d0f039aa41f8fb33a45d1505006e1d3da2"}, {stdin: "499\n", h: "23dfd9b9c04cd6e09c13d4b8b26c24d604e9fdffcff86cd48df809ee07b0ab21"}],
      petunjuk: `Coba juga dengan angka di bawah 500 — statusnya harus berubah jadi Kurang.`
    },
    {
      judul: "Membandingkan Dua Objek",
      deskripsi: `<p>Di sinilah <code>friend</code> benar-benar berguna: satu fungsi perlu membaca isi <strong>dua objek sekaligus</strong>.</p><p>Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nilai</code>, lalu friend function <code>selisih(Siswa, Siswa)</code> yang mengembalikan <code>nilai objek kedua dikurangi nilai objek pertama</code>.</p><p>Untuk input <code>80 95</code>:</p><pre>Selisih nilai: 15</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    int nilai;\npublic:\n    Siswa(int n) { nilai = n; }\n    // Beri izin friend pada selisih\n    \n};\n\n// Tulis fungsi selisih(Siswa a, Siswa b) di sini\n\nint main() {\n    int x, y;\n    cin >> x >> y;\n    Siswa a(x), b(y);\n    cout << \"Selisih nilai: \" << selisih(a, b);\n    return 0;\n}\n",
      stdin: "80 95\n",
      expected: "Selisih nilai: 15",
      uji: [{stdin: "70 90\n", h: "1289fb7b34c2fbaed5852d1e235836182f060741b5d749a3bc950bf232fb3470"}, {stdin: "95 80\n", h: "d75ae1fe9049b0446df0c278062bc1bfb65c1b5b9ac228a93739528b931c5f87"}],
      petunjuk: `Method biasa hanya kenal satu objek lewat <code>this</code>; friend function bisa memegang dua.`
    },
    {
      judul: "Friend Class",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nama</code> dan <code>nilai</code>. Jadikan <strong>seluruh class</strong> <code>WaliKelas</code> sebagai friend, lalu buat method <code>lihatRapor(Siswa)</code> di dalamnya.</p><p>Untuk input <code>Andi 90</code>:</p><pre>Rapor Andi: 90</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\n    int nilai;\npublic:\n    Siswa(string n, int v) { nama = n; nilai = v; }\n    // Jadikan class WaliKelas sebagai friend\n    \n};\n\nclass WaliKelas {\npublic:\n    // Buat method lihatRapor(Siswa s)\n    \n};\n\nint main() {\n    string n;\n    int v;\n    cin >> n >> v;\n    Siswa s(n, v);\n    WaliKelas w;\n    w.lihatRapor(s);\n    return 0;\n}\n",
      stdin: "Andi 90\n",
      expected: "Rapor Andi: 90",
      uji: [{stdin: "Sari 85\n", h: "ca3556d8f233332d15af2c16b89d0772d9796416995c1b2e30bd829cf689522f"}, {stdin: "Budi 70\n", h: "bfc7da9969612c35c4bbdf8998d600ef6087895a4709b3286485ef8dd85472a7"}],
      petunjuk: `Cukup satu baris di dalam Siswa: <code>friend class WaliKelas;</code>`
    },
    {
      judul: "Kotak Mana yang Lebih Besar",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan atribut <strong>private</strong> <code>panjang</code> dan <code>lebar</code>, diisi lewat constructor. Buat friend function <code>lebihBesar(Kotak, Kotak)</code> yang mengembalikan <code>true</code> kalau luas kotak pertama lebih besar.</p><p>Kotak pembanding sudah disiapkan berukuran 3 &times; 3. Untuk input <code>6 4</code>:</p><pre>Kotak A lebih besar: ya</pre><p>Kalau tidak lebih besar, cetak <code>tidak</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\nprivate:\n    int panjang, lebar;\npublic:\n    Kotak(int p, int l) { panjang = p; lebar = l; }\n    // Beri izin friend pada lebihBesar\n    \n};\n\n// Tulis fungsi lebihBesar(Kotak a, Kotak b) di sini\n\nint main() {\n    int p, l;\n    cin >> p >> l;\n    Kotak a(p, l);\n    Kotak b(3, 3);\n    cout << \"Kotak A lebih besar: \" << (lebihBesar(a, b) ? \"ya\" : \"tidak\");\n    return 0;\n}\n",
      stdin: "6 4\n",
      expected: "Kotak A lebih besar: ya",
      uji: [{stdin: "2 4\n", h: "4e4aab5ee6cf03b15f35944241e4720f4efb451f7a31fda99d963031dcddb846"}, {stdin: "3 3\n", h: "cd217fee7a92f0b31b0d3d7ec79e28360223c807ccf1d11e2bbefb27b176d2aa"}],
      petunjuk: `Bandingkan hasil kalinya: <code>a.panjang*a.lebar &gt; b.panjang*b.lebar</code>`
    }
  ]
};
