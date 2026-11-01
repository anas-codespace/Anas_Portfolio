"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-fade",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, delay: 0.15 }
        );

        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.7"
        );

        // Smooth non-intrusive mouse parallax for portrait on desktop
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReduced && window.innerWidth > 1024) {
          const hero = containerRef.current;
          if (hero && portraitRef.current) {
            const handleMouseMove = (e: MouseEvent) => {
              const rect = hero.getBoundingClientRect();
              const xPos = (e.clientX - rect.left) / rect.width - 0.5;
              const yPos = (e.clientY - rect.top) / rect.height - 0.5;

              gsap.to(portraitRef.current, {
                x: xPos * 18,
                y: yPos * 14,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(portraitRef.current, {
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            hero.addEventListener("mousemove", handleMouseMove);
            hero.addEventListener("mouseleave", handleMouseLeave);

            return () => {
              hero.removeEventListener("mousemove", handleMouseMove);
              hero.removeEventListener("mouseleave", handleMouseLeave);
            };
          }
        }
      }, containerRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen w-full bg-black flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* --- CINEMATIC AMBIENCE & LIGHTING --- */}
      {/* Deep atmospheric base */}
      <div className="absolute inset-0 bg-[#040406] -z-30" />

      {/* Subtle directional cinematic aperture beam from top-right */}
      <div
        className="absolute -top-32 right-0 w-[60vw] h-[80vh] pointer-events-none -z-20 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 75% 25%, oklch(72% 0.18 142 / 0.12) 0%, oklch(65% 0.12 210 / 0.05) 45%, transparent 75%)",
        }}
      />

      {/* Refined architectural grid rule line */}
      <div className="absolute top-24 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none -z-10" />

      {/* Bottom fade into main body */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none -z-10" />

      {/* --- MAIN HERO GRID --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* LEFT COLUMN: Content & Typography */}
        <div className="w-full lg:w-[58%] flex flex-col items-start pt-8 lg:pt-0">
          {/* Eyebrow Status Badge with Liquid Glass Pill */}
          <div className="hero-fade inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-glass-subtle mb-6">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-neutral-200 uppercase">
              BCA Student &amp; Founder @ NEXAURA
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="hero-fade text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black tracking-tight leading-[0.95] mb-6 text-white">
            MOHAMMED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              ANAS
            </span>
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </h1>

          {/* Filmic Subtitle */}
          <div className="hero-fade flex items-center gap-3 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-neutral-200 mb-5">
            <span>Web Developer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span style={{ color: "var(--color-accent)" }}>Vibe Coder</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span>Builder</span>
          </div>

          {/* Mission Thesis */}
          <p className="hero-fade text-neutral-400 text-sm sm:text-base lg:text-[15px] max-w-xl leading-relaxed mb-8">
            Turning bold concepts into production-grade digital experiences, modern full-stack web applications,
            and AI-assisted workflows with design clarity and engineering craft.
          </p>

          {/* Tactile Liquid Buttons */}
          <div className="hero-fade flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="btn-press liquid-btn-primary group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-black font-bold tracking-wide text-xs"
            >
              Explore Projects
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#startup"
              className="btn-press liquid-btn group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-medium text-xs"
            >
              <Sparkles size={14} style={{ color: "var(--color-accent)" }} />
              NEXAURA Studio
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Collaboration%20Inquiry`}
              className="btn-press liquid-glass-subtle inline-flex items-center justify-center px-5 py-3.5 rounded-full text-neutral-300 hover:text-white font-medium text-xs transition-colors duration-200"
            >
              Contact Direct
            </a>
          </div>

          {/* Proof / Metrics Strip inside Liquid Glass Capsule */}
          <div className="hero-fade liquid-glass-subtle rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white tracking-tight">5+</span>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                Shipped Apps
              </span>
            </div>
            <div>
              <span
                className="block text-xl sm:text-2xl font-black tracking-tight"
                style={{ color: "var(--color-accent)" }}
              >
                Founder
              </span>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                NEXAURA
              </span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white tracking-tight">BCA</span>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
                Computer Apps
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Cinematic Portrait Presentation with Liquid Glass Enclosure */}
        <div className="w-full lg:w-[42%] flex justify-center lg:justify-end items-center relative">
          <div
            ref={portraitRef}
            className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[4/5] rounded-[2rem] overflow-hidden liquid-glass liquid-sheen p-2.5 transition-shadow duration-500 group"
          >
            {/* Inner frame with photographic mask and subtle contrast */}
            <div className="relative w-full h-full rounded-[1.4rem] overflow-hidden bg-neutral-950 flex items-end justify-center">
              {/* Backlight reflection */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 -z-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 20%, oklch(72% 0.18 142 / 0.15) 0%, transparent 60%)",
                }}
              />

              {/* Portrait Image */}
              <img
                src="/portrait.png"
                alt="Mohammed Anas"
                className="w-full h-full object-cover object-top select-none pointer-events-none filter contrast-[1.05] brightness-[0.98]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.4) 92%, transparent 100%)",
                }}
                draggable={false}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040406] via-transparent to-transparent opacity-80" />

              {/* Floating metadata plate */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl liquid-glass-subtle flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">Mohammed Anas</span>
                  <span className="text-[10px] font-mono text-neutral-300">Founder &amp; Lead Builder</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10">
                  <Terminal size={12} style={{ color: "var(--color-accent)" }} />
                  <span className="text-[10px] font-mono text-neutral-200 font-semibold">NEXAURA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
