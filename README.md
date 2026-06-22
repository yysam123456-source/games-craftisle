# Craftisle Games

<p align="center">
  <a href="https://game.craftisle.com">
    <img alt="Craftisle Games" src="public/logo.svg" width="120" />
  </a>
</p>

<h1 align="center">Craftisle Games — Free Online HTML5 Games</h1>

<p align="center">
  <a href="https://game.craftisle.com">Live Site</a> ·
  <a href="https://github.com/yysam123456-source/games-craftisle/issues">Issues</a> ·
  <a href="#games">Games</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue" />
  <img alt="Phaser" src="https://img.shields.io/badge/Phaser-3.60-green?logo=phaser" />
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-160-000000?logo=three.js" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" />
</p>

---

## 🌐 Live Site

👉 **[game.craftisle.com](https://game.craftisle.com)** — free online HTML5 games, no download required.

Part of the [Craftisle](https://www.craftisle.com) tool ecosystem.

---

## 🎮 Games

### Currently Available

| Game | Description | Tech |
|------|-------------|------|
| **Mykonos Island** | Relaxing island exploration game | Phaser 3 + TypeScript |
| **Flappy Bird** | Classic flappy game | HTML5 Canvas |
| **Snake** | Classic snake game | HTML5 Canvas |
| **Tetris** | Classic block puzzle | HTML5 Canvas |
| **Breakout** | Classic brick breaker | HTML5 Canvas |
| **2048** | Number puzzle game | React |
| **Minesweeper** | Classic mine clearing puzzle | React |
| **Sudoku** | Number placement puzzle | React |

### Coming Soon
- ✅ Puzzle games
- ✅ Arcade classics
- ✅ Idle / incremental games
- ✅ Multiplayer games (WebSocket)

---

## ✨ Features

- **100% Free** — no paywalls, no ads
- **No Download** — runs directly in browser
- **Mobile Friendly** — touch controls for all games
- **Save Progress** — localStorage-based save (no account needed)
- **Fast Loading** — optimized assets, CDN-delivered
- **SEO Optimized** — each game has its own landing page

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Next.js 14** | React framework (landing pages & SEO) |
| **Phaser 3** | 2D game framework |
| **Three.js** | 3D game rendering |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Vercel** | Deployment & Edge Functions |
| **GitHub Actions** | CI/CD for game builds |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yysam123456-source/games-craftisle.git
cd games-craftisle

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 📦 Deployment

Deployed on **Vercel** — push to `main` branch triggers auto-deploy.

👉 **[game.craftisle.com](https://game.craftisle.com)**

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yysam123456-source/games-craftisle)

---

## 🎯 SEO Strategy

Each game has its own optimized landing page:

```
game.craftisle.com/                    # Homepage (indexed)
game.craftisle.com/games/mykonos-island  # Game page (indexed)
game.craftisle.com/games/flappy-bird    # Game page (indexed)
game.craftisle.com/games/snake           # Game page (indexed)
...
```

- Unique meta title & description per game
- Open Graph tags for social sharing
- JSON-LD structured data for rich snippets
- Sitemap.xml auto-generated

---

## 📁 Project Structure

```
games-craftisle/
├── public/              # Static assets & game icons
├── src/
│   ├── app/           # Next.js App Router (landing pages)
│   │   ├── page.tsx           # Homepage
│   │   ├── games/[slug]/     # Dynamic game pages
│   │   └── api/              # API routes
│   ├── components/     # React components
│   ├── games/         # Game source code
│   │   ├── mykonos-island/
│   │   ├── flappy-bird/
│   │   ├── snake/
│   │   └── ...
│   ├── lib/           # Utility functions
│   └── types/        # TypeScript types
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## 🔗 Related Projects

| Project | URL | Description |
|---------|-----|-------------|
| **Craftisle Main** | [www.craftisle.com](https://www.craftisle.com) | Tool hub & homepage |
| **PDF Tools** | [pdf.craftisle.com](https://pdf.craftisle.com) | PDF merge, split, compress |
| **Resume Builder** | [resume.craftisle.com](https://resume.craftisle.com) | Free resume generator |
| **Whiteboard** | [draw.craftisle.com](https://draw.craftisle.com) | Online whiteboard |
| **File Viewer** | [viewer.craftisle.com](https://viewer.craftisle.com) | Online file viewer |
| **Image Prompt** | [imgprompt.craftisle.com](https://imgprompt.craftisle.com) | AI image prompt generator |

---

## 🤝 Contributing

Want to add a game? Contributions welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-game`)
3. Add your game to `src/games/`
4. Add a landing page in `src/app/games/[slug]/`
5. Commit your changes (`git commit -m 'Add new game'`)
6. Push to the branch (`git push origin feature/new-game`)
7. Open a Pull Request

### Game Submission Guidelines
- Must be original or open-source licensed
- Must run in browser (HTML5)
- Must be family-friendly (no violence, no gambling)

---

## 📄 License

[MIT License](LICENSE) — free to use, modify, and distribute.

---

## 🔗 Links

- 🌐 **Live Site**: [game.craftisle.com](https://game.craftisle.com)
- 💻 **GitHub**: [yysam123456-source/games-craftisle](https://github.com/yysam123456-source/games-craftisle)
- 🏠 **Main Site**: [www.craftisle.com](https://www.craftisle.com)
- 🐦 **Twitter**: [@CraftisleApp](https://twitter.com/CraftisleApp)

---

<p align="center">
  Built with ❤️ by the Craftisle team ·
  <a href="https://www.craftisle.com">Visit Craftisle</a>
</p>
