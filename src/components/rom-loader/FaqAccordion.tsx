"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to install anything?",
    a: "No. The ROM Loader is a full web page that runs the emulator through WebAssembly. Just open it in any modern browser — desktop or mobile.",
  },
  {
    q: "Where do the ROMs come from?",
    a: "You bring them. We host no games and bundle no ROMs. The loader reads a file from your own device when you choose one.",
  },
  {
    q: "Is this legal?",
    a: "The emulator engine (EmulatorJS) is legal open-source software. You are responsible for only loading ROMs you personally own or that are freely distributable in your jurisdiction.",
  },
  {
    q: "Does my ROM leave my device?",
    a: "No. The file is loaded locally and emulated in your browser tab. It is never uploaded to a Craftisle server or any third party.",
  },
  {
    q: "Can I use a gamepad or play on mobile?",
    a: "Yes. Games accept keyboard, mouse and touch input, and most support gamepads. On mobile, an on-screen layout depends on the core, but touch and bluetooth controllers generally work.",
  },
  {
    q: "Which file types are supported?",
    a: "It depends on the core you pick: .nes (NES), .smc/.sfc (SNES), .gb/.gbc (Game Boy), .gba (GBA), .md/.gen (Genesis), .sms (Master System), .gg (Game Gear), .a26 (Atari 2600), .iso/.bin/.cue (PlayStation), .n64/.z64 (Nintendo 64).",
  },
  {
    q: "A game won't load — what now?",
    a: "Try a different core for that system (e.g. switch between genesis_plus_gx and picodrive), confirm the ROM isn't corrupted, and make sure you selected the matching console before loading.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-card/60 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{f.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`px-5 text-sm text-muted-foreground leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
