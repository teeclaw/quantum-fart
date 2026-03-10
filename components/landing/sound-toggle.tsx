"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSoundSystem } from "@/hooks/use-sound";

export function SoundToggle() {
  const { isMuted, toggleMute } = useSoundSystem();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 flex size-11 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
      aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
    >
      {isMuted ? (
        <VolumeX className="size-5" />
      ) : (
        <Volume2 className="size-5" />
      )}
    </button>
  );
}
