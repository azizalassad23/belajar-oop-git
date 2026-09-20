/* =========================================================
   antisontek.js — Pengawasan ketat khusus halaman Pra Term-Quiz

   Hanya dimuat oleh pra-quiz.html. Halaman ujian biasa
   (ujian.html) TIDAK memuat berkas ini, jadi 35 ujian harian
   tetap memakai aturan lamanya yang lebih longgar.

   Yang dijaga:
   1. Layar penuh wajib, dari awal sampai selesai.
   2. Pindah tab / keluar layar penuh  -> alarm berbunyi.
   3. Lebih dari 2 kali pelanggaran    -> layar diblokir 30 menit
                                          dan pengerjaan direset.
   4. Klik kanan, salin, tempel, dan potong dimatikan.

   --- Jujur soal batasnya -------------------------------------
   Semua ini berjalan di browser siswa, jadi siswa yang paham
   DevTools tetap bisa menembusnya (mis. menghapus data situs
   untuk membatalkan blokir). Gunanya adalah membuat mencontek
   jadi merepotkan dan KETAHUAN: tiap pelanggaran dikirim ke
   Google Sheets guru lewat Sinkron, termasuk saat diblokir.
   Pengawasan sungguhan tetap butuh mata guru di ruangan.
   ========================================================= */

