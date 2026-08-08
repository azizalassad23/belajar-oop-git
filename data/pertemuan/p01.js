/* =========================================================
   Pertemuan 1: Pengantar OOP & Paradigma Pemrograman
   Modul 1 — Fondasi & Dasar C++
   STATUS: READY (contoh materi terisi penuh)
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[1] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami apa itu <strong>paradigma pemrograman</strong>.</li>
    <li>Membedakan pemrograman <strong>prosedural</strong> dan <strong>berorientasi objek (OOP)</strong>.</li>
    <li>Mengenal 4 pilar OOP secara garis besar.</li>
    <li>Menuliskan program C++ pertama sebagai pemanasan.</li>
  </ul>

  <h2>📖 Apa itu Paradigma Pemrograman?</h2>
  <p><strong>Paradigma</strong> adalah cara pandang atau gaya dalam menulis program.
     Sama seperti ada banyak cara memasak, ada banyak cara menulis kode. Dua yang paling umum:</p>
  <ul>
    <li><strong>Prosedural</strong> — program disusun sebagai <em>urutan langkah</em> (fungsi demi fungsi)
        yang mengolah data. Data dan fungsi terpisah.</li>
    <li><strong>Berorientasi Objek (OOP)</strong> — program disusun sebagai kumpulan <em>objek</em>
        yang menggabungkan <strong>data</strong> dan <strong>perilaku</strong> menjadi satu kesatuan.</li>
  </ul>

  <div class="callout">
    <strong>Analogi Mobil 🚗</strong>
    Dalam gaya prosedural, kita punya data (kecepatan, bahan bakar) di satu tempat, dan fungsi
    (<code>gas()</code>, <code>rem()</code>) di tempat lain. Dalam OOP, kita membuat objek
    <em>Mobil</em> yang <strong>memiliki</strong> data itu dan <strong>bisa</strong> melakukan gas & rem sendiri.
  </div>

  <h2>🧩 Mengapa OOP?</h2>
  <ul>
    <li><strong>Terorganisir</strong> — kode dikelompokkan berdasarkan objek dunia nyata.</li>
    <li><strong>Dapat digunakan ulang</strong> — satu class bisa dipakai berkali-kali.</li>
    <li><strong>Mudah dirawat</strong> — perubahan pada satu objek tidak merusak yang lain.</li>
    <li><strong>Gampang dikembangkan</strong> — cocok untuk program besar (game, aplikasi, sistem).</li>
  </ul>

  <h2>🏛️ 4 Pilar OOP (Gambaran Awal)</h2>
  <ol>
    <li><strong>Encapsulation</strong> (Pembungkusan) — menyatukan data + perilaku, menyembunyikan detail.</li>
    <li><strong>Inheritance</strong> (Pewarisan) — class baru mewarisi sifat class lain.</li>
    <li><strong>Polymorphism</strong> (Banyak bentuk) — satu perintah, banyak wujud perilaku.</li>
    <li><strong>Abstraction</strong> (Abstraksi) — menampilkan yang penting, menyembunyikan kerumitan.</li>
  </ol>
  <p>Keempatnya akan kita pelajari mendalam di modul-modul berikutnya. Untuk sekarang, cukup kenali namanya.</p>

  <h2>💻 Program C++ Pertama</h2>
  <pre><code>#include &lt;iostream&gt;   // library untuk input/output
using namespace std;

int main() {              // titik awal program
    cout &lt;&lt; "Halo, Dunia OOP!" &lt;&lt; endl;
    return 0;             // 0 berarti program selesai normal
}</code></pre>
  <p>Penjelasan singkat:</p>
  <ul>
    <li><code>#include &lt;iostream&gt;</code> — memanggil fitur input/output (<code>cout</code>, <code>cin</code>).</li>
    <li><code>int main()</code> — fungsi utama; program mulai dijalankan dari sini.</li>
    <li><code>cout &lt;&lt; ...</code> — mencetak teks ke layar. <code>endl</code> = pindah baris.</li>
    <li><code>return 0;</code> — menandakan program berakhir tanpa error.</li>
  </ul>

  <div class="callout tip">
    <strong>💡 Ingat</strong>
    Setiap pernyataan di C++ diakhiri titik koma <code>;</code>. Lupa titik koma = error paling umum bagi pemula!
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>OOP adalah cara menyusun program berbasis <strong>objek</strong> (data + perilaku).</li>
    <li>OOP membuat kode lebih rapi, dapat dipakai ulang, dan mudah dirawat.</li>
    <li>4 pilar OOP: Encapsulation, Inheritance, Polymorphism, Abstraction.</li>
    <li>Program C++ dimulai dari fungsi <code>main()</code>.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Salam Pembuka OOP",
      deskripsi: `<p>Buat program yang mencetak <strong>tepat dua baris</strong> berikut:</p>
                  <pre>Halo, Dunia OOP!
Saya siap belajar C++.</pre>
                  <p>Perhatikan tanda baca dan huruf besar/kecil harus sama persis.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Cetak dua baris sesuai soal\n    \n    return 0;\n}\n",
      expected: "Halo, Dunia OOP!\nSaya siap belajar C++.",
      petunjuk: "Gunakan dua <code>cout</code> dengan <code>endl</code>, atau satu <code>cout</code> dengan dua <code>endl</code>."
    },
    {
      judul: "Perkenalan Diri",
      deskripsi: `<p>Program membaca sebuah <strong>nama</strong> (satu kata) lalu sebuah <strong>umur</strong> (bilangan bulat)
                  dari input, kemudian mencetak kalimat perkenalan.</p>
                  <p>Contoh: jika input <code>Budi 17</code>, maka output harus:</p>
                  <pre>Halo Budi, umur 17 tahun.</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string nama;\n    int umur;\n    // Baca nama dan umur, lalu cetak kalimatnya\n    \n    return 0;\n}\n",
      stdin: "Budi 17\n",
      expected: "Halo Budi, umur 17 tahun.",
      petunjuk: "Baca input dengan <code>cin >> nama >> umur;</code> lalu cetak dengan <code>cout</code>."
    },
    {
      judul: "Empat Pilar OOP",
      deskripsi: `<p>Cetak <strong>empat pilar OOP</strong>, satu per baris, dengan urutan dan ejaan persis seperti ini:</p><pre>Encapsulation
Inheritance
Polymorphism
Abstraction</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Cetak empat pilar OOP, satu per baris\n    \n    return 0;\n}\n",
      expected: "Encapsulation\nInheritance\nPolymorphism\nAbstraction",
      petunjuk: `Pakai empat <code>cout</code>, atau satu <code>cout</code> dengan beberapa <code>endl</code>.`
    },
    {
      judul: "Luas Persegi Panjang",
      deskripsi: `<p>Baca <strong>panjang</strong> dan <strong>lebar</strong> dari input, lalu cetak luasnya.</p><p>Untuk input <code>6 4</code>:</p><pre>Luas: 24</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int panjang, lebar;\n    // Baca panjang & lebar, lalu cetak luasnya\n    \n    return 0;\n}\n",
      stdin: "6 4\n",
      expected: "Luas: 24",
      petunjuk: `Baca dengan <code>cin >> panjang >> lebar;</code> lalu cetak <code>panjang * lebar</code>.`
    },
    {
      judul: "Data dan Perilaku",
      deskripsi: `<p>Sebuah objek punya <strong>data</strong> (kata benda) dan <strong>perilaku</strong> (kata kerja). Baca satu nama objek dan satu perilakunya, lalu tampilkan.</p><p>Untuk input <code>Mobil melaju</code>:</p><pre>Objek: Mobil
Perilaku: melaju</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string objek, perilaku;\n    // Baca keduanya, lalu cetak dua baris\n    \n    return 0;\n}\n",
      stdin: "Mobil melaju\n",
      expected: "Objek: Mobil\nPerilaku: melaju",
      petunjuk: `Dua kata dibaca sekaligus: <code>cin >> objek >> perilaku;</code>`
    }
  ]
};
