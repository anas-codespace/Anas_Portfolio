"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/config";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative pt-28 md:pt-36 pb-12 bg-black border-t border-white/[0.06] scroll-mt-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main CTA block */}
        <div className="flex flex-col items-start max-w-4xl mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle text-xs font-mono text-neutral-300 mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            Initiate Collaboration
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.02]">
            Let&apos;s build something <br className="hidden sm:block" />
            <span style={{ color: "var(--color-accent)" }}>exceptional.</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-400 mb-10 max-w-xl leading-relaxed">
            Have a project, startup idea, or web experience you want to bring to life? I am open for select freelance commissions and technical collaborations.
          </p>

          {/* Liquid Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Project%20Inquiry%20from%20Portfolio&body=Hi%20Anas,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you.%0A%0AThanks!`}
              className="btn-press liquid-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-black font-bold text-xs"
              aria-label="Email Anas"
            >
              <Mail size={16} />
              Email Anas Directly
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="btn-press liquid-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-white font-medium text-xs"
              title="Copy Email Address"
            >
              {copied ? <Check size={14} style={{ color: "var(--color-accent)" }} /> : <Copy size={14} />}
              {copied ? "Email Copied" : "Copy Address"}
            </button>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press liquid-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-white font-medium text-xs"
            >
              <GithubIcon size={15} />
              GitHub
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press liquid-btn inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-white font-medium text-xs"
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
          </div>

          {/* Contact Details Grid inside Liquid Glass Capsule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-2xl p-6 rounded-2xl liquid-glass-subtle">
            <div>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Direct Email
              </span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-sm font-medium text-neutral-200 hover:text-white transition-colors"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>

            <div>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Studio Venture
              </span>
              <span className="text-sm font-medium text-neutral-200" style={{ color: "var(--color-accent)" }}>
                {PORTFOLIO_DATA.startup.name}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Availability
              </span>
              <span className="text-sm font-medium text-neutral-200">
                Open for Q4 &amp; 2026 Projects
              </span>
            </div>
          </div>
        </div>

        {/* Cinematic Footer */}
        <footer className="border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-white font-display text-sm">ANAS</span>
            <span>·</span>
            <span>Web Developer &amp; Founder</span>
          </div>

          <div className="flex items-center gap-6">
            <p>&copy; {new Date().getFullYear()} Mohammed Anas. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
