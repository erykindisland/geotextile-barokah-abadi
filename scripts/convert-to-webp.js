
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directory = 'd:/Documents/GitHub/geotextile-barokah-abadi/src/assets/images';

const files = fs.readdirSync(directory);

for (const file of files) {
    if (file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(directory, file);
        const outputPath = path.join(directory, file.replace(/\.png$/i, '.webp'));
        
        console.log(`Converting ${file} to webp...`);
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
            
        console.log(`Deleting old file ${file}...`);
        fs.unlinkSync(inputPath);
    }
}
console.log('Conversion complete.');
