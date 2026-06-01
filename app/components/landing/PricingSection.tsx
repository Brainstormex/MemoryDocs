"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pulseGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Title fade and slide
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

      // 2. Cards stagger-pop with bounce/spring
      const cards = cardsRef.current?.querySelectorAll(".pricing-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.93 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Continuously pulse the glowing aura behind the middle Growth card
      if (pulseGlowRef.current) {
        gsap.to(pulseGlowRef.current, {
          scale: 1.25,
          opacity: 0.45,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 relative z-10 [perspective:1200px]"
    >
      <div ref={headerRef} className="mb-12 max-w-2xl opacity-0">
        <h2 className="font-display text-4xl tracking-tight md:text-5xl text-slate-900">
          Pricing that scales with your team.
        </h2>
        <p className="mt-4 text-lg text-slate-700">
          Start free, then unlock advanced collaboration and higher limits as
          your document intelligence stack grows.
        </p>
      </div>

      <div
        ref={cardsRef}
        className="grid gap-6 md:grid-cols-3 relative items-stretch"
      >
        {/* Starter Plan */}
        <article className="pricing-card opacity-0 rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 flex flex-col justify-between group cursor-default">
          <div>
            <p className="text-sm font-semibold text-slate-500">Starter</p>
            <p className="mt-2 font-display text-4xl tracking-tight text-slate-900">$0</p>
            <p className="mt-3 text-sm text-slate-600">For individuals testing workflows.</p>
            <hr className="my-5 border-slate-100" />
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Up to 20 PDFs/month
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Basic summaries
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Single-user workspace
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="mt-7 block text-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:bg-slate-50 hover:border-slate-400"
          >
            Get Started
          </a>
        </article>

        {/* Growth Plan (Popular tier with animated glow backing) */}
        <div className="pricing-card opacity-0 relative group">
          {/* Animated glow aura backing */}
          <div
            ref={pulseGlowRef}
            className="absolute inset-0 -z-10 rounded-3xl bg-emerald-400/25 blur-xl opacity-70 pointer-events-none scale-100"
          />

          <article className="h-full rounded-3xl border border-slate-950 bg-slate-900 p-7 text-white shadow-[0_28px_60px_-30px_rgba(15,23,42,0.85)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_35px_70px_-25px_rgba(16,185,129,0.35)] flex flex-col justify-between cursor-default">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-emerald-300">Growth</p>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                  Most Popular
                </span>
              </div>
              <p className="mt-2 font-display text-4xl tracking-tight">$29</p>
              <p className="mt-3 text-sm text-slate-300">Per user/month for high-output teams.</p>
              <hr className="my-5 border-slate-800" />
              <ul className="space-y-3 text-sm text-slate-100">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Unlimited summaries
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Advanced PDF chat + citations
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Shared workspaces and exports
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="mt-7 block text-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition-all duration-300 hover:bg-emerald-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
            >
              Start 14-Day Trial
            </a>
          </article>
        </div>

        {/* Enterprise Plan */}
        <article className="pricing-card opacity-0 rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 flex flex-col justify-between group cursor-default">
          <div>
            <p className="text-sm font-semibold text-slate-500">Enterprise</p>
            <p className="mt-2 font-display text-4xl tracking-tight text-slate-900">Custom</p>
            <p className="mt-3 text-sm text-slate-600">For security, controls, and procurement readiness.</p>
            <hr className="my-5 border-slate-100" />
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                SSO and role-based access
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Dedicated support
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                Private deployment options
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="mt-7 block text-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:bg-slate-50 hover:border-slate-400"
          >
            Talk to Sales
          </a>
        </article>
      </div>
    </section>
  );
}
