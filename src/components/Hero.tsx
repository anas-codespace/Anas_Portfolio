"use client";

import { useEffect, useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { ArrowUpRight, Mail } from "lucide-react";
import ThreePortrait from "./ThreePortrait";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          ".hero-fade",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );

        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.95, filter: "brightness(0.5)" },
          { opacity: 1, scale: 1, filter: "brightness(1)", duration: 2, ease: "power2.out" },
          "-=1"
        );

        tl.fromTo(
          ".bg-ring",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 3, ease: "power2.out" },
          "-=2"
        );
        
        tl.fromTo(
          ".floating-obj",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: "power2.out" },
          "-=2"
        );

        // Floating animation for geometries — only when the user hasn't opted out of motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReduced) {
          gsap.to(".float-1", { y: -20, rotation: 15, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".float-2", { y: 25, rotation: -20, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".float-3", { x: 15, y: -15, rotation: 45, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".float-4", { y: -30, rotation: -10, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".float-5", { x: -10, y: 15, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".float-6", { y: -25, rotation: 25, duration: 5.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
        }

        // Mouse Parallax
        if (window.innerWidth > 768) {
          const hero = containerRef.current;
          if (hero) {
            hero.addEventListener("mousemove", (e) => {
              const { clientX, clientY } = e;
              const xPos = (clientX / window.innerWidth - 0.5) * 2;
              const yPos = (clientY / window.innerHeight - 0.5) * 2;

              gsap.to(portraitRef.current, {
                x: xPos * -15,
                y: yPos * -10,
                duration: 1,
                ease: "power2.out"
              });

              gsap.to(".bg-ring", { x: xPos * 20, y: yPos * 15, duration: 1.5, ease: "power2.out" });
              gsap.to(".floating-obj", { x: xPos * 40, y: yPos * 30, duration: 2, ease: "power2.out" });
            });
            
            hero.addEventListener("mouseleave", () => {
              gsap.to([portraitRef.current, ".bg-ring", ".floating-obj"], {
                x: 0,
                y: 0,
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
    <section ref={containerRef} className="relative min-h-screen w-full bg-black flex items-center pt-32 pb-20">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 bg-[#030305] -z-50" />
      
      {/* Subtle star/particle background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSI4IiByPSIxLjUiIG9wYWNpdHk9Ii40Ii8+PGNpcmNsZSBjeD0iMTg1IiBjeT0iMTI1IiByPSIxIiBvcGFjaXR5PSIuMiIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9IjIzNSIgcj0iMS41IiBvcGFjaXR5PSIuNSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjM1MCIgcj0iMiIgb3BhY2l0eT0iLjMiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjI4MCIgcj0iMSIgb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] opacity-40 -z-40" />

      {/* Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full -z-40 pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
        <line x1="30%" y1="20%" x2="50%" y2="45%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="50%" y1="45%" x2="70%" y2="15%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="30%" cy="20%" r="2" fill="white" />
        <circle cx="50%" cy="45%" r="1.5" fill="white" />
        <circle cx="70%" cy="15%" r="2" fill="white" />
      </svg>

      {/* Single structured gradient — deliberate, not two ambient blobs */}
      <div className="absolute top-0 right-0 w-[70%] h-full -z-40 pointer-events-none" style={{
        background: "conic-gradient(from 210deg at 75% 40%, oklch(72% 0.18 142 / 0.06) 0deg, transparent 60deg, oklch(62% 0.16 232 / 0.04) 180deg, transparent 240deg)",
      }} />

      {/* The glowing ring system */}
      <div className="bg-ring absolute top-[50%] right-[0%] md:right-[5%] -translate-y-1/2 w-[450px] h-[450px] md:w-[900px] md:h-[900px] rounded-full flex items-center justify-center -z-30 pointer-events-none">
        {/* Outer subtle ring */}
        <div className="absolute w-full h-full border-[2px] border-blue-400/20 rounded-full shadow-[0_0_120px_rgba(59,130,246,0.2)]" />
        {/* Inner bright ring */}
        <div className="absolute w-[92%] h-[92%] border-[2px] border-blue-300/40 rounded-full shadow-[0_0_100px_rgba(59,130,246,0.3),inset_0_0_50px_rgba(59,130,246,0.2)]" />
        {/* Inner glow core */}
        <div className="w-[85%] h-[85%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Single anchor geometry — bottom-left depth element */}
      <div className="floating-obj float-2 absolute bottom-[10%] left-[25%] md:left-[35%] w-40 h-40 md:w-56 md:h-56 opacity-70 z-20 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon points="50,5 85,35 50,65" fill="#999" />
          <polygon points="50,5 50,65 15,35" fill="#fff" />
          <polygon points="15,35 50,65 25,95" fill="#333" />
          <polygon points="50,65 85,35 75,95" fill="#111" />
          <polygon points="50,65 75,95 25,95" fill="#000" />
        </svg>
      </div>

      {/* Terrain / Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-[45vh] bg-gradient-to-t from-black via-black/95 to-transparent z-10 pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="container mx-auto px-8 relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-between pb-10">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center pt-20 md:pt-0">
          
          {/* Badge */}
          <div className="hero-fade flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300">DEVELOPER</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-fade text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] font-black tracking-tighter leading-[0.9] mb-4 w-full" style={{ overflowWrap: "anywhere" }}>
            <span className="text-white">HEY. I'M</span> <br />
            <span className="text-white pr-4 py-2 -my-2">ANAS</span>
            <span style={{ color: "var(--color-accent)" }} className="-ml-2">.</span>
          </h1>

          {/* Subheadline */}
          <h2 className="hero-fade text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-200 mb-6">
            Developer. Vibe Coder. <span style={{ color: "var(--color-accent)" }}>Builder.</span>
          </h2>

          {/* Description */}
          <p className="hero-fade text-sm lg:text-[15px] text-gray-400 max-w-[420px] leading-relaxed mb-10">
            {PORTFOLIO_DATA.personal.heroSupportingText}
          </p>

          {/* Buttons */}
          <div className="hero-fade flex flex-wrap gap-5">
            <a href="#projects" className="group flex items-center justify-center gap-3 px-8 py-4 text-black font-bold tracking-widest text-xs rounded-full hover:scale-105 transition-all duration-300" style={{ background: "var(--color-accent)", boxShadow: "0 0 30px var(--color-accent-glow)" }}>
              View my work
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a 
              href={`mailto:anas.m77581@gmail.com?subject=Website%20Inquiry&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20website%20or%20digital%20project%20with%20you.%0A%0AThanks!`}
              className="group flex items-center justify-center gap-3 px-8 py-4 border border-white/20 bg-[#0a0a0a]/50 backdrop-blur-md text-white font-bold tracking-widest text-xs rounded-full hover:bg-white/10 hover:border-white/40 transition-colors duration-300"
              aria-label="Email Anas"
            >
              Let's build
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-fade mt-24 flex-col gap-4 hidden md:flex">
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-600 uppercase">Scroll</span>
            <div className="flex items-center gap-4">
              <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
              </div>
              <div className="w-24 h-[1px] bg-gradient-to-r from-gray-600 to-transparent" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Portrait */}
        <div className="w-full md:w-1/2 relative flex justify-center items-end h-[60vh] md:h-[80vh] lg:h-[90vh] mt-10 md:mt-0 pointer-events-none z-10">
          
          {/* Glowing Circles Behind Portrait */}
          <div className="bg-ring absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[550px] lg:h-[550px] rounded-full border border-blue-400/40 shadow-[0_0_50px_rgba(59,130,246,0.4),inset_0_0_30px_rgba(59,130,246,0.2)] pointer-events-none -z-10" />
          <div className="bg-ring absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[480px] sm:h-[480px] lg:w-[680px] lg:h-[680px] rounded-full border border-blue-300/10 border-dashed pointer-events-none -z-10 animate-[spin_60s_linear_infinite]" />

          {/* Floating Blue Sphere */}
          <div className="floating-obj float-1 absolute top-[25%] left-[15%] w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,1),inset_-5px_-5px_15px_rgba(0,0,0,0.6),inset_5px_5px_15px_rgba(255,255,255,0.7)] pointer-events-none -z-10" />

          {/* 3D Dark Geometry */}
          <svg className="floating-obj float-2 absolute top-[65%] right-[5%] w-20 h-20 md:w-28 md:h-28 opacity-90 drop-shadow-[0_0_20px_rgba(0,0,0,0.9)] pointer-events-none -z-10" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 90,30 50,55 10,30" fill="#2a2a2a" />
            <polygon points="10,30 50,55 50,95 10,75" fill="#111111" />
            <polygon points="90,30 90,75 50,95 50,55" fill="#1a1a1a" />
            <polygon points="50,10 10,30 10,75 50,95 90,75 90,30" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
          </svg>

          {/* Wireframe Sci-fi Object */}
          <svg className="floating-obj float-3 absolute top-[30%] right-[15%] w-12 h-12 md:w-16 md:h-16 opacity-70 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] pointer-events-none -z-10" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
            <polygon points="50,15 85,50 50,85 15,50" stroke="#3b82f6" strokeWidth="1.5" fill="rgba(59,130,246,0.15)" />
          </svg>

          {/* Small Glowing White Particle */}
          <div className="floating-obj float-4 absolute top-[75%] left-[20%] w-4 h-4 md:w-6 md:h-6 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_40px_rgba(59,130,246,0.9)] pointer-events-none -z-10" />

          {/* The new True 3D Interactive Portrait */}
          <div ref={portraitRef} className="absolute inset-0 z-10 flex justify-center items-end pointer-events-auto">
            <ThreePortrait />
          </div>


        </div>
      </div>

      {/* --- FLOATING SOCIAL BAR (RIGHT) --- */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 py-8 px-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md z-40">
        <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        </a>
        <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a 
          href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Website%20Inquiry&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20website%20or%20digital%20project%20with%20you.%0A%0AThanks!`} 
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Email Anas"
        >
          <Mail size={20} />
        </a>
        <div className="flex flex-col items-center mt-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.9)] mt-1" />
        </div>
      </div>

    </section>
  );
}
