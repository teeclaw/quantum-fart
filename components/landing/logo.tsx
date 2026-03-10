"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSoundSystem } from "@/hooks/use-sound";
import { MegaExplosion } from "./mega-explosion";

interface LogoProps {
  className?: string;
}

const PARTICLE_EMOJIS = ["💨", "💨", "💨", "🌀", "💫", "☁️"];

interface ClickParticle {
  id: number;
  emoji: string;
  angle: number;
  distance: number;
}

export function Logo({ className }: LogoProps) {
  const [puffing, setPuffing] = useState(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);
  const [shaking, setShaking] = useState(false);
  const [glitchIntense, setGlitchIntense] = useState(false);
  const [megaExplosion, setMegaExplosion] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const clickTimestamps = useRef<number[]>([]);
  const particleIdRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { playFart } = useSoundSystem();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 4 : 7;

  const spawnParticles = useCallback(() => {
    const newParticles: ClickParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        emoji:
          PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
        angle: (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4,
        distance: 40 + Math.random() * 60,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  }, [particleCount]);

  const handleClick = useCallback(
    () => {
      playFart();
      spawnParticles();

      // Screen shake
      setShaking(true);
      setTimeout(() => setShaking(false), 300);

      // Glitch intensity
      setGlitchIntense(true);
      setTimeout(() => setGlitchIntense(false), 500);

      // Rapid-click detection
      const now = Date.now();
      clickTimestamps.current.push(now);
      clickTimestamps.current = clickTimestamps.current.filter(
        (t) => now - t < 2000
      );

      if (clickTimestamps.current.length >= 5) {
        clickTimestamps.current = [];
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (rect) {
          setMegaExplosion({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
          // Triple fart
          playFart();
          setTimeout(() => playFart(), 150);
          setTimeout(() => playFart(), 300);
        }
      }
    },
    [playFart, spawnParticles]
  );

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className={cn(
          "relative inline-block cursor-pointer select-none",
          shaking && "animate-screen-shake",
          className
        )}
        onMouseEnter={() => setPuffing(true)}
        onAnimationEnd={() => {
          setPuffing(false);
          setShaking(false);
        }}
        onClick={handleClick}
      >
        <Image
          src="/token-logo.png"
          alt="$QFE Token Logo"
          width={220}
          height={220}
          priority
          className={cn(
            "size-36 object-contain sm:size-40 md:size-48",
            glitchIntense ? "animate-glitch-intense" : "animate-glitch"
          )}
        />

        {/* Hover puff (desktop) */}
        {puffing && (
          <span
            className="pointer-events-none absolute -right-4 -top-4 animate-puff text-4xl"
            aria-hidden="true"
          >
            💨
          </span>
        )}

        {/* Click particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute left-1/2 top-1/2 text-2xl will-change-transform"
            style={{
              animation: "explode-particle 0.8s ease-out forwards",
              "--angle": `${p.angle}rad`,
              "--distance": `${p.distance}px`,
            } as React.CSSProperties}
            onAnimationEnd={() => removeParticle(p.id)}
            aria-hidden="true"
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Mega explosion overlay */}
      {megaExplosion && (
        <MegaExplosion
          originX={megaExplosion.x}
          originY={megaExplosion.y}
          onComplete={() => setMegaExplosion(null)}
        />
      )}
    </>
  );
}
