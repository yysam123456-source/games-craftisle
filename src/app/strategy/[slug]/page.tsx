import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface StrategyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: StrategyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} 攻略 & 技巧 | Craftisle Games`,
    description: `掌握 ${game.title}！完整攻略、技巧、秘籍和高分策略。${game.description}`,
    keywords: [`${game.title} 攻略`, `${game.title} 技巧`, `${game.title} 秘籍`, game.title, "游戏攻略"],
  };
}

export default async function StrategyPage({ params }: StrategyPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
          <div className="hidden md:flex gap-4 text-sm">
            <a href="/" className="hover:underline">所有游戏</a>
            <a href={`/play/${game.slug}`} className="hover:underline">开始游戏</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 面包屑 */}
        <div className="text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:underline">首页</a> / 
          <a href={`/play/${game.slug}`} className="hover:underline">{game.title}</a> / 
          <span>攻略</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} 完整攻略</h1>
        <p className="text-muted-foreground mb-8">掌握游戏技巧，挑战高分！</p>

        {/* 游戏简介 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">游戏简介</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="mb-4">{game.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-semibold">分类：</span>{game.category}</div>
              <div><span className="font-semibold">标签：</span>{game.tags.join("、")}</div>
            </div>
          </div>
        </section>

        {/* 操作方法 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">操作方法</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="mb-4">{game.instructions}</p>
            {game.controls.keyboard && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">键盘操作</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(game.controls.keyboard) ? (
                    (game.controls.keyboard as string[]).map((k: string) => (
                      <span key={k} className="bg-muted px-2 py-1 rounded text-sm">{k}</span>
                    ))
                  ) : (
                    <span className="bg-muted px-2 py-1 rounded text-sm">支持键盘操作</span>
                  )}
                </div>
              </div>
            )}
            {game.controls.mouse && (
              <p className="mt-2 text-sm text-muted-foreground">✅ 支持鼠标操作</p>
            )}
            {game.controls.touch && (
              <p className="mt-1 text-sm text-muted-foreground">✅ 支持触屏操作</p>
            )}
          </div>
        </section>

        {/* 技巧与策略 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">技巧与策略</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">基础技巧</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>熟悉基本操作，形成肌肉记忆</li>
                <li>保持专注，观察模式</li>
                <li>不要急于求成，稳扎稳打</li>
                <li>多练习，提升反应速度</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold mb-2">进阶策略</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>分析游戏规律，找到最优解</li>
                <li>学习高分玩家的操作录像</li>
                <li>掌握关键时机的决策</li>
                <li>保持冷静，避免失误</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">常见问题（FAQ）</h2>
          <div className="space-y-4">
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">这个游戏在哪里可以玩到？</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                您可以在本页面的顶部点击"开始游戏"按钮，直接在浏览器中免费游玩，无需下载。
              </p>
            </details>
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">这个游戏支持手机吗？</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                {game.controls.touch ? "✅ 支持！游戏已适配移动端触屏操作。" : "目前主要适配桌面端，建议使用键盘操作获得最佳体验。"}
              </p>
            </details>
            <details className="bg-card rounded-lg p-4 border cursor-pointer">
              <summary className="font-semibold cursor-pointer">游戏是否免费？</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                完全免费！您可以直接在浏览器中游玩所有游戏，无需注册或付费。
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            立即开始玩 {game.title} →
          </a>
        </section>

        {/* 相关游戏推荐 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">相关游戏推荐</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games
              .filter((g) => g.slug !== game.slug && g.isActive)
              .slice(0, 4)
              .map((g) => (
                <a
                  key={g.slug}
                  href={`/play/${g.slug}`}
                  className="bg-card rounded-lg p-4 border hover:border-primary transition text-center"
                >
                  <div className="text-4xl mb-2">🎮</div>
                  <div className="font-semibold text-sm">{g.title}</div>
                </a>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}
