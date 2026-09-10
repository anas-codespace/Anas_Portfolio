"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-reveal",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-32 scroll-mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <div className="flex flex-col gap-8 z-10">
          <h2 className="about-reveal text-4xl md:text-6xl font-bold tracking-tighter">
            {PORTFOLIO_DATA.personal.aboutHeading}
          </h2>
          
          <div className="about-reveal space-y-6 text-lg text-gray-400 leading-relaxed max-w-xl">
            {PORTFOLIO_DATA.personal.aboutText.split('\\n\\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right: Stack snapshot — real content, no placeholder 3D */}
        <div className="about-reveal relative h-auto w-full">
          <div
            className="rounded-2xl border p-8 font-mono text-sm leading-7 overflow-hidden"
            style={{
              background: "oklch(10% 0.012 250)",
              borderColor: "var(--color-rule)",
            }}
          >
            {/* Fake file tab */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b" style={{ borderColor: "var(--color-rule)" }}>
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-xs text-gray-500">anas.config.ts</span>
            </div>
            {/* Code content */}
            <pre className="text-gray-300 overflow-x-auto" style={{ tabSize: 2 }}><code>{`export default {
  name:   \u0022Anas\u0022,
  role:   \u0022Developer\u0022,
  vibes:  [\u0022Vibe Coder\u0022, \u0022Builder\u0022],

  stack: {
            web:   [\u0022Next.js\u0022, \u0022React\u0022, \u0022TailwindCSS\u0022],
            ai:    [\u0022Gemini API\u0022, \u0022AI-assisted dev\u0022],
            tools: [\u0022GitHub\u0022, \u0022Figma\u0022, \u0022VS Code\u0022],
          },

  status: \u0022open for projects\u0022,
  based:  \u0022India\u0022,
  email:  \u0022anas.m77581@gmail.com\u0022,
}`}</code></pre>
            {/* Blinking cursor */}
            <span
              className="inline-block w-[2px] h-4 ml-1 mt-3 align-middle animate-pulse"
              style={{ background: "var(--color-accent)" }}
            />
          </div>
          {/* Subtle accent glow beneath the panel */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-2xl -z-10"
            style={{ background: "var(--color-accent-dim)" }}
          />
        </div>

      </div>
    </section>
  );
}

