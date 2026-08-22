/* =========================================================
   Pertemuan 21: Overriding Method
   Modul 4 — Inheritance (Pewarisan)
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[21] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Menulis ulang (<strong>override</strong>) method warisan di class anak.</li>
    <li>Memanggil versi induk dari dalam versi anak.</li>
    <li>Membedakan mengganti seluruhnya dan menambahkan.</li>
  </ul>

  <h2>📖 Mengganti Isi Method Warisan</h2>
  <p>Class anak mewarisi method induknya. Tapi kadang perilakunya perlu berbeda.
     Caranya: tulis ulang method itu di anak dengan <strong>nama dan parameter yang sama</strong>.</p>
  <pre><code>class Hewan {
public:
    void bersuara() { cout &lt;&lt; "Hewan bersuara" &lt;&lt; endl; }
};

class Kucing : public Hewan {
public:
    void bersuara() { cout &lt;&lt; "Meong"; }   // menimpa versi induk
};

int main() {
    Hewan h;  h.bersuara();     // Hewan bersuara
    Kucing k; k.bersuara();     // Meong
}</code></pre>

  <div class="callout">
    <strong>Analogi Resep Warisan 🍲</strong>
    Ibu punya resep soto. Anaknya memakai resep yang sama, tapi menggantinya jadi lebih pedas.
    Namanya tetap "soto", isinya yang berbeda.
  </div>

  <h2>🔗 Memanggil Versi Induk</h2>
  <p>Kadang kamu tidak ingin membuang versi induknya, hanya menambah. Panggil versi induk
     secara eksplisit dengan <code>NamaInduk::</code>:</p>
  <pre><code>class Anak : public Induk {
public:
    void sapa() {
        Induk::sapa();                      // jalankan versi induk dulu
        cout &lt;&lt; "Halo dari Anak";           // baru tambahan sendiri
    }
};</code></pre>

  <div class="callout warn">
    <strong>⚠️ Hati-hati Memanggil Diri Sendiri</strong>
    Menulis <code>sapa();</code> saja di dalam <code>Anak::sapa()</code> berarti memanggil
    dirinya sendiri berulang tanpa henti sampai program mati. Yang benar
    <code>Induk::sapa();</code> dengan nama class induknya.
  </div>

  <div class="callout tip">
    <strong>💡 Yang Belum Dibahas</strong>
    Overriding di pertemuan ini baru bekerja kalau objeknya dipanggil langsung. Kalau
    diakses lewat pointer bertipe induk, hasilnya belum tentu seperti dugaanmu — itu
    dibahas di Pertemuan 26 tentang <code>virtual</code>.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Override = menulis ulang method warisan dengan nama & parameter sama.</li>
    <li>Versi anak menutupi versi induk untuk objek anak.</li>
    <li><code>Induk::method()</code> memanggil versi induk secara sengaja.</li>
    <li>Berguna untuk menambah perilaku, bukan hanya mengganti.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Override Pertama",
      deskripsi: `<p>Buat class <code>Hewan</code> dengan method <code>bersuara()</code> yang mencetak <code>Hewan bersuara</code> lalu pindah baris. Buat class <code>Kucing</code> yang mewarisinya dan <strong>meng-override</strong> method itu menjadi <code>Meong</code>.</p><pre>Hewan bersuara
Meong</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Hewan {\npublic:\n    // Buat method bersuara()\n    \n};\n\n// Buat class Kucing yang meng-override bersuara()\n\nint main() {\n    Hewan h;\n    Kucing k;\n    h.bersuara();\n    k.bersuara();\n    return 0;\n}\n",
      expected: "Hewan bersuara\nMeong",
      petunjuk: `Nama dan parameter method di anak harus SAMA PERSIS dengan di induk.`
    },
    {
      judul: "Memanggil Versi Induk",
      deskripsi: `<p>Buat class <code>Induk</code> dengan method <code>sapa()</code> yang mencetak <code>Halo dari Induk</code> lalu pindah baris. Buat class <code>Anak</code> yang meng-override <code>sapa()</code>, tapi <strong>memanggil versi induk lebih dulu</strong> sebelum mencetak <code>Halo dari Anak</code>.</p><pre>Halo dari Induk
Halo dari Anak</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\npublic:\n    // Buat method sapa()\n    \n};\n\n// Buat class Anak yang meng-override sapa()\n// dan memanggil Induk::sapa() lebih dulu\n\nint main() {\n    Anak a;\n    a.sapa();\n    return 0;\n}\n",
      expected: "Halo dari Induk\nHalo dari Anak",
      petunjuk: `<code>Induk::sapa();</code> — jangan tulis <code>sapa();</code> saja, itu memanggil dirinya sendiri.`
    },
    {
      judul: "Pajak Berbeda",
      deskripsi: `<p>Buat class <code>Kendaraan</code> dengan atribut <code>harga</code> dan method <code>pajak()</code> yang mengembalikan <code>harga / 10</code>. Buat class <code>Motor</code> yang meng-override <code>pajak()</code> menjadi <code>harga / 20</code>.</p><p>Untuk input <code>120</code>:</p><pre>Pajak kendaraan: 12
Pajak motor: 6</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kendaraan {\npublic:\n    int harga;\n    // Buat method pajak()\n    \n};\n\n// Buat class Motor yang meng-override pajak()\n\nint main() {\n    int h;\n    cin >> h;\n    Kendaraan k;\n    Motor m;\n    k.harga = h;\n    m.harga = h;\n    cout << \"Pajak kendaraan: \" << k.pajak() << endl;\n    cout << \"Pajak motor: \" << m.pajak();\n    return 0;\n}\n",
      stdin: "120\n",
      expected: "Pajak kendaraan: 12\nPajak motor: 6",
      petunjuk: `Method di anak boleh memakai atribut warisan <code>harga</code> seperti biasa.`
    },
    {
      judul: "Menambah, Bukan Mengganti",
      deskripsi: `<p>Buat class <code>Orang</code> dengan atribut <code>nama</code> dan method <code>info()</code> yang mencetak <code>Nama: &lt;nama&gt;</code> lalu pindah baris. Buat class <code>Siswa</code> yang meng-override <code>info()</code> dengan memanggil versi induk dulu, lalu menambahkan <code>Status: Siswa</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Nama: Andi
Status: Siswa</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Orang {\npublic:\n    string nama;\n    // Buat method info()\n    \n};\n\n// Buat class Siswa yang meng-override info()\n\nint main() {\n    string n;\n    cin >> n;\n    Siswa s;\n    s.nama = n;\n    s.info();\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Nama: Andi\nStatus: Siswa",
      petunjuk: `Pola ini sering dipakai: pertahankan perilaku induk, lalu tambahkan yang khas anak.`
    },
    {
      judul: "Tiga Cara Menggambar",
      deskripsi: `<p>Buat class <code>Bentuk</code> dengan method <code>gambar()</code> yang mencetak <code>Menggambar bentuk</code>. Buat dua class anak, <code>Lingkaran</code> dan <code>Kotak</code>, yang masing-masing meng-override menjadi <code>Menggambar lingkaran</code> dan <code>Menggambar kotak</code>. Dua yang pertama diikuti pindah baris.</p><pre>Menggambar bentuk
Menggambar lingkaran
Menggambar kotak</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Bentuk {\npublic:\n    // Buat method gambar()\n    \n};\n\n// Buat class Lingkaran dan Kotak yang meng-override gambar()\n\nint main() {\n    Bentuk b;\n    Lingkaran l;\n    Kotak k;\n    b.gambar();\n    l.gambar();\n    k.gambar();\n    return 0;\n}\n",
      expected: "Menggambar bentuk\nMenggambar lingkaran\nMenggambar kotak",
      petunjuk: `Satu nama method, tiga perilaku berbeda — inilah awal dari polymorphism.`
    }
  ]
};
