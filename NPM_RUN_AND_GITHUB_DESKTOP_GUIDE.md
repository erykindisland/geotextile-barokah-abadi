# 📘 Panduan Lengkap `npm run` & GitHub Desktop (Push)

# 📘 Panduan Lengkap `npm run` & GitHub Desktop (Push)

## Ringkasan
Panduan ini merangkum empat langkah penting dalam alur kerja proyek Astro‑Cloudflare Anda:
- **`npm run build`** – Meng‑compile semua sumber (`.astro`, `.md`, CSS, JS) menjadi aset statis di folder `dist/`. Digunakan untuk memeriksa error build sebelum deployment.
- **`npm run preview`** – Menjalankan `npm run build` lalu meluncurkan **Miniflare** (`wrangler dev`) yang meniru lingkungan Cloudflare secara lokal, sehingga Anda dapat memverifikasi perilaku produksi sebelum men‑push.
- **`npm run deploy`** – Membuat build kemudian meng‑upload hasilnya ke Cloudflare Workers/Pages via `wrangler deploy`. Ini adalah cara manual untuk memublikasikan situs.
- **Push di GitHub Desktop** – Mengirim commit ke remote GitHub. Jika integrasi Cloudflare aktif, push otomatis memicu proses build & deploy di server Cloudflare; bila tidak, Anda dapat men‑deploy secara manual dengan `npm run deploy`.
Gunakan urutan **build → preview → (opsional) deploy** atau **build → push** sesuai kebutuhan Anda.
## 📦 Apa Itu `npm run`?
`npm run <script>` adalah cara mengeksekusi **script** yang didefinisikan di dalam file **`package.json`** proyek Anda.  
Script‑script ini biasanya berisi perintah‑perintah yang berhubungan dengan **build**, **preview**, atau **deploy** aplikasi Astro/Cloudflare Workers Anda.

---

## 🔧 Daftar Script Utama di Proyek Ini
Berikut isi bagian `scripts` di `package.json` Anda (dipotong untuk fokus):
```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "npm run build && wrangler dev",
  "deploy": "npm run build && wrangler deploy",
  "astro": "astro",
  "generate-types": "wrangler types",
  "deploy": "npm run build && wrangler deploy"
}
```
> **Catatan:** `npm run deploy` muncul dua kali karena duplikasi; satu dapat di‑hapus bila tidak dipakai.

---

## 🏗️ `npm run build`
### Apa yang dilakukan?
- **Astro** meng‑compile semua file `.astro`, `.md`, CSS, dan JavaScript menjadi **static assets** yang siap di‑serve.
- Hasilnya disimpan di folder **`dist/`** (atau `./dist` tergantung konfigurasi).
- Tidak ada server yang dijalankan; hanya menghasilkan berkas‑berkas akhir.

### Kapan harus dijalankan?
| Situasi | Kenapa?
|---|---|
| **Sebelum Deploy** ke Cloudflare (atau server lain) | Memastikan tidak ada error build. |
| **Setelah mengubah konfigurasi** (`astro.config.mjs`, `wrangler.jsonc`) | Perubahan konfigurasi hanya berpengaruh setelah proses build. |
| **Menambahkan dependensi** (`npm install` atau mengubah `package.json`) | Build memastikan semua modul ter‑bundle dengan benar. |
| **Debugging** | Jika `npm run dev` tidak menampilkan error yang jelas, `npm run build` biasanya memberikan log yang lebih detail. |

### Cara menjalankan
```bash
npm run build
```
Jika berhasil, terminal akan menampilkan sesuatu seperti:
```
> astro build

✔ Built in 5.72s
✔ Server built in 5.72s
✔ Build complete
```
Jika ada error, perbaiki dulu sebelum melanjutkan.

---

## 👀 `npm run preview`
### Apa yang dilakukan?
1. **`npm run build`** – menghasilkan folder `dist/`.
2. **`wrangler dev`** – mem‑start **Miniflare**, emulator Cloudflare Workers yang berjalan **lokal** pada `http://127.0.0.1:8787` (atau `localhost:8787`).
   - Miniflare meniru **lingkungan Edge** Cloudflare (V8 Isolate, KV, D1, dll.) sehingga Anda dapat **menguji** perilaku yang persis sama dengan yang akan dijalankan di produksi.

### Kapan harus dijalankan?
| Situasi | Kenapa?
|---|---|
| **Sebelum Push** ke GitHub (atau sebelum `npm run deploy`) | Memastikan kode tidak menolak di lingkungan Cloudflare (contoh: penggunaan `<Image/>` yang tidak kompatibel). |
| **Setelah mengubah logika Workers** (`src/pages/**/*.astro`, `wrangler.jsonc`) | Memeriksa apakah fungsi server‑side (SSR, API routes, KV, dll.) berfungsi. |
| **Menambahkan/merubah binding** (KV, D1, R2) | Miniflare akan mem‑mock binding‑binding tersebut sehingga Anda dapat menguji tanpa mengakses produksi. |

### Cara menjalankan
```bash
npm run preview
```
Browser akan terbuka (atau Anda dapat membuka secara manual) ke `http://localhost:8787`.  
Jika ada error, terminal akan menampilkan pesan yang sama persis dengan yang akan muncul di Cloudflare produksi – jadi ini **golden checkpoint**.

---

