# Panduan Menyalakan Penyimpanan Progres (Google Sheets)

Tanpa langkah ini situs tetap berjalan normal — progres hanya tersimpan di
browser masing-masing siswa. Setelah dipasang, progres ikut tersimpan di
Spreadsheet Anda dan tetap ada walau siswa ganti komputer.

Perkiraan waktu: **10–15 menit**, sekali saja.

---

## Format Sheet

**Anda tidak perlu membuat kolom apa pun secara manual.** Skrip otomatis membuat
sheet bernama `Progress` beserta barisan judulnya saat data pertama masuk.
Bagian ini hanya supaya Anda tahu isinya nanti seperti apa.

Sheet `Progress` punya 10 kolom (A–J):

| Kol | Judul | Isi | Contoh |
|-----|-------|-----|--------|
| A | `Waktu` | Kapan kejadiannya (tipe tanggal asli, bisa disortir) | `27/07/2026 09.14.32` |
| B | `NIS` | NIS yang diketik siswa. Disimpan sebagai teks agar angka `0` di depan tidak hilang | `12345` |
| C | `Nama` | Nama lengkap siswa | `Budi Santoso` |
| D | `Kelas` | Kelas (boleh kosong) | `XI RPL 1` |
| E | `Pertemuan` | Nomor pertemuan 1–35 | `7` |
| F | `Judul` | Judul pertemuan, diisi otomatis dari `kurikulum.js` | `Atribut & Method` |
| G | `Status` | Jenis kejadian — lihat tabel di bawah | `lulus-ujian` |
| H | `Skor` | Jumlah soal benar (hanya untuk ujian) | `2/2` |
| I | `Sisa Waktu` | Sisa waktu ujian saat lulus | `12m 41d` |
| J | `Keterangan` | Sumber atau alasan | `Ujian Dikunci — Kamu keluar…` |

### Nilai kolom `Status`

| Nilai | Artinya | Kapan muncul |
|-------|---------|--------------|
| `selesai` | Siswa menandai materi selesai sendiri | Tombol **Tandai selesai** di halaman materi |
| `batal` | Siswa mencabut tanda selesai | Tombol yang sama ditekan lagi |
| `lulus-ujian` | Semua soal ujian benar | Otomatis saat soal terakhir lulus |
| `terkunci` | Ujian dihentikan | Waktu habis, atau keluar tab lebih dari 2× |

### Contoh isi sheet

| Waktu | NIS | Nama | Kelas | Pertemuan | Judul | Status | Skor | Sisa Waktu | Keterangan |
|---|---|---|---|---|---|---|---|---|---|
| 27/07/2026 09.14.32 | 12345 | Budi Santoso | XI RPL 1 | 1 | Pengantar OOP & Paradigma Pemrograman | selesai | | | tandai-manual |
| 27/07/2026 09.31.05 | 12345 | Budi Santoso | XI RPL 1 | 1 | Pengantar OOP & Paradigma Pemrograman | lulus-ujian | 2/2 | 12m 41d | |
| 27/07/2026 09.48.19 | 12346 | Siti Aminah | XI RPL 1 | 2 | Review C++ Dasar: Variabel, Tipe Data & I/O | terkunci | | | Ujian Dikunci — Kamu keluar dari halaman ujian sebanyak 3 kali… |

**Datanya bertambah ke bawah, tidak menimpa.** Satu siswa bisa punya banyak baris
untuk pertemuan yang sama. Itu disengaja: Anda dapat riwayat kapan siswa
mengerjakan apa, dan tidak ada risiko dua siswa saling menimpa saat mengumpulkan
di detik yang sama. Untuk melihat rangkumannya, pakai sheet `Rekap` di bagian
bawah panduan ini.

---

## 1. Buat Spreadsheet

