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
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 text-center uppercase">
          I BUILD IDEAS <br className="hidden md:block"/> INTO EXPERIENCES.
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {PORTFOLIO_DATA.services.map((service) => (
            <div 
              key={service.id} 
              className="service-card glass rounded-3xl p-10 flex flex-col justify-between h-[400px] border border-white/5 hover:border-white/20 transition-colors group cursor-crosshair"
            >
              <div>
                <span className="text-5xl font-black text-white/10 mb-8 block">{service.id}</span>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
