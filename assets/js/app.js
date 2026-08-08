/* =========================================================
   app.js — Utilitas bersama (progres, toast, render index)
   ========================================================= */

const Progress = {
  KEY: "oopcpp_progress_v1",
  _read() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; }
    catch (e) { return {}; }
  },
  _write(data) { localStorage.setItem(this.KEY, JSON.stringify(data)); },
  isDone(id) { return !!this._read()[id]; },
  setDone(id, done) {
    const d = this._read();
    if (done) d[id] = { at: Date.now() }; else delete d[id];
    this._write(d);
  },
  count() { return Object.keys(this._read()).length; },
};

function pad2(n) { return String(n).padStart(2, "0"); }

function showToast(msg, danger) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.setAttribute("aria-live", "polite");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.toggle("danger", !!danger);
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ---------- Index page renderer ---------- */
function renderIndex() {
  const K = window.KURIKULUM;
  const mount = document.getElementById("modules");
  if (!mount || !K) return;

  const total = K.pertemuan.length;
  const done = K.pertemuan.filter(p => Progress.isDone(p.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Progres digambar sebagai satu petak per pertemuan, bukan bar persentase —
  // seluruh bentuk kurikulum langsung terbaca sekali lihat.
  const ticks = document.getElementById("ticks");
  const pctEl = document.getElementById("progress-pct");
  if (ticks) {
    ticks.innerHTML = "";
    K.pertemuan.forEach(p => {
      const t = document.createElement("span");
      const isDone = Progress.isDone(p.id);
      t.className = "tick" + (isDone ? " done" : p.status === "ready" ? " ready" : "");
      t.title = `Pertemuan ${p.id}: ${p.judul}`;
      ticks.appendChild(t);
    });
    ticks.setAttribute("aria-valuenow", String(pct));
    ticks.setAttribute("aria-valuetext", `${done} dari ${total} pertemuan selesai`);
  }
  if (pctEl) pctEl.textContent = `${done}/${total} · ${pct}%`;

  const totalEl = document.getElementById("stat-total");
  if (totalEl) totalEl.textContent = total;

  mount.innerHTML = "";
  K.modul.forEach(mod => {
    const items = K.pertemuan.filter(p => p.modul === mod.no);
    if (!items.length) return;
    const first = items[0].id, last = items[items.length - 1].id;

    const section = document.createElement("section");
    section.className = "module";
    section.innerHTML = `
      <div class="module-head">
        <span class="num">${pad2(mod.no)}</span>
        <h2>${mod.nama}</h2>
        <span class="range">Pertemuan ${first}–${last}</span>
        <p class="module-desc">${mod.deskripsi}</p>
      </div>
      <div class="lessons"></div>`;
    const list = section.querySelector(".lessons");

    items.forEach(p => {
      const isDone = Progress.isDone(p.id);
      const terkunci = !isDone && AksesPertemuan.terkunci(p.id);

      // Baris terkunci dibuat sebagai <span>, bukan <a>: tanpa href ia
      // hilang dari urutan Tab sekaligus tidak bisa dibuka lewat Enter.
      const row = document.createElement(terkunci ? "span" : "a");
      row.className = "lesson" + (isDone ? " done" : "") + (terkunci ? " terkunci" : "");
      if (!terkunci) row.href = `materi.html?id=${p.id}`;

      const badge = isDone
        ? `<span class="badge badge-done">Selesai</span>`
        : terkunci
          ? `<span class="badge badge-locked">Terkunci</span>`
          : p.status === "ready"
            ? `<span class="badge badge-ready">Materi siap</span>`
            : `<span class="badge badge-todo">Segera hadir</span>`;

      const ikon = terkunci
        ? `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
           </svg>`
        : `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path d="M5 12h14M13 6l6 6-6 6"/>
           </svg>`;

      row.innerHTML = `
        <span class="no" aria-hidden="true">${pad2(p.id)}</span>
        <span class="body">
          <h3>${p.judul}</h3>
          <p>${terkunci ? AksesPertemuan.alasan(p.id) : p.ringkas}</p>
        </span>
        <span class="meta">${badge}${ikon}</span>`;

      // Nomor pertemuan disembunyikan dari pembaca layar di atas (dekoratif
      // sebagai gutter) lalu dinyatakan penuh di sini bersama statusnya.
      const status = isDone ? "Sudah selesai."
                   : terkunci ? "Terkunci. " + AksesPertemuan.alasan(p.id)
                   : "";
      row.setAttribute("aria-label", `Pertemuan ${p.id}: ${p.judul}. ${status}`.trim());
      list.appendChild(row);
    });
    mount.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", renderIndex);
