/* =========================================================
   materi.js — Merender satu halaman materi berdasarkan ?id=N
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  const K = window.KURIKULUM;

  const info = K.pertemuan.find(p => p.id === id);
  if (!info) {
    document.getElementById("judul").textContent = "Materi tidak ditemukan";
    document.getElementById("konten").innerHTML =
      '<p>ID materi tidak valid. <a href="index.html">Kembali ke daftar materi</a>.</p>';
    return;
  }

  const modul = K.modul.find(m => m.no === info.modul);
  document.title = `Pertemuan ${id}: ${info.judul} — Kelas OOP C++`;
  document.getElementById("crumb").textContent =
    `Modul ${modul.no} · ${modul.nama} › Pertemuan ${id}`;
  document.getElementById("judul").textContent = info.judul;
  document.getElementById("ringkas").textContent = info.ringkas;

  // Navigasi sebelumnya / berikutnya
  const prev = K.pertemuan.find(p => p.id === id - 1);
  const next = K.pertemuan.find(p => p.id === id + 1);
  const prevLink = document.getElementById("prev-link");
  const nextLink = document.getElementById("next-link");
  if (prev) prevLink.href = `materi.html?id=${prev.id}`;
  else { prevLink.classList.add("disabled"); prevLink.style.visibility = "hidden"; }
  if (next) nextLink.href = `materi.html?id=${next.id}`;
  else { nextLink.style.visibility = "hidden"; }

  document.getElementById("exam-link").href = `ujian.html?id=${id}`;

  // Tombol "tandai selesai"
  const markBtn = document.getElementById("mark-done");
  function refreshMark() {
    const done = Progress.isDone(id);
    markBtn.textContent = done ? "✓ Sudah selesai" : "✓ Tandai selesai";
    markBtn.classList.toggle("btn-success", done);
    markBtn.classList.toggle("btn-ghost", !done);
  }
  markBtn.addEventListener("click", () => {
    Progress.setDone(id, !Progress.isDone(id));
    refreshMark();
    showToast(Progress.isDone(id) ? "Ditandai selesai ✓" : "Tanda selesai dihapus");
  });
  refreshMark();

  // Muat konten pertemuan secara dinamis (bekerja di file:// maupun GitHub Pages)
  const nn = String(id).padStart(2, "0");
  const script = document.createElement("script");
  script.src = `data/pertemuan/p${nn}.js`;
  script.onload = renderKonten;
  script.onerror = () => {
    document.getElementById("konten").innerHTML =
      `<div class="stub-note"><strong>Konten belum tersedia</strong>
       File <code>data/pertemuan/p${nn}.js</code> belum dibuat. Silakan isi materi ini.</div>`;
  };
  document.body.appendChild(script);

  function renderKonten() {
    const data = (window.MATERI || {})[id];
    const mount = document.getElementById("konten");
    if (!data || !data.konten) {
      mount.innerHTML =
        `<div class="stub-note"><strong>Materi ini masih berupa kerangka (stub)</strong>
         Konten teori belum diisi. Namun tombol <em>Mulai Ujian</em> tetap dapat dicoba
         bila soalnya sudah disiapkan.</div>`;
      return;
    }
    mount.innerHTML = data.konten;

    // Sembunyikan tombol ujian jika belum ada soal
    const hasSoal = data.soal && data.soal.length;
    if (!hasSoal) {
      const ex = document.getElementById("exam-link");
      ex.classList.add("disabled");
      ex.style.opacity = ".5";
      ex.style.pointerEvents = "none";
      ex.textContent = "Ujian belum tersedia";
    }
  }
})();
