
import fs from 'fs';
import path from 'path';

const contentDir = 'd:/Documents/GitHub/geotextile-barokah-abadi/src/content/produk';
const imageBase = '../../assets/images/';

const mapping = {
    'pabrik-kawat-bronjong-primagabion-penahan-longsor-medan.md': 'bronjong.webp',
    'supplier-drainage-cell-taman-roof-garden-makassar.md': 'drainagecell.webp',
    'pabrik-geobag-non-woven-penahan-abrasi-jakarta.md': 'geobag.webp',
    'jual-geocell-hdpe-stabilisasi-tanah-lunak-balikpapan.md': 'geocell.webp',
    'jual-geogrid-biaxial-40kn-semarang.md': 'geogrid.webp',
    'distributor-geomembrane-hdpe-0-5-mm-surabaya.md': 'geomembrane.webp',
    'distributor-pipa-corrugated-geopipe-drainase-bandung.md': 'geopipe.webp',
    'harga-geotextile-non-woven-250-gram-standar-sni.md': 'hero-bg.webp', // fallback
    'harga-geotextile-woven-sni.md': 'hero-bg.webp', // fallback
    'jual-geotextile-non-woven-polypropylene-pp-terbaik.md': 'hero-bg.webp', // fallback
    'jual-plastik-cor-lantai-kerja-beton.md': 'hero-bg.webp' // fallback
};

for (const [file, img] of Object.entries(mapping)) {
    const filePath = path.join(contentDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/image: ".*"/, `image: "${imageBase}${img}"`);
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file} with ${img}`);
    }
}
