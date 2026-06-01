"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "What PDF size is supported?",
    answer:
      "Plans support documents from quick briefs to large handbooks. Higher tiers include larger file limits and priority processing.",
  },
  {
    question: "Can I use it for legal or compliance documents?",
    answer:
      "Yes. Citation-backed answers make it ideal for legal, compliance, procurement, and policy workflows.",
  },
  {
    question: "Is my data used to train models?",
    answer:
      "No. Your workspace data stays isolated. We do not use your private documents to train shared models.",
  },
];

export function FaqSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. FAQ Title entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Stagger slide up the FAQ cards
      const items = listRef.current?.querySelectorAll(".faq-card");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
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
      id="faq"
      className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 relative z-10"
    >
      <div ref={headerRef} className="mb-12 max-w-2xl opacity-0">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl text-slate-900">FAQ</h2>
      </div>

      <div ref={listRef} className="space-y-4">
        {faqs.map((faq) => (
          <article
            key={faq.question}
            className="faq-card opacity-0 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:translate-x-1 group cursor-default"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 flex items-center gap-3">
              {/* Question indicator dot */}
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors duration-300 shrink-0" />
              {faq.question}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 pl-4.5 border-l border-slate-100 group-hover:border-emerald-100 transition-colors duration-300">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
