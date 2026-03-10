"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Atom, Wind, Eye } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SCIENCE_CARDS } from "@/lib/constants";
import { useSoundSystem } from "@/hooks/use-sound";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionWrapper } from "./section-wrapper";

const ICON_MAP = {
  atom: Atom,
  wind: Wind,
  eye: Eye,
} as const;

const HOVER_EMOJIS = ["✨", "⚛️", "💫", "💨"];

interface HoverParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export function ScienceCards() {
  const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
  const [hoverParticles, setHoverParticles] = useState<HoverParticle[]>([]);
  const particleId = useRef(0);
  const { playBlip } = useSoundSystem();
  const reducedMotion = useReducedMotion();

  // Random card glitch every ~8s
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * SCIENCE_CARDS.length);
      setGlitchIndex(idx);
      setTimeout(() => setGlitchIndex(null), 400);
    }, 8000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleHover = useCallback(
    (cardIndex: number, e: React.MouseEvent) => {
      playBlip();

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const newParticles: HoverParticle[] = [];
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          id: particleId.current++,
          emoji: HOVER_EMOJIS[Math.floor(Math.random() * HOVER_EMOJIS.length)],
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
        });
      }
      setHoverParticles((prev) => [...prev, ...newParticles]);
    },
    [playBlip]
  );

  return (
    <SectionWrapper className="mx-auto max-w-5xl">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        The Peer-Unreviewed Research
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {SCIENCE_CARDS.map((card, index) => {
          const Icon = ICON_MAP[card.icon];
          return (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={(e) => handleHover(index, e as unknown as React.MouseEvent)}
              className="relative"
            >
              <Card
                className={`card-scanlines relative h-full overflow-hidden transition-colors hover:border-qfe-burst/50 ${
                  glitchIndex === index ? "animate-card-glitch" : ""
                }`}
              >
                <CardHeader className="items-center text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Icon className="mb-2 size-8 text-primary" />
                  </motion.div>
                  <CardTitle className="font-mono text-sm tracking-wider uppercase">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>

              {/* Hover particles */}
              {hoverParticles.map((p) => (
                <span
                  key={p.id}
                  className="pointer-events-none absolute text-sm"
                  style={{
                    left: p.x,
                    top: p.y,
                    animation: "symbol-float-up 1s ease-out forwards",
                  }}
                  onAnimationEnd={() =>
                    setHoverParticles((prev) =>
                      prev.filter((pp) => pp.id !== p.id)
                    )
                  }
                  aria-hidden="true"
                >
                  {p.emoji}
                </span>
              ))}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
