/* =========================================================
   Pertemuan 19: Mode Akses Pewarisan
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[19] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Mengenal akses <strong>protected</strong> dan bedanya dari private.</li>
    <li>Memahami mode pewarisan <code>public</code>, <code>protected</code>, <code>private</code>.</li>
    <li>Memilih akses yang tepat untuk anggota class induk.</li>
  </ul>

  <h2>📖 Masalahnya: Anak Tidak Bisa Menyentuh Private</h2>
  <p>Di pertemuan lalu ada catatan: anak mewarisi anggota <code>private</code> induknya,
     tapi tidak boleh mengaksesnya langsung. Kodenya akan error:</p>
  <pre><code>class Induk {
private:
    int rahasia;
};
class Anak : public Induk {
public:
    void coba() { cout &lt;&lt; rahasia; }   // ERROR: private milik Induk
};</code></pre>

  <h2>🛡️ Solusinya: <code>protected</code></h2>
  <p><code>protected</code> berada di tengah-tengah:</p>
  <table>
    <tr><th>Akses</th><th>Dari luar class</th><th>Dari class anak</th></tr>
    <tr><td><code>public</code></td><td>✅ boleh</td><td>✅ boleh</td></tr>
    <tr><td><code>protected</code></td><td>❌ tidak</td><td>✅ boleh</td></tr>
    <tr><td><code>private</code></td><td>❌ tidak</td><td>❌ tidak</td></tr>
  </table>

  <pre><code>class Orang {
protected:
    int umur;               // anak boleh, orang luar tidak
public:
    void setUmur(int u) { umur = u; }
};

class Siswa : public Orang {
public:
    void tampil() { cout &lt;&lt; umur; }   // boleh, karena protected
};

int main() {
    Siswa s;
    s.setUmur(17);
    // s.umur = 17;        // tetap ERROR — dari luar tidak boleh
}</code></pre>

  <div class="callout">
    <strong>Analogi Ruang Guru 🏫</strong>
    <code>public</code> = halaman sekolah, siapa pun boleh masuk.
    <code>protected</code> = ruang guru, hanya keluarga sekolah yang boleh.
    <code>private</code> = laci pribadi, hanya pemiliknya.
  </div>

  <h2>🔀 Mode Pewarisan</h2>
  <p>Kata <code>public</code> pada <code>class Anak : public Induk</code> juga bisa diganti.
     Mode ini mengatur <em>bagaimana anggota induk terlihat dari luar class anak</em>:</p>
  <ul>
    <li><code>: public Induk</code> — public tetap public. <strong>Ini yang paling umum</strong>
        dan yang dipakai hampir selalu.</li>
    <li><code>: protected Induk</code> — public induk turun jadi protected di anak.</li>
    <li><code>: private Induk</code> — semua turun jadi private di anak.</li>
  </ul>
  <p>Pada dua mode terakhir, anak tetap bisa memakai anggota induknya <em>di dalam dirinya
     sendiri</em>, tapi pengguna dari luar tidak lagi bisa memanggilnya lewat objek anak.</p>

  <div class="callout warn">
    <strong>⚠️ Kalau Modenya Tidak Ditulis</strong>
    Menulis <code>class Anak : Induk</code> pada <code>class</code> berarti
    <strong>private</strong>, bukan public. Ini sumber error yang membingungkan.
    Biasakan selalu menulis <code>public</code> secara eksplisit.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>protected</code> = tertutup dari luar, terbuka untuk class anak.</li>
    <li>Pakai <code>protected</code> untuk anggota yang memang perlu dipakai turunannya.</li>
    <li>Mode pewarisan mengatur akses anggota induk dilihat dari luar anak.</li>
    <li><code>public</code> adalah mode yang hampir selalu dipakai — dan wajib ditulis.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Mewarisi Anggota Public",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan atribut <strong>public</strong> <code>nama</code> dan method <code>makan()</code> yang mencetak <code>&lt;nama&gt; sedang makan</code>. Buat class <code>Kucing</code> yang mewarisinya secara <code>public</code> tanpa tambahan apa pun.</p><p>Untuk input <code>Bimo</code>:</p><pre>Bimo sedang makan</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Hewan {\npublic:\n    string nama;\n    // Buat method makan()\n    \n};\n\n// Buat class Kucing yang mewarisi Hewan secara public\n\nint main() {\n    string n;\n    cin >> n;\n    Kucing k;\n    k.nama = n;\n    k.makan();\n    return 0;\n}\n",
      stdin: "Bimo\n",
      expected: "Bimo sedang makan",
      petunjuk: `Dengan mode <code>public</code>, <code>k.nama</code> tetap bisa diisi dari luar.`
    },
    {
      judul: "Anggota Protected",
      deskripsi: `<p>Buat class <code>Orang</code> dengan atribut <strong>protected</strong> <code>umur</code> dan method <code>setUmur(int)</code>. Buat class <code>Siswa</code> yang mewarisinya dan punya method <code>tampil()</code> yang <strong>membaca <code>umur</code> langsung</strong>.</p><p>Untuk input <code>90</code>:</p><pre>Umur dari protected: 90</pre><p>Coba juga: kalau <code>umur</code> diubah jadi <code>private</code>, kode ini akan gagal dikompilasi.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Orang {\nprotected:\n    int umur;\npublic:\n    void setUmur(int u) { umur = u; }\n};\n\n// Buat class Siswa yang mewarisi Orang, dengan method tampil()\n\nint main() {\n    int u;\n    cin >> u;\n    Siswa s;\n    s.setUmur(u);\n    s.tampil();\n    return 0;\n}\n",
      stdin: "90\n",
      expected: "Umur dari protected: 90",
      petunjuk: `Di dalam <code>tampil()</code>, tulis <code>umur</code> langsung tanpa perantara.`
    },
    {
      judul: "Private vs Protected",
      deskripsi: `<p>Buat class <code>Induk</code> dengan atribut <strong>private</strong> <code>rahasia</code> dan <strong>protected</strong> <code>catatan</code>. Sediakan <code>isi(int n)</code> yang mengisi <code>rahasia = n</code> dan <code>catatan = n * 2</code>, serta <code>getRahasia()</code>.</p><p>Buat class <code>Anak</code> dengan method <code>tampil()</code> yang membaca <code>catatan</code> <strong>langsung</strong>, tapi membaca <code>rahasia</code> <strong>lewat getter</strong>.</p><p>Untuk input <code>1500</code>:</p><pre>Lewat protected: 3000
Lewat getter: 1500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\nprivate:\n    int rahasia;\nprotected:\n    int catatan;\npublic:\n    void isi(int n) { rahasia = n; catatan = n * 2; }\n    int getRahasia() { return rahasia; }\n};\n\n// Buat class Anak yang mewarisi Induk, dengan method tampil()\n\nint main() {\n    int n;\n    cin >> n;\n    Anak a;\n    a.isi(n);\n    a.tampil();\n    return 0;\n}\n",
      stdin: "1500\n",
      expected: "Lewat protected: 3000\nLewat getter: 1500",
      petunjuk: `Menulis <code>rahasia</code> langsung di dalam Anak akan error — itulah beda private dan protected.`
    },
    {
      judul: "Pewarisan Protected",
      deskripsi: `<p>Buat class <code>Induk</code> dengan atribut <strong>protected</strong> <code>nilai</code> dan method <strong>public</strong> <code>setNilai(int)</code>. Buat class <code>Anak</code> yang mewarisinya dengan mode <code>protected</code>, lalu method <code>pakai(int n)</code> yang memanggil <code>setNilai(n)</code> dari dalam dan mencetak hasilnya.</p><p>Untuk input <code>50</code>:</p><pre>Anak memakai nilai: 50</pre><p>Karena modenya protected, <code>a.setNilai(50)</code> dari <code>main()</code> justru akan error — aksesnya harus lewat <code>pakai()</code>.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\nprotected:\n    int nilai;\npublic:\n    void setNilai(int n) { nilai = n; }\n};\n\n// Buat class Anak yang mewarisi Induk secara protected,\n// dengan method pakai(int n)\n\nint main() {\n    int n;\n    cin >> n;\n    Anak a;\n    a.pakai(n);\n    return 0;\n}\n",
      stdin: "50\n",
      expected: "Anak memakai nilai: 50",
      petunjuk: `Sintaksnya: <code>class Anak : protected Induk { ... };</code>`
    },
    {
      judul: "Satu Protected untuk Dua Anak",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan atribut <strong>protected</strong> <code>sisi</code> dan method <code>setSisi(int)</code>. Buat dua class anak: <code>Persegi</code> dengan method <code>luas()</code>, dan <code>Kubus</code> dengan method <code>volume()</code>. Keduanya membaca <code>sisi</code> langsung.</p><p>Untuk input <code>7</code>:</p><pre>Luas persegi: 49
Volume kubus: 343</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\nprotected:\n    int sisi;\npublic:\n    void setSisi(int s) { sisi = s; }\n};\n\n// Buat class Persegi (luas) dan Kubus (volume), keduanya mewarisi Bentuk\n\nint main() {\n    int s;\n    cin >> s;\n    Persegi p;\n    Kubus k;\n    p.setSisi(s);\n    k.setSisi(s);\n    cout << \"Luas persegi: \" << p.luas() << endl;\n    cout << \"Volume kubus: \" << k.volume();\n    return 0;\n}\n",
      stdin: "7\n",
      expected: "Luas persegi: 49\nVolume kubus: 343",
      petunjuk: `Satu atribut protected di induk bisa dipakai semua turunannya tanpa ditulis ulang.`
    }
  ]
};
