import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = 'public/images/products';
const contentDir = 'src/content/produk';

const files = fs.readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function optimize() {
    console.log("Starting image optimization for Geotextile Barokah Abadi...");

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const fileNameBase = path.parse(file).name;
        const outputPath = path.join(inputDir, `${fileNameBase}.webp`);

        console.log(`Processing: ${file}`);

        try {
            // 1. Get original dimensions
            const metadata = await sharp(inputPath).metadata();
            
            // 2. Process: Resize by 1px (to change hash), strip old meta, add new meta
            // We also add a very subtle text overlay/watermark logic here if needed
            // For now, we focus on technical uniqueness and metadata
            
            await sharp(inputPath)
                .resize(metadata.width + 1, metadata.height + 1, { fit: 'fill' }) // Subtle resize
                .webp({ quality: 85 })
                .withMetadata({
                    exif: {
                        IFD0: {
                            Copyright: 'Geotextile Barokah Abadi',
                            Artist: 'Geotextile Barokah Abadi',
                            ImageDescription: 'Material Geosintetik Berkualitas - Barokah Abadi'
                        }
                    }
                })
                .toFile(outputPath);

            // 3. Delete old file if it was not webp
            if (path.extname(inputPath) !== '.webp') {
                fs.unlinkSync(inputPath);
            }

            // 4. Update Markdown files to point to the new .webp
            const mdFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
            for (const mdFile of mdFiles) {
                const mdPath = path.join(contentDir, mdFile);
                let content = fs.readFileSync(mdPath, 'utf8');
                const oldImageName = file;
                const newImageName = `${fileNameBase}.webp`;
                
                if (content.includes(oldImageName)) {
                    const newContent = content.replace(new RegExp(oldImageName, 'g'), newImageName);
                    fs.writeFileSync(mdPath, newContent);
                    console.log(`Updated link in ${mdFile}`);
                }
            }

        } catch (err) {
            console.error(`Error processing ${file}: ${err.message}`);
        }
    }
    console.log("Optimization complete. All images are now unique and branded for Geotextile Barokah Abadi.");
}

optimize();
