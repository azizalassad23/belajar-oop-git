/* =========================================================
   tema.js — Pengalih mode terang / gelap

   Penentuan tema saat halaman dibuka sudah dilakukan lebih dulu
   oleh skrip pendek di dalam <head> tiap halaman. Itu wajib ada
   di sana: kalau baru dijalankan dari file ini, halaman sempat
   tampil terang sepersekian detik sebelum berubah gelap.
   ========================================================= */

const Tema = {
  KEY: "oopcpp_tema",

  aktif() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark" : "light";
  },

  pasang(nama) {
    document.documentElement.setAttribute("data-theme", nama);
    try { localStorage.setItem(this.KEY, nama); } catch (e) {}
    this._perbaruiTombol();
  },

  ganti() {
    this.pasang(this.aktif() === "dark" ? "light" : "dark");
  },

  _perbaruiTombol() {
    const btn = document.getElementById("tema-btn");
    if (!btn) return;
    const gelap = this.aktif() === "dark";
    // Namanya menyebutkan hasil penekanan, bukan keadaan sekarang —
    // itu yang dibacakan pembaca layar sebelum tombol ditekan.
    btn.setAttribute("aria-label",
      gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap");
    btn.title = btn.getAttribute("aria-label");
  },

  init() {
    const btn = document.getElementById("tema-btn");
    if (btn) btn.addEventListener("click", () => this.ganti());
    this._perbaruiTombol();

    // Ikuti setelan sistem selama siswa belum memilih sendiri.
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", (e) => {
        if (localStorage.getItem(this.KEY)) return;
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        this._perbaruiTombol();
      });
    } catch (e) {}
  },
};

document.addEventListener("DOMContentLoaded", () => Tema.init());
