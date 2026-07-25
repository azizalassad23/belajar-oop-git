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

  const bar = document.querySelector(".progress-wrap .bar > span");
  const lbl = document.querySelector(".progress-wrap .label");
  if (bar) bar.style.width = pct + "%";
  if (lbl) lbl.textContent = `${done} dari ${total} pertemuan selesai (${pct}%)`;

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
        <span class="num">Modul ${mod.no}</span>
        <h2>${mod.nama}</h2>
        <span class="range">Pertemuan ${first}–${last}</span>
      </div>
      <p style="color:var(--text-soft); margin:-6px 0 16px;">${mod.deskripsi}</p>
      <div class="grid"></div>`;
    const grid = section.querySelector(".grid");

    items.forEach(p => {
      const isDone = Progress.isDone(p.id);
      const card = document.createElement("div");
      card.className = "card" + (isDone ? " done" : "");
      const badge = p.status === "ready"
        ? `<span class="badge badge-ready">Materi siap</span>`
        : `<span class="badge badge-todo">Segera hadir</span>`;
      card.innerHTML = `
        <span class="pert-no">Pertemuan ${p.id}</span>
        <h3>${p.judul}</h3>
        <p>${p.ringkas}</p>
        <div class="card-foot">
          ${badge}
          <span class="spacer" style="flex:1"></span>
          <a class="btn btn-primary btn-sm" href="materi.html?id=${p.id}">Buka →</a>
        </div>`;
      grid.appendChild(card);
    });
    mount.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", renderIndex);
