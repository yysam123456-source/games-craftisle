import type { Metadata } from "next";
import {
  Disc, Cpu, ShieldCheck, Gamepad2, Code2, MonitorSmartphone,
  Save, Globe, Lock, Zap, ChevronRight, ExternalLink,
} from "lucide-react";
import { FaqAccordion } from "@/components/rom-loader/FaqAccordion";

export const metadata: Metadata = {
  title: "ROM Loader — Play Your Own Retro Games in the Browser",
  description:
    "A browser-based retro game emulator powered by the open-source EmulatorJS engine. Bring your own legally-owned ROMs for NES, SNES, Game Boy, GBA, Sega Genesis, Master System, Game Gear, Atari 2600, PlayStation and Nintendo 64 — 100% client-side, no installs, no uploads.",
  keywords: [
    "ROM loader", "retro emulator", "EmulatorJS", "NES", "SNES", "Game Boy",
    "Genesis", "PlayStation", "N64", "browser emulator",
  ],
  alternates: { canonical: "/rom-loader" },
  openGraph: {
    title: "ROM Loader — Play Your Own Retro Games in the Browser",
    description:
      "Bring your own ROMs and play 11 classic systems right in your browser. Open-source, client-side, privacy-first.",
    url: "https://game.craftisle.com/rom-loader/",
    type: "website",
  },
};

const LOADER_URL = "/games/retro-player/index.html";

const features = [
  {
    icon: MonitorSmartphone,
    title: "Runs in your browser",
    desc: "No downloads, no plugins, no launchers. The whole emulator is a web page powered by WebAssembly.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    desc: "Your ROM is read straight from your device into the emulator. It never touches a server — we never even see the filename.",
  },
  {
    icon: Gamepad2,
    title: "11 classic systems",
    desc: "From the NES and Game Boy to the Sega Genesis, PlayStation and Nintendo 64.",
  },
  {
    icon: Save,
    title: "Save states & more",
    desc: "In-emulator save/load states, fullscreen, reset and quick menu — just like a real console.",
  },
  {
    icon: Code2,
    title: "Open source",
    desc: "Built on the EmulatorJS engine and self-hosted on Craftisle. No black boxes, no tracking.",
  },
  {
    icon: Cpu,
    title: "Cross-device",
    desc: "Play on desktop, laptop or tablet with keyboard, mouse or a gamepad. Touch-friendly where supported.",
  },
];

const systems = [
  { name: "NES", desc: "Nintendo Entertainment System", cores: "nestopia · fceumm" },
  { name: "SNES", desc: "Super Nintendo", cores: "snes9x" },
  { name: "Game Boy", desc: "GB & Game Boy Color", cores: "gambatte" },
  { name: "GBA", desc: "Game Boy Advance", cores: "mgba" },
  { name: "Genesis", desc: "Sega Mega Drive / Genesis", cores: "genesis_plus_gx · picodrive" },
  { name: "Master System", desc: "Sega Master System", cores: "genesis_plus_gx" },
  { name: "Game Gear", desc: "Sega Game Gear", cores: "genesis_plus_gx · picodrive" },
  { name: "Atari 2600", desc: "Atari VCS / 2600", cores: "stella2014" },
  { name: "PlayStation", desc: "PSX / PS1", cores: "pcsx_rearmed · mednafen_psx_hw" },
  { name: "Nintendo 64", desc: "N64", cores: "mupen64plus_next · parallel_n64" },
];

const steps = [
  { n: 1, title: "Launch the loader", desc: "Open the ROM Loader — it boots instantly in a new tab." },
  { n: 2, title: "Pick your console", desc: "Choose the system your cartridge belongs to from the dropdown." },
  { n: 3, title: "Add your ROM", desc: "Click the drop zone or drag & drop a ROM file from your device." },
  { n: 4, title: "Load & play", desc: "Hit Load & Play. Use the in-emulator menu for save states, fullscreen and reset." },
];

