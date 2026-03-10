import { Hero } from "@/components/landing/hero";
import { Story } from "@/components/landing/story";
import { ScienceCards } from "@/components/landing/science-cards";
import { Community } from "@/components/landing/community";
import { Footer } from "@/components/landing/footer";
import { ChaosProviders } from "@/components/landing/chaos-providers";

export default function Home() {
  return (
    <ChaosProviders>
      <main className="min-h-svh">
        <Hero />
        <Story />
        <ScienceCards />
        <Community />
        <Footer />
      </main>
    </ChaosProviders>
  );
}
