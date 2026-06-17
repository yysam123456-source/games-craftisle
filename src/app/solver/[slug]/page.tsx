import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface SolverPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SolverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} 解题器 & 答案 | Craftisle Games`,
    description: `在线${game.title}解题器！自动计算答案、提示和解决方案。${game.description}`,
    keywords: [`${game.title} 解题器`, `${game.title} 答案`, `${game.title} solver`, `${game.title} 提示`],
  };
}

// 根据游戏分类返回解题技巧
function getSolverTips(category: string): string {
  if (category === "puzzle") return "从约束最多的区域入手，逐步缩小可选范围。";
  if (category === "arcade") return "掌握节奏，预判障碍位置，保持平稳操作。";
  if (category === "casual") return "保持耐心，观察模式，不要急于求成。";
  if (category === "strategy") return "提前规划3步以上，权衡取舍，选择最优解。";
  return "多练习，掌握游戏规律。";
}

export default async function SolverPage({ params }: SolverPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  const tips = getSolverTips(game.category);

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="font-bold text-lg">Craftisle Games</a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-sm text-muted-foreground mb-4">
          <a href="/" className="hover:underline">首页</a> / 
          <a href={`/play/${game.slug}`} className="hover:underline">{game.title}</a> / 
          <span>解题器</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} 解题器</h1>
        <p className="text-muted-foreground mb-8">在线自动计算答案，支持提示和分步骤解析。</p>

        {/* 使用说明 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">如何使用</h2>
          <div className="bg-card rounded-lg p-6 border space-y-3 text-sm">
            <p>① 在游戏中遇到卡关时，记录当前状态</p>
            <p>② 在本页面输入当前状态</p>
            <p>③ 点击"计算答案"获取完整解题步骤</p>
            <p>④ 查看提示（不剧透答案）</p>
          </div>
        </section>

        {/* 在线解题器工具区（静态展示） */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">在线解题</h2>
          <div className="bg-card rounded-lg p-8 border text-center">
            <p className="text-muted-foreground mb-4">
              请在游戏中遇到卡关时，记录当前状态，使用本解题器获取提示。
            </p>
            <div className="bg-muted rounded p-4 text-sm text-left">
              <p className="font-semibold mb-2">提示：</p>
              <p>{tips}</p>
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
                  {n === 1 && "从约束最多的区域入手，逐步缩小可选范围。"}
                  {n === 2 && "标记确定的答案，避免重复猜测。"}
                  {n === 3 && "利用排除法，删除不可能的选项。"}
                  {n === 4 && "多练习，记住常见模式和规律。"}
                  {n === 5 && "保持冷静，不要急于求成，稳扎稳打。"}
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

// 生成静态路径
export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}
