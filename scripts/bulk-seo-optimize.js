import fs from 'fs';
import path from 'path';

const contentDir = 'src/content/produk';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

const seoAddition = `
## Mengapa Memilih Geotextile Barokah Abadi?

Sebagai **distributor geotextile tangan pertama**, kami menjamin:
- **Harga Kompetitif 2026:** Penawaran harga geotextile per m2 terbaik untuk RAB proyek Anda.
- **Ready Stock Skala Besar:** Memenuhi kebutuhan proyek infrastruktur jalan, tol, dan bandara.
- **Standar SNI & Bina Marga:** Produk telah melalui uji tarik dan tusuk di laboratorium terakreditasi.
- **Pengiriman Seluruh Indonesia:** Pengalaman menyuplai proyek strategis di IKN, Trans Sumatra, dan remote area lainnya.

> [Dapatkan Katalog & Penawaran Harga Terbaru &rarr;](https://wa.me/628881211529?text=Halo%20Barokah%20Abadi,%20saya%20butuh%20info%20harga%20terbaru%20untuk%20proyek)
`;

for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('Mengapa Memilih Geotextile Barokah Abadi?')) {
        // Find the location of the WhatsApp link or end of file
        const waLinkIndex = content.lastIndexOf('> [Hubungi via WhatsApp]');
        if (waLinkIndex !== -1) {
            content = content.slice(0, waLinkIndex) + seoAddition + content.slice(waLinkIndex);
        } else {
            content += seoAddition;
        }
        fs.writeFileSync(filePath, content);
        console.log(`Optimized content in ${file}`);
    }
}
