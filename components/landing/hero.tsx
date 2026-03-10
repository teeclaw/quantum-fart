"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOKEN } from "@/lib/constants";
import { useSoundSystem } from "@/hooks/use-sound";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Logo } from "./logo";
import { CloudPuff } from "./cloud-puff";
import { ParticleField } from "./particle-field";

const GLITCH_CHARS = "#!&%?*@$01";

interface CtaParticle {
  id: number;
  emoji: string;
  x: number;
}

export function Hero() {
  const titleText = TOKEN.name;
  const [displayChars, setDisplayChars] = useState<string[]>(
    titleText.split("")
  );
  const [ctaParticles, setCtaParticles] = useState<CtaParticle[]>([]);
  const ctaIdRef = useRef(0);
  const { playWhoosh } = useSoundSystem();
  const reducedMotion = useReducedMotion();

  // Glitch text effect on h1
  useEffect(() => {
    if (reducedMotion) return;

    const original = titleText.split("");

    function doGlitch() {
      const charCount = 2 + Math.floor(Math.random() * 3);
      const indices: number[] = [];

      while (indices.length < charCount) {
        const idx = Math.floor(Math.random() * original.length);
        if (original[idx] !== " " && !indices.includes(idx)) {
          indices.push(idx);
        }
      }

      const glitched = [...original];
      for (const idx of indices) {
        glitched[idx] =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      setDisplayChars(glitched);

      setTimeout(() => setDisplayChars([...original]), 150);
    }

    const interval = setInterval(
      doGlitch,
      4000 + Math.random() * 4000
    );
    return () => clearInterval(interval);
  }, [titleText, reducedMotion]);

  const handleCtaClick = useCallback(() => {
    playWhoosh();
    // Emit particles
    const newParticles: CtaParticle[] = [];
    for (let i = 0; i < 4; i++) {
      newParticles.push({
        id: ctaIdRef.current++,
        emoji: "💨",
        x: -20 + Math.random() * 40,
      });
    }
    setCtaParticles((prev) => [...prev, ...newParticles]);

    document
      .getElementById("story")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [playWhoosh]);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <ParticleField />

      {/* Radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--color-qfe-lavender) 0%, var(--color-qfe-mist) 40%, var(--color-background) 80%)",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* Floating clouds — one visible on mobile, all on desktop */}
      <CloudPuff
        size={120}
        className="absolute left-[8%] top-[18%] animate-float opacity-20 md:opacity-30"
      />
      <CloudPuff
        size={90}
        className="absolute right-[10%] top-[28%] hidden animate-float opacity-25 sm:block"
        style={{ animationDelay: "2s" }}
      />
      <CloudPuff
        size={100}
        className="absolute bottom-[22%] left-[15%] hidden animate-float opacity-20 md:block"
        style={{ animationDelay: "4s" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 md:gap-6"
      >
        <Logo />

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl">
          {displayChars.map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>

        <p className="flex items-center max-w-md font-mono text-sm tracking-wide text-muted-foreground md:text-base">
          {TOKEN.tagline}
          <span
            className="ml-1 inline-block w-[2px] h-[1em] bg-muted-foreground animate-blink-cursor"
            aria-hidden="true"
          />
        </p>

        <p className="max-w-lg text-sm text-muted-foreground/80 md:text-base">
          {TOKEN.description}
        </p>

        <div className="relative mt-4">
          <Button size="lg" onClick={handleCtaClick}>
            Pull Dr. Cloudy-Pffft&apos;s Finger
          </Button>

          {/* CTA particles */}
          {ctaParticles.map((p) => (
            <span
              key={p.id}
              className="pointer-events-none absolute bottom-full left-1/2 text-lg will-change-transform"
              style={{
                animation: "symbol-float-up 1s ease-out forwards",
                transform: `translateX(${p.x}px)`,
              }}
              onAnimationEnd={() =>
                setCtaParticles((prev) =>
                  prev.filter((pp) => pp.id !== p.id)
                )
              }
              aria-hidden="true"
            >
              {p.emoji}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