(function () {
  const KUNCI_BLOKIR = "oopcpp_blokir_praquiz_v1";
  const MAX_PELANGGARAN = 2;      // pelanggaran ke-3 memicu blokir
  const MENIT_BLOKIR = 30;

  let kendali = null;             // dihubungkan oleh ujian.js
  let mulaiUjian = null;          // dipanggil setelah siswa menekan "Mulai"
  let berjalan = false;
  let terblokir = false;
  let pelanggaran = 0;
  let terakhirPelanggaran = 0;

  const el = {};
  function ambilEl() {
    ["gerbang", "gerbang-mulai", "gerbang-galat", "gerbang-isi",
     "alarm-overlay", "alarm-pesan", "alarm-sisa", "alarm-kembali",
     "blokir-overlay", "blokir-sebab", "blokir-hitung", "blokir-keluar"]
      .forEach(id => { el[id] = document.getElementById(id); });
  }

  /* ---------------------------------------------------------
     Alarm — sirene dua nada lewat Web Audio.

     Berkas .mp3 sengaja tidak dipakai: autoplay-nya sering
     diblokir browser, dan satu berkas lagi berarti satu hal lagi
     yang bisa gagal dimuat saat ujian sedang berlangsung.
     AudioContext-nya dibuat saat siswa menekan "Mulai" supaya
     dihitung sebagai gerakan pengguna dan tidak diblokir.
     --------------------------------------------------------- */
  let audio = null, osilator = null, kerasnya = null;
  let nadaTimer = null, getarTimer = null, alarmNyala = false;

  function siapkanAudio() {
    if (audio) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      audio = new AC();
      kerasnya = audio.createGain();
      kerasnya.gain.value = 0;
      kerasnya.connect(audio.destination);
      osilator = audio.createOscillator();
      osilator.type = "sawtooth";
      osilator.frequency.value = 880;
      osilator.connect(kerasnya);
      osilator.start();
    } catch (e) { audio = null; }
  }

  function bunyikanAlarm() {
    if (alarmNyala) return;
    alarmNyala = true;

    if (audio) {
      if (audio.state === "suspended") audio.resume();
      kerasnya.gain.setTargetAtTime(0.22, audio.currentTime, 0.01);
      let tinggi = false;
      nadaTimer = setInterval(() => {
        tinggi = !tinggi;
        osilator.frequency.setTargetAtTime(tinggi ? 1320 : 760, audio.currentTime, 0.004);
      }, 300);
    }
    // Getaran hanya untuk perangkat sentuh. Di desktop navigator.vibrate
    // ada tapi tidak berbuat apa-apa, dan tiap panggilan menumpuk peringatan
    // di Console — berisik tanpa guna.
    if (navigator.vibrate && window.matchMedia("(pointer: coarse)").matches) {
      const getar = () => navigator.vibrate([420, 130, 420, 130]);
      getar();
      getarTimer = setInterval(getar, 1100);
    }
    document.body.classList.add("alarm-aktif");
  }

  function matikanAlarm() {
    alarmNyala = false;
    clearInterval(nadaTimer);
    clearInterval(getarTimer);
    if (audio) kerasnya.gain.setTargetAtTime(0, audio.currentTime, 0.02);
    if (navigator.vibrate) navigator.vibrate(0);
    document.body.classList.remove("alarm-aktif");
  }

  /* ---------- Layar penuh ---------- */
  function sedangLayarPenuh() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement ||
              document.msFullscreenElement);
  }

  function masukLayarPenuh() {
    const e = document.documentElement;
    const minta = e.requestFullscreen || e.webkitRequestFullscreen ||
                  e.msRequestFullscreen;
    if (!minta) return Promise.reject(new Error("Browser ini tidak mendukung layar penuh."));
    try { return Promise.resolve(minta.call(e)); }
    catch (err) { return Promise.reject(err); }
  }

  function keluarLayarPenuh() {
    if (!sedangLayarPenuh()) return;
    const k = document.exitFullscreen || document.webkitExitFullscreen ||
              document.msExitFullscreen;
    if (k) { try { k.call(document); } catch (e) {} }
  }

  /* ---------- Blokir 30 menit ---------- */
  function sisaBlokirMs() {
    try {
      const b = JSON.parse(localStorage.getItem(KUNCI_BLOKIR));
      if (!b || !b.sampai) return 0;
      return Math.max(0, b.sampai - Date.now());
    } catch (e) { return 0; }
  }

  function sebabBlokir() {
    try { return (JSON.parse(localStorage.getItem(KUNCI_BLOKIR)) || {}).sebab || ""; }
    catch (e) { return ""; }
  }

  let hitungTimer = null;
  function tampilkanBlokir() {
    terblokir = true;
    berjalan = false;
    matikanAlarm();
    keluarLayarPenuh();
    if (el["alarm-overlay"]) el["alarm-overlay"].hidden = true;
    if (el["gerbang"]) el["gerbang"].hidden = true;

    el["blokir-sebab"].textContent = sebabBlokir();
    el["blokir-overlay"].hidden = false;
    el["blokir-overlay"].classList.add("active");
    if (el["blokir-keluar"]) el["blokir-keluar"].focus();

    clearInterval(hitungTimer);
    const hitung = () => {
      const sisa = sisaBlokirMs();
      if (sisa <= 0) {
        clearInterval(hitungTimer);
        el["blokir-hitung"].textContent = "00:00";
        el["blokir-sebab"].textContent =
          "Masa blokir sudah habis. Muat ulang halaman ini untuk mulai lagi dari awal.";
        return;
      }
      const total = Math.ceil(sisa / 1000);
      el["blokir-hitung"].textContent =
        String(Math.floor(total / 60)).padStart(2, "0") + ":" +
        String(total % 60).padStart(2, "0");
    };
    hitung();
    hitungTimer = setInterval(hitung, 1000);
  }

  function blokir(sebab) {
    localStorage.setItem(KUNCI_BLOKIR, JSON.stringify({
      sampai: Date.now() + MENIT_BLOKIR * 60000,
      sebab: sebab,
    }));
    if (kendali) kendali.resetPengerjaan();
    catat("diblokir", sebab + " — pengerjaan direset, layar diblokir " +
                      MENIT_BLOKIR + " menit.");
    tampilkanBlokir();
  }

  function catat(status, detail) {
    if (typeof Sinkron === "undefined" || !kendali) return;
    Sinkron.catat(kendali.id, status, { detail: detail });
  }

  /* ---------- Pelanggaran ---------- */
  function lapor(sebab) {
    if (!berjalan || terblokir) return;

    // visibilitychange dan fullscreenchange sering menyala bersamaan
    // untuk satu gerakan yang sama (mis. Alt+Tab keluar dari layar penuh).
    const kini = Date.now();
    if (kini - terakhirPelanggaran < 900) { bunyikanAlarm(); return; }
    terakhirPelanggaran = kini;

    pelanggaran++;
    if (kendali) kendali.tampilkanPelanggaran(pelanggaran);
    bunyikanAlarm();

    if (pelanggaran > MAX_PELANGGARAN) {
      blokir(sebab + " (pelanggaran ke-" + pelanggaran + ")");
      return;
    }

    const sisa = MAX_PELANGGARAN - pelanggaran + 1;
    el["alarm-pesan"].textContent = sebab + ".";
    el["alarm-sisa"].textContent = pelanggaran === MAX_PELANGGARAN
      ? "Sekali lagi, layarmu diblokir " + MENIT_BLOKIR +
        " menit dan semua jawabanmu dihapus."
      : "Sisa " + sisa + " kesempatan sebelum layarmu diblokir " +
        MENIT_BLOKIR + " menit.";
    el["alarm-overlay"].hidden = false;
    el["alarm-overlay"].classList.add("active");
    catat("pelanggaran", sebab + " (ke-" + pelanggaran + " dari batas " +
                        MAX_PELANGGARAN + ")");
  }

  /* Keadaan sudah benar lagi (kembali ke tab ini DAN layar penuh):
     alarm dimatikan dan overlay ditutup sendiri. */
  function periksaPulih() {
    if (!berjalan || terblokir) return;
    if (document.hidden || !sedangLayarPenuh()) return;
    matikanAlarm();
    el["alarm-overlay"].hidden = true;
    el["alarm-overlay"].classList.remove("active");
    if (kendali) kendali.fokuskanEditor();
  }

  /* ---------- Klik kanan, salin, tempel ---------- */
  function matikanSalinTempel() {
    const tolak = (e) => { e.preventDefault(); return false; };
    ["contextmenu", "copy", "cut", "paste", "dragstart", "drop"]
      .forEach(nama => document.addEventListener(nama, tolak, true));

    document.addEventListener("keydown", (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const k = (e.key || "").toLowerCase();

      // Tombol salin/tempel/pilih-semua/simpan/cetak/lihat-sumber.
      if (ctrl && !e.altKey && ["c", "v", "x", "a", "s", "p", "u"].includes(k)) {
        e.preventDefault();
        if (berjalan && (k === "c" || k === "v" || k === "x")) {
          kendali && kendali.pesan("Salin-tempel dimatikan selama kuis. Ketik sendiri kodenya.", true);
        }
        return;
      }
      // Pintasan alat pengembang. Ini cuma menghambat, bukan mengunci —
      // menu browser tetap bisa membukanya.
      if (k === "f12" ||
          (ctrl && e.shiftKey && ["i", "j", "c"].includes(k))) {
        e.preventDefault();
      }
    }, true);
  }

  /* ---------- Gerbang mulai ----------
     Layar penuh dan suara hanya boleh diminta dari gerakan pengguna,
     jadi kuis tidak bisa langsung berjalan saat halaman dibuka. */
  function tampilkanGerbang() {
    el["gerbang"].hidden = false;
    el["gerbang-mulai"].focus();

    el["gerbang-mulai"].addEventListener("click", () => {
      el["gerbang-galat"].hidden = true;
      siapkanAudio();
      masukLayarPenuh().then(() => {
        // Sebagian browser menolak diam-diam: janjinya sukses tapi
        // layarnya tidak penuh juga. Diperiksa lagi, bukan dipercaya.
        setTimeout(() => {
          if (!sedangLayarPenuh()) { gagalLayarPenuh(null); return; }
          jalankanKuis();
        }, 120);
      }).catch(gagalLayarPenuh);
    });
  }

  function gagalLayarPenuh(err) {
    el["gerbang-galat"].hidden = false;
    el["gerbang-galat"].textContent =
      "Layar penuh belum aktif, jadi kuis belum bisa dimulai. " +
      "Tekan tombolnya sekali lagi dan pilih \"Izinkan\" kalau browser bertanya." +
      (err && err.message ? " (" + err.message + ")" : "") +
      " Kalau tetap gagal, lapor ke gurumu.";
  }

  function jalankanKuis() {
    el["gerbang"].hidden = true;
    berjalan = true;

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) lapor("Kamu berpindah ke tab atau jendela lain");
      else periksaPulih();
    });

    ["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"]
      .forEach(nama => document.addEventListener(nama, () => {
        if (!berjalan || terblokir) return;
        if (!sedangLayarPenuh()) lapor("Kamu keluar dari mode layar penuh");
        else periksaPulih();
      }));

    el["alarm-kembali"].addEventListener("click", () => {
      masukLayarPenuh().then(() => setTimeout(periksaPulih, 120))
                       .catch(() => {});
    });

    if (mulaiUjian) mulaiUjian();
  }

  /* ---------- API yang dipakai ujian.js ---------- */
  window.AntiSontek = {
    maxPelanggaran: MAX_PELANGGARAN,
    menitBlokir: MENIT_BLOKIR,

    /* Dipanggil sebelum soal dimuat. Kalau sedang diblokir, soal tidak
       boleh ikut dimuat sama sekali — percuma menyembunyikannya di balik
       overlay kalau isinya sudah telanjur ada di halaman. */
    mulaiTerblokir() {
      ambilEl();
      if (sisaBlokirMs() <= 0) return false;
      tampilkanBlokir();
      return true;
    },

    /* Dipasang ujian.js setelah soal siap. 'mulai' adalah fungsi yang
       menjalankan timer — baru dipanggil setelah gerbang dilewati. */
    pasang(kendaliUjian, mulai) {
      ambilEl();
      kendali = kendaliUjian;
      mulaiUjian = mulai;
      matikanSalinTempel();
      tampilkanGerbang();
    },

    /* Dipanggil ujian.js saat kuis selesai atau dikunci. */
    selesai() {
      berjalan = false;
      matikanAlarm();
      keluarLayarPenuh();
    },

    sedangBerjalan() { return berjalan; },
    sedangDiblokir() { return terblokir; },
  };
})();
