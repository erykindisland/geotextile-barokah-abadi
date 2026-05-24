# 📘 Panduan Operasional Super Lengkap: Geotextile Barokah Abadi

Selamat! Website Anda kini menggunakan teknologi **Astro**, mesin pembuat website tercepat di dunia saat ini. Panduan ini dirancang khusus agar Anda bisa mengelola website ini secara mandiri, tetap super SEO, dan berperingkat tinggi di Google.

---

## 🚀 1. Alur Kerja Harian (Sangat Penting)

Website ini memiliki dua "mode" utama yang harus Anda pahami:

### A. Mode Edit (Live Preview)
Gunakan mode ini saat Anda sedang bekerja mengganti tulisan atau menambah gambar.
- **Perintah:** `npm run dev`
- **Tampilan:** Buka [http://localhost:4324](http://localhost:4324) di browser Anda.
- **Kelebihan:** Setiap kali Anda menekan **Save (Ctrl+S)** pada file, tampilan di browser akan berubah otomatis dalam sekejap tanpa menunggu.

### B. Mode Produksi (Cetak Final)
Gunakan mode ini setelah selesai mengedit dan ingin memperbarui website yang akan dilihat orang di internet.
- **Perintah:** `npm run build`
- **Hasil:** Perintah ini akan memperbarui folder **`dist/`**.
- **Tindakan:** Folder `dist/` inilah yang Anda unggah (upload) ke hosting. Folder ini berisi file `index.html` tradisional yang sangat ringan.

---

## 📦 2. Mengelola Produk (Folder: `src/content/produk/`)

Di sinilah "mesin uang" Anda berada. Setiap file adalah satu halaman produk.

### Cara Menambah Produk Baru:
1.  Pilih satu file produk yang sudah ada, lalu **Copy**.
2.  **Paste** di folder yang sama.
3.  **Ganti Nama File (Slug):** Gunakan huruf kecil dan tanda hubung. 
    - *Contoh Bagus:* `harga-geotextile-non-woven-500gr.md`
    - *Contoh Buruk:* `Produk Baru 1.md`
4.  **Edit Bagian Atas (Frontmatter):**
    - `title`: Judul yang muncul di Google.
    - `priceLow` / `priceHigh`: Angka harga (tanpa titik/koma).
    - `image`: Nama file gambar di folder `public/`.
    - `description`: Kalimat promosi (150 karakter).
5.  **Isi Konten:** Tuliskan deskripsi lengkap, spek teknis, dan keunggulan di bawah baris `---` terakhir.

---

## ✍️ 3. Mengelola Blog/Artikel (Folder: `src/content/blog/`)

Blog sangat penting agar website Anda dianggap "Hidup" oleh Google.

1.  Buat file baru: `tips-memilih-geotextile.md`.
2.  Gunakan format yang sama dengan produk (Judul, Tanggal, Gambar, Deskripsi).
3.  Tuliskan artikel minimal 500 kata untuk hasil SEO terbaik.
4.  Gunakan kata kunci dari file `golden_keywords.md` di dalam artikel Anda.

---

## 🖼️ 4. Mengelola Gambar & Media (Folder: `public/`)

Agar website tetap **Super Cepat**, ikuti aturan ini:

1.  **Lokasi:** Simpan semua gambar di folder `public/`.
2.  **Format:** Gunakan format **.webp** atau **.png**.
3.  **Nama File SEO:** Jangan gunakan `image01.jpg`. Gunakan nama yang mengandung kata kunci.
    - *Contoh:* `distributor-geotextile-jakarta.webp`
4.  **Gambar Hero Utama:** 
    - Sekarang website Anda memiliki 4 gambar Hero. Jika ingin mengganti, simpan file baru di folder `public/` dengan nama yang sama agar otomatis terganti, atau ubah namanya di file `src/pages/index.astro`.

---

## 🔍 5. Strategi "Super SEO" (Cara Menang di Google)

Agar website Anda tetap "High Rank" dan "Super SEO Optimized":

### A. Gunakan Golden Keywords
Buka file **`golden_keywords.md`**. Pastikan kata-kata kunci di sana muncul di:
- Judul Halaman (Title)
- Paragraf pertama konten Anda.
- Akhir artikel sebagai penutup.

### B. Internal Linking (Silo Architecture)
Di dalam deskripsi produk A, berikan link ke produk B yang berkaitan. 
- *Contoh:* "Untuk hasil maksimal, gunakan juga [Plastik Cor](/produk/jual-plastik-cor-lantai-kerja-beton) kami."

### C. Kecepatan (Lighthouse score)
Astro sudah menangani ini secara otomatis. Jangan memasukkan gambar yang ukurannya terlalu besar (di atas 1MB). Usahakan di bawah 200KB per gambar.

---

## 📞 6. Mengubah Info Kontak & WhatsApp

Info kontak utama dan link WhatsApp tersebar di beberapa file kunci:

1.  **Header & Footer:** Ubah di `src/layouts/Layout.astro`.
2.  **Halaman Kontak:** Ubah di `src/pages/kontak.astro`.
3.  **Pesan Otomatis WA:** Cari teks `https://wa.me/628881211529?text=...` di file `index.astro` atau file produk untuk mengubah kata-kata yang muncul saat orang klik WA.

---

## 🛠️ 7. Troubleshooting (Jika Ada Masalah)

- **Website Putih/Blank:** Cek Terminal. Biasanya ada kesalahan ketik di file `.md`. Pastikan setiap variabel memiliki tanda kutip: `title: "Judul Produk"`.
- **Gambar Tidak Muncul:** Pastikan nama file di folder `public/` sama persis (termasuk huruf besar/kecilnya) dengan yang tertulis di kode.
- **Perubahan Tidak Muncul:** Pastikan Anda sedang melihat link `localhost:4324` (mode dev) atau jalankan `npm run build` kembali.

---

**Saran Terakhir:**
Selalu tambahkan minimal 1 artikel atau 1 produk baru setiap minggu. Konsistensi adalah kunci utama Google menempatkan website Anda di halaman pertama. 

**Maju Terus Geotextile Barokah Abadi!** 🚀
