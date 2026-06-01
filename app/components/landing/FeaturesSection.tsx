"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "AI Summaries in Seconds",
    description:
      "Turn long PDFs into crisp executive summaries with key takeaways, action items, and risks.",
  },
  {
    title: "Chat With Any Document",
    description:
      "Ask natural language questions and get grounded answers with source-aware responses.",
  },
  {
    title: "Citations You Can Trust",
    description:
      "Every answer is linked to the exact section in the PDF so your team can verify instantly.",
  },
  {
    title: "Multi-File Intelligence",
    description:
      "Compare contracts, policies, and reports across multiple PDFs in one unified chat thread.",
  },
  {
    title: "Team Workspaces",
    description:
      "Organize documents by project, invite teammates, and keep decisions synced across teams.",
  },
  {
    title: "Secure by Default",
    description:
      "Enterprise-grade encryption, role controls, and audit-friendly workflows built in.",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Animate section header when scrolled into view
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Stagger animate the feature cards as they scroll into view
      const cards = gridRef.current?.querySelectorAll(".feature-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="features"
      className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 relative z-10 [perspective:1200px]"
    >
      <div ref={headerRef} className="mb-12 max-w-2xl opacity-0">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl text-slate-900">
          Built for teams that read a lot and decide fast.
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          From sales decks to policy docs, Memory Docs helps you turn static
          files into searchable, conversational knowledge.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <article
            key={feature.title}
            className="feature-card opacity-0 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.15)] group"
          >
            <div className="flex items-center gap-3">
              {/* Subtle animated leading dot indicator */}
              <span className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors duration-300 shrink-0" />
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {feature.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}