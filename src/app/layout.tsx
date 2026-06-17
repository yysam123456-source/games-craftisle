import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Craftisle Games - Free Online HTML5 Games",
    template: "%s | Craftisle Games",
  },
  description: "Play the best free HTML5 games online! No download required, play directly in your browser. Including 2048, Snake, Tetris, Sudoku, Minesweeper and more classic games.",
  keywords: ["free games", "online games", "HTML5 games", "browser games", "2048", "Snake", "Tetris", "Sudoku", "Minesweeper", "puzzle games", "arcade games"],
  authors: [{ name: "Craftisle Games" }],
  creator: "Craftisle Games",
  publisher: "Craftisle Games",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://games.craftisle.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://games.craftisle.com",
    title: "Craftisle Games - Free Online HTML5 Games",
    description: "Play the best free HTML5 games online! No download required, play directly in your browser.",
    siteName: "Craftisle Games",
    images: [
      {
        url: "https://games.craftisle.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Craftisle Games - Free Online HTML5 Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Craftisle Games - Free Online HTML5 Games",
    description: "Play the best free HTML5 games online! No download required, play directly in your browser.",
    images: ["https://games.craftisle.com/og-image.svg"],
    creator: "@craftislegames",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
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
