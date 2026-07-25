# Kelas OOP C++ — Platform Belajar 35 Pertemuan

Web statis (HTML/CSS/JS murni) untuk mengajarkan **Pemrograman Berorientasi Objek (OOP)**
dengan **C++**. Setiap materi dilengkapi **ujian live coding**: soal di kiri, editor kode di
kanan, kode **dikompilasi & dijalankan sungguhan** (g++ asli) langsung dari browser.

Dirancang untuk **deploy di GitHub Pages** — tanpa server sendiri.

---

## ✨ Fitur

- 📚 **35 pertemuan** terstruktur dalam **7 modul** (dari dasar C++ hingga proyek OOP).
- ⚡ **Ujian live coding**: layar terbagi (soal | editor), penilaian otomatis dengan
  membandingkan output program terhadap kunci jawaban.
- 🧠 **Kompilasi C++ asli** via [Wandbox](https://wandbox.org) (g++ 13, mendukung class,
  inheritance, polymorphism, template, STL, smart pointer, dll).
- ⏱️ **Timer ujian** yang bisa diatur per materi.
- 👁️ **Anti-mencontek**: berpindah tab/keluar jendela lebih dari 2 kali → **layar dikunci**.
- ✅ **Progres tersimpan** di browser murid (localStorage) — materi yang lulus ujian ditandai selesai.

> **Catatan penting:** ujian membutuhkan **koneksi internet** karena kode dikompilasi di
> server Wandbox (gratis, tanpa API key). Selebihnya situs berjalan sepenuhnya statis.

---

## 📁 Struktur Folder

```
oop-train/
├── index.html              → Halaman utama: peta 35 pertemuan
├── materi.html             → Template materi (dibuka via ?id=N)
├── ujian.html              → Template ujian live coding (dibuka via ?id=N)
├── preview-server.js       → Server lokal opsional untuk pratinjau
├── .nojekyll               → Agar GitHub Pages menyajikan file apa adanya
├── assets/
│   ├── css/style.css       → Seluruh tampilan
│   └── js/
│       ├── kurikulum.js    → Daftar 35 pertemuan & 7 modul (judul, urutan, status)
│       ├── app.js          → Logika halaman index + progres
│       ├── materi.js       → Perender halaman materi
│       ├── ujian.js        → Logika ujian (timer, anti-mencontek, penilaian)
│       └── runner.js       → Mesin eksekusi C++ (Wandbox) — bisa diganti
└── data/
    └── pertemuan/
        ├── p01.js … p35.js → Konten & soal tiap pertemuan (diisi satu per satu)
```

---

## ✍️ Cara Mengisi / Mengedit Materi

Setiap pertemuan punya **satu file** di `data/pertemuan/pNN.js` (mis. `p07.js` untuk
Pertemuan 7). Pertemuan **1, 2, dan 6 sudah terisi penuh** sebagai contoh — tiru polanya.

Buka file tersebut, isi dua bagian:

### 1. `konten` — materi (HTML)
```js
konten: `
  <h2>🎯 Tujuan Pembelajaran</h2>
  <ul><li>...</li></ul>

  <h2>📖 Materi</h2>
  <p>Penjelasan Anda...</p>

  <pre><code>// contoh kode C++
// gunakan &lt; dan &gt; untuk menuliskan < dan >
</code></pre>

  <div class="callout tip"><strong>💡 Tips</strong> ...</div>
`,
```
Kelas CSS yang tersedia untuk kotak sorotan: `callout`, `callout tip`, `callout warn`.

### 2. `soal` — bank soal ujian
```js
soal: [
  {
    judul: "Judul Soal",
    deskripsi: "<p>Penjelasan soal dalam HTML...</p>",
    starter: "#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n",
    stdin: "5\n",                 // (opsional) input yang diberikan ke program
    expected: "Luas persegi: 25", // output yang benar (dibandingkan otomatis)
    petunjuk: "Petunjuk singkat (opsional)"
  }
]
```

**Dua cara menilai:**

- **`expected` (string)** — cara termudah. Output program dibandingkan persis dengan teks ini
  (spasi di ujung baris & baris kosong di akhir diabaikan otomatis).
- **`cek(output, res)` (fungsi)** — untuk penilaian fleksibel. Kembalikan `true`/`false`
  atau `{ pass: true, message: "..." }`.
  ```js
  cek: (output) => {
    const angka = parseInt(output.trim());
    return { pass: angka === 25, message: angka === 25 ? "Tepat!" : "Angka salah" };
  }
  ```

> 💡 **Tips akurasi:** setelah menulis soal, jalankan solusi referensi Anda di
> [wandbox.org](https://wandbox.org) (compiler gcc-13.2.0) dan salin outputnya persis ke `expected`.

### Menandai materi "siap"
Di `assets/js/kurikulum.js`, ubah `status: "todo"` menjadi `status: "ready"` agar kartunya
di halaman utama bertuliskan **"Materi siap"**.

---

## 🖥️ Pratinjau di Komputer (Lokal)

**Cara cepat:** klik dua kali `index.html`.

**Cara disarankan** (agar identik dengan GitHub Pages):
```bash
node preview-server.js
```
lalu buka `http://localhost:8099`.

---

## 🚀 Deploy ke GitHub Pages

1. Buat repository baru di GitHub, mis. `belajar-oop-cpp`.
2. Unggah seluruh isi folder ini ke repository tersebut.
   ```bash
   git init
   git add .
   git commit -m "Situs kelas OOP C++"
   git branch -M main
   git remote add origin https://github.com/USERNAME/belajar-oop-cpp.git
   git push -u origin main
   ```
3. Di GitHub: **Settings → Pages → Source** pilih branch `main`, folder `/ (root)`, **Save**.
4. Tunggu 1–2 menit. Situs akan tersedia di:
   `https://USERNAME.github.io/belajar-oop-cpp/`

---

## 🔧 Mengganti Mesin Compiler (lanjutan)

Seluruh eksekusi kode melewati satu fungsi di `assets/js/runner.js`:
```js
runCpp(code, stdin) -> Promise<{ ok, output, error, exitCode }>
```
Untuk beralih ke mesin lain (mis. clang-wasm offline, Judge0, atau instance Wandbox sendiri),
cukup ubah isi fungsi `runCpp()` tanpa menyentuh file lain.

---

## 🗺️ Peta Kurikulum

| Modul | Pertemuan | Fokus |
|------|-----------|-------|
| 1 | 1–5   | Fondasi & Dasar C++ |
| 2 | 6–11  | Class & Object |
| 3 | 12–17 | Fitur & Relasi Class (this, static, composition, operator overloading) |
| 4 | 18–23 | Inheritance |
| 5 | 24–29 | Polymorphism |
| 6 | 30–33 | Topik Lanjutan (template, exception, STL, smart pointer) |
| 7 | 34–35 | Proyek Akhir |

Urutan & judul dapat diubah kapan saja di `assets/js/kurikulum.js`.
