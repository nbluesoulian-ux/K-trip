"use client";

import React, { useState, useEffect, useRef } from "react";
import { Language } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onAskClick: () => void;
  onConciergeClick: () => void;
  visible?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onAskClick,
  onConciergeClick,
  visible = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const updateHeaderMetrics = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 20;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }

      if (progressBarRef.current) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        progressBarRef.current.style.width = `${progress}%`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeaderMetrics);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateHeaderMetrics();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: { en: "Guides", ko: "가이드" }, href: "#help-topics" },
    { label: { en: "FAQ", ko: "자주 묻는 질문" }, href: "#trip-stages" },
    { label: { en: "About", ko: "서비스 소개" }, href: "#how-it-works" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-6 pointer-events-none"
      } ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-4"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: Red Dot + KTRIP + Divider + Subtitle */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] rounded-xl p-1"
          aria-label="KTrip Home"
        >
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D32F2F] shrink-0" />
            <span className="font-black text-xl tracking-wider text-slate-900 leading-none">
              KTRIP
            </span>
          </div>

          <span className="h-4 w-[1px] bg-slate-300 mx-1 hidden sm:inline-block" />

          <span className="text-xs font-mono text-slate-400 font-medium tracking-wider uppercase hidden md:inline-block">
            KOREA TRAVEL CONCIERGE // 2026
          </span>
        </a>

        {/* Right Nav & Actions */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Nav links (DESIGN.md rule: Nav font 16px) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {/* Language Toggle Dropdown style */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 text-base font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>{lang === "en" ? "EN" : "KO"}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {link.label[lang]}
              </button>
            ))}
          </nav>

          {/* Primary Action Button: Get Started → (DESIGN.md rule: 52px CTA, 16px/600 font, #D32F2F) */}
          <Button
            onClick={onAskClick}
            className="h-11 sm:h-12 px-6 sm:px-7 bg-[#D32F2F] hover:bg-[#B92525] active:bg-[#921D1D] text-white text-base font-semibold rounded-full shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_8px_24px_rgba(211,47,47,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === "en" ? "Get Started" : "시작하기"}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Subtle Scroll Progress Indicator Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100">
        <div
          ref={progressBarRef}
          className="h-full bg-[#D32F2F] will-change-[width]"
          style={{ width: "0%" }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white/98 backdrop-blur-xl z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in-50 duration-200 border-t border-slate-200">
          <nav className="flex flex-col gap-3 py-4" aria-label="Mobile navigation">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-sm text-slate-800">Language</span>
              <button
                onClick={onToggleLang}
                className="px-3 py-1 rounded-xl bg-white border border-slate-300 font-bold text-xs text-[#E53935]"
              >
                {lang === "en" ? "Switch to 한국어 (KO)" : "Switch to English (EN)"}
              </button>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left font-bold text-slate-900 active:bg-slate-100 transition-colors"
              >
                <span className="text-base">{link.label[lang]}</span>
                <span className="text-slate-400">→</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onAskClick();
              }}
              className="w-full h-12 bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold rounded-2xl shadow-lg"
            >
              {lang === "en" ? "Search Roadblock →" : "문제 검색하기 →"}
            </Button>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onConciergeClick();
              }}
              className="w-full h-12 bg-white border-2 border-slate-800 text-slate-900 font-bold rounded-2xl"
            >
              {lang === "en" ? "24/7 1330 Support" : "24시간 1330 전화 연결"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
