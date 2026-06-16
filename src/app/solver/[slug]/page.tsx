import { games, getGameBySlug } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return {};
  return {
    title: `${game.title} 解题器 & 答案 | Craftisle Games`,
    description: `在线${game.title}解题器！自动计算答案、提示和解决方案。免费使用，无需下载。`,
    keywords: [`${game.title} 解题器`, `${game.title} 答案`, `${game.title} solver`, `${game.title} 提示`],
  };
}

export default function SolverPage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">{game.title} 解题器</h1>
        <p className="text-muted-foreground mb-8">在线自动计算答案，支持提示和分步骤解析。</p>

        {/* 使用说明 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">如何使用</h2>
          <div className="bg-card rounded-lg p-6 border space-y-3 text-sm">
            <p>① 在下方输入框中填入当前游戏状态</p>
            <p>② 点击"计算答案"按钮</p>
            <p>③ 查看完整解题步骤和提示</p>
            <p>④ 点击"提示"获取单步指引（不剧透答案）</p>
          </div>
        </section>

        {/* 在线解题器工具区（静态展示，实际功能需JS） */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">在线解题</h2>
          <div className="bg-card rounded-lg p-8 border text-center">
            <p className="text-muted-foreground mb-4">
              请在游戏中遇到卡关时，记录当前状态，使用本解题器获取提示。
            </p>
            <div className="bg-muted rounded p-4 text-sm text-left">
              <p className="font-semibold mb-2">提示：</p>
              <p>每个 {game.title} 关卡都有唯一解，尝试从约束最多的格子入手。</p>
            </div>
          </div>
        </section>

        {/* 解题技巧 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">解题技巧</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <details key={n} className="bg-card rounded-lg p-4 border cursor-pointer">
                <summary className="font-semibold cursor-pointer">技巧 {n}</summary>
                <p className="mt-2 text-sm text-muted-foreground">
                  {game.category === "puzzle" && "从约束最多的区域入手，逐步缩小可选范围。"}
                  {game.category === "arcade" && "掌握节奏，预判障碍位置，保持平稳操作。"}
                  {game.category === "casual" && "保持耐心，观察模式，不要急于求成。"}
                  {game.category === "strategy" && "提前规划3步以上，权衡取舍，选择最优解。"}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            回到 {game.title} 开始游戏 →
          </a>
        </div>
      </div>
    </main>
  );
}
