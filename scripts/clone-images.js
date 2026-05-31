import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..');

const configs = [
  {
    contentDir: path.join(baseDir, 'src/content/produk'),
    assetsDir: path.join(baseDir, 'src/assets/products'),
    prefix: '../../assets/products/'
  },
  {
    contentDir: path.join(baseDir, 'src/content/blog'),
    assetsDir: path.join(baseDir, 'src/assets/blog'),
    prefix: '../../assets/blog/'
  }
];

async function downloadToBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function processImages() {
  console.log('🚀 Starting SEO & AI Image Optimization...');
  
  for (const config of configs) {
    if (!fs.existsSync(config.assetsDir)) {
      fs.mkdirSync(config.assetsDir, { recursive: true });
    }

    if (!fs.existsSync(config.contentDir)) continue;

    const files = fs.readdirSync(config.contentDir).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filePath = path.join(config.contentDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find remote images in quotes
        const match = content.match(/image:\s*"([^"]+)"/);
        const isRemote = content.includes('image_status: "remote"');

        if (match) {
            const originalUrl = match[1];
            
            if (!originalUrl.startsWith('http') && !isRemote) {
                continue;
            }

            // Handle potential mixed paths from previous botched attempts if any
            let targetUrl = originalUrl;
            if (!targetUrl.startsWith('http') && isRemote) {
                // If it's a relative path but marked remote, we might have lost the source URL.
                // But in this session, we still have the source URLs in memory or in earlier versions.
                // However, our current files mostly have 'https://' URLs.
                console.log(`⚠️ Skipping non-http URL with remote tag in ${file}: ${targetUrl}`);
                continue;
            }

            const slug = file.replace('.md', '');
            const outputFileName = `${slug}.webp`;
            const outputPath = path.join(config.assetsDir, outputFileName);
            
            process.stdout.write(`📥 Processing ${file}... `);

            try {
                const buffer = await downloadToBuffer(targetUrl);
                
                // SHARP OPTIMIZATION & UNIQUENESS
                // 1. Convert to webp
                // 2. Modulate slightly (99.8%) to be mathematically unique but visually identical
                // 3. Apply high quality compression
                
                await sharp(buffer)
                    .modulate({ brightness: 0.998 }) 
                    .webp({ quality: 82, effort: 6, lossless: false })
                    .toFile(outputPath);

                // Update Markdown
                let newContent = content.replace(match[0], `image: "${config.prefix}${outputFileName}"`);
                // Remove image_status: "remote" and ensure no double line breaks
                newContent = newContent.replace(/image_status:\s*"remote"\s*\r?\n?/g, '');
                
                fs.writeFileSync(filePath, newContent);
                console.log(`✅ [OK] -> ${outputFileName}`);
            } catch (err) {
                console.log(`❌ [ERROR]: ${err.message}`);
            }
        }
    }
  }
  console.log('✨ All images localized and optimized for AI Search!');
}

processImages();
