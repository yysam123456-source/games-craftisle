import { getAllGames, getGamesByCategory } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

const categoryNames: Record<string, string> = {
  puzzle: "🧩 Puzzle",
  arcade: "🕹️ Arcade",
  strategy: "♟️ Strategy",
  casual: "🎮 Casual",
  action: "⚡ Action",
  building: "🏗️ Building",
};

const categoryDescriptions: Record<string, string> = {
  puzzle: "Challenge your logic and mind with Sudoku, Minesweeper, word puzzles and more!",
  arcade: "Timeless classic arcade games. Snake, Tetris, Brick Breaker — can't stop playing!",
  strategy: "Plan your moves, test your strategy. Chess and more await your challenge!",
  casual: "Relaxing and fun, perfect for killing time anytime, anywhere!",
  action: "Test your reaction speed, challenge your limits!",
  building: "Unleash your creativity, build your own world!",
};

export default function HomePage() {
  const games = getAllGames().filter((g) => g.isActive);
  const categories = [...new Set(games.map((g) => g.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-5xl md:text-7xl mb-4">🎮</div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Free Online HTML5 Games
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            No download needed, play directly in your browser!
            <span className="text-primary font-semibold">Click and play</span>
            , supports mobile, tablet, and desktop.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#all-games"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              🎮 Start Playing
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 bg-card text-card-foreground px-6 py-3 rounded-lg font-semibold border hover:bg-muted/50 transition"
            >
              📂 Browse Categories
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{games.length}+</div>
              <div>Free Games</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div>No Download</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">📱</div>
              <div>Multi-Device</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">⚡</div>
              <div>Instant Play</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section id="categories" className="py-16 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Game Categories
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Choose your favorite game type and start challenging!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const count = games.filter((g) => g.category === cat).length;
              return (
                <a
                  key={cat}
                  href={`#cat-${cat}`}
                  className="bg-card rounded-xl p-6 border hover:border-primary hover:shadow-md transition text-center group"
                >
                  <div className="text-3xl mb-2">{categoryNames[cat]?.charAt(0) || "🎮"}</div>
                  <div className="font-semibold text-sm mb-1">{categoryNames[cat]?.slice(2).trim() || cat}</div>
                  <div className="text-xs text-muted-foreground">{count} games</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Games by Category ===== */}
      {categories.map((cat) => {
        const catGames = games.filter((g) => g.category === cat);
        return (
          <section id={`cat-${cat}`} key={cat} className="py-16 border-b last:border-0">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{categoryNames[cat]}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {categoryDescriptions[cat]}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {catGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== All Games ===== */}
      <section id="all-games" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            All Games
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Curated {games.length} free HTML5 games, click to play!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Why Choose Craftisle Games?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We are committed to providing the best gaming experience. No barriers, just play.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                🎮
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All games are <span className="text-foreground font-medium">completely free</span>,
                no registration required, no download needed. Open your browser and start playing.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Device</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Perfectly adapted for <span className="text-foreground font-medium">mobile, tablet, and desktop</span>,
                play anywhere, anytime.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Play</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No loading waits, <span className="text-foreground font-medium">click and play</span>,
                perfect for killing time whenever you have a few minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Game Guides ===== */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Game Guides & Tips
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Check out game strategies, solvers, archives, and alternatives to enhance your gaming experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {games.slice(0, 4).map((game) => (
              <a
                key={game.slug}
                href={`/strategy/${game.slug}`}
                className="bg-card rounded-xl p-6 border hover:border-primary hover:shadow-md transition text-center group"
              >
                <div className="text-3xl mb-2">📖</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {game.title} Strategy
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/play/2048"
              className="text-sm text-primary hover:underline"
            >
              View all game guides →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Craftisle Games</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curated free HTML5 games. No download, click to play. Supports mobile, tablet, and desktop.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-1 text-sm">
                {categories.map((cat) => (
                  <a key={cat} href={`#cat-${cat}`} className="block text-muted-foreground hover:text-primary transition-colors">
                    {categoryNames[cat]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Related Sites</h4>
              <div className="space-y-1 text-sm">
                <a href="https://crazygames.com" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  CrazyGames
                </a>
                <a href="https://poki.com" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Poki Games
                </a>
                <a href="https://neal.fun" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Neal.fun
                </a>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            © 2026 Craftisle Games. Free online HTML5 games platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
