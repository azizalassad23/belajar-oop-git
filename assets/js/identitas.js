/* =========================================================
   identitas.js — Dialog "siapa yang sedang belajar"

   Dipakai karena komputer lab dipakai bergantian: progres harus
   menempel pada NIS siswa, bukan pada browsernya.

   Markup dialognya dibuat dari sini, bukan disalin ke tiap halaman,
   supaya index.html dan materi.html tidak bisa jadi beda isi.
   ========================================================= */

(function () {
  const btn = document.getElementById("identitas-btn");
  if (!btn) return;

  const dlg = document.createElement("dialog");
  dlg.className = "sheet";
  dlg.id = "identitas-dialog";
  dlg.setAttribute("aria-labelledby", "identitas-judul");
  dlg.innerHTML = `
    <form method="dialog">
      <div class="sheet-body">
        <h2 id="identitas-judul">Siapa yang sedang belajar?</h2>
        <p class="sheet-sub" id="catatan-server"></p>

        <p class="sheet-msg" id="identitas-pesan" role="status" aria-live="polite" hidden></p>

        <div class="field">
          <label for="f-nama">Nama Lengkap</label>
          <input id="f-nama" name="nama" type="text" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="f-nis">NIS</label>
          <input id="f-nis" name="nis" type="text" inputmode="numeric" required>
          <p class="hint">Dipakai untuk memanggil progresmu kembali kalau ganti komputer.</p>
        </div>
        <div class="field">
          <label for="f-kelas">Kelas</label>
          <input id="f-kelas" name="kelas" type="text" placeholder="mis. XI RPL 1">
        </div>
      </div>

      <div class="sheet-actions">
        <button class="btn btn-primary" type="submit">Simpan</button>
        <button class="btn btn-ghost btn-sm" type="button" id="btn-pulihkan">Pulihkan Progres</button>
        <span class="spacer"></span>
        <button class="btn btn-ghost btn-sm" type="button" id="btn-keluar" hidden>Keluar</button>
        <button class="btn btn-ghost btn-sm" type="button" id="btn-tutup">Tutup</button>
      </div>
    </form>`;
  document.body.appendChild(dlg);

  const form = dlg.querySelector("form");
  const iNama = dlg.querySelector("#f-nama");
  const iNis = dlg.querySelector("#f-nis");
  const iKelas = dlg.querySelector("#f-kelas");
  const pesan = dlg.querySelector("#identitas-pesan");
  const btnPulih = dlg.querySelector("#btn-pulihkan");
  const btnKeluar = dlg.querySelector("#btn-keluar");
  const catatan = dlg.querySelector("#catatan-server");

  function tampilkanPesan(teks, jenis) {
    pesan.textContent = teks || "";
    pesan.className = "sheet-msg" + (jenis ? " " + jenis : "");
    pesan.hidden = !teks;
  }

  function buka(alasan) {
    const s = Sinkron.siswa();
    if (s) {
      iNama.value = s.nama || "";
      iNis.value = s.nis || "";
      iKelas.value = s.kelas || "";
    }
    btnKeluar.hidden = !Sinkron.sudahKenal();
    btnPulih.hidden = !Sinkron.aktif();
    catatan.textContent = Sinkron.aktif()
      ? "Progresmu ikut tersimpan di server kelas, jadi tetap ada kalau ganti komputer."
      : "Progres saat ini hanya tersimpan di browser ini. Kalau ganti komputer, progresmu tidak ikut.";
    tampilkanPesan(alasan || "");
    dlg.showModal();
    iNama.focus();
  }

  btn.addEventListener("click", () => buka());
  dlg.querySelector("#btn-tutup").addEventListener("click", () => dlg.close());

  // Dipakai halaman lain untuk memanggil dialog ini saat siswa mencoba
  // menyimpan progres padahal identitasnya belum diisi.
  window.bukaDialogIdentitas = buka;

  form.addEventListener("submit", (e) => {
    e.preventDefault();   // simpan dulu, baru tutup
    const nama = iNama.value.trim();
    const nis = iNis.value.trim();
    if (!nama || !nis) {
      tampilkanPesan("Nama dan NIS wajib diisi ya.", "bad");
      return;
    }
    Sinkron.simpanSiswa({ nama: nama, nis: nis, kelas: iKelas.value.trim() });
    Sinkron.perbaruiStatus();
    Sinkron.kirim();
    dlg.close();
    if (typeof showToast === "function") showToast("Halo, " + nama.split(" ")[0] + "!");
  });

  btnPulih.addEventListener("click", async () => {
    const nis = iNis.value.trim();
    if (!nis) { tampilkanPesan("Isi NIS dulu, baru progresnya bisa dicari.", "bad"); return; }

    btnPulih.disabled = true;
    tampilkanPesan("Sedang mencari progresmu di server…");
    try {
      const jumlah = await Sinkron.pulihkan(nis);
      tampilkanPesan(
        jumlah ? `Ketemu! ${jumlah} pertemuan ditandai selesai.`
               : "Belum ada progres tersimpan untuk NIS ini.",
        jumlah ? "ok" : null);
      if (jumlah && typeof renderIndex === "function") renderIndex();
    } catch (err) {
      tampilkanPesan("Gagal menghubungi server. Coba cek koneksi internetmu.", "bad");
    } finally {
      btnPulih.disabled = false;
    }
  });

  btnKeluar.addEventListener("click", () => {
    if (!confirm("Keluar? Progres di komputer ini akan dibersihkan supaya tidak tercampur dengan siswa lain.")) return;
    // Komputer lab dipakai bergantian, jadi jejak lokal ikut dibersihkan.
    // Aman selama antrean sudah terkirim — kalau belum, peringatkan dulu.
    if (Sinkron.jumlahTertunda() > 0 &&
        !confirm(`Masih ada ${Sinkron.jumlahTertunda()} progres yang belum terkirim ke server. Tetap keluar? Progres itu akan hilang.`)) {
      return;
    }
    Sinkron.hapusSiswa();
    localStorage.removeItem("oopcpp_progress_v1");
    localStorage.removeItem(Sinkron.KUNCI_ANTREAN);
    dlg.close();
    location.reload();
  });
})();
