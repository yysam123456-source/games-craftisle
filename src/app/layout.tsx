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
  title: "Craftisle Games - Free Online HTML5 Games",
  description: "Play the best free HTML5 games! No download required, play directly in your browser. Including 2048, Snake, Sudoku, Minesweeper and more classics.",
  keywords: ["free games", "online games", "HTML5 games", "browser games", "2048", "Snake", "Sudoku"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-14 flex items-center">
            <a href="/" className="font-bold text-xl">
              🎮 Craftisle Games
            </a>
            <nav className="ml-auto flex gap-4">
              <a href="/" className="text-sm font-medium hover:text-primary">
                Home
              </a>
              <a href="#categories" className="text-sm font-medium hover:text-primary">
                Categories
              </a>
              <a href="/about" className="text-sm font-medium hover:text-primary">
                About
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:py-0">
          <div className="container mx-auto px-4 flex flex-col items-center gap-4 md:h-24 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Craftisle Games. Free online HTML5 games platform.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
