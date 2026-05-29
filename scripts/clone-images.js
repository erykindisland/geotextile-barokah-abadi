import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = 'src/content/produk';
const outputDir = 'public/images/products';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function process() {
    for (const file of files) {
        const filePath = path.join(contentDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(/image:\s*"(https?:\/\/[^"]+)"/);
        
        if (match) {
            const externalUrl = match[1];
            const fileName = path.basename(externalUrl).replace(/%20/g, '-').toLowerCase();
            const localPath = path.join(outputDir, fileName);
            const relativePath = `/images/products/${fileName}`;

            console.log(`Downloading: ${externalUrl} -> ${localPath}`);
            try {
                await downloadImage(externalUrl, localPath);
                // Update markdown
                const newContent = content.replace(match[0], `image: "${relativePath}"`);
                fs.writeFileSync(filePath, newContent);
                console.log(`Updated ${file}`);
            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);
            }
        }
    }
}

process();
