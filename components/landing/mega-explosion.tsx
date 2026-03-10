"use client";

import { useEffect, useMemo } from "react";

interface MegaExplosionProps {
  originX: number;
  originY: number;
  onComplete: () => void;
}

interface Particle {
  id: number;
  emoji: string;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

const EXPLOSION_EMOJIS = ["💨", "💨", "💨", "💨", "🌀", "💫", "☁️", "⚛️", "ψ", "∞"];

function generateParticles(isMobile: boolean): Particle[] {
  const count = isMobile ? 18 : 40;
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      emoji: EXPLOSION_EMOJIS[Math.floor(Math.random() * EXPLOSION_EMOJIS.length)],
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
      distance: 80 + Math.random() * 200,
      size: 16 + Math.random() * 24,
      delay: Math.random() * 200,
    });
  }
  return particles;
}

export function MegaExplosion({ originX, originY, onComplete }: MegaExplosionProps) {
  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return generateParticles(isMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: originX,
            top: originY,
            fontSize: p.size,
            animation: `explode-particle 1.2s ease-out ${p.delay}ms forwards`,
            "--angle": `${p.angle}rad`,
            "--distance": `${p.distance}px`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
