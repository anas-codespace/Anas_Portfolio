"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { Code2, Compass, Layers, Rocket } from "lucide-react";

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
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  const pillars = [
    {
      icon: Rocket,
      title: "Venture Builder",
      badge: "NEXAURA",
      description:
        "Founder of NEXAURA, focused on delivering high-end websites, interactive web applications, and digital solutions for modern businesses.",
    },
    {
      icon: Compass,
      title: "AI-Augmented Engineering",
      badge: "Vibe Coding",
      description:
        "Leveraging generative AI and rapid iteration workflows to build fully-functional, high-fidelity prototypes and scalable products at speed.",
    },
    {
      icon: Code2,
      title: "Full-Stack Development",
      badge: "Next.js & React",
      description:
        "Specializing in responsive architectures, Tailwind CSS design systems, TypeScript, Supabase, and clean UI engineering.",
    },
    {
      icon: Layers,
      title: "Computer Applications",
      badge: "BCA Candidate",
      description:
        "Pairing academic computer science foundations in algorithms, Python, and Java with continuous hands-on production builds.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#040406] border-t border-white/[0.06] scroll-mt-16"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="about-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-6 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
              Profile &amp; Perspective
            </div>

            <h2 className="about-reveal text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white mb-8 leading-[1.05]">
              Building at the intersection of craft, code, and modern AI.
            </h2>

            <div className="about-reveal space-y-5 text-neutral-400 text-base lg:text-[16px] leading-relaxed max-w-xl">
              <p>
                I am <span className="text-white font-medium">Anas</span>, a BCA student, web developer, and the founder of{" "}
                <span className="text-white font-medium" style={{ color: "var(--color-accent)" }}>
                  NEXAURA
                </span>
                . I build web applications and digital products that prioritize visual refinement, immediate responsiveness, and clean architecture.
              </p>
              <p>
                Rather than treating coding as isolated syntax, I embrace modern AI-assisted engineering (&ldquo;vibe coding&rdquo;) to shorten the gap between an abstract vision and deployed, working software.
              </p>
              <p>
                From interactive web applications like <span className="text-neutral-200">VibeTune</span> and <span className="text-neutral-200">ARTFIQ</span> to client web development, I aim to create software people enjoy using.
              </p>
            </div>

            {/* Quick credentials tag inside Liquid Glass Capsule */}
            <div className="about-reveal mt-10 p-4 rounded-2xl liquid-glass-subtle flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-300">
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Location</span>
                <span className="text-white font-bold">India</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Degree</span>
                <span className="text-white font-bold">BCA (In Progress)</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <span className="text-neutral-500 block uppercase text-[10px]">Studio</span>
                <span className="text-white font-bold" style={{ color: "var(--color-accent)" }}>
                  Nexaura
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 Pillars Liquid Glass Matrix */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="about-reveal liquid-glass liquid-sheen p-6 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl liquid-glass-subtle flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon size={18} style={{ color: "var(--color-accent)" }} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full liquid-glass-subtle text-neutral-300">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 tracking-tight">{pillar.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
