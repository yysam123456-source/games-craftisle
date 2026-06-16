import { getAllGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

export default function HomePage() {
  const games = getAllGames();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          免费在线小游戏
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          无需下载，浏览器直接玩！精选最佳HTML5小游戏，包括2048、贪吃蛇、数独等经典游戏。
        </p>
      </section>

      {/* Games Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">所有游戏</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 py-12 border-t">
        <h2 className="text-2xl font-semibold mb-8 text-center">为什么选择我们？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="font-semibold mb-2">免费游玩</h3>
            <p className="text-muted-foreground">
              所有游戏完全免费，无需注册，无需下载。
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-semibold mb-2">多端适配</h3>
            <p className="text-muted-foreground">
              支持手机、平板、电脑，随时随地游玩。
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">即开即玩</h3>
            <p className="text-muted-foreground">
              点击即可开始游戏，无需等待加载。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
