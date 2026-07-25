/* =========================================================
   Pertemuan 8: Access Modifier: public, private, protected
   Modul 2 — Class & Object
   STATUS: READY
   ========================================================= */
window.MATERI = window.MATERI || {};
window.MATERI[8] = {
  waktuMenit: 25,

  konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul>
    <li>Memahami tiga <strong>access modifier</strong>: <code>public</code>, <code>private</code>, <code>protected</code>.</li>
    <li>Menyembunyikan data dengan <code>private</code> dan mengaksesnya lewat method <code>public</code>.</li>
    <li>Mengerti mengapa <strong>encapsulation</strong> membuat program lebih aman.</li>
  </ul>

  <h2>📖 Tiga Tingkat Akses</h2>
  <table style="width:100%;border-collapse:collapse;font-size:.9rem">
    <tr style="text-align:left;border-bottom:2px solid var(--border)">
      <th style="padding:6px">Modifier</th><th>Bisa diakses dari…</th></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>public</code></td><td>Mana saja (dari luar objek).</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:6px"><code>private</code></td><td><strong>Hanya</strong> dari dalam class itu sendiri.</td></tr>
    <tr><td style="padding:6px"><code>protected</code></td><td>Dari dalam class + class turunannya (dibahas di modul Inheritance).</td></tr>
  </table>

  <div class="callout warn">
    <strong>⚠️ Default sebuah <code>class</code> adalah <code>private</code></strong>
    Jika Anda tidak menuliskan modifier apa pun di dalam <code>class</code>, semua anggotanya
    otomatis <code>private</code>. (Kebalikan dari <code>struct</code> yang default <code>public</code>.)
  </div>

  <h2>🔒 Masalah Tanpa Enkapsulasi</h2>
  <p>Jika atribut bersifat <code>public</code>, siapa pun bisa mengisinya dengan nilai tak masuk akal:</p>
  <pre><code>class Nilai { public: int skor; };

Nilai n;
n.skor = 999;    // 😱 tidak ada yang mencegah nilai mustahil ini!</code></pre>

  <h2>✅ Solusi: <code>private</code> + Method <code>public</code></h2>
  <p>Sembunyikan atribut dengan <code>private</code>, lalu sediakan "pintu resmi" berupa method
     <code>public</code> yang bisa memvalidasi data sebelum menyimpannya.</p>
  <pre><code>class Nilai {
private:
    int skor;                       // tersembunyi dari luar

public:
    void setSkor(int s) {           // "pintu masuk" yang memvalidasi
        if (s &gt; 100)      skor = 100;
        else if (s &lt; 0)   skor = 0;
        else              skor = s;
    }
    int getSkor() {                 // "pintu keluar"
        return skor;
    }
};

int main() {
    Nilai n;
    // n.skor = 999;   // ❌ ERROR: 'skor' bersifat private
    n.setSkor(150);    // ✅ divalidasi -&gt; disimpan sebagai 100
    cout &lt;&lt; n.getSkor();
}</code></pre>

  <div class="callout tip">
    <strong>💡 Inilah Encapsulation</strong>
    Data (<code>private</code>) dilindungi di dalam objek, dan hanya boleh diubah lewat
    method (<code>public</code>) yang kita kontrol. Objek menjaga datanya sendiri agar selalu valid.
  </div>

  <h2>📌 Rangkuman</h2>
  <ul>
    <li><code>public</code> = terbuka, <code>private</code> = tertutup, <code>protected</code> = untuk turunan.</li>
    <li>Anggota <code>class</code> default-nya <code>private</code>.</li>
    <li>Pola enkapsulasi: atribut <code>private</code> + method <code>public</code> untuk mengaksesnya.</li>
    <li>Method dapat <strong>memvalidasi</strong> data sebelum menyimpannya → objek selalu konsisten.</li>
  </ul>
  `,

  soal: [
    {
      judul: "Skor Ter-validasi",
      deskripsi: `<p>Buat class <code>Nilai</code> dengan atribut <strong>private</strong> <code>skor</code>.
                  Sediakan method <code>public</code>:</p>
                  <ul>
                    <li><code>setSkor(int s)</code> — simpan <code>s</code>, tetapi jika &gt; 100 jadikan 100,
                        dan jika &lt; 0 jadikan 0.</li>
                    <li><code>getSkor()</code> — kembalikan skor.</li>
                  </ul>
                  <p>Baca sebuah angka, set, lalu cetak. Contoh: input <code>150</code> menghasilkan:</p>
                  <pre>Skor: 100</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Nilai {\nprivate:\n    int skor;\npublic:\n    // Buat setSkor(int s) dengan validasi, dan getSkor()\n    \n};\n\nint main() {\n    Nilai n;\n    int x;\n    cin >> x;\n    n.setSkor(x);\n    cout << \"Skor: \" << n.getSkor();\n    return 0;\n}\n",
      stdin: "150\n",
      expected: "Skor: 100",
      petunjuk: "Di dalam setSkor: <code>if (s > 100) skor = 100; else if (s < 0) skor = 0; else skor = s;</code>"
    },
    {
      judul: "Akun Bank Aman",
      deskripsi: `<p>Buat class <code>Akun</code> dengan atribut <strong>private</strong> <code>saldo</code> dan method
                  <code>public</code>: <code>setSaldo(int)</code>, <code>setor(int)</code>,
                  <code>tarik(int)</code>, dan <code>getSaldo()</code>.</p>
                  <p>Aturan penting: <code>tarik()</code> hanya boleh mengurangi saldo jika jumlah tarik
                     <strong>tidak melebihi</strong> saldo saat ini (jika melebihi, abaikan/tolak).</p>
                  <p>Baca tiga bilangan: <em>saldo awal</em>, <em>jumlah setor</em>, <em>jumlah tarik</em>.
                     Contoh: input <code>1000 500 2000</code> → setor jadi 1500, tarik 2000 ditolak → hasil:</p>
                  <pre>Saldo: 1500</pre>`,
      starter: "#include <iostream>\nusing namespace std;\n\nclass Akun {\nprivate:\n    int saldo;\npublic:\n    void setSaldo(int s) { saldo = s; }\n    // Buat setor(int), tarik(int) dengan validasi, dan getSaldo()\n    \n};\n\nint main() {\n    Akun a;\n    int awal, jumlahSetor, jumlahTarik;\n    cin >> awal >> jumlahSetor >> jumlahTarik;\n    a.setSaldo(awal);\n    // Panggil setor(), tarik(), lalu cetak saldo\n    \n    return 0;\n}\n",
      stdin: "1000 500 2000\n",
      expected: "Saldo: 1500",
      petunjuk: "Di dalam tarik: <code>if (jumlah &lt;= saldo) saldo -= jumlah;</code> — inilah validasi yang menjaga saldo tidak minus."
    }
  ]
};
