"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { name: "About",    href: "#about"   },
    { name: "Skills",   href: "#skills"  },
    { name: "Projects", href: "#projects"},
    { name: "Building", href: "#startup" },
    { name: "Contact",  href: "#contact" },
  ];

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-700 flex items-center justify-between px-8 md:px-12 py-6",
          isScrolled ? "bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-[2px] pb-10" : "bg-transparent"
        )}
      >
        {/* Wordmark */}
        <a href="#" className="flex items-center gap-2 z-[101]">
          <span className="font-bold tracking-[0.4em] text-lg text-white">A N A S</span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent-glow)" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-widest text-gray-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Website%20Inquiry&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you.%0A%0AThanks!`}
          className="hidden md:flex items-center gap-3 px-5 py-2.5 border border-white/20 rounded-full text-[10px] font-bold tracking-widest text-white hover:bg-white/10 transition-colors group"
          aria-label="Email Anas"
        >
          Let's connect
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-[101] text-white p-2 -mr-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: "var(--color-accent)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-[99] flex flex-col justify-center px-10 md:hidden",
          "bg-black/96 backdrop-blur-xl",
          "transition-opacity duration-400",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-5xl font-black tracking-tighter text-white transition-colors duration-200"
              style={{
                transitionDelay: menuOpen ? `${i * 55}ms` : "0ms",
                color: "white",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Website%20Inquiry`}
          onClick={() => setMenuOpen(false)}
          className="mt-14 self-start flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors"
          aria-label="Email Anas"
        >
          Let's connect
          <ArrowUpRight size={14} />
        </a>

        <div className="absolute bottom-10 left-10 right-10 flex justify-between text-[10px] text-gray-600 font-medium tracking-widest uppercase">
          <span>Anas</span>
          <span>Portfolio 2026</span>
        </div>
      </div>
    </>
  );
}

