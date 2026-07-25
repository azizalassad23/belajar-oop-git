/* =========================================================
   KURIKULUM OOP C++ — 35 Pertemuan, 7 Modul
   Data ini dibaca oleh index.html, materi.html, dan ujian.html.
   Untuk mengedit judul / urutan materi, ubah di sini.
   Konten & soal tiap pertemuan ada di: data/pertemuan/pNN.js
   ========================================================= */

window.KURIKULUM = {
  meta: {
    judul: "Belajar OOP dengan C++",
    subjudul: "Program 35 Pertemuan — dari dasar hingga proyek berorientasi objek",
  },

  modul: [
    {
      no: 1,
      nama: "Fondasi & Dasar C++",
      deskripsi: "Menyiapkan pola pikir OOP dan menyegarkan dasar C++ yang dibutuhkan.",
    },
    {
      no: 2,
      nama: "Class & Object",
      deskripsi: "Membangun blok utama OOP: mendefinisikan class dan membuat objek.",
    },
    {
      no: 3,
      nama: "Fitur & Relasi Class",
      deskripsi: "Memperkaya class dengan this, static, composition, dan operator overloading.",
    },
    {
      no: 4,
      nama: "Inheritance (Pewarisan)",
      deskripsi: "Menggunakan kembali dan memperluas class melalui pewarisan.",
    },
    {
      no: 5,
      nama: "Polymorphism",
      deskripsi: "Satu antarmuka, banyak bentuk: virtual function dan abstract class.",
    },
    {
      no: 6,
      nama: "Topik Lanjutan",
      deskripsi: "Template, exception, STL, dan manajemen memori modern.",
    },
    {
      no: 7,
      nama: "Proyek Akhir",
      deskripsi: "Menerapkan seluruh konsep pada sebuah studi kasus nyata.",
    },
  ],

  // status: "ready" (konten sudah diisi) | "todo" (masih stub)
  pertemuan: [
    { id: 1,  modul: 1, judul: "Pengantar OOP & Paradigma Pemrograman", ringkas: "Apa itu OOP, mengapa dipakai, dan bedanya dengan pemrograman prosedural.", status: "ready" },
    { id: 2,  modul: 1, judul: "Review C++ Dasar: Variabel, Tipe Data & I/O", ringkas: "Menyegarkan sintaks dasar C++ sebagai bekal materi OOP.", status: "ready" },
    { id: 3,  modul: 1, judul: "Kontrol Alur & Fungsi", ringkas: "Percabangan, perulangan, dan memecah program menjadi fungsi.", status: "todo" },
    { id: 4,  modul: 1, judul: "Array, Pointer & Reference", ringkas: "Konsep memori yang menjadi fondasi objek dan relasinya.", status: "todo" },
    { id: 5,  modul: 1, judul: "Struct & Pengenalan Objek", ringkas: "Dari struct menuju konsep objek sebagai kesatuan data + perilaku.", status: "todo" },

    { id: 6,  modul: 2, judul: "Class & Object Pertama", ringkas: "Mendefinisikan class dan membuat objek pertama Anda.", status: "ready" },
    { id: 7,  modul: 2, judul: "Atribut & Method", ringkas: "Menyimpan data (atribut) dan perilaku (method) dalam class.", status: "todo" },
    { id: 8,  modul: 2, judul: "Access Modifier: public, private, protected", ringkas: "Mengatur hak akses anggota class.", status: "todo" },
    { id: 9,  modul: 2, judul: "Constructor", ringkas: "Menginisialisasi objek secara otomatis saat dibuat.", status: "todo" },
    { id: 10, modul: 2, judul: "Destructor", ringkas: "Membersihkan sumber daya saat objek dihancurkan.", status: "todo" },
    { id: 11, modul: 2, judul: "Encapsulation & Getter/Setter", ringkas: "Menyembunyikan data dan mengaksesnya dengan aman.", status: "todo" },

    { id: 12, modul: 3, judul: "Keyword this", ringkas: "Referensi ke objek saat ini dan kegunaannya.", status: "todo" },
    { id: 13, modul: 3, judul: "Member Static", ringkas: "Atribut & method milik class, bukan objek.", status: "todo" },
    { id: 14, modul: 3, judul: "Constructor Overloading & Default Argument", ringkas: "Beberapa cara membuat objek dari satu class.", status: "todo" },
    { id: 15, modul: 3, judul: "Composition (Objek di dalam Objek)", ringkas: "Relasi 'has-a': membangun objek dari objek lain.", status: "todo" },
    { id: 16, modul: 3, judul: "Friend Function & Friend Class", ringkas: "Memberi akses khusus ke anggota private.", status: "todo" },
    { id: 17, modul: 3, judul: "Operator Overloading", ringkas: "Membuat operator (+, ==, <<) bekerja pada objek.", status: "todo" },

    { id: 18, modul: 4, judul: "Konsep Inheritance", ringkas: "Mewariskan atribut & method dari class induk ke anak.", status: "todo" },
    { id: 19, modul: 4, judul: "Mode Akses Pewarisan", ringkas: "public, protected, private inheritance.", status: "todo" },
    { id: 20, modul: 4, judul: "Constructor & Destructor pada Inheritance", ringkas: "Urutan pemanggilan pada class induk & anak.", status: "todo" },
    { id: 21, modul: 4, judul: "Overriding Method", ringkas: "Mengganti implementasi method warisan.", status: "todo" },
    { id: 22, modul: 4, judul: "Multilevel & Hierarchical Inheritance", ringkas: "Rantai dan cabang pewarisan.", status: "todo" },
    { id: 23, modul: 4, judul: "Multiple Inheritance & Diamond Problem", ringkas: "Mewarisi dari banyak induk dan masalahnya.", status: "todo" },

    { id: 24, modul: 5, judul: "Konsep Polymorphism", ringkas: "Satu antarmuka, banyak bentuk.", status: "todo" },
    { id: 25, modul: 5, judul: "Function Overloading vs Overriding", ringkas: "Membedakan compile-time dan run-time polymorphism.", status: "todo" },
    { id: 26, modul: 5, judul: "Virtual Function & Dynamic Binding", ringkas: "Inti dari polymorphism run-time.", status: "todo" },
    { id: 27, modul: 5, judul: "Pure Virtual & Abstract Class", ringkas: "Class yang tidak bisa diinstansiasi.", status: "todo" },
    { id: 28, modul: 5, judul: "Interface dengan Abstract Class", ringkas: "Merancang kontrak antar class.", status: "todo" },
    { id: 29, modul: 5, judul: "Virtual Destructor", ringkas: "Menghindari kebocoran memori pada polymorphism.", status: "todo" },

    { id: 30, modul: 6, judul: "Templates (Function & Class Template)", ringkas: "Menulis kode generik yang bekerja untuk banyak tipe.", status: "todo" },
    { id: 31, modul: 6, judul: "Exception Handling", ringkas: "Menangani error dengan try, catch, dan throw.", status: "todo" },
    { id: 32, modul: 6, judul: "STL Dasar: vector & string", ringkas: "Memanfaatkan pustaka standar berorientasi objek.", status: "todo" },
    { id: 33, modul: 6, judul: "Smart Pointer & Manajemen Memori", ringkas: "unique_ptr, shared_ptr, dan RAII.", status: "todo" },

    { id: 34, modul: 7, judul: "Studi Kasus: Merancang Sistem OOP", ringkas: "Menggabungkan seluruh konsep dalam satu mini-project.", status: "todo" },
    { id: 35, modul: 7, judul: "Finalisasi & Presentasi Proyek", ringkas: "Menyempurnakan, menguji, dan mempresentasikan proyek.", status: "todo" },
  ],
};
