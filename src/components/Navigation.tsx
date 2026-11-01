"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Stack", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Nexaura", href: "#startup" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-[100] transition-[background-color,border-color,padding,box-shadow] duration-300 flex items-center justify-between px-6 sm:px-10 lg:px-12",
          isScrolled
            ? "py-3.5 liquid-nav"
            : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        {/* Wordmark with Liquid Indicator */}
        <a href="#" className="flex items-center gap-2.5 z-[101] group">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-subtle">
            <span className="font-bold tracking-[0.22em] text-xs text-white font-mono group-hover:text-neutral-200 transition-colors">
              M. ANAS
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "var(--color-accent)",
                boxShadow: "0 0 8px var(--color-accent-glow)",
              }}
            />
          </div>
        </a>

        {/* Desktop Liquid Glass Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full liquid-glass-subtle text-[11px] font-mono tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all duration-160 relative"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Liquid CTA */}
        <a
          href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Project%20Inquiry%20via%20Portfolio`}
          className="btn-press liquid-btn hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-wider text-white group"
          aria-label="Email Anas"
        >
          Let&apos;s Connect
          <ArrowUpRight
            size={13}
            className="transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative z-[101] text-white p-2 -mr-2 rounded-xl liquid-glass-subtle focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: "var(--color-accent)" }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-[99] flex flex-col justify-center px-8 md:hidden",
          "bg-black/85 backdrop-blur-2xl",
          "transition-[opacity,visibility] duration-300",
          menuOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-5 p-6 rounded-3xl liquid-glass">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-xl font-bold text-white hover:text-neutral-300 transition-colors py-1 px-2 rounded-xl hover:bg-white/5"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-white/10">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Project%20Inquiry`}
              className="btn-press liquid-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-black font-bold text-xs w-full"
            >
              Let&apos;s Connect
              <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
