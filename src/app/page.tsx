import { getAllGames, getGamesByCategory } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

const categoryNames: Record<string, string> = {
  puzzle: "🧩 益智解谜",
  arcade: "🕹️ 街机经典",
  strategy: "♟️ 策略棋牌",
  casual: "🎮 休闲娱乐",
  action: "⚡ 动作反应",
  building: "🏗️ 建造创意",
};

const categoryDescriptions: Record<string, string> = {
  puzzle: "挑战逻辑与思维，数独、扫雷、单词猜谜等你来挑战！",
  arcade: "永恒的经典街机游戏，贪吃蛇、俄罗斯方块，停不下来！",
  strategy: "运筹帷幄，考验策略，国际象棋等你来挑战！",
  casual: "轻松愉快，随时随地，完美的碎片时间伴侣！",
  action: "考验反应速度，挑战你的极限！",
  building: "发挥创意，建造属于你的世界！",
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
            免费在线小游戏
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            无需下载，浏览器直接玩！精选最佳HTML5小游戏，
            <span className="text-primary font-semibold">点击即玩</span>
            ，支持手机、平板、电脑。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#all-games"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              🎮 开始玩游戏
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 bg-card text-card-foreground px-6 py-3 rounded-lg font-semibold border hover:bg-muted/50 transition"
            >
              📂 浏览分类
            </a>
          </div>

          {/* 实时数据展示 */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{games.length}+</div>
              <div>免费游戏</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div>无需下载</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">📱</div>
              <div>多端适配</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">⚡</div>
              <div>即开即玩</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 分类浏览 ===== */}
      <section id="categories" className="py-16 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            游戏分类
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            选择你喜欢的游戏类型，开始挑战吧！
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
                  <div className="text-xs text-muted-foreground">{count} 款游戏</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 按分类展示游戏 ===== */}
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

      {/* ===== 所有游戏（完整列表） ===== */}
      <section id="all-games" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            所有游戏
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            精选 {games.length} 款免费HTML5小游戏，点击即玩！
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 为什么选择我们 ===== */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            为什么选择 Craftisle Games？
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            我们致力于提供最佳的游戏体验，无需任何门槛，打开即玩。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                🎮
              </div>
              <h3 className="text-xl font-bold mb-2">完全免费</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                所有游戏 <span className="text-foreground font-medium">完全免费</span>，
                无需注册账号，无需下载安装包，打开浏览器即可开始游戏。
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-xl font-bold mb-2">多端适配</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                完美适配 <span className="text-foreground font-medium">手机、平板、电脑</span>，
                无论在哪里，都能畅快游玩。
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2">即开即玩</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                无需等待加载，<span className="text-foreground font-medium">点击即玩</span>，
                利用碎片时间，随时随地享受游戏乐趣。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 游戏指南入口 ===== */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            游戏指南 & 攻略
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            查看游戏攻略、解题器、历史题库和同类推荐，全面提升游戏体验。
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
                  {game.title} 攻略
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/play/2048"
              className="text-sm text-primary hover:underline"
            >
              查看所有游戏攻略 →
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
                精选免费HTML5小游戏，无需下载，点击即玩。支持手机、平板、电脑多端适配。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">游戏分类</h4>
              <div className="space-y-1 text-sm">
                {categories.map((cat) => (
                  <a key={cat} href={`#cat-${cat}`} className="block text-muted-foreground hover:text-primary transition-colors">
                    {categoryNames[cat]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">友情链接</h4>
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
            © 2026 Craftisle Games. 免费在线小游戏平台。
          </div>
        </div>
      </footer>
    </div>
  );
}
