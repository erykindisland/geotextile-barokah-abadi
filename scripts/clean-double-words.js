import fs from 'fs';
import path from 'path';

const searchDirs = ['src/pages', 'src/layouts', 'src/content/produk', 'SEO_AI_Optimization_Report.md'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const allFiles = searchDirs.flatMap(d => {
    if (fs.existsSync(d)) {
        return fs.statSync(d).isDirectory() ? walk(d) : [d];
    }
    return [];
});

const filesToProcess = allFiles.filter(f => /\.(astro|md|ts|js|mjs)$/i.test(f));

for (const file of filesToProcess) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Regex to find "Geotextile Geotextile" (case insensitive or specific)
    const regex = /Geotextile\s+Geotextile/g;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, 'Geotextile');
        fs.writeFileSync(file, newContent);
        console.log(`Cleaned double word in: ${file}`);
    }
}
