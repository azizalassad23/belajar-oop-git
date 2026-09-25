/* =========================================================
   ujian.js — Logika ujian live coding
   - Layar split: soal (kiri) + editor (kanan)
   - Timer hitung mundur
   - Anti-mencontek: berpindah tab > 2x  ->  layar dikunci
   - Menjalankan & menilai kode C++ via runCpp()
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  /* PAKSA_ID dipasang oleh halaman yang hanya melayani satu penilaian
     (term-quiz.html), supaya halaman itu tetap benar walau dibuka tanpa ?id=. */
  const dariUrl = parseInt(params.get("id"), 10);
  const id = Number.isNaN(dariUrl) ? window.PAKSA_ID : dariUrl;
  const K = window.KURIKULUM;
  // Bisa berupa pertemuan biasa maupun kuis (id 100 ke atas).
  const info = K ? cariPenilaian(id) : null;
  const adalahKuis = !!(info && info.jenis === "kuis");

  const el = {
    title: document.getElementById("exam-title"),
    sub: document.getElementById("exam-sub"),
    problem: document.getElementById("problem-content"),
    editor: document.getElementById("code-editor"),
    output: document.getElementById("output-body"),
    runStatus: document.getElementById("run-status"),
    verdict: document.getElementById("verdict"),
    timer: document.getElementById("timer"),
    vioCount: document.getElementById("vio-count"),
    soalNav: document.getElementById("soal-nav"),
    lock: document.getElementById("lock-overlay"),
    lockTitle: document.getElementById("lock-title"),
    lockMsg: document.getElementById("lock-msg"),
    lockBack: document.getElementById("lock-back"),
    submitLabel: document.getElementById("submit-label"),
    runBtn: document.getElementById("run-btn"),
    submitBtn: document.getElementById("submit-btn"),
    resetBtn: document.getElementById("reset-btn"),
    prevSoal: document.getElementById("prev-soal"),
    nextSoal: document.getElementById("next-soal"),
    quitBtn: document.getElementById("quit-btn"),
    inputPane: document.getElementById("input-pane"),
    stdinEditor: document.getElementById("stdin-editor"),
    resetStdin: document.getElementById("reset-stdin"),
  };

  if (!info) {
    el.problem.innerHTML =
      "ID ujian tidak valid. <a class='exam-link' href='index.html'>Kembali</a>.";
    return;
  }

  /* Penilaian berpengawasan ketat hanya sah di halamannya sendiri, yang
     memuat antisontek.js. Membuka ujian.html?id=103 langsung akan sampai
     di sini tanpa pengawasan apa pun — jadi dialihkan, bukan dilanjutkan. */
  if (info.pengawasanKetat && !window.AntiSontek) {
    location.replace((info.halaman || "index.html") + "?id=" + id);
    return;
  }

  el.title.textContent = (adalahKuis ? "" : "Ujian: ") + info.judul;
  el.sub.textContent = adalahKuis ? info.cakupan : "Pertemuan " + id;
  el.quitBtn.href = info.pengawasanKetat ? "index.html" : "materi.html?id=" + id;

  /* Penguncian dijaga juga di sini, bukan hanya di halaman materi:
     tanpa ini siswa bisa melompati urutan — atau membuka kuis sebelum
     jadwalnya — dengan mengetik ujian.html?id=N langsung. */
  if (AksesPertemuan.terkunci(id)) {
    const syarat = AksesPertemuan.syarat(id);
    const sebutan = adalahKuis ? info.judul : "Ujian ini";
    let isi = `<h2>${sebutan} belum terbuka</h2>` +
              `<p>${AksesPertemuan.alasan(id)}</p>`;
    if (AksesPertemuan.belumWaktunya(id)) {
      isi += "<p>Halaman ini akan terbuka sendiri setelah waktunya tiba. " +
             "Tidak perlu meminta dibukakan.</p>";
    } else if (syarat) {
      isi += `<p><a class="exam-link" href="materi.html?id=${syarat}">Buka Pertemuan ${syarat}</a></p>`;
    }
    el.problem.innerHTML = isi;
    el.runBtn.disabled = el.submitBtn.disabled = el.resetBtn.disabled = true;
    el.editor.readOnly = true;
    el.timer.textContent = "--:--";
    return;
  }

  // Tanpa identitas, hasil ujian tidak bisa dilacak milik siapa —
  // jadi lebih baik dihentikan di sini daripada dikerjakan lalu hilang.
  const cfg = window.KONFIGURASI || {};
  if (cfg.wajibIdentitas && typeof Sinkron !== "undefined" && !Sinkron.sudahKenal()) {
    el.problem.innerHTML =
      '<h2>Isi identitas dulu</h2>' +
      '<p>Kamu belum mengisi nama dan NIS, jadi hasil ujian ini tidak bisa dicatat.</p>' +
      '<p>Buka halaman materi, klik tombol <strong>Masuk</strong> di kanan atas, ' +
      'isi nama dan NIS, lalu mulai ujian lagi dari sini.</p>' +
      `<p><a class="exam-link" href="materi.html?id=${id}">Kembali ke materi</a></p>`;
    el.runBtn.disabled = el.submitBtn.disabled = el.resetBtn.disabled = true;
    el.editor.readOnly = true;
    el.timer.textContent = "--:--";
    return;
  }

  /* Halaman berpengawasan ketat (term-quiz.html) memuat antisontek.js.
     Kalau siswanya sedang kena blokir, soal tidak boleh ikut dimuat —
     menyembunyikannya di balik overlay percuma, isinya sudah telanjur
     ada di halaman dan bisa dibaca lewat DevTools. */
  if (window.AntiSontek && window.AntiSontek.mulaiTerblokir()) return;

  let SOAL = [];
  let current = 0;
  let codeStore = {};   // menyimpan kode tiap soal saat berpindah
  let passed = {};      // status lulus tiap soal
  let locked = false;

  // ---------- Muat data soal ----------
  // Jalur berkasnya ditentukan kurikulum.js: pertemuan atau kuis.
  const script = document.createElement("script");
  script.src = berkasData(id);
  script.onload = initSoal;
  script.onerror = () => {
    el.problem.innerHTML =
      "<div style='color:#f87171'>Soal untuk " +
      (adalahKuis ? "kuis" : "pertemuan") + " ini belum ada.</div>";
  };
  document.body.appendChild(script);

  let TIMER_MENIT = 20;

  function initSoal() {
    const data = (window.MATERI || {})[id];
    if (!data || !data.soal || !data.soal.length) {
      el.problem.innerHTML =
        "<div style='color:#fbbf24'>Soal untuk pertemuan ini belum diisi gurumu.</div>";
      el.runBtn.disabled = el.submitBtn.disabled = true;
      return;
    }
    SOAL = data.soal;
    if (data.waktuMenit) TIMER_MENIT = data.waktuMenit;
    SOAL.forEach((s, i) => { codeStore[i] = s.starter || defaultStarter(); });
    renderSoal(0);

    /* Di halaman berpengawasan ketat, antisontek.js yang memegang kendali:
       ia menampilkan gerbang "Mulai" dulu (layar penuh dan suara hanya boleh
       diminta dari gerakan pengguna), baru memanggil balik penyalaan timer.
       Ujian harian biasa tidak memuat berkas itu dan langsung berjalan. */
    if (window.AntiSontek) {
      window.AntiSontek.pasang(kendali, () => startTimer(TIMER_MENIT * 60));
    } else {
      startTimer(TIMER_MENIT * 60);
      armAntiCheat();
    }
  }

  /* Yang boleh disentuh antisontek.js dari luar. Sengaja sempit:
     ia mengatur pengawasan, bukan penilaian. */
  const kendali = {
    id: id,
    resetPengerjaan() {
      SOAL.forEach((s, i) => { codeStore[i] = s.starter || defaultStarter(); });
      passed = {};
      current = 0;
      sudahPernahRender = false;
      if (timerId) clearInterval(timerId);
      try {
        const P = JSON.parse(localStorage.getItem("oopcpp_progress_v1") || "{}");
        delete P[id];
        localStorage.setItem("oopcpp_progress_v1", JSON.stringify(P));
      } catch (e) {}
    },
    tampilkanPelanggaran(n) {
      violations = n;
      el.vioCount.textContent = n;
    },
    fokuskanEditor() { if (!locked) el.editor.focus(); },
    pesan(teks, bahaya) { showExamToast(teks, bahaya); },
    skor() { return skorSekarang(); },
  };

  /* ---------- Skor ----------
     Dulu hasil hanya terkirim kalau SEMUA soal benar. Untuk penilaian
     yang sengaja sulit seperti Term-Quiz, itu berarti sebagian besar
     siswa tidak pernah punya nilai di sheet guru. Sekarang skor ikut
     dikirim di setiap akhir pengerjaan: waktu habis, dikumpulkan,
     dikunci, maupun diblokir. */
  function jumlahBenar() { return SOAL.filter((_, i) => passed[i]).length; }
  function skorSekarang() { return SOAL.length ? `${jumlahBenar()}/${SOAL.length}` : ""; }
  function sisaWaktuTeks() { return `${Math.floor(remaining / 60)}m ${remaining % 60}d`; }

  /* Dialog konfirmasi. Di halaman berpengawasan ketat, confirm() bawaan
     browser TIDAK boleh dipakai: Chrome otomatis keluar dari layar penuh
     saat dialog itu muncul, sehingga siswa yang cuma mau mereset kode
     langsung kena pelanggaran dan alarm. */
  function tanya(pesan, labelYa) {
    if (!window.AntiSontek) return Promise.resolve(confirm(pesan));
    return new Promise(selesai => {
      const lapis = document.createElement("div");
      lapis.className = "lock-overlay active tanya-overlay";
      lapis.setAttribute("role", "alertdialog");
      lapis.setAttribute("aria-modal", "true");
      lapis.innerHTML =
        '<div class="lock-card"><p class="tanya-pesan"></p>' +
        '<div class="lock-actions">' +
        '<button type="button" class="btn btn-primary" data-jawab="ya"></button>' +
        '<button type="button" class="btn btn-ghost exam-ghost" data-jawab="tidak">Batal</button>' +
        '</div></div>';
      lapis.querySelector(".tanya-pesan").textContent = pesan;
      lapis.querySelector('[data-jawab="ya"]').textContent = labelYa;
      lapis.addEventListener("click", (e) => {
        const b = e.target.closest("[data-jawab]");
        if (!b) return;
        lapis.remove();
        selesai(b.dataset.jawab === "ya");
      });
      document.body.appendChild(lapis);
      lapis.querySelector('[data-jawab="tidak"]').focus();
    });
  }

  function defaultStarter() {
    return "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Tulis kodemu di sini\n    \n    return 0;\n}\n";
  }

  // ---------- Render soal ----------
  let sudahPernahRender = false;

  function renderSoal(i) {
    if (locked) return;
    /* Simpan kode soal sebelumnya — TAPI jangan pada render pertama.
       Saat itu editor masih kosong, dan menyimpannya akan menimpa kode
       awal (starter) dengan string kosong. Akibatnya siswa selalu memulai
       dari editor kosong, bukan dari kerangka yang sudah disiapkan. */
    if (sudahPernahRender && SOAL[current]) codeStore[current] = el.editor.value;
    sudahPernahRender = true;
    current = i;
    const s = SOAL[i];

    el.soalNav.textContent = SOAL.length > 1 ? `Soal ${i + 1} / ${SOAL.length}` : "";
    el.prevSoal.style.display = SOAL.length > 1 ? "" : "none";
    el.nextSoal.style.display = SOAL.length > 1 ? "" : "none";
    el.prevSoal.disabled = (i === 0);
    el.nextSoal.disabled = (i === SOAL.length - 1);

    let html = `<h2>${s.judul || "Soal " + (i + 1)}</h2>`;
    html += `<div>${s.deskripsi || ""}</div>`;
    if (s.stdin) {
      html += `<div class="io-block"><div class="io-label">Input (stdin)</div>
               <pre>${escapeHtml(s.stdin)}</pre></div>`;
    }
    if (s.expected) {
      html += `<div class="io-block"><div class="io-label">Output yang diharapkan</div>
               <pre>${escapeHtml(s.expected)}</pre></div>`;
    }
    if (s.petunjuk) {
      html += `<div class="io-block"><div class="io-label">Petunjuk</div>
               <div style="color:#cbd5e1;font-size:.88rem">${s.petunjuk}</div></div>`;
    }
    el.problem.innerHTML = html;

    // Kotak input hanya muncul kalau soalnya memang membaca input.
    if (el.inputPane) {
      const perluInput = !!s.stdin;
      el.inputPane.hidden = !perluInput;
      el.inputPane.classList.remove("diubah");
      if (perluInput) el.stdinEditor.value = s.stdin;
    }

    el.editor.value = codeStore[i];
    el.verdict.className = "verdict";
    el.verdict.textContent = "";
    el.output.innerHTML = '<span class="muted">Tekan "Jalankan" untuk melihat output.</span>';
    el.runStatus.textContent = "";
    updateSubmitLabel();
  }

  function updateSubmitLabel() {
    // Write to the label span only — textContent on the button would wipe the SVG.
    el.submitLabel.textContent = passed[current] ? "Sudah lulus" : "Kumpulkan & Nilai";
  }

  // ---------- Editor: dukungan tombol Tab ----------
  el.editor.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.selectionStart, end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 4;
    }
  });

  // ---------- Jalankan kode ----------
  /* pakaiInputResmi=true dipakai saat menilai. Input yang diketik siswa di
     kotak coba-coba TIDAK boleh ikut menentukan kelulusan — kalau ikut,
     siswa bisa mengarang input yang kebetulan mencocokkan kunci jawaban. */
  async function jalankan(pakaiInputResmi) {
    if (locked) return null;
    const s = SOAL[current];
    const stdin = pakaiInputResmi
      ? (s.stdin || "")
      : (el.stdinEditor ? el.stdinEditor.value : (s.stdin || ""));

    el.output.innerHTML = '<span class="muted">Menjalankan…</span>';
    el.runStatus.textContent = "menjalankan…";
    // Disable while in flight so a double-click can't queue two compiles.
    el.runBtn.disabled = el.submitBtn.disabled = true;
    let res;
    try {
      res = await runCpp(el.editor.value, stdin);
    } finally {
      if (!locked) el.runBtn.disabled = el.submitBtn.disabled = false;
    }
    if (res.ok) {
      el.output.innerHTML = res.output
        ? escapeHtml(res.output)
        : '<span class="muted">(program selesai tanpa output)</span>';
      el.runStatus.innerHTML = `<span class="ok">selesai (exit ${res.exitCode})</span>`;
    } else {
      el.output.innerHTML =
        (res.output ? escapeHtml(res.output) + "\n" : "") +
        `<span class="err">Error: ${escapeHtml(res.error)}</span>`;
      el.runStatus.innerHTML = '<span class="err">error</span>';
    }
    return res;
  }

  // ---------- Kumpulkan & nilai ----------
  async function nilai() {
    if (locked) return;
    const s = SOAL[current];
    const res = await jalankan(true);   // selalu dengan input resmi soal
    if (!res) return;

    /* Server compiler bermasalah: jangan dinilai sama sekali. Kalau ini
       lolos ke bawah, siswa dicatat "tidak lulus" untuk kegagalan yang
       bukan salahnya, dan status itu ikut terkirim ke Sheets guru. */
    if (res.gangguanServer) {
      el.verdict.className = "verdict fail";
      el.verdict.textContent = "BELUM DINILAI — server compiler sedang bermasalah. Coba lagi sebentar.";
      return;
    }

    let lulus = false, pesan = "";
    if (typeof s.cek === "function") {
      const r = s.cek(res.output, res);
      lulus = (r === true) || (r && r.pass);
      pesan = (r && r.message) || "";
    } else if (typeof s.expected === "string") {
      lulus = res.ok && normalizeOutput(res.output) === normalizeOutput(s.expected);
    } else {
      lulus = res.ok;
    }

    passed[current] = lulus;
    el.verdict.className = "verdict " + (lulus ? "pass" : "fail");
    if (lulus) {
      el.verdict.textContent = "BENAR — " + (pesan || "Hasilnya sudah pas. Kerja bagus!");
    } else if (!res.ok) {
      el.verdict.textContent = "Kodenya masih error — perbaiki dulu, lalu coba lagi.";
    } else {
      el.verdict.textContent = "BELUM PAS — " + (pesan || "Hasilnya belum sama dengan yang diminta soal.");
    }
    updateSubmitLabel();

    // Jika semua soal lulus, tandai materi selesai
    if (SOAL.every((_, i) => passed[i])) {
      try {
        const P = JSON.parse(localStorage.getItem("oopcpp_progress_v1") || "{}");
        P[id] = { at: Date.now(), lulusUjian: true };
        localStorage.setItem("oopcpp_progress_v1", JSON.stringify(P));
      } catch (e) {}
      if (typeof Sinkron !== "undefined") {
        Sinkron.catat(id, "lulus-ujian", {
          skor: skorSekarang(),
          sisaWaktu: sisaWaktuTeks(),
        });
      }
      if (window.AntiSontek) window.AntiSontek.selesai();
      showExamToast("Semua soal benar! Materi ini ditandai selesai.");
    }
  }

  // ---------- Timer ----------
  let timerId = null, remaining = 0;
  function startTimer(seconds) {
    remaining = seconds;
    tick();
    timerId = setInterval(tick, 1000);
  }
  // Milestones only. The timer element itself is aria-live="off" because a
  // screen reader announcing every single second would make the exam unusable.
  const ANNOUNCE_AT = [300, 60, 20];
  function announceTime(sec) {
    let r = document.getElementById("timer-announce");
    if (!r) {
      r = document.createElement("div");
      r.id = "timer-announce";
      r.className = "sr-only";
      r.setAttribute("role", "status");
      r.setAttribute("aria-live", "polite");
      document.body.appendChild(r);
    }
    r.textContent = sec >= 60
      ? `Sisa waktu ${Math.round(sec / 60)} menit.`
      : `Sisa waktu ${sec} detik.`;
  }

  function tick() {
    const m = Math.floor(remaining / 60), s = remaining % 60;
    el.timer.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    el.timer.classList.toggle("warn", remaining <= 60 && remaining > 20);
    el.timer.classList.toggle("danger", remaining <= 20);
    if (ANNOUNCE_AT.includes(remaining)) announceTime(remaining);
    if (remaining <= 0) {
      clearInterval(timerId);
      lockExam("Waktu Habis",
        `Waktu sudah selesai dengan ${skorSekarang()} soal benar. Kodemu tidak bisa diubah lagi.`,
        "waktu-habis");
      return;
    }
    remaining--;
  }

  // ---------- Anti-mencontek ----------
  let violations = 0;
  const MAX_VIOLATION = 2; // lebih dari 2 -> kunci
  function armAntiCheat() {
    // Hanya menghitung PERPINDAHAN TAB / minimize jendela yang sungguhan
    // (visibilitychange). Ini menghindari kesalahan-hitung saat murid tak
    // sengaja kehilangan fokus (mis. klik taskbar/notifikasi) tanpa pindah tab.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) registerViolation();
    });
  }
  let lastViolation = 0;
  function registerViolation() {
    if (locked) return;
    const now = Date.now();
    if (now - lastViolation < 800) return; // hindari hitung ganda (blur+hidden)
    lastViolation = now;

    violations++;
    el.vioCount.textContent = violations;
    if (violations > MAX_VIOLATION) {
      lockExam("Ujian Dikunci",
        `Kamu keluar dari halaman ujian sebanyak ${violations} kali (batasnya ${MAX_VIOLATION}). Ujian dihentikan.`);
    } else {
      const sisa = MAX_VIOLATION - violations + 1;
      showExamToast(`Peringatan ${violations}/${MAX_VIOLATION}: jangan keluar dari halaman ujian! ` +
        (violations === MAX_VIOLATION ? "Sekali lagi, ujian langsung dikunci." : `Sisa ${sisa} kesempatan.`), true);
    }
  }

  function lockExam(title, msg, status) {
    locked = true;
    if (timerId) clearInterval(timerId);
    // Pengawasan ketat dihentikan: alarm dimatikan dan layar penuh dilepas,
    // supaya siswa tidak terjebak di layar penuh yang berbunyi terus.
    if (window.AntiSontek) window.AntiSontek.selesai();
    // Guru perlu tahu ujian siapa yang berakhir, karena apa, dan nilainya.
    if (typeof Sinkron !== "undefined") {
      Sinkron.catat(id, status || "terkunci", {
        detail: title + " — " + msg,
        skor: skorSekarang(),
        sisaWaktu: sisaWaktuTeks(),
      });
    }
    el.lockTitle.textContent = title;
    el.lockMsg.textContent = msg;
    el.lock.hidden = false;
    el.lock.classList.add("active");
    el.runBtn.disabled = el.submitBtn.disabled = el.resetBtn.disabled = true;
    el.editor.readOnly = true;

    // The overlay is a modal: move focus into it and keep it there, otherwise
    // keyboard and screen-reader users keep tabbing through the locked exam
    // behind it as if nothing happened.
    if (el.lockBack) el.lockBack.focus();
    document.addEventListener("keydown", trapLockFocus, true);
  }

  function trapLockFocus(e) {
    if (e.key !== "Tab" || !locked) return;
    e.preventDefault();
    if (el.lockBack) el.lockBack.focus();
  }

  // ---------- Toast khusus halaman ujian ----------
  function showExamToast(msg, danger) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "alert");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.toggle("danger", !!danger);
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 3600);
  }

  // ---------- Util ----------
  function escapeHtml(s) {
    return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  // ---------- Events ----------
  el.runBtn.addEventListener("click", () => jalankan(false));
  el.submitBtn.addEventListener("click", nilai);

  if (el.stdinEditor) {
    el.stdinEditor.addEventListener("input", () => {
      const s = SOAL[current];
      el.inputPane.classList.toggle("diubah",
        !!s && el.stdinEditor.value !== (s.stdin || ""));
    });
  }
  if (el.resetStdin) {
    el.resetStdin.addEventListener("click", () => {
      const s = SOAL[current];
      if (!s) return;
      el.stdinEditor.value = s.stdin || "";
      el.inputPane.classList.remove("diubah");
      el.stdinEditor.focus();
    });
  }
  el.resetBtn.addEventListener("click", async () => {
    if (locked) return;
    const ya = await tanya("Balikkan kode ke bentuk awal? Semua yang sudah kamu tulis " +
                           "di soal ini akan hilang.", "Ya, reset");
    if (ya && !locked) el.editor.value = SOAL[current].starter || defaultStarter();
  });

  /* Di halaman berpengawasan, "Keluar" berarti MENGUMPULKAN: nilai saat
     itu dikirim ke guru. Tanpa ini, siswa yang tidak sanggup menyelesaikan
     semua soal lalu keluar tidak meninggalkan nilai apa pun. */
  el.quitBtn.addEventListener("click", async (e) => {
    if (!window.AntiSontek || locked || !window.AntiSontek.sedangBerjalan()) return;
    e.preventDefault();
    const skor = skorSekarang();
    const ya = await tanya(
      `Kumpulkan dan akhiri kuis sekarang?\n\nSoal yang benar: ${skor}. ` +
      "Nilai inilah yang dikirim ke gurumu.", "Kumpulkan");
    if (!ya || locked) return;
    lockExam("Kuis Dikumpulkan",
      `Jawabanmu sudah dikumpulkan dengan ${skor} soal benar. Nilainya sedang dikirim ke gurumu.`,
      "dikumpulkan");
  });
  el.prevSoal.addEventListener("click", () => { if (current > 0) renderSoal(current - 1); });
  el.nextSoal.addEventListener("click", () => { if (current < SOAL.length - 1) renderSoal(current + 1); });

  // Peringatan sebelum meninggalkan halaman
  window.addEventListener("beforeunload", (e) => {
    // Siswa yang sedang kena blokir memang tidak punya apa-apa lagi untuk
    // hilang — menahannya dengan dialog "yakin mau keluar?" hanya menyiksa.
    const diblokir = window.AntiSontek && window.AntiSontek.sedangDiblokir();
    if (!locked && !diblokir && SOAL.length) { e.preventDefault(); e.returnValue = ""; }
  });
})();
