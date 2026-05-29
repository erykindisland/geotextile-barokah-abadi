import fs from 'fs';
import path from 'path';

const contentDir = 'src/content/produk';

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(contentDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "/images/products/" with "../../assets/products/"
    if (content.includes('/images/products/')) {
        const newContent = content.replace(/\/images\/products\//g, '../../assets/products/');
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated path in ${file}`);
    }
}
