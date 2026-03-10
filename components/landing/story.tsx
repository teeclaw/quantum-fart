"use client";

import Image from "next/image";
import { STORY_PARAGRAPHS, STORY_CHAOS_CONFIG } from "@/lib/constants";
import { SectionWrapper } from "./section-wrapper";
import { CloudPuff } from "./cloud-puff";

function ChaosText({
  text,
  chaosConfig,
  paragraphIndex,
}: {
  text: string;
  chaosConfig: Array<{ index: number; type: "glitch" | "redacted" }>;
  paragraphIndex: number;
}) {
  const words = text.split(" ");
  const chaosMap = new Map(chaosConfig.map((c) => [c.index, c.type]));

  return (
    <p>
      {words.map((word, i) => {
        const type = chaosMap.get(i);

        if (type === "glitch") {
          return (
            <span
              key={`${paragraphIndex}-${i}`}
              className="glitch-word"
              style={
                {
                  "--glitch-delay": `${(paragraphIndex * 3 + i) * 0.7}s`,
                } as React.CSSProperties
              }
            >
              {word}{" "}
            </span>
          );
        }

        if (type === "redacted") {
          return (
            <span
              key={`${paragraphIndex}-${i}`}
              className="redacted-word"
              tabIndex={0}
              role="button"
              aria-label={`Reveal hidden word: ${word}`}
            >
              {word}{" "}
            </span>
          );
        }

        return <span key={`${paragraphIndex}-${i}`}>{word} </span>;
      })}
    </p>
  );
}

export function Story() {
  return (
    <SectionWrapper id="story" className="relative">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          From the Big Bang to the Big Pffft
        </h2>

        <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-start md:gap-12">
          {/* Dr. Alistair Cloudy-Pffft */}
          <div className="flex-shrink-0 animate-float">
            <Image
              src="/dr-alistair-cloudy-pffft.png"
              alt="Dr. Alistair Cloudy-Pffft — Chief Quantum Flatulence Researcher"
              width={200}
              height={340}
              className="h-48 w-auto object-contain drop-shadow-lg sm:h-56 md:h-72"
            />
            <p className="mt-2 text-center font-mono text-[10px] tracking-wider text-muted-foreground/60">
              Dr. Alistair Cloudy Pffft
            </p>
          </div>

          <div className="max-w-2xl space-y-6 text-center text-base leading-relaxed text-muted-foreground md:text-left md:text-lg">
            {STORY_PARAGRAPHS.map((paragraph, i) => (
              <ChaosText
                key={i}
                text={paragraph}
                chaosConfig={STORY_CHAOS_CONFIG[i] ?? []}
                paragraphIndex={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative clouds */}
      <CloudPuff
        size={70}
        className="absolute -left-4 top-12 hidden animate-float opacity-15 md:block"
      />
      <CloudPuff
        size={60}
        className="absolute -right-4 bottom-16 hidden animate-float opacity-15 md:block"
        style={{ animationDelay: "3s" }}
      />
    </SectionWrapper>
  );
}
