"use client";

import React, { useState, useEffect } from "react";
import { Language } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";

interface MobileStickyBarProps {
  lang: Language;
  onAskClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  lang,
  onAskClick,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after user has scrolled down past the hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector("footer");
      if (!footer) {
        setVisible(scrollY > 400);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Hide if footer is in viewport
      const footerVisible = footerRect.top < windowHeight - 40;
      setVisible(scrollY > 400 && !footerVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t-2 border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-red-50 border-2 border-red-200 text-[#D32F2F] flex items-center justify-center shrink-0">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black text-slate-900 leading-tight">
            {lang === "en" ? "Stuck in Korea?" : "한국 여행 중 막히셨나요?"}
          </span>
          <span className="text-[10px] text-slate-500 font-bold font-mono">
            {lang === "en" ? "Instant 3-step solution" : "즉시 3단계 해결책"}
          </span>
        </div>
      </div>

      <Button
        onClick={onAskClick}
        className="h-10 px-4 bg-[#D32F2F] hover:bg-[#B92525] text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
      >
        <span>{lang === "en" ? "Ask Problem" : "문제 해결"}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};
