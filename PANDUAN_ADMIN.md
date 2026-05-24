# Panduan Lengkap Mengelola Website Geotextile Barokah Abadi

Website ini menggunakan teknologi **Astro** yang menghasilkan website statis (`index.html`) yang sangat cepat dan ramah SEO. Berikut adalah panduan teknis operasional untuk Anda.

## 1. Mengelola Produk (Folder: `src/content/produk/`)
Setiap produk direpresentasikan oleh satu file berformat `.md` (Markdown).

### A. Mengedit Produk yang Sudah Ada
1. Buka file produk (misal: `distributor-geomembrane-hdpe.md`).
2. **Ubah Data Teknis:** Edit teks di antara baris `---`.
   - `priceLow`: Harga terendah (angka saja).
   - `priceHigh`: Harga tertinggi (angka saja).
   - `seoKeyword`: Kata kunci target untuk Google.
3. **Ubah Deskripsi:** Edit teks di bawah tanda `---` kedua. Anda bisa menambah paragraf atau mengubah isi tabel.

### B. Menambah Produk Baru
1. Cari produk yang paling mirip (misal: ingin menambah Geogrid Triaxial, maka copy dari Geogrid Biaxial).
2. **Copy & Paste** file tersebut dalam folder yang sama.
3. **Rename** file tersebut (gunakan huruf kecil dan tanda hubung, misal: `jual-geogrid-triaxial-murah.md`).
4. Buka file baru tersebut dan sesuaikan isinya. Sistem akan otomatis membuatkan halaman barunya.

---

## 2. Mengelola Gambar
Ada dua cara memasukkan gambar ke website:

### Cara A: Menggunakan Link Internet (Cara Paling Cepat)
Anda cukup menyalin link gambar dari website lain atau hosting gambar, lalu masukkan ke baris `image:` di file produk.
Contoh: `image: "https://website.com/gambar-produk.jpg"`

### Cara B: Menggunakan Gambar Lokal (Rekomendasi untuk Kecepatan)
1. Simpan gambar Anda di folder `public/`. (Misal: `public/produk-baru.webp`).
2. Di file produk, panggil gambarnya dengan: `image: "/produk-baru.webp"`.

---

## 3. SEO & Metadata (Penting untuk Ranking)
Setiap halaman memiliki bagian **Metadata** (Meta Title & Meta Description).

- **Judul Halaman (`title`)**: Gunakan kata kunci transaksional (Jual, Harga, Distributor). Batasi sekitar 60 karakter.
- **Deskripsi (`description`)**: Kalimat persuasif yang muncul di Google. Sertakan nomor telepon dan area layanan (Jakarta, Surabaya, dll). Batasi 150-160 karakter agar tidak terpotong.

---

## 4. Mengubah Tampilan Luar & Global
- **Logo & Warna:** Pengaturan warna CSS utama ada di `src/layouts/Layout.astro` di bagian `<style>`.
- **Navigasi Atas:** Cari bagian `<ul class="nav-links">` di file `Layout.astro`.
- **WhatsApp Terapung:** Link WhatsApp global diatur di dua tempat di `Layout.astro`: di bagian `nav-cta` dan tombol di bagian bawah (Floating WA).

---

## 5. Proses Finalisasi (Build untuk Hosting)
Jika Anda sudah selesai melakukan semua perubahan dan ingin mengunggah ke internet:
1. Buka terminal di folder project.
2. Jalankan perintah: `npm run build`.
3. Tunggu hingga muncul tulisan **"Complete!"**.
4. Folder hasil jadinya adalah folder **`dist/`**.
5. **Pindahkan/Unggah isi folder `dist/` ini** ke hosting Anda (cPanel, Cloudflare Pages, atau Netlify). Folder `dist/` ini isinya adalah file-file `index.html` tradisional yang Anda kenali.

---

## 6. Tips & Troubleshooting
- **Kesalahan Error:** Jika website tidak muncul, pastikan Anda tidak menghapus tanda titik dua (`:`) atau tanda kutip (`"`) di bagian header file Markdown.
- **Tabel Tidak Rapi:** Di Markdown, buat tabel dengan garis tegak `|`. Pastikan ada spasi setelah tanda `|`.
- **Nomor WhatsApp:** Selalu gunakan format internasional tanpa tanda plus untuk link (contoh: `628881211529`).

---