1. Buka [sheets.new](https://sheets.new) — beri nama, misalnya `Progres OOP C++`.
2. Berhenti di sini. Jangan buat kolom apa pun; skrip yang akan membuatnya.

## 2. Tempel Skrip

1. Di Spreadsheet: menu **Ekstensi → Apps Script**.
2. Hapus seluruh isi `Code.gs` bawaan.
3. Salin seluruh isi berkas [`apps-script/Code.gs`](apps-script/Code.gs) dari
   proyek ini, tempel ke sana.
4. Ubah baris paling atas kalau ingin kode kelas sendiri:
   ```js
   const KODE_KELAS = "OOP2026";
   ```
5. Simpan (ikon disket / `Ctrl+S`).

## 3. Terbitkan sebagai Web App

1. Di pojok kanan atas editor Apps Script, klik tombol biru **Deploy** →
   **New deployment**.
2. Di kiri atas jendela yang muncul ada ikon **roda gigi** di sebelah tulisan
   "Select type". Klik ikon itu → pilih **Web app**.
   *(Kalau langsung klik Deploy tanpa memilih tipe ini, yang terbit adalah
   Library, bukan Web App, dan URL-nya tidak akan bisa dipakai.)*
3. Isi tiga kolomnya:

   | Kolom | Isi | Kenapa |
   |---|---|---|
   | **Description** | `Progres OOP` (bebas) | Sekadar penanda versi |
   | **Execute as** | **Me (email Anda)** | Supaya skrip punya izin menulis ke Spreadsheet Anda |
   | **Who has access** | **Anyone** | Siswa mengirim tanpa login Google |

4. Klik **Deploy**.
5. Muncul **Authorize access**. Klik → pilih akun Google Anda.
6. Muncul layar **"Google hasn't verified this app"**. Klik **Advanced** di kiri
   bawah → **Go to (nama proyek) (unsafe)** → **Allow**.
   Peringatan ini normal untuk skrip buatan sendiri; "unsafe" di sini artinya
   "belum diverifikasi Google", bukan berbahaya.
7. Salin **Web app URL**. Bentuknya:
   `https://script.google.com/macros/s/AKfycb....../exec`

> **"Who has access" wajib "Anyone".** Kalau dipilih *Anyone with Google account*,
> siswa akan diminta login Google dulu dan pengiriman dari situs gagal tanpa
> pesan error yang jelas. Ini penyebab kegagalan paling sering.

**Uji cepat:** tempel Web app URL tadi ke tab browser baru lalu Enter.
Kalau muncul `{"ok":true,"pesan":"Penyimpan progres Kelas OOP C++ aktif."}`,
berarti Web App sudah hidup. Kalau muncul halaman login Google atau
"Script function not found", ulangi langkah 2–3.

## 4. Masukkan URL ke Situs

Buka [`assets/js/konfigurasi.js`](assets/js/konfigurasi.js), isi dua baris:

```js
urlSheet: "https://script.google.com/macros/s/AKfycb...../exec",
kodeKelas: "OOP2026",   // harus sama persis dengan KODE_KELAS di Code.gs
```

Simpan, lalu unggah ulang ke GitHub Pages.

## 5. Uji

1. Buka situs, klik tombol **Masuk** di kanan atas.
2. Isi nama, NIS, kelas → **Simpan**.
3. Buka salah satu materi → klik **Tandai selesai**.
4. Cek Spreadsheet: satu baris baru akan muncul dalam beberapa detik.

Titik kecil di tombol identitas menunjukkan keadaan:

| Warna | Arti |
|---|---|
| Hijau | Semua progres sudah tersimpan di server |
| Kuning | Ada yang belum terkirim, sedang menunggu koneksi |
| Merah | Server menolak — biasanya kode kelas tidak cocok |
| Abu-abu | Belum mengisi identitas |

---

## Menguji di Komputer Sendiri

Google Apps Script tidak membedakan asal permintaan. Tanpa pengaman, setiap
percobaan Anda di `localhost` akan tertulis ke sheet yang sama dengan data siswa
asli dan ikut terhitung di rekap nilai.

Karena itu `konfigurasi.js` disetel `lokalTanpaKirim: true`. Efeknya saat situs
dibuka dari `localhost`, `127.0.0.1`, atau `file://`:

- Progres tetap tersimpan di browser, jadi tampilan bisa dicoba seperti biasa.
- **Tidak ada satu pun baris dikirim ke Google Sheets.**
- Console menampilkan pemberitahuan, dan tombol identitas berketerangan
  *"Mode uji coba lokal — progres TIDAK dikirim ke Google Sheets."*

Untuk sengaja menguji pengiriman sungguhan, tambahkan `?sinkron=paksa` pada URL:

```
http://localhost:8099/index.html?sinkron=paksa
```

Console akan berganti jadi peringatan kuning bahwa data **akan** masuk ke sheet
asli. Baris hasil uji ini tidak ditandai khusus, jadi hapus manual setelahnya —
atau pakai NIS yang mudah dikenali seperti `00000`.

> Situs yang sudah di-GitHub Pages tidak terpengaruh sama sekali; pengaman ini
> hanya berlaku untuk localhost.

---

## Kalau Bermasalah

| Gejala | Penyebab paling mungkin | Perbaikan |
|---|---|---|
| Titik status **merah** terus | `kodeKelas` di `konfigurasi.js` ≠ `KODE_KELAS` di `Code.gs` | Samakan persis, perhatikan huruf besar/kecil |
| Titik **kuning** terus, sheet kosong | URL salah, atau "Who has access" bukan *Anyone* | Buka URL di tab baru — harus muncul `{"ok":true,...}` |
| Sheet tetap kosong padahal titik **hijau** | Deploy lama masih aktif setelah Code.gs diubah | **Deploy → Manage deployments → pensil → New version → Deploy** |
| Error CORS di Console browser | Ada yang mengubah `Content-Type` di `sinkron.js` | Harus tetap `text/plain;charset=utf-8`, tanpa header tambahan |
| NIS `0812…` jadi `812…` | Kolom NIS terformat sebagai angka | Blok kolom B → **Format → Angka → Teks biasa** |

Untuk melihat error dari sisi server: di editor Apps Script buka menu kiri
**Executions** — setiap pemanggilan tercatat lengkap dengan pesan gagalnya.

---

## Yang Perlu Diketahui

**Setiap kali Code.gs diubah, harus Deploy ulang.** Menyimpan saja tidak cukup.
Gunakan **Deploy → Manage deployments → ikon pensil → Version: New version → Deploy**
supaya URL-nya tidak berubah. Kalau membuat *New deployment*, URL-nya baru dan
`konfigurasi.js` harus diperbarui lagi.

**Kode kelas bukan pengaman kuat.** Berkas `konfigurasi.js` bisa dibaca siapa pun
yang membuka situs, jadi kode itu ikut terlihat. Fungsinya menyaring kiriman iseng
dari luar, bukan mencegah siswa yang paham teknis. Untuk nilai resmi, tetap
verifikasi lewat ujian yang Anda awasi langsung.

**Data ditulis sebagai catatan beruntun**, bukan ditimpa. Satu siswa bisa punya
banyak baris. Itu disengaja: Anda jadi punya riwayat kapan siswa mengerjakan apa,
dan tidak ada risiko dua siswa saling menimpa saat mengumpulkan bersamaan.

**Progres tidak hilang saat internet putus.** Perubahan langsung disimpan di
browser dan masuk antrean; pengiriman dicoba lagi otomatis saat halaman dibuka
berikutnya atau saat koneksi pulih.

---

## Rekap Nilai per Siswa

Buat sheet baru bernama `Rekap`, lalu tempel rumus ini di sel `A1`:

```
=QUERY(Progress!A:J;
  "select B, C, D, count(E)
   where G = 'lulus-ujian'
   group by B, C, D
   label B 'NIS', C 'Nama', D 'Kelas', count(E) 'Pertemuan Lulus'";1)
```

Untuk melihat siapa yang ujiannya terkunci (keluar tab berlebihan):

```
=QUERY(Progress!A:J;
  "select A, C, E, J where G = 'terkunci' order by A desc";1)
```

> Kalau spreadsheet Anda memakai pemisah koma, ganti tanda `;` menjadi `,`.

---

## Kalau Nanti Kelasnya Membesar

Apps Script cukup untuk skala kelas sampai sekolah. Batas wajarnya sekitar
20.000 pemanggilan per hari untuk akun biasa — jauh di atas kebutuhan beberapa
kelas. Pertimbangkan pindah ke Supabase atau Cloudflare D1 hanya kalau nanti:

- butuh login per siswa yang sungguhan (bukan sekadar NIS yang diketik),
- butuh nilai muncul seketika tanpa jeda 1–3 detik,
- atau datanya sudah puluhan ribu baris sehingga Sheets mulai berat.

Selama belum menyentuh salah satu dari itu, Sheets adalah pilihan yang paling
sedikit merepotkan — karena sekaligus jadi tempat Anda melihat dan mengolah nilai.
