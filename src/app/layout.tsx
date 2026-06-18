import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/pwa/PWARegistration";
import { Navigation } from "@/components/layout/Navigation";
import { PageTransition } from "@/components/animations/page-transition";

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
        <Navigation />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <PWARegistration />
      </body>
    </html>
  );
}
