"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  "Upload one or many PDFs.",
  "Get auto summaries and structured highlights.",
  "Ask questions, compare files, and export insights.",
];

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      // 1. Slide in the left heading section
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Stagger slide up the list items
      const listItems = stepsListRef.current?.querySelectorAll("li");
      if (listItems && listItems.length > 0) {
        gsap.fromTo(
          listItems,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: stepsListRef.current,
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
      id="how"
      className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 relative z-10"
    >
      <div className="grid gap-10 rounded-4xl border border-slate-200/70 bg-white/85 p-8 md:grid-cols-[1.2fr_1fr] md:p-12 shadow-[0_15px_40px_-25px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div ref={leftColRef} className="opacity-0 flex flex-col justify-center">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl text-slate-900 leading-tight">
            Three steps to document clarity.
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-lg">
            Move from upload to confident decisions with a workflow that is
            simple enough for everyone and powerful enough for experts.
          </p>
        </div>

        <ol ref={stepsListRef} className="space-y-4 flex flex-col justify-center">
          {steps.map((step, index) => (
            <li
              key={step}
              className="opacity-0 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-slate-300 hover:scale-[1.02] transition-all duration-300 group cursor-default"
            >
              {/* Animated number bubble with rotation/glow on hover */}
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white group-hover:bg-emerald-500 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-500">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
