"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SOCIAL_LINKS, QUANTUM_SYMBOLS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionWrapper } from "./section-wrapper";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface FloatingSymbol {
  id: number;
  symbol: string;
  buttonIndex: number;
  x: number;
}

interface HoverTrail {
  id: number;
  emoji: string;
  x: number;
}

export function Community() {
  const [floatingSymbols, setFloatingSymbols] = useState<FloatingSymbol[]>([]);
  const [hoverTrails, setHoverTrails] = useState<Map<number, HoverTrail[]>>(
    new Map()
  );
  const symbolId = useRef(0);
  const trailId = useRef(0);
  const reducedMotion = useReducedMotion();

  // Periodic floating symbols
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      const buttonIndex = Math.floor(Math.random() * 3);
      const symbol =
        QUANTUM_SYMBOLS[Math.floor(Math.random() * QUANTUM_SYMBOLS.length)];

      const newSymbol: FloatingSymbol = {
        id: symbolId.current++,
        symbol,
        buttonIndex,
        x: -15 + Math.random() * 30,
      };

      setFloatingSymbols((prev) => [...prev, newSymbol]);
    }, 3000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  const handleHover = useCallback((buttonIndex: number) => {
    const trails: HoverTrail[] = [];
    for (let i = 0; i < 3; i++) {
      trails.push({
        id: trailId.current++,
        emoji: "💨",
        x: -20 + Math.random() * 40,
      });
    }
    setHoverTrails((prev) => {
      const next = new Map(prev);
      next.set(buttonIndex, [...(next.get(buttonIndex) ?? []), ...trails]);
      return next;
    });
  }, []);

  const removeTrail = useCallback((buttonIndex: number, trailItemId: number) => {
    setHoverTrails((prev) => {
      const next = new Map(prev);
      const existing = next.get(buttonIndex) ?? [];
      next.set(
        buttonIndex,
        existing.filter((t) => t.id !== trailItemId)
      );
      return next;
    });
  }, []);

  const buttons = [
    {
      href: SOCIAL_LINKS.twitter,
      icon: <XIcon className="size-4" />,
      label: "Twitter / X",
    },
    {
      href: SOCIAL_LINKS.telegram,
      icon: <Send className="size-4" />,
      label: "Telegram",
    },
    {
      href: SOCIAL_LINKS.discord,
      icon: <MessageCircle className="size-4" />,
      label: "Discord",
    },
  ];

  return (
    <SectionWrapper className="overflow-hidden text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Enter the Gas Cloud
      </h2>
      <p className="mx-auto mb-10 max-w-lg text-muted-foreground">
        You were going to scroll past this. But you didn&apos;t. Something in
        your gut — call it instinct, call it last night&apos;s burrito — told
        you to stay. The $QFE community doesn&apos;t recruit. It resonates. If
        you&apos;re reading this, the entanglement has already begun.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {buttons.map((btn, index) => (
          <div
            key={btn.label}
            className="relative"
            onMouseEnter={() => handleHover(index)}
          >
            <a
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full sm:w-auto`}
            >
              {btn.icon}
              {btn.label}
            </a>

            {/* Hover trails */}
            {(hoverTrails.get(index) ?? []).map((trail) => (
              <span
                key={trail.id}
                className="pointer-events-none absolute bottom-full left-1/2 text-lg"
                style={{
                  animation: "symbol-float-up 1s ease-out forwards",
                  transform: `translateX(${trail.x}px)`,
                }}
                onAnimationEnd={() => removeTrail(index, trail.id)}
                aria-hidden="true"
              >
                {trail.emoji}
              </span>
            ))}

            {/* Periodic floating symbols */}
            {floatingSymbols
              .filter((s) => s.buttonIndex === index)
              .map((s) => (
                <span
                  key={s.id}
                  className="pointer-events-none absolute bottom-full left-1/2 text-sm"
                  style={{
                    animation: "symbol-float-up 1.5s ease-out forwards",
                    transform: `translateX(${s.x}px)`,
                  }}
                  onAnimationEnd={() =>
                    setFloatingSymbols((prev) =>
                      prev.filter((ss) => ss.id !== s.id)
                    )
                  }
                  aria-hidden="true"
                >
                  {s.symbol}
                </span>
              ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
