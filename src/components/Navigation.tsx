"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "BUILDING", href: "#startup" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-8 md:px-12 py-6",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      {/* Left: Logo */}
      <a href="#" className="flex items-center gap-2">
        <span className="font-bold tracking-[0.4em] text-lg text-white">
          A N A S
        </span>
        <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
      </a>
      
      {/* Center: Links */}
      <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest text-gray-300">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-white transition-colors duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Right: CTA */}
      <a 
        href="mailto:anas.m77581@gmail.com?subject=Website%20Inquiry&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20website%20or%20digital%20project%20with%20you.%0A%0AThanks!" 
        className="hidden md:flex items-center gap-3 px-5 py-2.5 border border-white/20 rounded-full text-[10px] font-bold tracking-widest text-white hover:bg-white/10 transition-colors group"
        aria-label="Email Anas"
      >
        LET'S CONNECT
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>

      {/* Mobile menu icon */}
      <div className="md:hidden text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </nav>
  );
}
