const fs = require('fs');
const path = require('path');

// Read games from data file
const gamesPath = path.join(__dirname, '../src/data/games.ts');
const gamesContent = fs.readFileSync(gamesPath, 'utf-8');

// Extract slugs from games.ts (simple regex extraction)
const slugMatches = gamesContent.match(/slug:\s*"([^"]+)"/g);
const gameSlugs = slugMatches ? slugMatches.map(match => match.match(/"([^"]+)"/)[1]) : [];

const baseUrl = 'https://games.craftisle.com';
const today = new Date().toISOString().split('T')[0];

// Generate sitemap XML
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static pages
sitemap += '  <url>\n';
sitemap += `    <loc>${baseUrl}/</loc>\n`;
sitemap += `    <lastmod>${today}</lastmod>\n`;
sitemap += '    <changefreq>daily</changefreq>\n';
sitemap += '    <priority>1.0</priority>\n';
sitemap += '  </url>\n';

// Game pages (play)
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/play/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += '    <priority>0.9</priority>\n';
  sitemap += '  </url>\n';
});

// Daily pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/daily/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
});

sitemap += '</urlset>';

// Write to public/sitemap.xml
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Generated sitemap.xml with ${gameSlugs.length * 2 + 1} URLs (${gameSlugs.length} games)`);
