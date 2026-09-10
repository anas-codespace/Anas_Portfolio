"use client";

import { PORTFOLIO_DATA } from "@/data/config";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative pt-32 pb-10 bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Main CTA block — left-aligned, no orphan */}
        <div className="flex flex-col items-start max-w-4xl mb-28">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            Let's build something real.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-lg leading-relaxed">
            Have an idea, website or digital product in mind? Let's turn it into something worth using.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Website%20Inquiry&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20website%20or%20digital%20project%20with%20you.%0A%0AThanks!`}
              className="flex items-center gap-3 px-8 py-4 text-black font-bold rounded-full hover:opacity-90 transition-all group"
              style={{ background: "var(--color-accent)" }}
              aria-label="Email Anas"
            >
              <Mail size={18} />
              Email me
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-white/20 hover:bg-white/10 font-bold rounded-full transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left w-full max-w-2xl border-t border-white/10 pt-16">
            <div>
              <span className="block text-xs font-bold tracking-widest text-gray-600 mb-2 uppercase">Email</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Website%20Inquiry`}
                className="text-xl hover:text-gray-300 transition-colors"
                aria-label="Email Anas"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-widest text-gray-600 mb-2 uppercase">Company</span>
              <span className="text-xl">{PORTFOLIO_DATA.startup.name}</span>
            </div>
          </div>
        </div>

        {/* Footer — Ft5 statement close */}
        <footer className="border-t border-white/10 pt-10">
          {/* Statement line */}
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-8" style={{ color: "var(--color-accent)" }}>
            Available for freelance &amp; collaboration
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex flex-col items-start">
              <span className="font-bold tracking-widest text-white mb-1">ANAS</span>
              <span>Developer · Vibe Coder · Builder</span>
            </div>
            <p className="md:text-right w-full md:w-auto text-left">
              &copy; 2026 Anas. Built with code, AI &amp; curiosity.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

