"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TOKEN, QUANTUM_STATES } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Footer() {
  const [entanglement, setEntanglement] = useState("97.3");
  const [quantumState, setQuantumState] = useState<string>("UNSTABLE");
  const [fartsDetected, setFartsDetected] = useState<string>("∞");
  const [promptVisible, setPromptVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  const copyAddress = useCallback(async () => {
    await navigator.clipboard.writeText(TOKEN.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setEntanglement((91 + Math.random() * 8.9).toFixed(1));
      setQuantumState(
        QUANTUM_STATES[Math.floor(Math.random() * QUANTUM_STATES.length)]
      );
      setFartsDetected(
        Math.random() > 0.15
          ? "∞"
          : String(Math.floor(1000000 + Math.random() * 9000000))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Pulsing prompt
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setPromptVisible((v) => !v);
    }, 800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <footer className="px-6 pb-8 pt-4">
      <Separator className="mb-8" />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-foreground">
            {TOKEN.ticker}
          </span>
          <Badge variant="secondary">Built on {TOKEN.network}</Badge>
        </div>

        <p className="max-w-lg text-xs text-muted-foreground">
          {TOKEN.ticker} is a memecoin. It is not an investment vehicle, a
          security, a store of value, or a retirement plan. It is a joke on a
          blockchain, and the only thing it guarantees is that you will have to
          explain it to someone at a family dinner. No financial value. No
          utility. No refunds. Entertainment only.
        </p>
      </div>

      {/* Contract address */}
      <div className="mx-auto mt-4 flex max-w-5xl items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground">CA:</span>
        <button
          onClick={copyAddress}
          className="group flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          title="Click to copy contract address"
        >
          <span className="hidden sm:inline">{TOKEN.address}</span>
          <span className="sm:hidden">
            {TOKEN.address.slice(0, 6)}...{TOKEN.address.slice(-4)}
          </span>
          {copied ? (
            <Check className="size-3 text-green-500" />
          ) : (
            <Copy className="size-3 opacity-50 group-hover:opacity-100" />
          )}
        </button>
      </div>

      {/* Terminal status readout */}
      <div className="mx-auto mt-6 max-w-3xl font-mono text-xs text-green-400">
        <div className="rounded border border-green-500/30 bg-black/80 px-4 py-2">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
            <span className={promptVisible ? "opacity-100" : "opacity-0"}>
              {">"}{" "}
            </span>
            <span className="md:ml-0">
              ENTANGLEMENT: {entanglement}%
            </span>
            <span className="hidden md:inline mx-2">|</span>
            <span>QUANTUM STATE: {quantumState}</span>
            <span className="hidden md:inline mx-2">|</span>
            <span>FARTS DETECTED: {fartsDetected}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
