"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const titleText = "Understand any PDF in minutes, not hours.";
  const titleWords = titleText.split(" ");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Initial entrance stagger
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      // Stagger words of the heading
      const wordElements = titleRef.current?.querySelectorAll(".word-span");
      if (wordElements && wordElements.length > 0) {
        tl.fromTo(
          wordElements,
          { opacity: 0, y: 24, rotateX: 30 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.2)" },
          "-=0.6"
        );
      } else {
        // Fallback if elements aren't parsed correctly
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
      }

      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      if (ctaRef.current) {
        tl.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, scale: 0.95, y: 10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.5"
        );
      }

      if (trustRef.current) {
        tl.fromTo(
          Array.from(trustRef.current.children),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        );
      }

      // 2. Preview Card entrance animation
      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 40, rotate: 2 },
        { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 1.2, ease: "power3.out" },
        "-=1.2"
      );

      // 3. Continuous ambient floating for the PDF preview card
      gsap.to(cardRef.current, {
        y: -12,
        rotation: 1.5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Float the glow/highlight inside the card slightly differently
      const cardHighlights = cardRef.current?.querySelectorAll(".floating-highlight");
      if (cardHighlights) {
        gsap.to(cardHighlights, {
          y: 4,
          x: 2,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-8 md:grid-cols-2 md:px-10 md:pt-16 relative z-10"
    >
      <div>
        <p
          ref={badgeRef}
          className="opacity-0 mb-4 inline-flex rounded-full border border-slate-300/70 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
        >
          PDF Summarizer + Chat
        </p>

        {/* Custom split-word heading with Perspective / Back ease */}
        <h1
          ref={titleRef}
          className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl [perspective:1000px] select-none"
        >
          {titleWords.map((word, idx) => (
            <span
              key={idx}
              className="word-span inline-block mr-[0.2em] origin-bottom opacity-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={descRef}
          className="opacity-0 mt-6 max-w-xl text-lg leading-relaxed text-slate-700 md:text-xl"
        >
          Memory Docs extracts the signal from dense documents. Summarize,
          query, compare, and share insights from your PDFs in one
          lightning-fast workspace.
        </p>

        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="opacity-0 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-emerald-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-[0.98]"
          >
            Upload Your First PDF
          </a>
          <a
            href="#how"
            className="opacity-0 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition-all duration-300 hover:scale-[1.03] hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
          >
            Watch Product Tour
          </a>
        </div>

        <div
          ref={trustRef}
          className="mt-8 flex flex-wrap gap-4 text-sm text-slate-600"
        >
          <p className="opacity-0 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            No credit card required
          </p>
          <p className="opacity-0 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            2-minute onboarding
          </p>
          <p className="opacity-0 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Trusted by teams
          </p>
        </div>
      </div>

      <div className="md:justify-self-end w-full max-w-md">
        {/* Animate-ready floating card wrapper */}
        <div
          ref={cardRef}
          className="opacity-0 rounded-3xl border border-white/60 bg-white/75 p-6 shadow-[0_22px_70px_-30px_rgba(16,24,40,0.45)] backdrop-blur relative overflow-hidden group hover:shadow-[0_30px_80px_-25px_rgba(16,24,40,0.55)] transition-shadow duration-500"
        >
          {/* Subtle decorative internal gradient glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-emerald-300/10 blur-2xl pointer-events-none group-hover:bg-emerald-300/20 transition-all duration-500" />

          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-sm font-semibold text-slate-800">Quarterly-Finance-Review.pdf</p>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 animate-pulse">
              Summarized
            </span>
          </div>

          <div className="space-y-4 py-5 text-sm text-slate-700">
            <p className="floating-highlight transition-all duration-300 hover:bg-slate-50/50 p-2 rounded-lg cursor-default border border-transparent hover:border-slate-100">
              <strong className="text-slate-900 block mb-0.5">Summary:</strong>
              Revenue grew 18% YoY, but margin pressure increased due to vendor costs.
            </p>
            <p className="floating-highlight transition-all duration-300 hover:bg-slate-50/50 p-2 rounded-lg cursor-default border border-transparent hover:border-slate-100">
              <strong className="text-slate-900 block mb-0.5">Risk:</strong>
              Renewal risk in two enterprise accounts with low product utilization.
            </p>
            <p className="floating-highlight transition-all duration-300 hover:bg-slate-50/50 p-2 rounded-lg cursor-default border border-transparent hover:border-slate-100">
              <strong className="text-slate-900 block mb-0.5">Action:</strong>
              Prioritize customer health outreach and renegotiate infrastructure contracts.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:bg-slate-50 group-hover:border-slate-300">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Ask your PDF
            </p>
            <p className="mt-2 text-sm text-slate-700 italic">
              &quot;Which sections mention renewal risk and what mitigation is proposed?&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}