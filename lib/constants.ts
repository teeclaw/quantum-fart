export const TOKEN = {
  name: "Quantum Fart Entanglement",
  ticker: "$QFE",
  tagline: "Silent but decentralized.",
  description:
    "The first memecoin peer-reviewed by absolutely no one. Built on Base. Backed by gas.",
  network: "Base",
} as const;

export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || "#",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || "#",
} as const;

export const STORY_PARAGRAPHS = [
  "Let the record state that no one asked for this. No one submitted a grant proposal. No venture capital firm sat in a boardroom and said, \"You know what the blockchain needs? Farts.\" And yet here we are, because the universe does not care about your plans.",
  "It began when Dr. Alistair Cloudy-Pffft — a man whose academic credentials exist exclusively on a Geocities page he refuses to take down — stumbled upon an anomaly in the data. He had been studying low-frequency vibrations in sealed chambers (don't ask why, and he won't tell you) when his equipment detected identical waveform signatures erupting from two subjects on opposite sides of the planet at the exact same millisecond. The subjects had never met. They had no connection. They had both, however, eaten lamb vindaloo. Dr. Cloudy-Pffft wept. Then he opened a terminal and deployed a smart contract.",
  "Quantum Fart Entanglement — or $QFE — is the tokenized acknowledgment that the cosmos is, at its core, absurd, gaseous, and fundamentally connected by forces we pretend don't exist. It makes no promises of wealth. It offers no staking rewards, no governance rights, no ecosystem. What it offers is rarer: a moment of genuine, stupid, beautiful honesty on a blockchain full of things pretending to be serious. $QFE knows what it is. It invites you to know what you are, too.",
  "This is not a community you join. It's a community you've always been part of — you just didn't have the vocabulary. Now you do. Now there's a ticker symbol for the sound your body makes when it tells the truth. Welcome to $QFE. The silent-but-deadly revolution was never going to be televised. It was going to be minted.",
] as const;

export const SCIENCE_CARDS = [
  {
    title: "Quantum Entanglement",
    description:
      "Einstein called quantum entanglement \"spooky action at a distance.\" He never specified what kind of action. $QFE proposes that all gas exists in a state of cosmic linkage — every emission paired with a sympathetic vibration somewhere in the universe. You are never truly alone.",
    icon: "atom" as const,
  },
  {
    title: "Gaseous Dynamics",
    description:
      "In any closed system, gas expands to fill the available volume. $QFE follows this law with uncomfortable precision. Supply is fixed, but cultural pressure is not. As awareness builds, so does internal force. The only question is direction — and whether you want to be in the room when it happens.",
    icon: "wind" as const,
  },
  {
    title: "Observer Effect",
    description:
      "In quantum mechanics, the act of observation changes the behavior of particles. $QFE charts follow this law religiously. The moment you open the chart, the price moves. Look away, it moves again. Stare at it for six hours straight and it will do something specifically designed to make you question your life choices.",
    icon: "eye" as const,
  },
] as const;

/** Deterministic chaos config for story paragraphs */
export const STORY_CHAOS_CONFIG: Array<
  Array<{ index: number; type: "glitch" | "redacted" }>
> = [
  // P1: "no" glitches, "venture" redacted, "Farts." glitches
  [
    { index: 5, type: "glitch" },
    { index: 17, type: "redacted" },
    { index: 32, type: "glitch" },
  ],
  // P2: "academic" redacted, "anomaly" glitches, "identical" glitches
  [
    { index: 10, type: "redacted" },
    { index: 27, type: "glitch" },
    { index: 52, type: "glitch" },
  ],
  // P3: "cosmos" glitches, "pretend" redacted, "honesty" glitches
  [
    { index: 13, type: "glitch" },
    { index: 26, type: "redacted" },
    { index: 56, type: "glitch" },
  ],
  // P4: "community" glitches, "ticker" redacted, "silent-but-deadly" glitches
  [
    { index: 4, type: "glitch" },
    { index: 28, type: "redacted" },
    { index: 45, type: "glitch" },
  ],
];

export const QUANTUM_SYMBOLS = [
  "⚛️",
  "ψ",
  "ℏ",
  "💨",
  "🌀",
  "∞",
  "λ",
  "Δ",
] as const;

export const QUANTUM_STATES = [
  "UNSTABLE",
  "COLLAPSING",
  "ENTANGLED",
  "SUPERPOSITION",
  "TURBULENT",
  "RESONATING",
] as const;
