import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantum Fart Entanglement ($QFE)",
  description:
    "Silent but decentralized. The first memecoin peer-reviewed by absolutely no one. Built on Base. Backed by gas.",
  openGraph: {
    title: "Quantum Fart Entanglement ($QFE)",
    description:
      "Silent but decentralized. The first memecoin peer-reviewed by absolutely no one. Built on Base. Backed by gas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Fart Entanglement ($QFE)",
    description:
      "Silent but decentralized. The first memecoin peer-reviewed by absolutely no one. Built on Base. Backed by gas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
