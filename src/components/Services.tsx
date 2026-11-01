"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Code, Laptop, Sparkles } from "lucide-react";

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".service-card",
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

  const serviceItems = [
    {
      id: "01",
      icon: Code,
      title: "Web Engineering & Design",
      subtitle: "Production Frontend Platforms",
      description:
        "Building tailored, highly responsive websites and interactive web experiences utilizing Next.js, React, TypeScript, and modern CSS architectures designed for speed and conversions.",
      deliverables: ["Responsive Architecture", "Next.js & React 19", "SEO & Performance Optimization"],
    },
    {
      id: "02",
      icon: Sparkles,
      title: "Autonomous AI Workflows",
      subtitle: "Vibe Coding & Rapid Prototyping",
      description:
        "Accelerating concept-to-product cycles using generative AI development tools, custom LLM APIs, and intelligent assistant integrations that give software an interactive edge.",
      deliverables: ["AI Model & Agent Integration", "Rapid Product Prototyping", "Conversational AI Systems"],
    },
    {
      id: "03",
      icon: Laptop,
      title: "Digital Products & Systems",
      subtitle: "End-to-End Solutions",
      description:
        "Designing, developing, and publishing real-world digital experiences, enterprise dashboards, and startup platforms from initial scope to live deployment.",
      deliverables: ["Supabase & Firebase Backends", "Component Design Systems", "Zero-Downtime Deployment"],
    },
  ];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#040406] border-t border-white/[0.06] scroll-mt-16"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            Services &amp; Engagement
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Transforming concepts <br className="hidden sm:block" />
            into digital reality.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            What I bring to projects — combining modern design aesthetics, full-stack engineering, and AI velocity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {serviceItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="service-card liquid-glass liquid-sheen rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-200 group"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.06]">
                    <span
                      className="text-4xl font-black font-mono tracking-tight text-neutral-600 group-hover:text-neutral-200 transition-colors"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {item.id}
                    </span>
                    <div className="w-11 h-11 rounded-xl liquid-glass-subtle flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon size={18} style={{ color: "var(--color-accent)" }} />
                    </div>
                  </div>

                  {/* Titles */}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1 font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4">{item.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed mb-8">{item.description}</p>
                </div>

                {/* Deliverables Pills */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-3 font-semibold">
                    Key Highlights
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-3 py-1 rounded-full liquid-glass-subtle text-neutral-300"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
