/* =========================================================
   Pertemuan 29: Virtual Destructor
   Modul 5 — Polymorphism
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[29] = {
  waktuMenit: 45,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami kenapa destructor perlu <code>virtual</code>.</li>
    <li>Mengenali kebocoran memori akibat destructor yang tidak virtual.</li>
    <li>Membiasakan menulis virtual destructor pada class induk.</li>
  </ul>

  <h2>⚠️ Masalahnya: Destructor Anak Tidak Dipanggil</h2>
  <p>Ini kelanjutan langsung dari <code>virtual</code> pada method biasa. Kalau objek anak
     dihapus lewat <strong>pointer induk</strong>, dan destructor induknya <em>tidak</em>
     virtual, maka:</p>
  <pre><code>class Induk { public: ~Induk() { cout &lt;&lt; "Induk dihapus"; } };
class Anak : public Induk { public: ~Anak() { cout &lt;&lt; "Anak dihapus"; } };

int main() {
    Induk* p = new Anak();
    delete p;               // hanya "Induk dihapus"
}</code></pre>
  <p><strong>Destructor Anak tidak pernah dijalankan.</strong> Kalau Anak memegang memori
     atau berkas, semuanya tidak pernah dibebaskan &mdash; inilah <em>kebocoran memori</em>.</p>

  <h2>✅ Solusinya: Satu Kata</h2>
  <pre><code>class Induk {
public:
    virtual ~Induk() { cout &lt;&lt; "Induk dihapus"; }
};</code></pre>
  <p>Hasilnya sekarang benar:</p>
  <pre>Anak dihapus
Induk dihapus</pre>
  <p>Urutannya tetap dari anak ke induk, seperti yang dipelajari di Pertemuan 20.</p>

  <div class="callout">
    <strong>Analogi Membongkar Tenda ⛺</strong>
    Tanpa virtual destructor, kamu hanya mencabut pasak dan pergi &mdash; kainnya
    ditinggal begitu saja. Dengan virtual destructor, kain dilipat dulu, baru pasaknya
    dicabut.
  </div>

  <div class="callout warn">
    <strong>⚠️ Aturan Praktis yang Wajib Diingat</strong>
    Kalau sebuah class punya method <code>virtual</code>, atau akan diwariskan dan dipakai
    lewat pointer &mdash; <strong>berikan virtual destructor</strong>. Biayanya hampir nol,
    tapi lupa melakukannya menyebabkan bug yang sangat sulit dilacak karena programnya
    tetap jalan tanpa pesan error apa pun.
  </div>

  <div class="callout tip">
    <strong>💡 Cukup Ditulis Sekali</strong>
    Sekali destructor induk ditandai virtual, seluruh turunannya otomatis ikut virtual
    &mdash; termasuk cucu dan cicitnya.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li>Tanpa virtual destructor, <code>delete</code> lewat pointer induk melewati
        destructor anak.</li>
    <li>Akibatnya sumber daya milik anak tidak pernah dibebaskan.</li>
    <li>Tulis <code>virtual ~NamaClass() { }</code> di setiap class induk.</li>
    <li>Cukup ditulis sekali di paling atas; turunannya otomatis mengikuti.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Masalahnya Dulu",
      deskripsi: `<p>Buat class <code>Induk</code> dengan destructor <strong>biasa</strong> (tanpa virtual) yang mencetak <code>Induk dihapus</code>, dan <code>Anak</code> dengan destructor yang mencetak <code>Anak dihapus</code>. Keduanya diikuti pindah baris.</p><p>Di <code>main()</code>, hapus objek Anak lewat pointer Induk, lalu cetak <code>Selesai</code>.</p><pre>Induk dihapus
Selesai</pre><p>Perhatikan: baris <code>Anak dihapus</code> <strong>tidak muncul</strong>. Itulah bug-nya.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\npublic:\n    // destructor BIASA (tanpa virtual)\n    \n};\n\n// class Anak dengan destructor sendiri\n\nint main() {\n    Induk* p = new Anak();\n    delete p;\n    cout << \"Selesai\";\n    return 0;\n}\n",
      expected: "Induk dihapus\nSelesai",
      petunjuk: `Program tidak memberi peringatan apa pun — itulah yang membuat bug ini berbahaya.`
    },
    {
      judul: "Memperbaikinya",
      deskripsi: `<p>Ulangi soal sebelumnya, tapi kali ini destructor <code>Induk</code> ditandai <strong><code>virtual</code></strong>. Sekarang destructor Anak ikut terpanggil.</p><pre>Anak dihapus
Induk dihapus
Selesai</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Induk {\npublic:\n    // destructor VIRTUAL\n    \n};\n\n// class Anak dengan destructor sendiri\n\nint main() {\n    Induk* p = new Anak();\n    delete p;\n    cout << \"Selesai\";\n    return 0;\n}\n",
      expected: "Anak dihapus\nInduk dihapus\nSelesai",
      petunjuk: `Satu kata <code>virtual</code> saja yang berubah dari soal sebelumnya.`
    },
    {
      judul: "Membandingkan Berdampingan",
      deskripsi: `<p>Buat <strong>dua pasang</strong> class untuk dibandingkan langsung: <code>TanpaVirtual</code> &rarr; <code>AnakA</code>, dan <code>DenganVirtual</code> &rarr; <code>AnakB</code>. Destructornya mencetak <code>~TanpaVirtual</code>, <code>~AnakA</code>, <code>~DenganVirtual</code>, <code>~AnakB</code>, semuanya diikuti pindah baris.</p><pre>Tanpa virtual:
~TanpaVirtual
Dengan virtual:
~AnakB
~DenganVirtual</pre><p><code>~AnakA</code> hilang &mdash; dan itu memang yang seharusnya terjadi.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\n// Pasangan tanpa virtual: TanpaVirtual -> AnakA\n\n// Pasangan dengan virtual: DenganVirtual -> AnakB\n\nint main() {\n    cout << \"Tanpa virtual:\" << endl;\n    TanpaVirtual* a = new AnakA();\n    delete a;\n    cout << \"Dengan virtual:\" << endl;\n    DenganVirtual* b = new AnakB();\n    delete b;\n    return 0;\n}\n",
      expected: "Tanpa virtual:\n~TanpaVirtual\nDengan virtual:\n~AnakB\n~DenganVirtual",
      petunjuk: `Bandingkan kedua blok — bedanya hanya satu kata, akibatnya satu destructor terlewat.`
    },
    {
      judul: "Rantai Tiga Tingkat",
      deskripsi: `<p>Buat rantai <code>A</code> &rarr; <code>B</code> &rarr; <code>C</code>, dengan destructor A ditandai <strong>virtual</strong>. Destructornya mencetak <code>~A</code>, <code>~B</code>, <code>~C</code>, semuanya diikuti pindah baris.</p><p>Hapus objek C lewat pointer A:</p><pre>~C
~B
~A</pre><p>Cukup A yang ditandai virtual — B dan C otomatis ikut.</p>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass A {\npublic:\n    // destructor VIRTUAL\n    \n};\n\n// class B : mewarisi A\n\n// class C : mewarisi B\n\nint main() {\n    A* p = new C();\n    delete p;\n    return 0;\n}\n",
      expected: "~C\n~B\n~A",
      petunjuk: `Virtual cukup ditulis di paling atas; sifat itu menurun ke seluruh keturunannya.`
    },
    {
      judul: "Membersihkan Berkas",
      deskripsi: `<p>Buat class <code>Sumber</code> dengan destructor <strong>virtual</strong> yang mencetak <code>Sumber dibebaskan</code>, dan <code>Berkas</code> dengan atribut <code>id</code> serta destructor yang mencetak <code>Berkas &lt;id&gt; ditutup</code>. Semua diikuti pindah baris.</p><p>Baca angka <code>n</code>, lalu dalam perulangan buat dan hapus objek <code>Berkas</code> dengan id 1 sampai n lewat pointer <code>Sumber*</code>. Akhiri dengan <code>Semua bersih</code>.</p><p>Untuk input <code>3</code>:</p><pre>Berkas 1 ditutup
Sumber dibebaskan
Berkas 2 ditutup
Sumber dibebaskan
Berkas 3 ditutup
Sumber dibebaskan
Semua bersih</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Sumber {\npublic:\n    // destructor virtual\n    \n};\n\n// class Berkas : atribut id, constructor Berkas(int), destructor\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        Sumber* s = new Berkas(i);\n        delete s;\n    }\n    cout << \"Semua bersih\";\n    return 0;\n}\n",
      stdin: "3\n",
      expected: "Berkas 1 ditutup\nSumber dibebaskan\nBerkas 2 ditutup\nSumber dibebaskan\nBerkas 3 ditutup\nSumber dibebaskan\nSemua bersih",
      petunjuk: `Tiap putaran menghapus satu berkas dengan benar — tanpa virtual, semuanya akan bocor.`
    }
  ]
};
