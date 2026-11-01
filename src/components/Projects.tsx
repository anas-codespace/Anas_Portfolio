"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { ExternalLink, ArrowUpRight } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const projects = document.querySelectorAll(".project-card");

        projects.forEach((project) => {
          gsap.fromTo(
            project,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 80%",
              },
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    };

    loadGSAP();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#040406] border-t border-white/[0.06] scroll-mt-16"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Featured Projects.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Real applications engineered with attention to user flow, visual restraint, and modern stack performance.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-20 lg:space-y-28">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className="project-card liquid-glass liquid-sheen rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Preview Frame with Liquid Border */}
                  <div className="w-full lg:w-[55%]">
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 group">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.name} preview`}
                          className="w-full h-full object-cover object-top filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono text-xs">
                          Preview Unavailable
                        </div>
                      )}

                      {/* Subtle filmic vignette overlay */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Metadata & Description */}
                  <div className="w-full lg:w-[45%] flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs font-bold tracking-wider text-neutral-500">
                        PROJECT {project.id}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span
                        className="text-[11px] font-mono uppercase tracking-wider font-semibold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Web Application
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                      {project.name}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-[15px] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Badges in Frosted Liquid Sub-glass */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.split(", ").map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-3 py-1 rounded-full liquid-glass-subtle text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-press liquid-btn-primary group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-black font-bold text-xs"
                        >
                          Live Application
                          <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-press liquid-btn group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium text-xs"
                        >
                          <GithubIcon size={13} />
                          Repository
                        </a>
                      )}
                    </div>
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
