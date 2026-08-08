/* =========================================================
   Pertemuan 7: Atribut & Method
   Modul 2 — Class & Object
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[7] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Membedakan <strong>atribut</strong> (data) dan <strong>method</strong> (perilaku) dengan jelas.</li>
    <li>Membuat method yang <strong>menerima parameter</strong> dan <strong>mengembalikan nilai</strong>.</li>
    <li>Membuat method yang <strong>mengubah</strong> atau <strong>membaca</strong> atribut objek.</li>
  </ul>

  <h2>📖 Dua Bagian sebuah Class</h2>
  <p>Setiap class dibangun dari dua jenis anggota:</p>
  <ul>
    <li><strong>Atribut</strong> (member variable) → <em>keadaan/data</em> objek. Biasanya kata benda:
        <code>merek</code>, <code>saldo</code>, <code>panjang</code>.</li>
    <li><strong>Method</strong> (member function) → <em>perilaku/aksi</em> objek. Biasanya kata kerja:
        <code>gas()</code>, <code>setor()</code>, <code>hitungLuas()</code>.</li>
  </ul>

  <div class="callout">
    <strong>Analogi 🏧</strong>
    Objek <em>Rekening</em> punya atribut <code>saldo</code> (datanya) dan method
    <code>setor()</code> / <code>tarik()</code> (aksinya). Method-lah yang mengubah atribut.
  </div>

  <h2>🔧 Method dengan Parameter & Nilai Kembali</h2>
  <p>Method pada dasarnya adalah fungsi milik objek. Ia bisa menerima parameter dan/atau mengembalikan nilai.</p>
  <pre><code>class Kalkulator {
public:
    int angka;                    // atribut

    void set(int nilai) {         // method dgn parameter, tanpa kembalian (void)
        angka = nilai;
    }
    int kaliDengan(int n) {       // method dgn parameter DAN nilai kembali
        return angka * n;
    }
};

int main() {
    Kalkulator k;
    k.set(6);
    cout &lt;&lt; k.kaliDengan(4);     // 24
    return 0;
}</code></pre>

  <h2>🔁 Method Mengubah & Membaca Atribut</h2>
  <p>Kekuatan OOP muncul ketika method <strong>mengelola atribut</strong> objek dari waktu ke waktu.
     Perhatikan bagaimana <code>saldo</code> berubah lewat method:</p>
  <pre><code>class Rekening {
public:
    int saldo;

    void setor(int jumlah) { saldo += jumlah; }  // menambah
    void tarik(int jumlah) { saldo -= jumlah; }  // mengurangi
    int cekSaldo()         { return saldo; }     // membaca
};

int main() {
    Rekening r;
    r.saldo = 1000;
    r.setor(500);        // saldo -&gt; 1500
    r.tarik(300);        // saldo -&gt; 1200
    cout &lt;&lt; r.cekSaldo(); // 1200
}</code></pre>

  <div class="callout tip">
    <strong>💡 Method boleh memanggil atribut langsung</strong>
    Di dalam method, Anda cukup menulis nama atributnya (mis. <code>saldo</code>) tanpa titik —
    karena method sudah "berada di dalam" objeknya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><strong>Atribut</strong> = data objek; <strong>method</strong> = perilaku objek.</li>
    <li>Method dapat menerima <strong>parameter</strong> dan mengembalikan nilai (atau <code>void</code>).</li>
    <li>Method biasanya bertugas <strong>mengubah</strong> atau <strong>membaca</strong> atribut.</li>
    <li>Di dalam method, atribut diakses langsung tanpa titik.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Class Kotak: Luas & Keliling",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan atribut <code>panjang</code> dan <code>lebar</code>,
                  serta dua method: <code>luas()</code> (panjang &times; lebar) dan
                  <code>keliling()</code> (2 &times; (panjang + lebar)).</p>
                  <p>Baca <code>panjang</code> lalu <code>lebar</code>, cetak dua baris.
                     Contoh untuk input <code>5 3</code>:</p>
                  <pre>Luas: 15
Keliling: 16</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    int panjang, lebar;\n    // Buat method luas() dan keliling() di sini\n    \n};\n\nint main() {\n    Kotak k;\n    cin >> k.panjang >> k.lebar;\n    // Cetak Luas dan Keliling\n    \n    return 0;\n}\n",
      stdin: "5 3\n",
      expected: "Luas: 15\nKeliling: 16",
      petunjuk: "<code>int luas(){ return panjang * lebar; }</code> dan <code>int keliling(){ return 2*(panjang+lebar); }</code>."
    },
    {
      judul: "Class Rekening",
      deskripsi: `<p>Buat class <code>Rekening</code> dengan atribut <code>saldo</code> dan method
                  <code>setor(int jumlah)</code>, <code>tarik(int jumlah)</code>, serta
                  <code>cekSaldo()</code> yang mengembalikan saldo.</p>
                  <p>Baca tiga bilangan: <em>saldo awal</em>, <em>jumlah setor</em>, <em>jumlah tarik</em>.
                     Lakukan setor lalu tarik, kemudian cetak saldo akhir.</p>
                  <p>Contoh: input <code>1000 500 300</code> menghasilkan:</p>
                  <pre>Saldo akhir: 1200</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Rekening {\npublic:\n    int saldo;\n    // Buat method setor(), tarik(), dan cekSaldo() di sini\n    \n};\n\nint main() {\n    Rekening r;\n    int awal, jumlahSetor, jumlahTarik;\n    cin >> awal >> jumlahSetor >> jumlahTarik;\n    r.saldo = awal;\n    // Panggil setor(), tarik(), lalu cetak saldo akhir\n    \n    return 0;\n}\n",
      stdin: "1000 500 300\n",
      expected: "Saldo akhir: 1200",
      petunjuk: "<code>void setor(int j){ saldo += j; }</code>, <code>void tarik(int j){ saldo -= j; }</code>."
    },
    {
      judul: "Class Kalkulator",
      deskripsi: `<p>Buat class <code>Kalkulator</code> dengan atribut <code>a</code> dan <code>b</code>, serta dua method: <code>tambah()</code> dan <code>kurang()</code>.</p><p>Untuk input <code>12 5</code>:</p><pre>Tambah: 17
Kurang: 7</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kalkulator {\npublic:\n    int a, b;\n    // Buat method tambah() dan kurang()\n    \n};\n\nint main() {\n    Kalkulator k;\n    cin >> k.a >> k.b;\n    // Cetak dua baris hasilnya\n    \n    return 0;\n}\n",
      stdin: "12 5\n",
      expected: "Tambah: 17\nKurang: 7",
      petunjuk: `Kedua method mengembalikan <code>int</code> dan membaca atribut langsung tanpa titik.`
    },
    {
      judul: "Class Suhu",
      deskripsi: `<p>Buat class <code>Suhu</code> dengan atribut <code>celsius</code> dan method <code>keFahrenheit()</code> memakai rumus <code>C &times; 9 / 5 + 32</code>.</p><p>Untuk input <code>25</code>:</p><pre>Fahrenheit: 77</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Suhu {\npublic:\n    int celsius;\n    // Buat method keFahrenheit() di sini\n    \n};\n\nint main() {\n    Suhu s;\n    cin >> s.celsius;\n    // Cetak hasil konversinya\n    \n    return 0;\n}\n",
      stdin: "25\n",
      expected: "Fahrenheit: 77",
      petunjuk: `Urutan operasi penting: <code>celsius * 9 / 5 + 32</code>, bukan <code>celsius * (9/5)</code>.`
    },
    {
      judul: "Class Penghitung",
      deskripsi: `<p>Buat class <code>Penghitung</code> dengan atribut <code>nilai</code> dan method <code>naik()</code> yang menambah nilai sebanyak 1.</p><p>Baca sebuah angka <code>n</code>, mulai dari nilai 0, lalu panggil <code>naik()</code> sebanyak <code>n</code> kali.</p><p>Untuk input <code>5</code>:</p><pre>Hitungan: 5</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Penghitung {\npublic:\n    int nilai;\n    // Buat method naik() di sini\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    Penghitung c;\n    c.nilai = 0;\n    // Panggil naik() sebanyak n kali, lalu cetak\n    \n    return 0;\n}\n",
      stdin: "5\n",
      expected: "Hitungan: 5",
      petunjuk: `<code>void naik() { nilai++; }</code> lalu panggil di dalam perulangan.`
    }
  ]
};
