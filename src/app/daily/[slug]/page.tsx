import { games } from "@/data/games";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface DailyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DailyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return {};
  return {
    title: `${game.title} 每日挑战 | Craftisle Games`,
    description: `${game.title} 每日挑战模式！每天更新新关卡/题目，挑战你的极限。${game.description}`,
    keywords: [`${game.title} 每日挑战`, `${game.title} daily`, `${game.title} 每日一题`, game.title, "每日游戏"],
  };
}

export default async function DailyPage({ params }: DailyPageProps) {
  const { slug } = await params;
  const game = games.find(g => g.slug === slug);
  if (!game) return notFound();

  // 根据日期生成每日挑战种子（确定性，同一天同一结果）
  const today = new Date();
  const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const dayNumber = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000) + 1;

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
          <span>每日挑战</span>
        </div>

        {/* 每日挑战头部 */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h1 className="text-3xl font-bold">{game.title} 每日挑战</h1>
              <p className="text-muted-foreground">Day #{dayNumber} · {today.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <p className="text-lg mb-6">
            每天一个全新挑战！{getDailyDescription(game.category)}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/play/${game.slug}`}
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              开始今日挑战 →
            </a>
            <a
              href={`/daily/${game.slug}`}
              className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition"
            >
              分享今日挑战
            </a>
          </div>
        </div>

        {/* 今日挑战详情 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">今日挑战规则</h2>
          <div className="bg-card rounded-lg p-6 border space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-semibold">挑战目标</h3>
                <p className="text-sm text-muted-foreground mt-1">{getDailyGoal(game.category, game.title)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <h3 className="font-semibold">限时要求</h3>
                <p className="text-sm text-muted-foreground mt-1">{getTimeLimit(game.category)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <h3 className="font-semibold">评分标准</h3>
                <p className="text-sm text-muted-foreground mt-1">{getScoringCriteria(game.category)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold">今日提示</h3>
                <p className="text-sm text-muted-foreground mt-1">{getDailyTip(game.category, game.title, dayNumber)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 历史挑战记录 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">历史挑战</h2>
          <div className="bg-card rounded-lg p-6 border">
            <p className="text-muted-foreground mb-4">查看过去的每日挑战记录：</p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }, (_, i) => {
                const d = new Date(today);
                d.setDate(d.getDate() - 13 + i);
                const isToday = i === 13;
                const isFuture = d > today;
                return (
                  <a
                    key={i}
                    href={isFuture ? "#" : `/daily/${game.slug}`}
                    className={`text-center p-2 rounded-lg text-sm transition ${
                      isToday
                        ? "bg-primary text-primary-foreground font-bold"
                        : isFuture
                        ? "bg-muted/30 text-muted-foreground/50 cursor-not-allowed"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <div className="text-xs opacity-70">{d.toLocaleDateString("zh-CN", { weekday: "short" })}</div>
                    <div className="font-medium">{d.getDate()}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 排行榜预览 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">今日排行榜</h2>
          <div className="bg-card rounded-lg p-6 border">
            <div className="space-y-3">
              {[
                { rank: 1, name: "🥇 PlayerOne", score: getMockScore(game.category), time: "02:34" },
                { rank: 2, name: "🥈 GameMaster", score: getMockScore(game.category) - 50, time: "03:12" },
                { rank: 3, name: "🥉 SpeedRunner", score: getMockScore(game.category) - 120, time: "03:45" },
                { rank: 4, name: "ProGamer_2026", score: getMockScore(game.category) - 200, time: "04:01" },
                { rank: 5, name: "CasualPlayer", score: getMockScore(game.category) - 350, time: "05:20" },
              ].map((entry) => (
                <div key={entry.rank} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <span className="w-8 h-8 flex items-center justify-center bg-background rounded-full font-bold text-sm">
                    {entry.rank}
                  </span>
                  <span className="flex-1 font-medium">{entry.name}</span>
                  <span className="font-mono font-bold text-primary">{entry.score.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">{entry.time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              完成今日挑战后你的成绩将出现在这里！
            </p>
          </div>
        </section>

        {/* 挑战统计 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">你的挑战数据</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "参与天数", value: "0", icon: "📅" },
              { label: "最高分", value: "-", icon: "🔥" },
              { label: "平均分", value: "-", icon: "📊" },
              { label: "最佳排名", value: "-", icon: "🏅" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-lg p-4 border text-center">
                <span className="text-2xl">{stat.icon}</span>
                <div className="text-2xl font-bold mt-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <a
            href={`/play/${game.slug}`}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            立即开始今日 {game.title} 挑战 →
          </a>
        </section>

        {/* 相关链接 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">更多内容</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a href={`/play/${game.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🎮</span>
              <div className="text-sm font-medium mt-2">免费游玩</div>
            </a>
            <a href={`/strategy/${game.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">📖</span>
              <div className="text-sm font-medium mt-2">攻略技巧</div>
            </a>
            <a href={`/solver/${game.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🧮</span>
              <div className="text-sm font-medium mt-2">解题器</div>
            </a>
            <a href={`/archive/${game.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">📚</span>
              <div className="text-sm font-medium mt-2">历史题库</div>
            </a>
            <a href={`/alternatives/${game.slug}`} className="bg-card rounded-lg p-4 border hover:border-primary transition text-center">
              <span className="text-2xl">🔗</span>
              <div className="text-sm font-medium mt-2">同类推荐</div>
            </a>
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

// ===== 辅助函数 =====

function getDailyDescription(category: string): string {
  const descriptions: Record<string, string> = {
    puzzle: "每天一道全新的谜题或数独，考验你的逻辑思维能力！",
    arcade: "今天的关卡难度已升级，你能突破自己的最高纪录吗？",
    casual: "轻松有趣的每日任务，完成即可获得成就徽章！",
    strategy: "战略性每日挑战，需要你深思熟虑每一步决策！",
    action: "快节奏的每日挑战模式，测试你的反应和操作极限！",
  };
  return descriptions[category] || "今天有什么新的挑战在等着你？立即开始游戏来发现！";
}

function getDailyGoal(category: string, title: string): string {
  if (title.includes("2048")) return "合成目标：在有限步数内合成出指定数字方块。";
  if (title.includes("Wordle") || title.includes("wordle")) return "猜测目标：用最少的次数猜出今日的神秘单词。";
  if (title.includes("Tetris") || title.includes("俄罗斯")) return "消除目标：清除指定行数，同时保持存活。";
  if (title.includes("Snake") || title.includes("贪吃蛇")) return "长度目标：让蛇达到指定长度而不撞墙。";
  if (title.includes("Sudoku") || title.includes("数独")) return "解题目标：完成今日的专家级数独谜题。";
  if (title.includes("Minesweeper") || title.includes("扫雷")) return "排雷目标：在规定时间内标记所有地雷位置。";
  if (title.includes("Flappy") || title.includes("飞翔")) return "通关目标：穿越更多水管，打破昨天的记录。";
  if (title.includes("Chess") || title.includes("国际象棋")) return "战术目标：找到今日残局的最佳解法。";

  const goals: Record<string, string> = {
    puzzle: "在限定条件下解决今日谜题。",
    arcade: "突破昨日分数，创造新纪录！",
    casual: "完成今日的所有趣味小任务。",
    strategy: "以最优策略达成今日目标。",
    action: "在最短时间内完成挑战。",
  };
  return goals[category] || "完成今日设定的挑战目标。";
}

function getTimeLimit(category: string): string {
  const limits: Record<string, string> = {
    puzzle: "无时间限制，但步数越少评分越高。",
    arcade: "无时间限制，追求最高分数。",
    casual: "休闲模式，按自己节奏进行。",
    strategy: "建议在 10 分钟内完成思考。",
    action: "计时模式，越快越好！",
  };
  return limits[category] || "没有严格的时间限制，尽力而为即可。";
}

function getScoringCriteria(category: string): string {
  const criteria: Record<string, string> = {
    puzzle: "⭐ 步数少 = ⭐⭐ 时间短 = ⭐⭐⭐ 零提示",
    arcade: "基于最终得分和连击加成计算。",
    casual: "完成任务数量和质量综合评分。",
    strategy: "根据策略效率和结果质量评定。",
    action: "用时最短者获胜，精确到毫秒。",
  };
  return criteria[category] || "综合表现、速度、准确度多个维度评分。";
}

function getDailyTip(category: string, title: string, dayNumber: number): string {
  const tips: Record<string, string[]> = {
    puzzle: [
      "先从约束最多的地方入手分析。",
      "使用排除法逐步缩小可能性范围。",
      "如果卡住了，换个角度重新审视已知条件。",
    ],
    arcade: [
      "保持节奏感，不要因为急躁而失误。",
      "观察模式规律，预判下一步的变化。",
      "热身几局再正式开始挑战。",
    ],
    casual: [
      "放松心态，享受游戏过程。",
      "尝试不同的方法可能会有意外收获。",
      "和朋友一起挑战会更有趣！",
    ],
    strategy: [
      "先规划整体策略，再执行具体步骤。",
      "权衡短期收益与长期利益。",
      "回顾之前的决策，找出可以改进的地方。",
    ],
    action: [
      "保持专注，避免干扰。",
      "找到适合自己的操作节奏。",
      "记住关键节点的应对方法。",
    ],
  };

  const categoryTips = tips[category] || tips.casual!;
  // 使用 dayNumber 确定性选择提示
  return categoryTips[dayNumber % categoryTips.length];
}

function getMockScore(category: string): number {
  const scores: Record<string, number> = {
    puzzle: 9800,
    arcade: 12500,
    casual: 7500,
    strategy: 10200,
    action: 15800,
  };
  return scores[category] || 10000;
}
