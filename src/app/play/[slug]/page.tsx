import { notFound } from "next/navigation";
import { getGameBySlug, getAllGames } from "@/data/games";
import { GameIframe } from "@/components/games/GameIframe";
import { Metadata } from "next";

interface GamePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = getGameBySlug(params.slug);

  if (!game) {
    return {
      title: "游戏未找到",
    };
  }

  return {
    title: `${game.title} - 在线免费玩 | Craftisle Games`,
    description: game.description,
    keywords: [...game.tags, "免费游戏", "在线游戏", game.title],
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">首页</a>
        <span className="mx-2">/</span>
        <span>{game.title}</span>
      </nav>

      {/* Game Title */}
      <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
      <p className="text-muted-foreground mb-6">{game.description}</p>

      {/* Game Iframe */}
      <div className="mb-8">
        <GameIframe game={game} />
      </div>

      {/* Game Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Instructions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">游戏说明</h2>
          <div className="prose prose-sm max-w-none">
            <p>{game.instructions}</p>
          </div>
        </section>

        {/* Controls */}
        <section>
          <h2 className="text-xl font-semibold mb-4">操作方式</h2>
          <div className="space-y-2">
            {game.controls.keyboard && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">⌨️</span>
                <span>
                  键盘：{Array.isArray(game.controls.keyboard) 
                    ? game.controls.keyboard.join("、") 
                    : "支持"}
                </span>
              </div>
            )}
            {game.controls.mouse && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🖱️</span>
                <span>鼠标：支持</span>
              </div>
            )}
            {game.controls.touch && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>触控：支持</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Tags */}
      <section className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">标签</h2>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}
