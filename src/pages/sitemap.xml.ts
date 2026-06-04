// src/pages/sitemap.xml.ts
import { getCollection } from 'astro:content';

export async function get() {
  // Fetch collections
  const produk = await getCollection('produk');
  let blog = [] as any[];
  try {
    blog = await getCollection('blog');
  } catch (e) {
    // blog collection may not exist
  }

  const baseUrl = 'https://geotextile.barokahabadi.web.id';
  const urls: { loc: string; priority?: number; changefreq?: string }[] = [];

  // Main static pages
  urls.push({ loc: '/', priority: 1.0, changefreq: 'daily' });
  urls.push({ loc: '/produk', priority: 0.8, changefreq: 'daily' });
  urls.push({ loc: '/tentang-kami', priority: 0.7, changefreq: 'monthly' });
  urls.push({ loc: '/kontak', priority: 0.7, changefreq: 'monthly' });

  // Product pages
  for (const item of produk) {
    urls.push({ loc: `/produk/${item.id}`, priority: 0.6, changefreq: 'weekly' });
  }

  // Blog posts
  for (const post of blog) {
    urls.push({ loc: `/blog/${post.id}`, priority: 0.5, changefreq: 'weekly' });
  }

  // Build XML
  const xmlLines = [] as string[];
  xmlLines.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlLines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const u of urls) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${baseUrl}${u.loc}</loc>`);
    if (u.lastmod) xmlLines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    if (u.changefreq) xmlLines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    if (u.priority !== undefined) xmlLines.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
    xmlLines.push('  </url>');
  }
  xmlLines.push('</urlset>');

  const xml = xmlLines.join('\n');
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
