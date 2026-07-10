# 🌟 Website Portofolio Pribadi

Selamat datang di repositori (*tempat penyimpanan kode*) untuk website portofolio pribadi. Website ini dibangun menggunakan teknologi modern seperti **React**, **Vite**, dan **TailwindCSS**, serta sudah diatur untuk otomatis *online* (*deploy*) menggunakan **GitHub Pages**.

---

## 📖 Panduan Cepat untuk Pemula (Orang Awam)

Tidak perlu menjadi programmer handal untuk mengubah isi teks atau foto di website portofolio Anda! Ikuti panduan sederhana di bawah ini.

### 1. Cara Mengubah Teks & Data (Pengalaman, Keahlian, dll)
Seluruh teks dan data website Anda tersimpan di dalam folder `src/sections/`. 
- **Hero Section (Bagian Paling Atas):** Buka file `src/sections/HeroSection.tsx`. Anda bisa mengubah nama atau teks sambutan di sana.
- **Tentang Saya:** Buka file `src/sections/AboutSection.tsx`.
- **Pengalaman Kerja:** Buka file `src/sections/ExperienceSection.tsx`. Cari bagian data pekerjaan untuk mengubah judul, nama perusahaan, atau tahun.
- **Pendidikan:** Buka file `src/sections/EducationSection.tsx`.
- **Kontak:** Buka file `src/sections/ContactSection.tsx`.

*💡 **Tips Penting:** Anda cukup mengganti teks biasa. Jangan menghapus simbol-simbol kode seperti `< >`, `{ }`, atau tanda kutip.*

### 2. Cara Mengubah Foto Profil
1. Siapkan foto baru Anda.
2. Pastikan file fotonya bernama `profile.jpg`.
3. Masukkan dan timpa (*replace*) foto lama yang ada di dalam folder `public/images/`.

### 3. Cara Memperbarui Website ke Internet (*Go Live*)
Setelah Anda mengubah teks atau foto di komputer Anda, website yang ada di internet **tidak akan otomatis berubah** sampai Anda melakukan "Push" (mengirim perubahan ke server GitHub).

Buka **Terminal**, pastikan posisi Anda sudah berada di dalam folder `app` (ketik `cd app` jika belum), lalu jalankan 3 perintah ajaib ini secara berurutan:

```bash
git add .
git commit -m "update: mengubah data portofolio"
git push
```

**Selesai!** 🚀
Sekarang Anda hanya perlu menunggu sekitar **1 hingga 2 menit**. GitHub di balik layar sedang memproses website Anda secara otomatis. Setelah itu, *Refresh* browser internet Anda, dan pembaruan Anda sudah bisa dilihat oleh seluruh dunia!

---

## 🛠️ Informasi Teknis (Untuk Developer)

Jika Anda ingin menjalankan proyek ini secara lokal di komputer Anda untuk keperluan *testing* atau modifikasi lanjutan:

1. **Install Dependencies (Aplikasi Pendukung):**
   ```bash
   npm install
   ```

2. **Jalankan Server Lokal (Live Preview):**
   ```bash
   npm run dev
   ```
   *Buka alamat `http://localhost:5173` di browser Anda.*

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
