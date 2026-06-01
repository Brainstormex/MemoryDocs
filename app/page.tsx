import dynamic from "next/dynamic";

import { HeroSection } from "./components/landing/HeroSection";
import { LandingFooter } from "./components/landing/LandingFooter";
import { InteractiveGlow } from "./components/landing/InteractiveGlow";

const FeaturesSection = dynamic(
  () => import("./components/landing/FeaturesSection").then((mod) => mod.FeaturesSection),
  {
    loading: () => <section className="mx-auto h-24 w-full max-w-7xl px-6 md:px-10" />,
  }
);

const HowItWorksSection = dynamic(
  () => import("./components/landing/HowItWorksSection").then((mod) => mod.HowItWorksSection),
  {
    loading: () => <section className="mx-auto h-24 w-full max-w-7xl px-6 md:px-10" />,
  }
);

const PricingSection = dynamic(
  () => import("./components/landing/PricingSection").then((mod) => mod.PricingSection),
  {
    loading: () => <section className="mx-auto h-24 w-full max-w-7xl px-6 md:px-10" />,
  }
);

const FaqSection = dynamic(
  () => import("./components/landing/FaqSection").then((mod) => mod.FaqSection),
  {
    loading: () => <section className="mx-auto h-24 w-full max-w-7xl px-6 md:px-10" />,
  }
);

const FinalCtaSection = dynamic(
  () => import("./components/landing/FinalCtaSection").then((mod) => mod.FinalCtaSection),
  {
    loading: () => <section className="mx-auto h-24 w-full max-w-7xl px-6 md:px-10" />,
  }
);

export default function Home() {
  return (
    <div className="landing-bg text-slate-900 relative min-h-screen overflow-x-hidden">
      {/* Premium background responsive particle glow */}
      <InteractiveGlow />

      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <LandingFooter />
    </div>
  );
}
