"use client";

import { useEffect, useRef } from "react";
import { Terminal, Cpu, Layout, Wrench, CheckCircle2 } from "lucide-react";

const SKILL_DOMAINS = [
  {
    id: "frontend",
    title: "Frontend & UI Engineering",
    icon: Layout,
    description: "Building responsive, composite-optimized user interfaces with fluid motion and design systems.",
    items: [
      { name: "React 19 / Next.js", level: "Primary Framework" },
      { name: "TypeScript", level: "Type-Safe Systems" },
      { name: "Tailwind CSS", level: "Design Systems & Utility" },
      { name: "HTML5 / Semantic Web", level: "Standards & A11y" },
      { name: "CSS / Motion Design", level: "Composite 60fps Animation" },
    ],
  },
  {
    id: "ai",
    title: "AI Workflows & Vibe Coding",
    icon: Cpu,
    description: "Accelerating the development lifecycle using agentic AI, prompt synthesis, and fast iteration loops.",
    items: [
      { name: "AI-Assisted Development", level: "Core Velocity" },
      { name: "Gemini & LLM Integration", level: "API Services & Agents" },
      { name: "Rapid Prototyping", level: "Idea to Live URL" },
      { name: "Modern Developer Agents", level: "Automated Engineering" },
    ],
  },
  {
    id: "languages",
    title: "Programming & Foundations",
    icon: Terminal,
    description: "Academic computer science foundations paired with practical scripting and problem solving.",
    items: [
      { name: "JavaScript (ESNext)", level: "Advanced Asynchronous" },
      { name: "Python", level: "Scripting & Core Basics" },
      { name: "Java", level: "Object-Oriented Programming" },
      { name: "Data Structures (BCA)", level: "Academic Curriculum" },
    ],
  },
  {
    id: "ecosystem",
    title: "Ecosystem, Data & Cloud",
    icon: Wrench,
    description: "Production infrastructure, collaboration, and modern database platforms.",
    items: [
      { name: "Git & GitHub", level: "Version Control & CI" },
      { name: "Supabase / PostgreSQL", level: "Backend & Auth" },
      { name: "Firebase", level: "Realtime Store & Auth" },
      { name: "Netlify / Vercel", level: "Edge Hosting & DNS" },
    ],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".skill-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
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

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-black border-t border-white/[0.06] scroll-mt-16"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            Capabilities &amp; Stack
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Technical Stack &amp; Workflow.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            A purposeful toolkit balanced between modern frontend engineering, AI-accelerated workflows, and computer science foundations.
          </p>
        </div>

        {/* 4-Domain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="skill-card liquid-glass liquid-sheen rounded-3xl p-7 md:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-200 group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/[0.06]">
                    <div className="w-11 h-11 rounded-xl liquid-glass-subtle flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <Icon size={20} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{domain.title}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{domain.description}</p>
                    </div>
                  </div>

                  {/* Skills Checklist with Liquid Sub-elements */}
                  <div className="space-y-3">
                    {domain.items.map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-xl liquid-glass-subtle hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={14} style={{ color: "var(--color-accent)" }} className="opacity-90" />
                          <span className="text-xs sm:text-sm font-medium text-neutral-200">{skill.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                          {skill.level}
                        </span>
                      </div>
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
