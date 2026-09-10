"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";

export default function Startup() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".startup-content",
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          }
        );
      }, containerRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section id="startup" ref={containerRef} className="relative py-32 overflow-visible">
      {/* Background structured glow instead of ambient blob */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] pointer-events-none -z-10" style={{
        background: "radial-gradient(ellipse at center, oklch(72% 0.18 142 / 0.08) 0%, transparent 70%)"
      }} />
      
      <div className="container mx-auto px-6">
        <div className="startup-content glass border border-white/10 rounded-[2rem] p-12 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <span className="font-mono text-xs tracking-wider text-gray-500 mb-8 block uppercase">My Startup</span>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
            {PORTFOLIO_DATA.startup.heading}
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8" style={{ color: "var(--color-accent)" }}>
            {PORTFOLIO_DATA.startup.name}
          </h3>
          
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {PORTFOLIO_DATA.startup.description.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <a href="#contact" className="inline-block px-8 py-4 font-bold tracking-widest text-xs rounded-full hover:scale-105 transition-transform text-black" style={{ background: "var(--color-accent)", boxShadow: "0 0 20px var(--color-accent-glow)" }}>
            Work with us
          </a>
        </div>
      </div>
    </section>
  );
}
