/* =========================================================
   materi.js — Merender satu halaman materi berdasarkan ?id=N
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  const K = window.KURIKULUM;

  // Bisa berupa pertemuan biasa maupun kuis (id 100 ke atas).
  const info = cariPenilaian(id);
  const adalahKuis = !!(info && info.jenis === "kuis");
  if (!info) {
    document.getElementById("judul").textContent = "Materi tidak ditemukan";
    document.getElementById("konten").innerHTML =
      '<p>ID materi tidak valid. <a href="index.html">Kembali ke daftar materi</a>.</p>';
    return;
  }

  /* Penguncian bertahap. Halaman utama sudah tidak menampilkan tautannya,
     tetapi siswa masih bisa mengetik materi.html?id=N langsung — jadi
     dijaga lagi di sini. */
  if (AksesPertemuan.terkunci(id)) {
    const syarat = AksesPertemuan.syarat(id);
    const belumWaktunya = AksesPertemuan.belumWaktunya(id);
    const sebutan = adalahKuis ? info.judul : "Pertemuan " + id;

    document.title = `${sebutan} terkunci — Kelas OOP C++`;
    document.getElementById("crumb").textContent = "Belum terbuka";
    document.getElementById("judul").textContent = sebutan + " belum terbuka";
    document.getElementById("ringkas").textContent = AksesPertemuan.alasan(id);

    let isi;
    if (belumWaktunya) {
      isi = `<div class="stub-note"><strong>Menunggu jadwal</strong>
        ${info.judul} akan terbuka sendiri pada
        <strong>${AksesPertemuan.jadwalTeks(id)}</strong>. Tidak perlu meminta
        dibukakan — cukup buka halaman ini lagi setelah waktunya tiba.</div>`;
    } else {
      isi = `<div class="stub-note"><strong>Kerjakan berurutan</strong>
        ${adalahKuis
          ? `${info.judul} baru terbuka setelah kamu lulus ujian Pertemuan ${syarat}.`
          : `Mulai Pertemuan ${AksesPertemuan.mulaiBerurutan}, tiap materi baru terbuka
             setelah kamu <strong>lulus ujian</strong> materi sebelumnya.`}</div>`;
      if (syarat) {
        isi += `<p><a class="btn btn-primary" href="materi.html?id=${syarat}">Buka Pertemuan ${syarat}</a></p>`;
      }
    }
    document.getElementById("konten").innerHTML = isi;
    document.querySelector(".materi-foot").hidden = true;
    return;
  }

  document.title = `${adalahKuis ? info.judul : "Pertemuan " + id + ": " + info.judul} — Kelas OOP C++`;
  document.getElementById("crumb").textContent = adalahKuis
    ? `Kuis › ${info.cakupan}`
    : (() => {
        const modul = K.modul.find(m => m.no === info.modul);
        return `Modul ${modul.no} · ${modul.nama} › Pertemuan ${id}`;
      })();
  document.getElementById("judul").textContent = info.judul;
  document.getElementById("ringkas").textContent = info.ringkas;

  // Navigasi sebelumnya / berikutnya (tidak berlaku untuk kuis)
  const prevLink = document.getElementById("prev-link");
  const nextLink = document.getElementById("next-link");
  const prev = adalahKuis ? null : K.pertemuan.find(p => p.id === id - 1);
  const next = adalahKuis ? null : K.pertemuan.find(p => p.id === id + 1);
  if (prev) prevLink.href = `materi.html?id=${prev.id}`;
  else { prevLink.classList.add("disabled"); prevLink.style.visibility = "hidden"; }
  if (next) nextLink.href = `materi.html?id=${next.id}`;
  else { nextLink.style.visibility = "hidden"; }

  const examLink = document.getElementById("exam-link");
  examLink.href = `ujian.html?id=${id}`;
  if (adalahKuis) {
    // Ganti hanya teksnya, ikonnya biarkan tetap ada.
    const teks = [...examLink.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (teks) teks.textContent = " Mulai Kuis ";
  }

  /* Status materi — hanya ditampilkan, tidak bisa diubah siswa.
     Satu-satunya cara menjadi "selesai" adalah lulus ujiannya, supaya
     angka progres benar-benar mencerminkan kemampuan, bukan klik. */
  const statusEl = document.getElementById("status-materi");
  const sebutanUji = adalahKuis ? "kuis" : "ujian";
  function tampilkanStatus(adaSoal) {
    if (Progress.isDone(id)) {
      statusEl.className = "status-materi badge badge-done";
      statusEl.textContent = "Lulus " + sebutanUji;
      return;
    }
    if (adaSoal === false) {
      statusEl.className = "status-materi badge badge-todo";
      statusEl.textContent = sebutanUji.charAt(0).toUpperCase() +
                             sebutanUji.slice(1) + " belum tersedia";
      return;
    }
    statusEl.className = "status-materi badge badge-todo";
    statusEl.textContent = "Belum lulus " + sebutanUji;
  }
  tampilkanStatus();

  // Muat konten secara dinamis (bekerja di file:// maupun GitHub Pages).
  // Jalur berkasnya ditentukan kurikulum.js: pertemuan atau kuis.
  const jalur = berkasData(id);
  const script = document.createElement("script");
  script.src = jalur;
  script.onload = renderKonten;
  script.onerror = () => {
    document.getElementById("konten").innerHTML =
      `<div class="stub-note"><strong>Materi belum ada</strong>
       File <code>${jalur}</code> belum dibuat.</div>`;
    kunciUjian();
    tampilkanStatus(false);
  };
  document.body.appendChild(script);

  // Materi tanpa soal dikunci sepenuhnya: tidak ada ujian, dan karena
  // tombol tandai-selesai sudah dihapus, tidak ada cara lain menandainya.
  function kunciUjian() {
    const ex = document.getElementById("exam-link");
    ex.classList.add("disabled");
    ex.style.opacity = ".5";
    // pointer-events saja masih menyisakan link yang bisa ditekan Enter —
    // menghapus href sekaligus mengeluarkannya dari urutan Tab.
    ex.removeAttribute("href");
    ex.setAttribute("aria-disabled", "true");
    ex.textContent = "Ujian belum tersedia";
  }

  function renderKonten() {
    const data = (window.MATERI || {})[id];
    const mount = document.getElementById("konten");
    const adaSoal = !!(data && data.soal && data.soal.length);

    if (!data || !data.konten) {
      mount.innerHTML = adaSoal
        ? `<div class="stub-note"><strong>Materi ini belum diisi</strong>
           Penjelasannya belum ditulis, tapi soal ujiannya sudah siap —
           tombol <em>Mulai Ujian</em> tetap bisa kamu coba.</div>`
        : `<div class="stub-note"><strong>Materi ini belum diisi</strong>
           Penjelasan dan soalnya belum disiapkan gurumu.</div>`;
    } else {
      mount.innerHTML = data.konten;
    }

    if (!adaSoal) kunciUjian();
    tampilkanStatus(adaSoal);
  }
})();
