"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  playFart as rawPlayFart,
  playBlip as rawPlayBlip,
  playWhoosh as rawPlayWhoosh,
} from "@/lib/sounds";

interface SoundContextValue {
  isMuted: boolean;
  toggleMute: () => void;
  playFart: () => void;
  playBlip: () => void;
  playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playFart = useCallback(() => {
    if (!isMuted) rawPlayFart();
  }, [isMuted]);

  const playBlip = useCallback(() => {
    if (!isMuted) rawPlayBlip();
  }, [isMuted]);

  const playWhoosh = useCallback(() => {
    if (!isMuted) rawPlayWhoosh();
  }, [isMuted]);

  return (
    <SoundContext value={{ isMuted, toggleMute, playFart, playBlip, playWhoosh }}>
      {children}
    </SoundContext>
  );
}

export function useSoundSystem(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSoundSystem must be used within a SoundProvider");
  }
  return ctx;
}
