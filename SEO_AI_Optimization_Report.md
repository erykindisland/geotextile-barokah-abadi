# Laporan Optimasi Google AI Summary (AI Overviews)
## Geotextile Barokah Abadi

Dokumen ini merangkum langkah-langkah teknis yang telah diterapkan pada website untuk meningkatkan peluang direkomendasikan oleh Google AI Summary (SGE).

---

### 1. Optimasi Aksesibilitas Bot (Robots.txt)
Telah dipastikan bahwa bot AI tidak terblokir melalui file `public/robots.txt`.

**Konfigurasi Saat Ini:**
```txt
User-agent: *
Disallow: 

Sitemap: https://geotextile.barokahabadi.web.id/sitemap-index.xml
```

> [!IMPORTANT]
> Jika menggunakan Cloudflare, pastikan fitur **"Block AI Scrapers and Crawlers"** di Dashboard Cloudflare dalam kondisi **OFF** agar aturan di atas tidak ditimpa oleh sistem keamanan Cloudflare.

---

### 2. Structured Data (Schema.org)
Penambahan skrip JSON-LD pada `src/layouts/Layout.astro` untuk memberikan konteks mesin pada Google AI.

*   **LocalBusiness**: Menjelaskan identitas perusahaan, alamat (Tangerang), dan kontak.
*   **WebSite**: Memungkinkan Google mengenali struktur situs sebagai entitas web resmi.

---

### 3. FAQ Berbasis AI (FAQPage Schema)
Google AI Overviews sering mengambil referensi dari Tanya-Jawab yang terstruktur. FAQ telah ditambahkan pada halaman Beranda dengan cakupan pertanyaan:
1.  **Definisi Geotextile**: Menggunakan bahasa yang jelas dan informatif.
2.  **Informasi Harga**: Memberikan gambaran transparan sebagai distributor.
3.  **Standarisasi (SNI)**: Membangun otoritas dan kepercayaan (*Trust Factor*).
4.  **Logistik**: Menjelaskan jangkauan nasional.

---

### 4. Strategi Konten Masa Depan
Untuk mempertahankan peringkat di AI Summary, disarankan untuk:
*   **Menjawab secara Langsung (Direct Answers)**: Pada setiap deskripsi produk, gunakan struktur kalimat "Produk X adalah [definisi] yang berfungsi untuk [manfaat]."
*   **Gunakan Kata Kunci Long-tail**: AI sering mencari jawaban untuk pertanyaan spesifik seperti *"Berapa gramasi geotextile untuk jalan tanah lunak?"*
*   **Perbanyak Review/Testimoni**: Google AI mulai mempertimbangkan ulasan pengguna untuk merekomendasikan layanan terbaik.

---

**Status Terakhir:** Teroptimalisasi ✅
**Tanggal Update:** 28 Mei 2026
