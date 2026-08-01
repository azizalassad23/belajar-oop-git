/* =========================================================
   ujian.js — Logika ujian live coding
   - Layar split: soal (kiri) + editor (kanan)
   - Timer hitung mundur
   - Anti-mencontek: berpindah tab > 2x  ->  layar dikunci
   - Menjalankan & menilai kode C++ via runCpp()
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  const K = window.KURIKULUM;
  const info = K ? K.pertemuan.find(p => p.id === id) : null;

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
  };

  if (!info) {
    el.problem.innerHTML =
      "ID ujian tidak valid. <a class='exam-link' href='index.html'>Kembali</a>.";
    return;
  }

  el.title.textContent = "Ujian: " + info.judul;
  el.sub.textContent = "Pertemuan " + id;
  el.quitBtn.href = "materi.html?id=" + id;

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

  let SOAL = [];
  let current = 0;
  let codeStore = {};   // menyimpan kode tiap soal saat berpindah
  let passed = {};      // status lulus tiap soal
  let locked = false;

  // ---------- Muat data soal ----------
  const nn = String(id).padStart(2, "0");
  const script = document.createElement("script");
  script.src = "data/pertemuan/p" + nn + ".js";
  script.onload = initSoal;
  script.onerror = () => {
    el.problem.innerHTML =
      "<div style='color:#f87171'>Soal untuk pertemuan ini belum ada.</div>";
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
    startTimer(TIMER_MENIT * 60);
    armAntiCheat();
  }

  function defaultStarter() {
    return "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Tulis kodemu di sini\n    \n    return 0;\n}\n";
  }

  // ---------- Render soal ----------
  function renderSoal(i) {
    if (locked) return;
    // simpan kode soal sebelumnya
    if (SOAL[current]) codeStore[current] = el.editor.value;
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
  async function jalankan() {
    if (locked) return null;
    const s = SOAL[current];
    el.output.innerHTML = '<span class="muted">Menjalankan…</span>';
    el.runStatus.textContent = "menjalankan…";
    // Disable while in flight so a double-click can't queue two compiles.
    el.runBtn.disabled = el.submitBtn.disabled = true;
    let res;
    try {
      res = await runCpp(el.editor.value, s.stdin || "");
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
    const res = await jalankan();
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
          skor: `${SOAL.length}/${SOAL.length}`,
          sisaWaktu: `${Math.floor(remaining / 60)}m ${remaining % 60}d`,
        });
      }
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
      lockExam("Waktu Habis", "Waktu ujian sudah selesai. Kodemu tidak bisa diubah lagi.");
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

  function lockExam(title, msg) {
    locked = true;
    if (timerId) clearInterval(timerId);
    // Guru perlu tahu ujian siapa yang terkunci dan karena apa.
    if (typeof Sinkron !== "undefined") {
      Sinkron.catat(id, "terkunci", { detail: title + " — " + msg });
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
  el.runBtn.addEventListener("click", jalankan);
  el.submitBtn.addEventListener("click", nilai);
  el.resetBtn.addEventListener("click", () => {
    if (locked) return;
    if (confirm("Balikkan kode ke bentuk awal? Semua yang sudah kamu tulis akan hilang.")) {
      el.editor.value = SOAL[current].starter || defaultStarter();
    }
  });
  el.prevSoal.addEventListener("click", () => { if (current > 0) renderSoal(current - 1); });
  el.nextSoal.addEventListener("click", () => { if (current < SOAL.length - 1) renderSoal(current + 1); });

  // Peringatan sebelum meninggalkan halaman
  window.addEventListener("beforeunload", (e) => {
    if (!locked && SOAL.length) { e.preventDefault(); e.returnValue = ""; }
  });
})();
