"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Horizontal scroll effect or staggered reveal
        gsap.fromTo(
          ".service-card",
          { y: 100, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );

        // Optional mouse movement parallax for cards
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card) => {
          card.addEventListener('mousemove', (e: any) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(card, {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              ease: "power2.out",
              duration: 0.5
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              ease: "power2.out",
              duration: 0.5
            });
          });
        });

      }, containerRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Section heading — left-aligned, not centered */}
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          I build ideas <br className="hidden md:block" />
          <span style={{ color: "var(--color-accent)" }}>into experiences.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-16 max-w-sm leading-relaxed">
          Here's what I bring to projects — the work I do and how I do it.
        </p>

        <div ref={cardsRef} className="flex flex-col gap-6">
          {/* Featured first card — full width */}
          {PORTFOLIO_DATA.services[0] && (
            <div
              key={PORTFOLIO_DATA.services[0].id}
              className="service-card glass rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/5 hover:border-white/15 transition-colors group cursor-default"
              style={{ minHeight: "220px" }}
            >
              <div className="flex-1">
                <span className="text-6xl md:text-8xl font-black mb-4 block transition-all duration-500 origin-left" style={{ color: "var(--color-accent)", opacity: 0.15 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.15")}
                >
                  {PORTFOLIO_DATA.services[0].id}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-3">{PORTFOLIO_DATA.services[0].title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed md:max-w-sm md:text-right">{PORTFOLIO_DATA.services[0].description}</p>
            </div>
          )}

          {/* Remaining cards — 2-column asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.services.slice(1).map((service, idx) => (
              <div
                key={service.id}
                className={`service-card glass rounded-2xl p-10 flex flex-col justify-between border border-white/5 hover:border-white/15 transition-colors group cursor-default ${idx === 0 ? "md:col-span-1" : ""}`}
                style={{ minHeight: "320px" }}
              >
                <span className="text-5xl font-black mb-6 block transition-all duration-500 origin-left" style={{ color: "var(--color-accent)", opacity: 0.12 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.35")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.12")}
                >
                  {service.id}
                </span>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