export default function RomLoaderPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[360px] h-[360px] rounded-full bg-brand-cyan/5 blur-[110px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* ===== HERO ===== */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-5">
            <Disc className="w-4 h-4" /> EMULATOR • OPEN SOURCE • CLIENT-SIDE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-5">
            <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent">
              ROM Loader
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Bring your own retro cartridges and play them right in your browser.
            Powered by <span className="text-foreground font-medium">EmulatorJS</span> — no installs,
            no accounts, no uploads. Pick a console, drop in a ROM you own, and play.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={LOADER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
            >
              <Zap className="w-5 h-5" /> Launch ROM Loader
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-foreground font-medium hover:bg-white/5 transition-all duration-200"
            >
              How it works <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            100% on your device — your ROM never leaves your browser.
          </p>
        </section>

        {/* ===== LIVE PREVIEW ===== */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Try it now</h2>
            <a
              href={LOADER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Open in full window <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-card/40 overflow-hidden shadow-xl">
            <iframe
              src={LOADER_URL}
              title="ROM Loader"
              loading="lazy"
              allow="autoplay; fullscreen; gamepad"
              className="w-full h-[680px] bg-[#0b0b12]"
            />
          </div>
        </section>

        {/* ===== WHAT IS IT ===== */}
        <section className="max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">What is ROM Loader?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ROM Loader is a built-in retro emulator for Craftisle. Unlike the games we host and run for you,
            this one is <span className="text-foreground font-medium">bring-your-own-game</span>: you supply a ROM
            file from a cartridge you legally own, and our self-hosted copy of the open-source
            <span className="text-foreground font-medium"> EmulatorJS</span> engine runs it entirely inside your browser tab.
            There is nothing to install and nothing to sign up for — the moment you load a ROM, the game is
            emulated through WebAssembly on your own machine.
          </p>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Why you'll love it</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl p-6 bg-card/60 border border-white/[0.06] hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== SUPPORTED SYSTEMS ===== */}
        <section id="systems" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-3">Supported systems</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            Ten classic platforms, each backed by proven emulation cores.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {systems.map((s) => (
              <div
                key={s.name}
                className="rounded-xl p-5 bg-card/60 border border-white/[0.06] hover:border-primary/30 transition-colors duration-300 text-center"
              >
                <div className="font-bold text-lg text-primary mb-1">{s.name}</div>
                <div className="text-xs text-foreground/80 mb-2">{s.desc}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{s.cores}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW TO PLAY ===== */}
        <section id="how" className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">How to play</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl p-6 bg-card/60 border border-white/[0.06]">
                <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={LOADER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              <Zap className="w-5 h-5" /> Launch ROM Loader
            </a>
          </div>
        </section>

        {/* ===== PRIVACY & OPENNESS ===== */}
        <section id="privacy" className="max-w-3xl mx-auto mb-20">
          <div className="rounded-2xl p-8 bg-card/50 border border-white/[0.06]">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" /> Privacy &amp; openness
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="text-foreground font-medium">Client-side only.</span> Your ROM is processed
                  locally through WebAssembly — no part of it is uploaded anywhere.
                </span>
              </li>
              <li className="flex gap-3">
                <Code2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="text-foreground font-medium">Open source.</span> The engine is EmulatorJS,
                  self-hosted at <code className="text-foreground">/games/retro-player</code> with no third-party calls.
                </span>
              </li>
              <li className="flex gap-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="text-foreground font-medium">No telemetry on your games.</span> We don&apos;t
                  log, store or even see your ROM&apos;s filename.
                </span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <span className="text-foreground font-medium">Play legally.</span> Only load ROMs you personally
                  own or that are freely distributable.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently asked questions</h2>
          <FaqAccordion />
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="text-center">
          <div className="rounded-3xl p-10 bg-gradient-to-br from-primary/10 to-brand-cyan/5 border border-white/[0.06]">
            <h2 className="text-3xl font-bold mb-3">Ready to play?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Grab a ROM you own, open the loader, and relive the classics in seconds.
            </p>
            <a
              href={LOADER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]"
            >
              <Zap className="w-5 h-5" /> Launch ROM Loader
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