## 🚀 `npm run deploy`
### Apa yang dilakukan?
1. **`npm run build`** – menghasilkan artefak statis.
2. **`wrangler deploy`** – meng‑upload folder `dist/` beserta konfigurasi `wrangler.jsonc` ke **Cloudflare Workers** (atau Cloudflare Pages, tergantung adapter yang dipilih).
   - Proses ini memerlukan **API Token** yang disimpan di **GitHub Secrets** (`CLOUDFLARE_API_TOKEN` & `CLOUDFLARE_ACCOUNT_ID`).

### Kapan harus dijalankan?
| Situasi | Kenapa?
|---|---|
| **Setelah semua perubahan selesai** (konten, layout, konfigurasi) | Mengirimkan versi final ke produksi. |
| **Setelah `npm run preview` berhasil** | Menjamin tidak ada perbedaan antara lingkungan lokal dan produksi. |
| **Saat ingin meng‑override otomatisasi GitHub → Cloudflare** (misalnya Anda menonaktifkan integrasi otomatis) | Deploy manual memberi kontrol penuh. |

### Cara menjalankan
```bash
npm run deploy
```
Jika berhasil, terminal akan menampilkan URL produksi, misalnya:
```
✅ Deploy succeeded! 🎉
Your site is live at https://geotextile.barokahabadi.web.id
```

---

## 🖥️ GitHub Desktop – Push ke Remote
### Apa itu *Push*?
*Push* mengirimkan **commit** lokal Anda ke **remote repository** di GitHub.  
Setelah push, layanan yang terhubung (misalnya Cloudflare) dapat men-trigger proses build/deploy otomatis.

### Langkah‑Langkah Push di GitHub Desktop
1. **Buka GitHub Desktop** → Pastikan repositori `geotextile-barokah-abadi` terpilih.
2. **Lakukan perubahan** di kode (mis. edit markdown, gambar, atau script).
3. **Stage / Stage All** – centang file yang ingin Anda sertakan.
4. **Write a commit message** – beri keterangan singkat (mis. `feat: update product images`).
5. Klik **Commit to main**.
6. **Push origin** – tombol biru “Push origin” di kanan atas.  
   - Ini mengirim commit ke GitHub.
   - Jika Anda memiliki **integrasi Cloudflare** yang aktif, Cloudflare akan otomatis memulai proses `npm run build` → `wrangler deploy` di server mereka.

### Tips Praktis
- **Commit kecil & teratur** – Memudahkan rollback bila ada error.
- **Gunakan *branch* untuk fitur besar** – Buat branch baru (`git checkout -b feature/xyz`), push, lalu buat Pull Request.
- **Periksa *status* sebelum push** (`git status` di terminal) untuk memastikan tidak ada file yang belum di‑stage.
- **Jika ingin men‑deploy manual** (tanpa trigger otomatis), matikan integrasi Cloudflare di dashboard Cloudflare → *Settings → Git Integration* → **Disconnect**.  
  Setelah itu, gunakan `npm run deploy` atau GitHub Actions (jika Anda menyiapkan workflow).

---

## 📚 Ringkasan Cepat (Cheat‑Sheet)
| Perintah | Tujuan | Kapan Pakai |
|---|---|---|
| `npm run dev` | Jalankan server development Astro (hot‑reload). | Saat mengedit UI/UX, ingin lihat perubahan secara real‑time. |
| `npm run build` | Compile semua source menjadi static assets. | Sebelum deploy, setelah mengubah konfigurasi, atau saat ingin memeriksa error build. |
| `npm run preview` | Build + jalankan Miniflare (simulasi Cloudflare). | Sebelum push, setelah mengubah logika Workers, atau ingin menguji binding KV/D1. |
| `npm run deploy` | Build + upload ke Cloudflare Workers/Pages. | Setelah preview berhasil, atau saat menonaktifkan auto‑deploy. |
| **GitHub Desktop – Push** | Kirim commit ke remote GitHub. | Setiap selesai selesai perubahan; memicu auto‑deploy (jika terhubung). |

---

## 📌 Catatan Khusus Proyek Ini
- **Adapter Cloudflare** di `astro.config.mjs`:
  ```js
  import { defineConfig } from 'astro/config';
  import cloudflare from '@astrojs/cloudflare';
  export default defineConfig({
    site: 'https://geotextile.barokahabadi.web.id',
    adapter: cloudflare(),
    image: { service: passthroughImageService() }
  });
  ```
  Karena menggunakan `passthroughImageService()`, **komponen `<Image/>` Astro tidak berfungsi** di produksi.  
  Gunakan tag HTML `<img>` standar (seperti yang sudah kami ubah).

- **`wrangler.jsonc`** berisi konfigurasi Workers (accountId, name, kv bindings, dll.).  
  Pastikan file ini **tidak** di‑`gitignore` jika Anda meng‑deploy lewat `npm run deploy`.

- **Secrets di GitHub** (jika memakai GitHub Actions):
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_PROJECT_NAME` (opsional)

---

## 🎉 Selamat Menerapkan!
Dengan panduan ini Anda kini memiliki **peta lengkap** untuk:
- Memastikan kode bersih lewat `npm run build`.
- Menguji secara persis lingkungan Cloudflare lewat `npm run preview`.
- Meng‑deploy secara manual lewat `npm run deploy`.
- Mengontrol kapan perubahan dipublikasikan lewat **GitHub Desktop → Push**.

Jika ada bagian yang masih kurang jelas atau Anda ingin contoh konkret (mis. men‑setup secrets, atau men‑disable auto‑deploy), beri tahu saya, dan saya akan menyiapkan langkah‑langkah tambahan.
