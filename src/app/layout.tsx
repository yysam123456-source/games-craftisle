import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craftisle Games - 免费在线小游戏",
  description: "玩最好的免费HTML5小游戏！无需下载，浏览器直接玩。包括2048、贪吃蛇、数独、扫雷等经典游戏。",
  keywords: ["免费游戏", "在线游戏", "HTML5游戏", "浏览器游戏", "小游戏", "2048", "贪吃蛇", "数独"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-14 flex items-center">
            <a href="/" className="font-bold text-xl">
              🎮 Craftisle Games
            </a>
            <nav className="ml-auto flex gap-4">
              <a href="/" className="text-sm font-medium hover:text-primary">
                首页
              </a>
              <a href="/categories" className="text-sm font-medium hover:text-primary">
                分类
              </a>
              <a href="/about" className="text-sm font-medium hover:text-primary">
                关于
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:h-24 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Craftisle Games. 免费在线小游戏平台。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
