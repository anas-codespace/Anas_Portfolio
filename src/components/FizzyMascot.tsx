"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export default function FizzyMascot({
  isOpen, isLoading, toggleChat, currentSection = "HOME",
}: {
  isOpen: boolean; isLoading: boolean; toggleChat: () => void; currentSection?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const soundPlayedRef = useRef(false);

  // Only render on the client after hydration to avoid SSR mismatch
  useEffect(() => { setMounted(true); }, []);

  const shouldBeVisible = !isOpen && currentSection === "HOME";

  const playHeySound = useCallback(() => {
    if (soundPlayedRef.current) return;
    soundPlayedRef.current = true;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Hey There!");
      utterance.pitch = 1.15; utterance.rate = 0.92; utterance.volume = 0.95;
      const pickVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferred =
          voices.find((v) => v.name === "Google US English") ||
          voices.find((v) => v.name === "Samantha") ||
          voices.find((v) => v.name === "Karen") ||
          voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
          voices.find((v) => v.lang === "en-US" && !v.name.toLowerCase().includes("male"));
        if (preferred) utterance.voice = preferred;
        window.speechSynthesis.speak(utterance);
      };
      if (window.speechSynthesis.getVoices().length > 0) { pickVoice(); }
      else { window.speechSynthesis.onvoiceschanged = () => { pickVoice(); window.speechSynthesis.onvoiceschanged = null; }; }
    } catch (_) {}
  }, []);

  const handleMouseEnter = () => { setHovered(true); playHeySound(); };
  const handleMouseLeave = () => { setHovered(false); soundPlayedRef.current = false; };

  const vCls = shouldBeVisible ? "translate-x-0 opacity-100" : "translate-x-[150%] opacity-0 pointer-events-none";
  const iCls = hovered ? "scale-[1.03] -translate-x-2" : "scale-100 translate-x-0";
  const tCls = (hovered && !isOpen) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none";

  // Do not render anything until mounted on client (prevents SSR hydration mismatch)
  if (!mounted) return null;

  const fizzyEl = (
    <div
      className={`fixed top-[15%] right-2 md:right-4 lg:-right-4 w-28 md:w-44 lg:w-52 z-50 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${vCls}`}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={toggleChat}
      aria-label="Open FIZZY AI assistant" role="button"
      tabIndex={shouldBeVisible ? 0 : -1}
      onKeyDown={(e) => { if (shouldBeVisible && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleChat(); } }}
    >
      <div className={`absolute top-[15%] -left-8 -translate-x-full bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl text-xs md:text-sm font-bold text-white whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 ${tCls}`}>
        Hey there!
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-zinc-900 border-r border-t border-white/10 rotate-45" />
      </div>
      <div className={`relative w-full h-auto transition-transform duration-300 origin-right ${iCls}`}>
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl -z-10 transform translate-x-10 scale-75" />
        {isLoading && (<div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl animate-pulse -z-10" />)}
        <img src="/fizzy-peeking.png" alt="FIZZY AI" className="w-full h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] object-contain select-none" draggable={false} />
      </div>
    </div>
  );

  return createPortal(fizzyEl, document.body);
}

