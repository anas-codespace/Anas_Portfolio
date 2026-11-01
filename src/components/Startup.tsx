"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Globe, Layers, Sparkles } from "lucide-react";

export default function Startup() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".startup-reveal",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  const capabilities = [
    {
      icon: Globe,
      title: "Production Web Platforms",
      desc: "Full-stack web applications built on Next.js, React, and TypeScript with uncompromising craft and speed.",
    },
    {
      icon: Sparkles,
      title: "AI-Augmented Solutions",
      desc: "Integrating intelligent LLM agents, interactive chatbots, and automated workflows directly into client software.",
    },
    {
      icon: Layers,
      title: "Rapid Venture Prototyping",
      desc: "Translating founder visions and enterprise concepts into functional, interactive software in days, not months.",
    },
  ];

  return (
    <section
      id="startup"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-black border-t border-white/[0.06] scroll-mt-16 overflow-hidden"
    >
      {/* Subtle background aperture glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] pointer-events-none -z-10 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, oklch(72% 0.18 142 / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="startup-reveal liquid-glass liquid-sheen rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Top Hairline Indicator */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Header Block */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
              Entrepreneurial Venture
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              NEXAURA Studio.
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              Nexaura is a digital development venture founded by Anas, dedicated to building modern websites,
              interactive web applications, and innovative digital solutions for businesses and creators.
            </p>
          </div>

          {/* 3 Capabilities Columns with Liquid Sub-glass */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl liquid-glass-subtle hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">{cap.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Strip */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-sm font-bold text-white">Have a project in mind?</span>
              <span className="text-xs text-neutral-400">Partner with Nexaura to build your digital product.</span>
            </div>

            <a
              href="#contact"
              className="btn-press liquid-btn-primary group inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full text-black font-bold text-xs"
            >
              Collaborate With Nexaura
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
