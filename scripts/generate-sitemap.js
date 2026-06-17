const fs = require('fs');
const path = require('path');

// Game slugs (should match games.ts)
const gameSlugs = [
  '2048', 'snake', 'tetris', 'slope', 'flappy-wings',
  'sudoku', 'minesweeper', 'memory-match', 'color-sort', 'word-puzzle',
  'chess', 'sushi-drop', 'bolt-jam-3d',
  'basketball-master', 'whack-a-mole', 'reaction-test', 'phantom-blade', 'dino-run', 'neon-run',
  'brick-breaker', 'pong', 'stack', 'space-invaders', 'ball-catcher', 'bounce-bot',
  'ocean-gem-pop', 'sweet-match', 'idle-clicker',
  'typing-test', 'cat-coffee', 'color-splash', 'cloud-sheep', 'turkey-catch', 'deep-sea-chef'
];

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

// Game pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/play/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>weekly</changefreq>\n';
  sitemap += '    <priority>0.9</priority>\n';
  sitemap += '  </url>\n';
});

// Strategy pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/strategy/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.7</priority>\n';
  sitemap += '  </url>\n';
});

// Solver pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/solver/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.6</priority>\n';
  sitemap += '  </url>\n';
});

// Archive pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/archive/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.6</priority>\n';
  sitemap += '  </url>\n';
});

// Alternatives pages
gameSlugs.forEach(slug => {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/alternatives/${slug}/</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>0.6</priority>\n';
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
console.log(`✅ Generated sitemap.xml with ${gameSlugs.length * 6 + 1} URLs`);
