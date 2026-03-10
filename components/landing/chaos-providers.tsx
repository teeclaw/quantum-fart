"use client";

import { useEffect, type ReactNode } from "react";
import { SoundProvider } from "@/hooks/use-sound";
import { ChaosOverlay } from "./chaos-overlay";
import { SoundToggle } from "./sound-toggle";

const ASCII_ART = `
%c
  ╔═══════════════════════════════════════╗
  ║   ____  _____ _____                   ║
  ║  / __ \\|  ___|  ___|                  ║
  ║ | |  | | |_  | |__                    ║
  ║ | |  | |  _| |  __|                   ║
  ║ | |__| | |   | |___                   ║
  ║  \\___\\_\\_|   |_____|                  ║
  ║                                       ║
  ║  QUANTUM FART ENTANGLEMENT            ║
  ║  Technically possible.                ║
  ║  Spiritually chaotic.                 ║
  ║                                       ║
  ║  >> You found the console. Nice. 💨   ║
  ╚═══════════════════════════════════════╝
`;

function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(ASCII_ART, "color: #a78bfa; font-family: monospace;");
  }, []);
  return null;
}

export function ChaosProviders({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <ChaosOverlay />
      <SoundToggle />
      <ConsoleEasterEgg />
      {children}
    </SoundProvider>
  );
}
