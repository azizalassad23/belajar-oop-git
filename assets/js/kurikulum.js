/* =========================================================
   KURIKULUM OOP C++ — 35 Pertemuan, 7 Modul
   Data ini dibaca oleh index.html, materi.html, dan ujian.html.
   Untuk mengedit judul / urutan materi, ubah di sini.
   Konten & soal tiap pertemuan ada di: data/pertemuan/pNN.js
   ========================================================= */

/* ---------------------------------------------------------
   Aturan pembukaan pertemuan.

   Pertemuan 1 sampai (MULAI_BERURUTAN - 1) bebas dibuka kapan saja:
   itu materi fondasi yang boleh dibaca lompat-lompat. Mulai dari
   MULAI_BERURUTAN, tiap pertemuan baru terbuka kalau pertemuan
   sebelumnya sudah LULUS UJIAN.

   Nilai 7 berarti: Pertemuan 1-6 SELALU terbuka, lalu Pertemuan 7 baru
   terbuka setelah Pertemuan 6 lulus, Pertemuan 8 setelah 7, dan
   seterusnya. Jadi pertemuan pertama yang bisa terkunci adalah 7.

   Ditaruh di sini, bukan di app.js, karena ujian.html tidak memuat
   app.js — kalau tidak, penguncian bisa ditembus dengan membuka
   ujian.html?id=N langsung.
   --------------------------------------------------------- */
const MULAI_BERURUTAN = 7;

function _pertemuanSelesai(id) {
  try {
    const p = JSON.parse(localStorage.getItem("oopcpp_progress_v1")) || {};
    return !!p[id];
  } catch (e) { return false; }
}

window.AksesPertemuan = {
  mulaiBerurutan: MULAI_BERURUTAN,

  terkunci(id) {
    if (id < MULAI_BERURUTAN) return false;
    return !_pertemuanSelesai(id - 1);
  },

  /* Pertemuan yang harus diselesaikan lebih dulu (null kalau bebas). */
  syarat(id) {
    return id < MULAI_BERURUTAN ? null : id - 1;
  },

  alasan(id) {
    const s = this.syarat(id);
    if (s === null) return "";
    const info = (window.KURIKULUM.pertemuan || []).find(p => p.id === s);
    return `Selesaikan dulu Pertemuan ${s}${info ? ": " + info.judul : ""}.`;
  },
};

