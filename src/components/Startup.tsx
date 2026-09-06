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
    <section id="startup" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="startup-content glass border border-white/10 rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <span className="text-sm font-bold tracking-[0.3em] text-gray-400 mb-8 block">MY STARTUP</span>
          
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10">
            {PORTFOLIO_DATA.startup.heading}
          </h2>
          
          <h3 className="text-2xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-8">
            {PORTFOLIO_DATA.startup.name}
          </h3>
          
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
            {PORTFOLIO_DATA.startup.description.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <a href="#contact" className="inline-block px-10 py-5 bg-white text-black font-bold tracking-wider rounded-full hover:bg-gray-200 transition-colors">
            WORK WITH US
          </a>
        </div>
      </div>
    </section>
  );
}
