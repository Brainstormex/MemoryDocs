"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function InteractiveGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Setup gentle, infinite floating animation for the 3 blobs
      gsap.to(blob1Ref.current, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(15, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: "random(-120, 120)",
        y: "random(-120, 120)",
        duration: "random(18, 30)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob3Ref.current, {
        x: "random(-90, 90)",
        y: "random(-90, 90)",
        duration: "random(14, 22)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Setup mouse interaction using quickTo for extremely smooth rendering
      const xTo1 = gsap.quickTo(blob1Ref.current, "x", { duration: 1.5, ease: "power2.out" });
      const yTo1 = gsap.quickTo(blob1Ref.current, "y", { duration: 1.5, ease: "power2.out" });

      const xTo2 = gsap.quickTo(blob2Ref.current, "x", { duration: 2, ease: "power3.out" });
      const yTo2 = gsap.quickTo(blob2Ref.current, "y", { duration: 2, ease: "power3.out" });

      const xTo3 = gsap.quickTo(blob3Ref.current, "x", { duration: 2.5, ease: "power2.out" });
      const yTo3 = gsap.quickTo(blob3Ref.current, "y", { duration: 2.5, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Calculate offset percentages (-50 to 50)
        const moveX = (clientX / width - 0.5) * 80;
        const moveY = (clientY / height - 0.5) * 80;

        // Animate blobs slightly toward mouse position
        xTo1(moveX * 1.5);
        yTo1(moveY * 1.5);

        xTo2(moveX * -1.2); // Opposite movement for parallax depth
        yTo2(moveY * -1.2);

        xTo3(moveX * 0.8);
        yTo3(moveY * 0.8);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Glow Blob 1 (Emerald/Teal) */}
      <div
        ref={blob1Ref}
        className="absolute top-[10%] left-[15%] h-[350px] w-[350px] rounded-full bg-emerald-400/15 blur-[100px] md:h-[500px] md:w-[500px] md:bg-emerald-400/20"
      />

      {/* Glow Blob 2 (Slate/Indigo-Blue) */}
      <div
        ref={blob2Ref}
        className="absolute top-[40%] right-[10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px] md:h-[600px] md:w-[600px] md:bg-indigo-500/12"
      />

      {/* Glow Blob 3 (Creamy Soft Amber/Violet mix) */}
      <div
        ref={blob3Ref}
        className="absolute bottom-[10%] left-[25%] h-[300px] w-[300px] rounded-full bg-amber-400/8 blur-[90px] md:h-[450px] md:w-[450px] md:bg-amber-400/10"
      />
    </div>
  );
}
