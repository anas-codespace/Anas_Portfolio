"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { ExternalLink } from "lucide-react";

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
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: "top 80%",
              }
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    };
    
    loadGSAP();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">
          THINGS I'VE BUILT.
        </h2>

        <div className="space-y-32">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <div key={project.id} className="project-card flex flex-col md:flex-row gap-12 items-center group">
              <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-[1.02] bg-black">
                  {/* Project Image Fallback Background */}
                  <div className="fallback-bg absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center -z-10">
                    <span className="text-3xl font-black text-white/10 tracking-widest text-center px-4">{project.name.toUpperCase()}</span>
                  </div>
                  
                  {/* Project Image Blurred Background Layer */}
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 transition-all duration-700 group-hover:scale-125 group-hover:opacity-50"
                      aria-hidden="true"
                    />
                  )}

                  {/* Project Image Foreground */}
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={`${project.name} preview`} 
                      className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 z-10 scale-95 group-hover:scale-100 drop-shadow-2xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0';
                        setTimeout(() => (e.target as HTMLImageElement).style.display = 'none', 500);
                      }}
                    />
                  )}
                  
                  {/* Overlay for cinematic feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-20" />
                </div>
              </div>
              
              <div className={`w-full md:w-1/2 flex flex-col gap-6 ${index % 2 !== 0 ? 'md:order-1 md:items-end md:text-right' : ''}`}>
                <span className="text-sm tracking-widest font-bold text-gray-500">PROJECT {project.id}</span>
                <h3 className="text-3xl md:text-5xl font-bold">{project.name}</h3>
                
                <p className="text-gray-400 text-lg leading-relaxed glass p-6 rounded-xl border-l-4 border-l-white/20">
                  {project.description}
                </p>
                
                <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                  {project.tech.split(", ").map((tech, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={`flex gap-4 pt-4 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black font-semibold rounded-full transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                      <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                    GITHUB
                  </a>
                  {project.liveDemo && project.liveDemo !== "No Live Demo — College Final-Year Project" && (
                    <a 
                      href={project.liveDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 font-semibold rounded-full transition-all"
                    >
                      <ExternalLink size={18} />
                      LIVE DEMO
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
