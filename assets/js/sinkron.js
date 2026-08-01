/* =========================================================
   sinkron.js — Menyimpan progres siswa ke Google Sheets

   Prinsip: LOKAL DULU, SERVER BELAKANGAN.
   Setiap perubahan langsung ditulis ke localStorage supaya siswa
   tidak pernah menunggu jaringan. Pengiriman ke Sheets masuk antrean
   dan dicoba di latar belakang; kalau gagal, antreannya tetap
   tersimpan dan dicoba lagi saat halaman berikutnya dibuka.

   Kenapa tidak dikirim langsung tanpa antrean: koneksi di lab sekolah
   sering putus-nyambung, dan Apps Script bisa perlu 1-3 detik untuk
   menjawab. Tanpa antrean, progres yang gagal terkirim hilang diam-diam.
   ========================================================= */

const Sinkron = {
  KUNCI_SISWA: "oopcpp_siswa",
  KUNCI_ANTREAN: "oopcpp_antrean_v1",

  _kirimSedangJalan: false,

  /* ---------- Konfigurasi ---------- */
  cfg() { return window.KONFIGURASI || {}; },

  /* Situs sedang dibuka dari komputer sendiri, bukan dari GitHub Pages?
     Google Apps Script tidak membedakan asal permintaan, jadi tanpa
     pengecekan ini setiap percobaan di localhost ikut tertulis ke sheet
     yang sama dengan data siswa asli. */
  lokal() {
    const h = location.hostname;
    return h === "localhost" || h === "127.0.0.1" || h === "" || h === "[::1]";
  },

  /* Dibuka dengan ?sinkron=paksa untuk sengaja menguji pengiriman
     sungguhan dari localhost. */
  dipaksa() {
    try {
      return new URLSearchParams(location.search).get("sinkron") === "paksa";
    } catch (e) { return false; }
  },

  aktif() {
    if (!(this.cfg().urlSheet || "").trim()) return false;
    if (this.lokal() && this.cfg().lokalTanpaKirim && !this.dipaksa()) return false;
    return true;
  },

  /* ---------- Identitas siswa ---------- */
  siswa() {
    try { return JSON.parse(localStorage.getItem(this.KUNCI_SISWA)) || null; }
    catch (e) { return null; }
  },

  simpanSiswa(data) {
    localStorage.setItem(this.KUNCI_SISWA, JSON.stringify(data));
  },

  hapusSiswa() {
    localStorage.removeItem(this.KUNCI_SISWA);
  },

  sudahKenal() {
    const s = this.siswa();
    return !!(s && s.nis && s.nama);
  },

  /* ---------- Antrean ---------- */
  _antrean() {
    try { return JSON.parse(localStorage.getItem(this.KUNCI_ANTREAN)) || []; }
    catch (e) { return []; }
  },

  _tulisAntrean(daftar) {
    localStorage.setItem(this.KUNCI_ANTREAN, JSON.stringify(daftar));
  },

  jumlahTertunda() { return this._antrean().length; },

  /* ---------- Mencatat kejadian ----------
     status: "selesai" | "lulus-ujian" | "batal"                        */
  catat(pertemuan, status, tambahan) {
    if (!this.aktif()) return;   // penyimpanan server memang dimatikan

    if (!this.sudahKenal()) {
      // Jangan gagal tanpa jejak: tanpa NIS, kejadian ini tidak bisa
      // dikirim ke mana pun. Pemanggilnya seharusnya sudah meminta
      // identitas lebih dulu, jadi kalau sampai ke sini itu bug.
      console.warn(
        "[Sinkron] Progres pertemuan " + pertemuan + " (" + status + ") TIDAK dicatat: " +
        "identitas siswa belum diisi.");
      return;
    }

    const info = (window.KURIKULUM ? window.KURIKULUM.pertemuan : [])
      .find(p => p.id === pertemuan);
    const s = this.siswa();

    const antrean = this._antrean();
    antrean.push(Object.assign({
      id: `${s.nis}-${pertemuan}-${status}-${Date.now()}`,
      waktu: new Date().toISOString(),
      nis: s.nis,
      nama: s.nama,
      kelas: s.kelas || "",
      pertemuan: pertemuan,
      judul: info ? info.judul : "",
      status: status,
    }, tambahan || {}));

    // Batasi agar localStorage tidak membengkak kalau lama offline.
    this._tulisAntrean(antrean.slice(-200));
    this.perbaruiStatus();
    this.kirim();
  },

  /* ---------- Pengiriman ---------- */
  async kirim() {
    if (this._kirimSedangJalan || !this.aktif()) return;
    if (!navigator.onLine) { this.perbaruiStatus(); return; }

    const antrean = this._antrean();
    if (!antrean.length) { this.perbaruiStatus(); return; }

    this._kirimSedangJalan = true;
    try {
      const jawab = await this._panggil({
        aksi: "simpan",
        kodeKelas: this.cfg().kodeKelas,
        data: antrean,
      });

      if (jawab && jawab.ok) {
        // Buang hanya yang benar-benar diterima server; kejadian yang
        // masuk antrean selama pengiriman berlangsung tetap aman.
        const diterima = new Set(jawab.diterima || antrean.map(a => a.id));
        this._tulisAntrean(this._antrean().filter(a => !diterima.has(a.id)));
        this._status = "tersimpan";
      } else {
        this._status = "gagal";
        this._pesanGagal = (jawab && jawab.error) || "Server menolak data.";
      }
    } catch (e) {
      this._status = "tertunda";   // jaringan bermasalah, coba lagi nanti
    } finally {
      this._kirimSedangJalan = false;
      this.perbaruiStatus();
    }
  },

  /* ---------- Memulihkan progres di perangkat lain ---------- */
  async pulihkan(nis) {
    const jawab = await this._panggil({
      aksi: "ambil",
      kodeKelas: this.cfg().kodeKelas,
      nis: nis,
    });
    if (!jawab || !jawab.ok) {
      throw new Error((jawab && jawab.error) || "Gagal mengambil data.");
    }

    const lama = Progress._read();
    // Gabung, bukan timpa: pertemuan yang selesai di perangkat ini
    // tidak boleh hilang hanya karena server belum sempat menerimanya.
    (jawab.selesai || []).forEach(id => {
      if (!lama[id]) lama[id] = { at: Date.now(), dariServer: true };
    });
    Progress._write(lama);

    return (jawab.selesai || []).length;
  },

  /* ---------- Pemanggilan Apps Script ----------
     Content-Type sengaja text/plain. Apps Script tidak bisa menjawab
     permintaan preflight OPTIONS, dan application/json selalu memicu
     preflight — hasilnya request diblokir CORS. text/plain termasuk
     "simple request" sehingga lolos tanpa preflight.               */
  async _panggil(muatan) {
    const kendali = new AbortController();
    const batas = setTimeout(() => kendali.abort(), 15000);
    try {
      const res = await fetch(this.cfg().urlSheet, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(muatan),
        redirect: "follow",       // Apps Script membalas lewat 302
        signal: kendali.signal,
      });
      return await res.json();
    } finally {
      clearTimeout(batas);
    }
  },

  /* ---------- Tampilan status di tombol identitas ---------- */
  perbaruiStatus() {
    const btn = document.getElementById("identitas-btn");
    if (!btn) return;

    const who = btn.querySelector(".who");
    const s = this.siswa();

    if (!this.sudahKenal()) {
      if (who) who.textContent = "Masuk";
      btn.className = "identity-btn";
      btn.setAttribute("aria-label", "Isi nama dan NIS untuk menyimpan progres");
      return;
    }

    if (who) who.textContent = s.nama.split(" ")[0];

    let keadaan = "", jelas = "";
    if (!this.aktif()) {
      keadaan = "";
      jelas = this.lokal() && this.cfg().lokalTanpaKirim
        ? "Mode uji coba lokal — progres TIDAK dikirim ke Google Sheets."
        : "Progres tersimpan di browser ini saja.";
    } else if (this.jumlahTertunda() > 0) {
      keadaan = this._status === "gagal" ? "gagal" : "tertunda";
      jelas = `${this.jumlahTertunda()} progres belum terkirim ke server.`;
    } else {
      keadaan = "tersimpan"; jelas = "Semua progres sudah tersimpan.";
    }

    btn.className = "identity-btn" + (keadaan ? " " + keadaan : "");
    btn.setAttribute("aria-label", `${s.nama}. ${jelas} Klik untuk mengubah.`);
    btn.title = jelas;
  },

  init() {
    // Dikatakan terus terang di Console, supaya tidak dikira sinkronisasinya
    // rusak padahal memang sengaja dimatikan saat menguji di komputer sendiri.
    if ((this.cfg().urlSheet || "").trim() && this.lokal()) {
      if (this.aktif()) {
        console.warn("[Sinkron] ?sinkron=paksa aktif — progres dari localhost " +
                     "AKAN ditulis ke Google Sheets yang sama dengan data siswa.");
      } else {
        console.info("[Sinkron] Dibuka dari localhost: pengiriman ke Google Sheets " +
                     "dimatikan. Tambahkan ?sinkron=paksa pada URL kalau memang " +
                     "ingin menguji pengiriman sungguhan.");
      }
    }

    this.perbaruiStatus();
    // Coba kirim ulang antrean lama begitu halaman dibuka & saat online lagi.
    this.kirim();
    window.addEventListener("online", () => this.kirim());
  },
};

document.addEventListener("DOMContentLoaded", () => Sinkron.init());
