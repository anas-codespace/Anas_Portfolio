"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const SKILL_CATEGORIES = [
  {
    id: "web",
    title: "WEB",
    align: "left",
    skills: [
      { name: "HTML", level: "Working Knowledge", desc: "Used for structural web markup." },
      { name: "CSS", level: "Working Knowledge", desc: "Used for styling and layout." },
      { name: "JavaScript", level: "Working Knowledge", desc: "Used for interactive web experiences." },
    ]
  },
  {
    id: "programming",
    title: "PROGRAMMING",
    align: "left",
    skills: [
      { name: "Python", level: "Basic", desc: "Basic programming and scripting knowledge." },
      { name: "Java", level: "Basic", desc: "Basic object-oriented programming knowledge." },
    ]
  },
  {
    id: "tools",
    title: "TOOLS",
    align: "right",
    skills: [
      { name: "GitHub", level: "Working Knowledge", desc: "Project collaboration and sharing." },
    ]
  },
  {
    id: "workflow",
    title: "WORKFLOW",
    align: "right",
    skills: [
      { name: "AI-Assisted Development", level: "Core Workflow", desc: "Using AI tools to accelerate development and experimentation." },
    ]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Section reveal
        gsap.fromTo(
          ".skills-header",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
        );

        // Center element
        gsap.fromTo(
          orbRef.current,
          { scale: 0.8, opacity: 0, rotationY: -30 },
          { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 60%" } }
        );

        // Slow idle rotation for the center orb
        gsap.to(".vibe-orb-inner", {
          rotationY: 360,
          rotationX: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });

        // Categories reveal
        gsap.fromTo(
          ".skill-category",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 50%" } }
        );

        // Mouse Parallax for Orb
        if (window.innerWidth > 768) {
          const section = containerRef.current;
          if (section) {
            section.addEventListener("mousemove", (e) => {
              const rect = section.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;

              gsap.to(orbRef.current, {
                x: x * 40,
                y: y * 40,
                rotationY: x * 15,
                rotationX: y * -15,
                duration: 1.5,
                ease: "power2.out"
              });
            });
            
            section.addEventListener("mouseleave", () => {
              gsap.to(orbRef.current, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                duration: 1.5,
                ease: "power2.out"
              });
            });
          }
        }
      }, containerRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative py-32 bg-black overflow-visible perspective-1000">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="skills-header text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            TOOLS I SPEAK.
          </h2>
          <p className="text-lg text-gray-400">
            Technologies, tools and workflows I use to turn ideas into digital experiences.
          </p>
        </div>

        {/* Desktop Layout: 3 Columns */}
        <div className="hidden md:flex justify-between items-center gap-8 max-w-7xl mx-auto">
          
          {/* Left Column */}
          <div className="w-1/3 flex flex-col gap-12 lg:gap-16">
            {SKILL_CATEGORIES.filter(c => c.align === "left").map(category => (
              <SkillCategory 
                key={category.id} 
                category={category} 
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
          </div>

          {/* Center Orb */}
          <div className="w-1/3 flex justify-center items-center relative h-[500px]">
             <div ref={orbRef} className="relative w-full aspect-square max-w-[350px] flex items-center justify-center transform-gpu">
                {/* Glow */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-[60px]" />
                
                {/* 3D Orb Structure */}
                <div className="vibe-orb-inner absolute inset-0 rounded-full border border-white/20" style={{ transformStyle: 'preserve-3d' }} />
                <div className="vibe-orb-inner absolute inset-0 rounded-full border border-white/10 rotate-45" style={{ transformStyle: 'preserve-3d' }} />
                <div className="vibe-orb-inner absolute inset-0 rounded-full border border-white/10 -rotate-45" style={{ transformStyle: 'preserve-3d' }} />
                
                {/* Content */}
                <div 
                  className={clsx(
                    "group relative z-10 p-10 rounded-full glass border-white/20 flex flex-col items-center justify-center text-center transition-all duration-500 cursor-default shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] hover:scale-105 hover:bg-white/10",
                    hoveredSkill && hoveredSkill !== "Vibe Coding" ? "opacity-30" : "opacity-100"
                  )}
                  onMouseEnter={() => setHoveredSkill("Vibe Coding")}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <span className="text-xs font-bold tracking-[0.3em] text-gray-400 mb-2 group-hover:text-white transition-colors">CORE WORKFLOW</span>
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter leading-none mb-3">VIBE <br /> CODING</h3>
                  
                  {/* Subtle description appears on hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:mt-2">
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-300 max-w-[200px]">My approach to building ideas rapidly with code + AI.</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Column */}
          <div className="w-1/3 flex flex-col gap-12 lg:gap-16">
            {SKILL_CATEGORIES.filter(c => c.align === "right").map(category => (
              <SkillCategory 
                key={category.id} 
                category={category} 
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
                alignRight
              />
            ))}
          </div>

        </div>


        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col md:hidden gap-12">
          
          {/* Vibe Coding Top */}
          <div className="flex justify-center mb-4">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-[40px]" />
              <div className="relative z-10 p-8 rounded-full glass border-white/20 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400 mb-2">CORE WORKFLOW</span>
                <h3 className="text-3xl font-black tracking-tighter leading-none mb-4">VIBE <br /> CODING</h3>
                <p className="text-xs text-gray-400">My approach to building ideas rapidly with code + AI.</p>
              </div>
            </div>
          </div>

          {SKILL_CATEGORIES.map(category => (
            <div key={category.id} className="flex flex-col">
              <h3 className="text-sm font-bold tracking-[0.2em] text-gray-500 mb-6 border-b border-white/10 pb-2">
                {category.title}
              </h3>
              <div className="flex flex-col gap-4">
                {category.skills.map(skill => (
                  <div key={skill.name} className="flex flex-col p-5 glass rounded-2xl border border-white/5">
                    <div className="flex flex-col mb-3 gap-1">
                      <span className="font-bold text-white text-lg">{skill.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

function SkillCategory({ category, hoveredSkill, setHoveredSkill, alignRight = false }: { category: any, hoveredSkill: string | null, setHoveredSkill: any, alignRight?: boolean }) {
  return (
    <div className={clsx("skill-category flex flex-col", alignRight ? "items-end text-right" : "items-start text-left")}>
      <h3 className="text-xs font-bold tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-4">
        {alignRight && <span className="h-[1px] w-8 lg:w-12 bg-white/20 block" />}
        {category.title}
        {!alignRight && <span className="h-[1px] w-8 lg:w-12 bg-white/20 block" />}
      </h3>
      
      <div className={clsx("flex flex-col gap-2 w-full", alignRight ? "items-end" : "items-start")}>
        {category.skills.map((skill: any) => {
          const isHovered = hoveredSkill === skill.name;
          const isDimmed = hoveredSkill !== null && hoveredSkill !== skill.name;
          
          return (
            <div 
              key={skill.name}
              className={clsx(
                "relative group cursor-default transition-all duration-500 rounded-2xl p-4 lg:p-5 max-w-[280px] lg:max-w-sm w-full",
                isHovered ? "bg-white/5 border border-white/20 scale-105 z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "bg-transparent border border-transparent",
                isDimmed ? "opacity-30" : "opacity-100"
              )}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={clsx("flex flex-col gap-1", alignRight ? "items-end" : "items-start")}>
                <span className={clsx("font-bold text-lg transition-colors", isHovered ? "text-white" : "text-gray-300")}>{skill.name}</span>
                <span className="text-[10px] lg:text-xs uppercase tracking-widest text-gray-500 font-bold">{skill.level}</span>
                
                {/* Description reveal using grid rows trick for smooth height transition */}
                <div className={clsx(
                  "grid transition-all duration-500 opacity-0",
                  isHovered ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr]"
                )}>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-400">{skill.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
