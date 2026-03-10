"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { QUANTUM_SYMBOLS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Particle {
  id: number;
  symbol: string;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateParticles(count: number, seed: number): Particle[] {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: QUANTUM_SYMBOLS[i % QUANTUM_SYMBOLS.length],
    left: rand() * 100,
    size: 14 + rand() * 14,
    opacity: 0.05 + rand() * 0.1,
    duration: 15 + rand() * 15,
    delay: rand() * -30,
    drift: -40 + rand() * 80,
  }));
}

const PARTICLE_SEED = 42;
const ALL_PARTICLES = generateParticles(14, PARTICLE_SEED);

// Subscribe to nothing — value never changes after mount
const subscribe = () => () => {};
const getServerSnapshot = () => false;

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    getServerSnapshot
  );

  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.innerWidth < 768,
    () => false
  );

  const particles = useMemo(
    () => (isMounted ? (isMobile ? ALL_PARTICLES.slice(0, 7) : ALL_PARTICLES) : []),
    [isMounted, isMobile]
  );

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      if (containerRef.current) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        containerRef.current.style.transform = `translate(${x * 15}px, ${y * 10}px)`;
      }
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouse);
      return () => window.removeEventListener("mousemove", handleMouse);
    }
  }, [isMobile]);

  if (reducedMotion || particles.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden transition-transform duration-[800ms] ease-out"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            opacity: 0,
            "--particle-opacity": String(p.opacity),
            "--drift": `${p.drift}px`,
            animation: `particle-float ${p.duration}s linear ${p.delay}s infinite`,
          } as React.CSSProperties}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
