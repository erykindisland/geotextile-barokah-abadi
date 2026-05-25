// convert_hero_images.js
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const heroDir = path.resolve('public', 'hero');
const files = fs.readdirSync(heroDir).filter(f => f.endsWith('.png'));

(async () => {
  for (const file of files) {
    const inputPath = path.join(heroDir, file);
    const outputName = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(heroDir, outputName);
    try {
      await sharp(inputPath)
        .webp({ quality: 70 })
        .toFile(outputPath);
      console.log(`Converted ${file} → ${outputName}`);
    } catch (err) {
      console.error('Error converting', file, err);
    }
  }
})();
