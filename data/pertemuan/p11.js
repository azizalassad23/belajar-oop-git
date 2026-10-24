/* =========================================================
   Pertemuan 11: Encapsulation & Getter/Setter
   Modul 2 — Class & Object
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[11] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami <strong>encapsulation</strong> sebagai pilar pertama OOP.</li>
    <li>Menyembunyikan data dengan <code>private</code>.</li>
    <li>Membuat <strong>getter</strong> dan <strong>setter</strong> yang aman.</li>
  </ul>

  <h2>📖 Kenapa Data Perlu Disembunyikan?</h2>
  <p>Kalau atribut dibiarkan <code>public</code>, siapa pun bisa mengisinya dengan apa saja —
     termasuk nilai yang tidak masuk akal:</p>
  <pre><code>siswa.nilai = -500;      // tidak ada yang mencegah
akun.saldo  = -999999;   // saldo minus, padahal tidak pernah menarik uang</code></pre>
  <p><strong>Encapsulation</strong> menutup celah itu: data dibuat <code>private</code>,
     dan satu-satunya jalan masuk adalah lewat method yang kita kendalikan.</p>

  <div class="callout">
    <strong>Analogi Mesin ATM 🏧</strong>
    Kamu tidak bisa membuka brankasnya dan mengambil uang langsung. Kamu harus lewat tombol
    yang disediakan, dan tombol itulah yang memeriksa apakah saldomu cukup. Brankas =
    <code>private</code>, tombol = method <code>public</code>.
  </div>

  <h2>🔑 Getter dan Setter</h2>
  <ul>
    <li><strong>Setter</strong> — mengubah nilai, sekaligus tempat menaruh <em>pemeriksaan</em>.</li>
    <li><strong>Getter</strong> — membaca nilai saja, tanpa mengizinkan pengubahan.</li>
  </ul>
  <pre><code>class Nilai {
private:
    int angka;                    // tidak bisa disentuh dari luar

public:
    void setAngka(int a) {        // SETTER — dengan penjagaan
        if (a &gt; 100)      angka = 100;
        else if (a &lt; 0)   angka = 0;
        else              angka = a;
    }

    int getAngka() {              // GETTER — baca saja
        return angka;
    }
};

int main() {
    Nilai n;
    n.setAngka(150);              // dijaga, jadi tersimpan 100
    cout &lt;&lt; n.getAngka();         // 100
    // n.angka = 150;             // ERROR: angka bersifat private
}</code></pre>

  <div class="callout tip">
    <strong>💡 Inti Pelajarannya</strong>
    Setter yang hanya berisi <code>angka = a;</code> tanpa pemeriksaan apa pun sebenarnya
    sama saja dengan membuat atributnya <code>public</code>. Nilai encapsulation ada pada
    <strong>penjagaannya</strong>, bukan pada keberadaan setter-nya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Encapsulation = menyatukan data + perilaku, lalu menyembunyikan detailnya.</li>
    <li>Atribut dibuat <code>private</code>, aksesnya lewat method <code>public</code>.</li>
    <li>Setter tempat menaruh validasi; getter untuk membaca saja.</li>
    <li>Data jadi tidak mungkin diisi nilai yang tidak masuk akal.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Getter dan Setter Dasar",
      deskripsi: `<p>Buat class <code>Nilai</code> dengan atribut <strong>private</strong> <code>angka</code>. Sediakan <code>setAngka(int)</code> dan <code>getAngka()</code>.</p><p>Untuk input <code>90</code>:</p><pre>Nilai: 90</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Nilai {\nprivate:\n    int angka;\npublic:\n    // Buat setAngka(int) dan getAngka()\n    \n};\n\nint main() {\n    Nilai n;\n    int x;\n    cin >> x;\n    n.setAngka(x);\n    cout << \"Nilai: \" << n.getAngka();\n    return 0;\n}\n",
      stdin: "90\n",
      expected: "Nilai: 90",
      uji: [{stdin: "45\n", h: "221d57c49c2cf0b8991ad6bacf006c47c309a7d30eb258b531e805e028026bd6"}, {stdin: "100\n", h: "fd7ed5325afc29342cdbda18a5aad5798a659d4eff6121997352db6636a20b76"}],
      petunjuk: `Setter bertipe <code>void</code>, getter mengembalikan <code>int</code>.`
    },
    {
      judul: "Setter dengan Batas",
      deskripsi: `<p>Lanjutkan class <code>Nilai</code>, tapi kali ini setter harus <strong>menjaga rentang 0 sampai 100</strong>. Nilai di atas 100 dijadikan 100, di bawah 0 dijadikan 0.</p><p>Untuk input <code>120</code>:</p><pre>Nilai: 100</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Nilai {\nprivate:\n    int angka;\npublic:\n    // Buat setAngka(int) dengan penjagaan rentang, dan getAngka()\n    \n};\n\nint main() {\n    Nilai n;\n    int x;\n    cin >> x;\n    n.setAngka(x);\n    cout << \"Nilai: \" << n.getAngka();\n    return 0;\n}\n",
      stdin: "120\n",
      expected: "Nilai: 100",
      uji: [{stdin: "-15\n", h: "fb719b3b8807437a437f4b827cf8bbfc98e167e13904fb4abf932ca711f1b975"}, {stdin: "73\n", h: "fcf2c0c4b0fda3b7a1b68b9911fb98ab4bbee30c3307c0108ab24deba162bd9d"}],
      petunjuk: `Tiga kemungkinan: lebih dari 100, kurang dari 0, atau di antaranya.`
    },
    {
      judul: "Nama Tidak Boleh Kosong",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <strong>private</strong> <code>nama</code> (teks). Setter <code>setNama(string)</code> punya aturan: kalau yang dikirim berupa tanda hubung <code>-</code>, simpan <code>Tanpa Nama</code>. Selain itu simpan apa adanya.</p><p>Untuk input <code>-</code>:</p><pre>Nama: Tanpa Nama</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\nprivate:\n    string nama;\npublic:\n    // Buat setNama(string) dengan penjagaan, dan getNama()\n    \n};\n\nint main() {\n    Siswa s;\n    string n;\n    cin >> n;\n    s.setNama(n);\n    cout << \"Nama: \" << s.getNama();\n    return 0;\n}\n",
      stdin: "-\n",
      expected: "Nama: Tanpa Nama",
      uji: [{stdin: "Budi\n", h: "9f9679688630724c97dde838963ecc334abdbf456a3c659ec46dbdaad555234a"}, {stdin: "Sari\n", h: "0998743e681301dcbcc6a4b245b5cd9daa29d1e2d88ef7908215c9903a45c6ba"}],
      petunjuk: `Bandingkan teks dengan <code>==</code>: <code>if (n == "-")</code>`
    },
    {
      judul: "Suhu Tidak Mungkin",
      deskripsi: `<p>Suhu terendah yang mungkin ada adalah <strong>-273</strong> derajat Celsius. Buat class <code>Suhu</code> dengan atribut <strong>private</strong> <code>celsius</code>, dan setter yang menolak nilai di bawah itu (jadikan -273).</p><p>Untuk input <code>-300</code>:</p><pre>Suhu: -273</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Suhu {\nprivate:\n    int celsius;\npublic:\n    // Buat setCelsius(int) dengan penjagaan, dan getCelsius()\n    \n};\n\nint main() {\n    Suhu s;\n    int c;\n    cin >> c;\n    s.setCelsius(c);\n    cout << \"Suhu: \" << s.getCelsius();\n    return 0;\n}\n",
      stdin: "-300\n",
      expected: "Suhu: -273",
      uji: [{stdin: "25\n", h: "950ceb193ef0e7a8ac72dc0776447d861b9410a70bb15418bc76e91de6b1c2b1"}, {stdin: "-100\n", h: "13c092c1da28c09aef382a96b26c644e5fa65a5c0e39a33318fbb956f9a3c37d"}],
      petunjuk: `<code>celsius = (c &lt; -273) ? -273 : c;</code>`
    },
    {
      judul: "Dompet Aman",
      deskripsi: `<p>Buat class <code>Dompet</code> dengan atribut <strong>private</strong> <code>saldo</code>. Sediakan <code>setSaldo(int)</code>, <code>belanja(int)</code>, dan <code>getSaldo()</code>.</p><p><strong>Aturan:</strong> <code>belanja()</code> hanya boleh mengurangi saldo kalau uangnya cukup. Kalau tidak cukup, abaikan.</p><p>Untuk input <code>1000 200</code>:</p><pre>Sisa saldo: 800</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Dompet {\nprivate:\n    int saldo;\npublic:\n    // Buat setSaldo(int), belanja(int) dengan penjagaan, dan getSaldo()\n    \n};\n\nint main() {\n    Dompet d;\n    int awal, beli;\n    cin >> awal >> beli;\n    d.setSaldo(awal);\n    d.belanja(beli);\n    cout << \"Sisa saldo: \" << d.getSaldo();\n    return 0;\n}\n",
      stdin: "1000 200\n",
      expected: "Sisa saldo: 800",
      uji: [{stdin: "500 500\n", h: "981021368201e08180460e20bc33794621372c8db67ad750b84e486a10034276"}, {stdin: "300 450\n", h: "dbbd3be6732e828719fe19c223c443a2320539674a341a9fca4ccad809cf629f"}],
      petunjuk: `Coba juga dengan angka belanja lebih besar dari saldo — saldonya harus tidak berubah.`
    }
  ]
};
