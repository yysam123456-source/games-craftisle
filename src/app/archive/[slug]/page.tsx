import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ArchivePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} 历史题库 & 每日挑战 | Craftisle Games`,
    description: `浏览 ${game.title} 的历史题库和每日挑战。免费在线玩，无需下载。`,
    keywords: [`${game.title} 历史`, `${game.title} 每日`, `${game.title} archive`, "每日挑战"],
  };
}

// 生成模拟历史记录
function generateHistory(gameSlug: string) {
  const dates = [];
  for (let i = 30; i >= 1; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push({
      date: d.toISOString().split("T")[0],
      number: `#${Math.floor(Math.random() * 1000) + 1}`,
      difficulty: ["简单", "中等", "困难"][Math.floor(Math.random() * 3)],
      solved: Math.random() > 0.3,
    });
  }
  return dates;
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  const history = generateHistory(game.slug);

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
          <span>历史题库</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{game.title} 历史题库</h1>
        <p className="text-muted-foreground mb-8">
          浏览过去30天的每日挑战，免费在线玩。
        </p>

        {/* 今日挑战 CTA */}
        <section className="mb-8 text-center">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            开始今日挑战 →
          </a>
        </section>

        {/* 历史列表 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">历史题库</h2>
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-4 border flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground w-24">{item.date}</span>
                  <span className="font-semibold">{item.number}</span>
                  <span
                    className={
                      item.difficulty === "简单"
                        ? "text-green-600"
                        : item.difficulty === "中等"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {item.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.solved && (
                    <span className="text-green-600 text-xs">已通过 ✓</span>
                  )}
                  <a
                    href={`/play/${game.slug}`}
                    className="text-primary hover:underline text-xs"
                  >
                    挑战
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 说明 */}
        <section className="mt-8 bg-muted/50 rounded-lg p-6 text-sm text-muted-foreground">
          <p>📅 每日挑战于北京时间 0:00 更新。</p>
          <p>💡 历史题目永久免费，可反复挑战。</p>
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
