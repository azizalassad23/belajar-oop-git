/* =========================================================
   flash.js — Flash Quiz: kartu soal live coding khusus guru.

   Alur: sandi guru -> meja kartu -> murid memilih kartu -> kartu
   terbuka -> murid mengerjakan di editor -> tombol Cek menjalankan
   kode dengan input contoh + input uji -> guru menilai manual.

   KEAMANAN: soal dan kunci jawaban hanya ada dalam bentuk terenkripsi
   (data/flash/flash.enc.js, AES-256-GCM dengan kunci dari PBKDF2).
   Isinya baru dibuka di memori setelah sandi guru dimasukkan, dan
   tidak pernah disimpan ke localStorage. Yang disimpan hanya urutan
   kartu, kartu yang sudah terpakai, dan kode yang sedang diketik.
   ========================================================= */

(function () {
  const KUNCI_STATE = "oopcpp_flash_v1";
  const ESTIMASI = { mudah: "±5 menit", sedang: "±10 menit", menantang: "±15 menit" };
  const PIP = { mudah: 1, sedang: 2, menantang: 3 };
  const NAMA_TINGKAT = { mudah: "Mudah", sedang: "Sedang", menantang: "Menantang" };

  let BANK = null;     // isi terdekripsi, hanya di memori
  let SANDI = null;    // dipakai untuk konfirmasi aksi guru
  let state = null;
  let jamTimer = null;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- Dekripsi ---------------- */
  function b64(s) { return Uint8Array.from(atob(s), (c) => c.charCodeAt(0)); }

  async function dekripsi(sandi) {
    const E = window.FLASH_TERENKRIPSI;
    if (!E) throw new Error("Berkas soal Flash Quiz tidak ditemukan.");
    if (!window.crypto || !crypto.subtle) {
      throw new Error("Browser ini tidak menyediakan Web Crypto. Buka lewat https:// atau localhost.");
    }
    const dasar = await crypto.subtle.importKey("raw", new TextEncoder().encode(sandi),
                                                "PBKDF2", false, ["deriveKey"]);
    const kunci = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64(E.salt), iterations: E.iterasi, hash: "SHA-256" },
      dasar, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    // Sandi salah membuat AES-GCM gagal memverifikasi data -> lempar error.
    const isi = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(E.iv) }, kunci, b64(E.data));
    return JSON.parse(new TextDecoder().decode(isi));
  }

  /* ---------------- State (tanpa isi soal) ---------------- */
  function acak(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stateBaru() {
    return { urutan: acak(BANK.kartu.map((k) => k.id)), kartu: {}, aktif: null, kode: {} };
  }

  function muatState() {
    try {
      const s = JSON.parse(localStorage.getItem(KUNCI_STATE));
      const ids = new Set(BANK.kartu.map((k) => k.id));
      // Kalau bank soal diganti (jumlah/ID berubah), mulai dari meja baru.
      if (s && s.urutan && s.urutan.length === ids.size && s.urutan.every((x) => ids.has(x))) {
        return s;
      }
    } catch (e) {}
    return stateBaru();
  }

  function simpan() {
    try { localStorage.setItem(KUNCI_STATE, JSON.stringify(state)); } catch (e) {}
  }

  const kartuDari = (id) => BANK.kartu.find((k) => k.id === id);

  /* ---------------- Tampilan ---------------- */
  function tampil(bagian) {
    ["gerbang", "meja", "kerja"].forEach((b) => { $(b).hidden = b !== bagian; });
  }

  function pips(tingkat) {
    return '<span class="pips">' +
      Array.from({ length: PIP[tingkat] }, () => `<i class="pip ${tingkat}"></i>`).join("") +
      "</span>";
  }

  function fmtWaktu(ms) {
    const d = Math.max(0, Math.floor(ms / 1000));
    return String(Math.floor(d / 60)).padStart(2, "0") + ":" + String(d % 60).padStart(2, "0");
  }

  /* ---------------- Meja kartu ---------------- */
  function renderMeja() {
    const grid = $("grid");
    grid.innerHTML = "";
    let sisa = 0;

    state.urutan.forEach((id, i) => {
      const k = kartuDari(id);
      const pakai = state.kartu[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kartu" + (pakai ? " terpakai" : "");
      btn.dataset.id = id;

      if (pakai) {
        btn.disabled = true;
        btn.innerHTML = `
          <span class="kartu-wajah kartu-depan">
            <span class="kartu-no">${i + 1}</span>
            ${pips(k.tingkat)}
            <span class="kartu-judul">${esc(k.judul)}</span>
            <span class="kartu-catatan">${esc(pakai.nama || "Tanpa nama")}${
              pakai.durasi ? " · " + fmtWaktu(pakai.durasi) : ""}${
              pakai.hasil ? " · uji " + esc(pakai.hasil) : ""}</span>
          </span>`;
        btn.setAttribute("aria-label",
          `Kartu ${i + 1} sudah dipakai${pakai.nama ? " oleh " + pakai.nama : ""}: ${k.judul}`);
      } else {
        sisa++;
        btn.innerHTML = `
          <span class="kartu-dalam">
            <span class="kartu-wajah kartu-belakang">
              <span class="kartu-no">${i + 1}</span>
              <span class="kartu-tanya" aria-hidden="true">?</span>
              ${pips(k.tingkat)}
              <span class="kartu-tingkat">${NAMA_TINGKAT[k.tingkat]}</span>
            </span>
            <span class="kartu-wajah kartu-depan">
              ${pips(k.tingkat)}
              <span class="kartu-judul">${esc(k.judul)}</span>
            </span>
          </span>`;
        btn.setAttribute("aria-label", `Kartu ${i + 1}, tingkat ${NAMA_TINGKAT[k.tingkat]}`);
        btn.addEventListener("click", () => bukaKartu(id, btn));
      }
      grid.appendChild(btn);
    });

    $("sisa").textContent = `${sisa} dari ${state.urutan.length} kartu tersisa`;
    tampil("meja");
  }

  function bukaKartu(id, btn) {
    if (state.aktif) return;
    // Kartu yang sudah dibalik dianggap terpakai saat itu juga — sesuai
    // aturan main, kartu yang dibuka harus diselesaikan.
    state.kartu[id] = { dibuka: Date.now() };
    state.aktif = id;
    simpan();

    const k = kartuDari(id);
    btn.classList.add("terbuka");
    document.querySelectorAll(".kartu").forEach((b) => { b.disabled = true; });

    const tunda = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 750;
    setTimeout(() => tampilkanKartuBesar(id), tunda);
  }

  function tampilkanKartuBesar(id) {
    const k = kartuDari(id);
    {
      $("buka-kartu").className = "flash-kartu-besar " + k.tingkat;
      $("buka-tingkat").innerHTML = pips(k.tingkat) + " " + NAMA_TINGKAT[k.tingkat];
      $("buka-pertemuan").textContent = "Pertemuan " + k.pertemuan;
      $("buka-judul").textContent = k.judul;
      $("buka-estimasi").textContent = "Perkiraan waktu " + ESTIMASI[k.tingkat];
      $("nama-murid").value = "";
      $("buka").hidden = false;
      $("buka").classList.add("active");
      $("nama-murid").focus();
    }
  }

  $("mulai-btn").addEventListener("click", () => {
    const id = state.aktif;
    state.kartu[id].nama = $("nama-murid").value.trim();
    state.kartu[id].mulai = Date.now();
    simpan();
    $("buka").hidden = true;
    $("buka").classList.remove("active");
    bukaRuangKerja(id);
  });
  $("nama-murid").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); $("mulai-btn").click(); }
  });

  /* ---------------- Ruang kerja ---------------- */
  let kartuKerja = null;

  function bukaRuangKerja(id) {
    const k = kartuDari(id);
    const info = state.kartu[id];
    kartuKerja = k;

    $("kerja-judul").textContent = `Kartu ${state.urutan.indexOf(id) + 1} · ${k.judul}`;
    // Kode kartu (F01–F30) sama dengan yang tertulis di PDF kunci jawaban.
    $("kerja-sub").textContent = `${k.id} · Pertemuan ${k.pertemuan} · ${NAMA_TINGKAT[k.tingkat]}`;
    $("kerja-murid").textContent = info.nama ? info.nama : "";

    $("soal").innerHTML = `
      <h2>${esc(k.judul)}</h2>
      <div>${k.deskripsi}</div>
      <div class="io-block"><div class="io-label">Contoh input</div>
        <pre>${esc(k.contoh.stdin || "(tidak ada)")}</pre></div>
      <div class="io-block"><div class="io-label">Contoh output</div>
        <pre>${esc(k.contoh.keluaran)}</pre></div>
      <p class="catatan-uji">Tombol <strong>Cek jawaban</strong> menguji contoh di atas
        ditambah <strong>${k.uji.length} input lain</strong>.</p>`;

    $("panel-kunci").hidden = true;
    $("panel-kunci").innerHTML = "";
    $("kunci-btn").textContent = "Kunci jawaban";

    $("editor").value = state.kode[id] != null ? state.kode[id] : k.starter;
    $("input-pane").hidden = !k.contoh.stdin;
    $("stdin").value = k.contoh.stdin;
    $("hasil-cek").hidden = true;
    $("output").innerHTML = '<span class="muted">Hasil program muncul di sini.</span>';
    $("run-status").textContent = "";

    clearInterval(jamTimer);
    const detak = () => { $("stopwatch").textContent = fmtWaktu(Date.now() - info.mulai); };
    detak();
    jamTimer = setInterval(detak, 1000);

    tampil("kerja");
    $("editor").focus();
  }

  let simpanKode = null;
  $("editor").addEventListener("input", () => {
    clearTimeout(simpanKode);
    simpanKode = setTimeout(() => {
      if (state.aktif) { state.kode[state.aktif] = $("editor").value; simpan(); }
    }, 400);
  });
  $("editor").addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const a = this.selectionStart, b = this.selectionEnd;
      this.value = this.value.slice(0, a) + "    " + this.value.slice(b);
      this.selectionStart = this.selectionEnd = a + 4;
    }
  });

  function kunciTombol(mati) {
    $("jalan-btn").disabled = $("cek-btn").disabled = mati;
  }

  $("jalan-btn").addEventListener("click", async () => {
    kunciTombol(true);
    $("output").innerHTML = '<span class="muted">Menjalankan…</span>';
    $("run-status").textContent = "menjalankan…";
    try {
      const r = await runCpp($("editor").value, $("stdin").value);
      $("output").innerHTML = r.ok
        ? (r.output ? esc(r.output) : '<span class="muted">(program selesai tanpa output)</span>')
        : (r.output ? esc(r.output) + "\n" : "") + `<span class="err">Error: ${esc(r.error)}</span>`;
      $("run-status").innerHTML = r.ok ? '<span class="ok">selesai</span>' : '<span class="err">error</span>';
    } finally {
      kunciTombol(false);
    }
  });

  $("cek-btn").addEventListener("click", async () => {
    const k = kartuKerja;
    const kode = $("editor").value;
    const kasus = [{ nama: "Contoh", ...k.contoh }].concat(
      k.uji.map((u, i) => ({ nama: "Uji " + (i + 1), ...u })));

    kunciTombol(true);
    const baris = [];
    let benar = 0, gangguan = false;
    try {
      // Berurutan, bukan serentak: satu kelas sering keluar lewat satu IP
      // sekolah, dan permintaan serentak memicu penolakan HTTP 429.
      for (let i = 0; i < kasus.length; i++) {
        $("run-status").textContent = `mengecek ${i + 1}/${kasus.length}…`;
        const r = await runCpp(kode, kasus[i].stdin);
        if (r.gangguanServer) { gangguan = true; break; }
        if (i === 0) {
          $("output").innerHTML = r.ok
            ? (r.output ? esc(r.output) : '<span class="muted">(tanpa output)</span>')
            : `<span class="err">Error: ${esc(r.error)}</span>`;
        }
        const lulus = r.ok && normalizeOutput(r.output) === normalizeOutput(kasus[i].keluaran);
        if (lulus) benar++;
        baris.push(`<li class="${lulus ? "lulus" : "gagal"}"><b>${kasus[i].nama}</b> ${
          lulus ? "BENAR" : (r.ok ? "BELUM PAS" : "ERROR")}</li>`);
      }
    } finally {
      kunciTombol(false);
      $("run-status").textContent = "";
    }

    const el = $("hasil-cek");
    el.hidden = false;
    if (gangguan) {
      el.className = "flash-hasil gagal";
      el.innerHTML = "<strong>Belum bisa dicek</strong> — server compiler sedang bermasalah. Coba lagi sebentar.";
      return;
    }
    const semua = benar === kasus.length;
    el.className = "flash-hasil " + (semua ? "lulus" : "gagal");
    el.innerHTML = `<strong>${semua ? "SEMUA BENAR" : "BELUM SEMUA BENAR"} — ${benar}/${kasus.length} uji</strong>
                    <ul>${baris.join("")}</ul>`;
    state.kartu[state.aktif].hasil = `${benar}/${kasus.length}`;
    simpan();
  });

  $("reset-kode").addEventListener("click", () => {
    // Tidak memakai confirm(): dialog bawaan menutup layar penuh dan
    // terasa mengagetkan di depan kelas. Cukup dua kali tekan.
    const b = $("reset-kode");
    if (b.dataset.yakin) {
      $("editor").value = kartuKerja.starter;
      state.kode[state.aktif] = kartuKerja.starter;
      simpan();
      delete b.dataset.yakin;
      b.textContent = "Reset kode";
    } else {
      b.dataset.yakin = "1";
      b.textContent = "Tekan lagi untuk reset";
      setTimeout(() => { delete b.dataset.yakin; b.textContent = "Reset kode"; }, 3000);
    }
  });

  /* ---------------- Kunci jawaban (perlu sandi) ---------------- */
  function renderKunci() {
    const k = kartuKerja;
    const semua = [{ nama: "Contoh", ...k.contoh }].concat(
      k.uji.map((u, i) => ({ nama: "Uji " + (i + 1), ...u })));
    $("panel-kunci").innerHTML = `
      <div class="pane-head flash-kunci-head"><span>Kunci jawaban — hanya untuk guru</span></div>
      <div class="problem-content">
        <h3>Kode kunci</h3>
        <pre>${esc(k.kunci)}</pre>
        <h3>Yang dinilai</h3>
        <ul>${k.poin.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <h3>Pertanyaan lisan</h3>
        <p>${esc(k.tanya)}</p>
        <h3>Semua input uji</h3>
        ${semua.map((u) => `
          <div class="flash-uji">
            <div><span class="io-label">${u.nama} — input</span><pre>${esc(u.stdin || "(tidak ada)")}</pre></div>
            <div><span class="io-label">${u.nama} — output</span><pre>${esc(u.keluaran)}</pre></div>
          </div>`).join("")}
      </div>`;
  }

  $("kunci-btn").addEventListener("click", async () => {
    const panel = $("panel-kunci");
    if (!panel.hidden) {
      panel.hidden = true;
      panel.innerHTML = "";        // jangan biarkan kunci tertinggal di halaman
      $("kunci-btn").textContent = "Kunci jawaban";
      return;
    }
    if (!(await mintaSandi("Masukkan sandi untuk membuka kunci jawaban kartu ini."))) return;
    renderKunci();
    panel.hidden = false;
    $("kunci-btn").textContent = "Tutup kunci";
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("selesai-btn").addEventListener("click", () => {
    const id = state.aktif;
    const info = state.kartu[id];
    info.selesai = Date.now();
    info.durasi = info.selesai - info.mulai;
    state.aktif = null;
    delete state.kode[id];
    simpan();
    clearInterval(jamTimer);
    kartuKerja = null;
    $("panel-kunci").innerHTML = "";
    renderMeja();
  });

  /* ---------------- Konfirmasi sandi ---------------- */
  function mintaSandi(pesan) {
    return new Promise((selesai) => {
      const lapis = $("tanya-sandi");
      $("tanya-pesan").textContent = pesan;
      $("tanya-input").value = "";
      $("tanya-galat").hidden = true;
      lapis.hidden = false;
      lapis.classList.add("active");
      $("tanya-input").focus();

      const tutup = (hasil) => {
        lapis.hidden = true;
        lapis.classList.remove("active");
        $("form-tanya").onsubmit = null;
        $("tanya-batal").onclick = null;
        selesai(hasil);
      };
      $("form-tanya").onsubmit = (e) => {
        e.preventDefault();
        if ($("tanya-input").value === SANDI) tutup(true);
        else { $("tanya-galat").hidden = false; $("tanya-input").select(); }
      };
      $("tanya-batal").onclick = () => tutup(false);
    });
  }

  $("kocok-btn").addEventListener("click", async () => {
    if (!(await mintaSandi("Kocok ulang menutup semua kartu dan menghapus catatan sesi ini. Masukkan sandi untuk melanjutkan."))) return;
    state = stateBaru();
    simpan();
    renderMeja();
  });

  function kunciLayar() {
    BANK = null;
    SANDI = null;
    kartuKerja = null;
    clearInterval(jamTimer);
    // Semua yang pernah berasal dari bank soal dikosongkan — termasuk elemen
    // tersembunyi, yang tetap terbaca lewat DevTools walau tidak terlihat.
    ["panel-kunci", "soal", "grid", "hasil-cek"].forEach((id) => { $(id).innerHTML = ""; });
    ["buka-tingkat", "buka-pertemuan", "buka-judul", "buka-estimasi",
     "kerja-judul", "kerja-sub", "kerja-murid", "output"].forEach((id) => { $(id).textContent = ""; });
    $("editor").value = "";
    $("stdin").value = "";
    $("buka").hidden = true;
    $("buka").classList.remove("active");
    $("sandi").value = "";
    $("sandi-galat").hidden = true;
    tampil("gerbang");
    $("sandi").focus();
  }
  $("kunci-layar").addEventListener("click", kunciLayar);

  /* ---------------- Gerbang sandi ---------------- */
  $("form-sandi").addEventListener("submit", async (e) => {
    e.preventDefault();
    const sandi = $("sandi").value;
    const tombol = $("sandi-buka");
    tombol.disabled = true;
    tombol.textContent = "Membuka…";
    $("sandi-galat").hidden = true;
    try {
      BANK = await dekripsi(sandi);
      SANDI = sandi;
      $("sandi").value = "";
      state = muatState();
      simpan();
      // Kalau halaman sempat dimuat ulang saat murid sedang mengerjakan,
      // langsung kembali ke kartunya — kode & stopwatch tidak hilang.
      if (state.aktif && state.kartu[state.aktif] && state.kartu[state.aktif].mulai) {
        bukaRuangKerja(state.aktif);
      } else if (state.aktif && state.kartu[state.aktif]) {
        // Kartu sudah dibalik tapi belum dimulai: tetap kartu yang sama.
        // Kalau dikembalikan ke meja, murid bisa mengintip lalu memilih ulang.
        renderMeja();
        document.querySelectorAll(".kartu").forEach((b) => { b.disabled = true; });
        tampilkanKartuBesar(state.aktif);
      } else {
        state.aktif = null;
        renderMeja();
      }
    } catch (err) {
      const g = $("sandi-galat");
      g.hidden = false;
      g.textContent = err && err.name === "OperationError"
        ? "Sandi salah. Coba lagi."
        : (err && err.message) || "Gagal membuka soal.";
      $("sandi").select();
    } finally {
      tombol.disabled = false;
      tombol.textContent = "Buka meja kartu";
    }
  });

  /* Selama soal terbuka, isi terdekripsinya ada di memori halaman ini.
     Pintasan alat pengembang ditahan supaya murid yang mengetik di laptop
     guru tidak iseng membukanya. Ini hanya penghambat, bukan pengaman —
     yang benar-benar mengamankan adalah guru yang mengawasi di sebelahnya. */
  document.addEventListener("keydown", (e) => {
    if (!BANK) return;
    const k = (e.key || "").toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    if (k === "f12" || (ctrl && e.shiftKey && ["i", "j", "c"].includes(k)) || (ctrl && k === "u")) {
      e.preventDefault();
    }
  }, true);
  document.addEventListener("contextmenu", (e) => { if (BANK) e.preventDefault(); });

  tampil("gerbang");
  $("sandi").focus();
})();