window.KURIKULUM = {
  meta: {
    judul: "Belajar OOP dengan C++",
    subjudul: "35 pertemuan, dari dasar C++ sampai bikin proyek OOP sendiri",
  },

  modul: [
    {
      no: 1,
      nama: "Fondasi & Dasar C++",
      deskripsi: "Kenalan dulu dengan cara berpikir OOP, sambil mengulang dasar C++ yang nanti sering dipakai.",
    },
    {
      no: 2,
      nama: "Class & Object",
      deskripsi: "Inti dari OOP: bikin cetakannya (class), lalu wujudkan jadi objek yang bisa dipakai.",
    },
    {
      no: 3,
      nama: "Fitur & Relasi Class",
      deskripsi: "Bikin class jadi lebih lengkap dan bisa saling terhubung satu sama lain.",
    },
    {
      no: 4,
      nama: "Inheritance (Pewarisan)",
      deskripsi: "Pakai ulang class yang sudah ada, lalu tambahkan bagian yang kamu butuhkan.",
    },
    {
      no: 5,
      nama: "Polymorphism",
      deskripsi: "Perintah yang sama, tapi hasilnya bisa berbeda tergantung objeknya.",
    },
    {
      no: 6,
      nama: "Topik Lanjutan",
      deskripsi: "Alat-alat C++ yang bikin kode kamu lebih aman dan lebih hemat waktu.",
    },
    {
      no: 7,
      nama: "Proyek Akhir",
      deskripsi: "Gabungkan semua yang sudah dipelajari jadi satu program utuh.",
    },
  ],

  // status: "ready" (konten sudah diisi) | "todo" (masih stub)
  pertemuan: [
    { id: 1,  modul: 1, judul: "Pengantar OOP & Paradigma Pemrograman", ringkas: "Apa itu OOP, kenapa dipakai, dan apa bedanya dengan cara menulis program biasa.", status: "ready" },
    { id: 2,  modul: 1, judul: "Review C++ Dasar: Variabel, Tipe Data & I/O", ringkas: "Mengulang sintaks dasar C++ sebagai bekal sebelum masuk OOP.", status: "ready" },
    { id: 3,  modul: 1, judul: "Kontrol Alur & Fungsi", ringkas: "Percabangan, perulangan, dan cara memecah program jadi fungsi.", status: "ready" },
    { id: 4,  modul: 1, judul: "Array, Pointer & Reference", ringkas: "Cara C++ menyimpan data di memori — bekal penting sebelum belajar objek.", status: "ready" },
    { id: 5,  modul: 1, judul: "Struct & Pengenalan Objek", ringkas: "Dari struct pelan-pelan menuju objek: data dan perilaku jadi satu.", status: "ready" },

    { id: 6,  modul: 2, judul: "Class & Object Pertama", ringkas: "Bikin class pertama kamu, lalu ubah jadi objek yang bisa dipakai.", status: "ready" },
    { id: 7,  modul: 2, judul: "Atribut & Method", ringkas: "Menyimpan data (atribut) dan perilaku (method) di dalam satu class.", status: "ready" },
    { id: 8,  modul: 2, judul: "Access Modifier: public, private, protected", ringkas: "Mengatur bagian mana yang boleh diakses dari luar class.", status: "ready" },
    { id: 9,  modul: 2, judul: "Constructor", ringkas: "Mengisi nilai awal objek secara otomatis begitu objek dibuat.", status: "ready" },
    { id: 10, modul: 2, judul: "Destructor", ringkas: "Membereskan sisa pemakaian objek saat objeknya sudah tidak dipakai.", status: "ready" },
    { id: 11, modul: 2, judul: "Encapsulation & Getter/Setter", ringkas: "Menyembunyikan data, lalu menyediakan jalan yang aman untuk mengaksesnya.", status: "ready" },

    { id: 12, modul: 3, judul: "Keyword this", ringkas: "Cara sebuah objek menunjuk dirinya sendiri, dan kapan itu berguna.", status: "ready" },
    { id: 13, modul: 3, judul: "Member Static", ringkas: "Data dan method yang dimiliki class-nya, bukan tiap objek.", status: "todo" },
    { id: 14, modul: 3, judul: "Constructor Overloading & Default Argument", ringkas: "Menyediakan beberapa cara berbeda untuk membuat objek.", status: "todo" },
    { id: 15, modul: 3, judul: "Composition (Objek di dalam Objek)", ringkas: "Objek yang punya objek lain di dalamnya — hubungan 'punya'.", status: "todo" },
    { id: 16, modul: 3, judul: "Friend Function & Friend Class", ringkas: "Memberi izin khusus untuk mengakses bagian yang private.", status: "todo" },
    { id: 17, modul: 3, judul: "Operator Overloading", ringkas: "Membuat +, ==, dan << bisa dipakai untuk objek buatan sendiri.", status: "todo" },

    { id: 18, modul: 4, judul: "Konsep Inheritance", ringkas: "Class anak mewarisi atribut dan method dari class induknya.", status: "todo" },
    { id: 19, modul: 4, judul: "Mode Akses Pewarisan", ringkas: "Beda hasilnya kalau mewarisi secara public, protected, atau private.", status: "todo" },
    { id: 20, modul: 4, judul: "Constructor & Destructor pada Inheritance", ringkas: "Siapa yang dipanggil lebih dulu antara class induk dan class anak.", status: "todo" },
    { id: 21, modul: 4, judul: "Overriding Method", ringkas: "Mengganti isi method warisan dengan versi buatan sendiri.", status: "todo" },
    { id: 22, modul: 4, judul: "Multilevel & Hierarchical Inheritance", ringkas: "Pewarisan bertingkat dan pewarisan yang bercabang.", status: "todo" },
    { id: 23, modul: 4, judul: "Multiple Inheritance & Diamond Problem", ringkas: "Mewarisi dari lebih dari satu induk, plus masalah yang sering muncul.", status: "todo" },

    { id: 24, modul: 5, judul: "Konsep Polymorphism", ringkas: "Perintah yang sama, tapi wujud perilakunya bisa berbeda-beda.", status: "todo" },
    { id: 25, modul: 5, judul: "Function Overloading vs Overriding", ringkas: "Dua hal yang mirip tapi beda: ditentukan saat compile atau saat program jalan.", status: "todo" },
    { id: 26, modul: 5, judul: "Virtual Function & Dynamic Binding", ringkas: "Kunci utama polymorphism saat program sedang berjalan.", status: "todo" },
    { id: 27, modul: 5, judul: "Pure Virtual & Abstract Class", ringkas: "Class yang sengaja dibuat supaya tidak bisa langsung dijadikan objek.", status: "todo" },
    { id: 28, modul: 5, judul: "Interface dengan Abstract Class", ringkas: "Menetapkan daftar method yang wajib dipunyai setiap class turunan.", status: "todo" },
    { id: 29, modul: 5, judul: "Virtual Destructor", ringkas: "Mencegah memori bocor saat objek dihapus lewat pointer induk.", status: "todo" },

    { id: 30, modul: 6, judul: "Templates (Function & Class Template)", ringkas: "Menulis satu kode yang bisa dipakai untuk banyak tipe data sekaligus.", status: "todo" },
    { id: 31, modul: 6, judul: "Exception Handling", ringkas: "Menangani error pakai try, catch, dan throw supaya program tidak langsung mati.", status: "todo" },
    { id: 32, modul: 6, judul: "STL Dasar: vector & string", ringkas: "Memakai vector dan string bawaan C++ biar tidak perlu bikin dari nol.", status: "todo" },
    { id: 33, modul: 6, judul: "Smart Pointer & Manajemen Memori", ringkas: "unique_ptr, shared_ptr, dan cara aman mengatur pemakaian memori.", status: "todo" },

    { id: 34, modul: 7, judul: "Studi Kasus: Merancang Sistem OOP", ringkas: "Menggabungkan semua materi jadi satu mini-project.", status: "todo" },
    { id: 35, modul: 7, judul: "Finalisasi & Presentasi Proyek", ringkas: "Merapikan, menguji, lalu mempresentasikan hasil proyek kamu.", status: "todo" },
  ],
};
