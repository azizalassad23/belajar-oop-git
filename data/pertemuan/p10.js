/* =========================================================
   Pertemuan 10: Destructor
   Modul 2 — Class & Object
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[10] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami apa itu <strong>destructor</strong> dan kapan ia dipanggil.</li>
    <li>Menuliskan destructor dengan benar.</li>
    <li>Memahami <strong>urutan</strong> penghapusan objek.</li>
  </ul>

  <h2>📖 Apa itu Destructor?</h2>
  <p><strong>Destructor</strong> adalah kebalikan constructor: ia jalan otomatis saat objek
     <em>selesai dipakai</em> dan dibersihkan dari memori.</p>
  <ul>
    <li>Namanya sama dengan class, tapi diawali tanda <strong>tilde</strong> <code>~</code>.</li>
    <li>Tidak punya tipe kembalian dan <strong>tidak boleh punya parameter</strong>.</li>
    <li>Tiap class hanya boleh punya <strong>satu</strong> destructor.</li>
  </ul>

  <pre><code>class Kotak {
public:
    Kotak()  { cout &lt;&lt; "Kotak dibuat" &lt;&lt; endl; }
    ~Kotak() { cout &lt;&lt; "Kotak dihapus" &lt;&lt; endl; }
};

int main() {
    Kotak k;                 // "Kotak dibuat"
}                            // "Kotak dihapus" — otomatis di sini</code></pre>

  <div class="callout">
    <strong>Analogi Pinjam Ruang Kelas 🏫</strong>
    Constructor itu saat kamu masuk dan menyalakan lampu. Destructor itu saat kamu keluar
    dan mematikan lampu. Tidak ada yang menyuruh — begitu kegiatan selesai, otomatis dirapikan.
  </div>

  <h2>🔄 Urutan Penghapusan: Terakhir Dibuat, Duluan Dihapus</h2>
  <p>Ini bagian yang sering bikin salah tebak. Objek dihapus dengan urutan
     <strong>kebalikan</strong> dari urutan pembuatannya.</p>
  <pre><code>int main() {
    Angka a(1);      // Buat 1
    Angka b(2);      // Buat 2
}                    // Hapus 2  lalu  Hapus 1</code></pre>
  <p>Bayangkan menumpuk piring: piring terakhir yang ditaruh di atas, dialah yang
     pertama kali diambil.</p>

  <h2>📦 Objek di Dalam Blok</h2>
  <p>Objek dihapus begitu keluar dari <strong>blok kurung kurawal</strong> tempat ia dibuat,
     bukan menunggu program selesai:</p>
  <pre><code>int main() {
    {
        Lampu l;                        // Lampu menyala
        cout &lt;&lt; "Ruangan terang" &lt;&lt; endl;
    }                                   // Lampu mati — di sini, bukan di akhir main
    cout &lt;&lt; "Selesai";
}</code></pre>

  <div class="callout warn">
    <strong>⚠️ Kesalahan Umum</strong>
    Menulis <code>~Kotak(int n)</code> akan error. Destructor <strong>tidak menerima parameter</strong>,
    karena C++ yang memanggilnya, bukan kamu.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Destructor ditulis <code>~NamaClass()</code>, tanpa parameter dan tanpa tipe kembalian.</li>
    <li>Dipanggil otomatis saat objek keluar dari blok atau program berakhir.</li>
    <li>Urutannya kebalikan dari pembuatan: yang terakhir dibuat, duluan dihapus.</li>
    <li>Gunanya nanti: membebaskan sumber daya seperti memori atau berkas.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Destructor Pertama",
      deskripsi: `<p>Buat class <code>Kotak</code> dengan constructor dan destructor. Constructor mencetak <code>Kotak dibuat</code> lalu pindah baris; destructor mencetak <code>Kotak dihapus</code>.</p><p>Output yang diharapkan:</p><pre>Kotak dibuat
Kotak dihapus</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Kotak {\npublic:\n    // Buat constructor dan destructor di sini\n    \n};\n\nint main() {\n    Kotak k;\n    return 0;\n}\n",
      expected: "Kotak dibuat\nKotak dihapus",
      petunjuk: `Destructor diawali tilde: <code>~Kotak() { ... }</code>`
    },
    {
      judul: "Siswa Masuk dan Pulang",
      deskripsi: `<p>Buat class <code>Siswa</code> dengan atribut <code>nama</code>. Constructor menerima nama dan mencetak <code>&lt;nama&gt; masuk kelas</code> lalu pindah baris. Destructor mencetak <code>&lt;nama&gt; pulang</code>.</p><p>Untuk input <code>Andi</code>:</p><pre>Andi masuk kelas
Andi pulang</pre>`,
      starter: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Siswa {\npublic:\n    string nama;\n    // Buat constructor Siswa(string) dan destructor\n    \n};\n\nint main() {\n    string n;\n    cin >> n;\n    Siswa s(n);\n    return 0;\n}\n",
      stdin: "Andi\n",
      expected: "Andi masuk kelas\nAndi pulang",
      petunjuk: `Destructor masih bisa membaca atribut objeknya, termasuk <code>nama</code>.`
    },
    {
      judul: "Urutan Penghapusan",
      deskripsi: `<p>Buat class <code>Angka</code> dengan atribut <code>n</code>. Constructor mencetak <code>Buat &lt;n&gt;</code> dan destructor mencetak <code>Hapus &lt;n&gt;</code>, masing-masing diikuti pindah baris.</p><p>Buat dua objek dengan nilai 1 lalu 2. Perhatikan baik-baik urutan output:</p><pre>Buat 1
Buat 2
Hapus 2
Hapus 1</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Angka {\npublic:\n    int n;\n    // Buat constructor Angka(int) dan destructor\n    \n};\n\nint main() {\n    Angka a(1);\n    Angka b(2);\n    return 0;\n}\n",
      expected: "Buat 1\nBuat 2\nHapus 2\nHapus 1",
      petunjuk: `Kamu tidak perlu mengatur urutannya — C++ menghapus dari yang terakhir dibuat.`
    },
    {
      judul: "Lampu di Dalam Blok",
      deskripsi: `<p>Buat class <code>Lampu</code>: constructor mencetak <code>Lampu menyala</code>, destructor mencetak <code>Lampu mati</code>, keduanya diikuti pindah baris.</p><p>Di <code>main()</code>, buat objeknya <strong>di dalam blok kurung kurawal</strong> bersama tulisan <code>Ruangan terang</code>, lalu cetak <code>Selesai</code> setelah blok itu.</p><pre>Lampu menyala
Ruangan terang
Lampu mati
Selesai</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Lampu {\npublic:\n    // Buat constructor dan destructor\n    \n};\n\nint main() {\n    {\n        // Buat objek Lampu di sini\n        cout << \"Ruangan terang\" << endl;\n    }\n    cout << \"Selesai\";\n    return 0;\n}\n",
      expected: "Lampu menyala\nRuangan terang\nLampu mati\nSelesai",
      petunjuk: `Perhatikan <code>Lampu mati</code> muncul SEBELUM <code>Selesai</code> — itu efek blok.`
    },
    {
      judul: "Membersihkan Banyak Item",
      deskripsi: `<p>Buat class <code>Item</code> dengan atribut <code>id</code>. Destructor mencetak <code>Item &lt;id&gt; dihapus</code> diikuti pindah baris. Constructor tidak mencetak apa pun.</p><p>Baca sebuah angka <code>n</code>, lalu di dalam perulangan buat objek <code>Item</code> dengan id 1 sampai n. Setelah perulangan selesai, cetak <code>Semua item dibersihkan</code>.</p><p>Untuk input <code>3</code>:</p><pre>Item 1 dihapus
Item 2 dihapus
Item 3 dihapus
Semua item dibersihkan</pre><p>Objek yang dibuat di dalam badan perulangan langsung dihapus setiap akhir putaran.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Item {\npublic:\n    int id;\n    // Buat constructor Item(int) dan destructor\n    \n};\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        // Buat objek Item di sini\n    }\n    cout << \"Semua item dibersihkan\";\n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Item 1 dihapus\nItem 2 dihapus\nItem 3 dihapus\nSemua item dibersihkan",
      petunjuk: `Objek dalam blok perulangan hidup satu putaran saja, jadi urutannya justru 1, 2, 3.`
    }
  ]
};
