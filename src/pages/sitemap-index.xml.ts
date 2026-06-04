// src/pages/sitemap-index.xml.ts
// Generates a sitemap index for SEO, referencing other sitemap files.

export async function get() {
  const baseUrl = 'https://geotextile.barokahabadi.web.id';
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    // Add more sitemap files here if you split them (e.g., products, blog)
  ];

  const xmlLines: string[] = [];
  xmlLines.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlLines.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const loc of sitemapUrls) {
    xmlLines.push('  <sitemap>');
    xmlLines.push(`    <loc>${loc}</loc>`);
    xmlLines.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
    xmlLines.push('  </sitemap>');
  }
  xmlLines.push('</sitemapindex>');

  const xml = xmlLines.join('\n');
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
