import Link from "next/link";
import type { Game } from "@/types/game";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/play/${game.slug}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail placeholder */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {game.category === "puzzle" && "🧩"}
            {game.category === "arcade" && "🕹️"}
            {game.category === "strategy" && "♟️"}
            {game.category === "casual" && "🎮"}
            {game.category === "action" && "⚡"}
            {game.category === "building" && "🏗️"}
          </div>
        </div>

        {/* Game info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating and play count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>{game.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🎮</span>
              <span>{game.playCount.toLocaleString()} plays</span>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>
    </Link>
  );
}
