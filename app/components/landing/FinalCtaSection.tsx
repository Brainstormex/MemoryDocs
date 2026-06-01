"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 1. CTA Card pops/zooms in
      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.2)",
        }
      );

      // 2. Elements inside stagger up
      if (contentRef.current) {
        tl.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 relative z-10">
      <div
        ref={cardRef}
        className="opacity-0 rounded-4xl border border-slate-200 bg-white/95 px-8 py-12 text-center md:px-16 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] backdrop-blur-md relative overflow-hidden group hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-200/50 transition-all duration-500"
      >
        {/* Subtle decorative backing radial blur */}
        <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none group-hover:bg-emerald-200/40 transition-colors duration-500" />
        <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none group-hover:bg-emerald-200/40 transition-colors duration-500" />

        <div ref={contentRef} className="relative z-10">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl text-slate-900 leading-tight">
            Your PDFs should answer back.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
            Join teams using Memory Docs to cut review cycles, reduce repetitive
            reading, and move decisions forward faster.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.3)] hover:bg-slate-800 active:scale-[0.98]"
          >
            Create Free Workspace
          </a>
        </div>
      </div>
    </section>
  );
}
