import { games, getGameBySlug, getGamesByCategory } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return {};
  return {
    title: `类似 ${game.title} 的游戏推荐 | Craftisle Games`,
    description: `发现与 ${game.title} 类似的优秀免费网页游戏！精选推荐，免费在线玩。`,
    keywords: [`类似${game.title}`, `games like ${game.title}`, "同类游戏推荐", game.title],
  };
}

export default function AlternativesPage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) return notFound();

  // 同类游戏推荐（同分类，排除自己）
  const sameCategory = getGamesByCategory(game.category).filter((g) => g.slug !== game.slug);
  const otherGames = games.filter((g) => g.slug !== game.slug && g.isActive).slice(0, 8);

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">类似 {game.title} 的游戏</h1>
        <p className="text-muted-foreground mb-8">
          发现更多同类型免费网页游戏，无需下载，点击即玩。
        </p>

        {/* 同分类推荐 */}
        {sameCategory.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">同类型推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sameCategory.map((g) => (
                <a
                  key={g.slug}
                  href={`/play/${g.slug}`}
                  className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
                >
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="font-semibold text-sm">{g.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{g.category}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 更多推荐 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">更多免费游戏</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherGames.map((g) => (
              <a
                key={g.slug}
                href={`/play/${g.slug}`}
                className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
              >
                <div className="text-4xl mb-2">🎮</div>
                <div className="font-semibold text-sm">{g.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{g.category}</div>
              </a>
            ))}
          </div>
        </section>

        {/* 为什么选我们 */}
        <section className="bg-muted/50 rounded-lg p-6 text-sm text-muted-foreground">
          <h3 className="font-semibold text-foreground mb-2">为什么在 Craftisle Games 玩？</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>✅ 完全免费，无需注册</li>
            <li>✅ 点击即玩，无需下载</li>
            <li>✅ 支持手机、平板、电脑</li>
            <li>✅ 每日更新新内容</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            回去玩 {game.title} →
          </a>
        </section>
      </div>
    </main>
  );
}
