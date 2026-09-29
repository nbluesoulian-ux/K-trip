"use client";

import React, { useState, useEffect } from "react";
import { Language, HelpTopic } from "@/types/trip";
import { Phone, ArrowUp, Globe, Heart } from "lucide-react";

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onAskClick: () => void;
  onConciergeClick: () => void;
  onSelectTopic: (topic: HelpTopic) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onToggleLang,
  onAskClick,
  onConciergeClick,
  onSelectTopic,
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const track = document.getElementById("hero-scroll-track");
      if (track) {
        const rect = track.getBoundingClientRect();
        setShowTopBtn(rect.bottom <= 100);
      } else {
        setShowTopBtn(window.scrollY > 1500);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white border-t-2 border-slate-800 text-slate-800 pt-16 pb-24 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b-2 border-slate-100">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#D32F2F] text-white flex items-center justify-center font-black text-2xl shadow-md">
                  K
                </div>
                <div>
                  <span className="font-black text-2xl tracking-tight text-slate-900 block leading-none">
                    KTrip
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1 block">
                    FRICTIONLESS TRAVEL IN KOREA
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-sm mb-6">
                {lang === "en"
                  ? "Instant, verified 3-step visual playbooks for foreign travelers in Korea. Overcoming transit, card payment, map navigation, and language bottlenecks."
                  : "외국인 여행자가 겪는 교통, 카드 결제, 길찾기, 언어의 장벽을 현지 3단계 가이드와 24시간 실시간 지원으로 해결합니다."}
              </p>
            </div>

            {/* Language Switcher in Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={onToggleLang}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border-2 border-slate-800 text-xs font-black text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#D32F2F]" />
                <span>Language: {lang === "en" ? "English (EN)" : "한국어 (KO)"}</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <button
                  onClick={onAskClick}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Search" : "검색"}
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={onConciergeClick}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Concierge" : "컨시어지"}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Guides Nav */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
              {lang === "en" ? "CORE PLAYBOOKS" : "핵심 해결 가이드"}
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-slate-700">
              <li>
                <button
                  onClick={() => onSelectTopic("transit")}
                  className="hover:text-[#D32F2F] transition-colors text-left"
                >
                  {lang === "en" ? "Subway & T-Money Pass" : "지하철 & 티머니 패스"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic("delivery")}
                  className="hover:text-[#D32F2F] transition-colors text-left"
                >
                  {lang === "en" ? "Foreign Card & Kiosks" : "해외카드 & 무인 결제기"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic("destination")}
                  className="hover:text-[#D32F2F] transition-colors text-left"
                >
                  {lang === "en" ? "Naver Map Walking Routes" : "네이버지도 도보 길찾기"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic("entry")}
                  className="hover:text-[#D32F2F] transition-colors text-left"
                >
                  {lang === "en" ? "K-ETA & Visa Exemptions" : "K-ETA & 비자 면제 규정"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic("stay")}
                  className="hover:text-[#D32F2F] transition-colors text-left"
                >
                  {lang === "en" ? "Kakao T & Taxi Hailing" : "카카오택시 호출 요령"}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Official Hotline Info */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
              {lang === "en" ? "24/7 EMERGENCY NUMBERS" : "24시간 긴급 연락처"}
            </h4>
            <div className="space-y-3">
              <a
                href="tel:1330"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-slate-900 hover:border-red-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D32F2F]" />
                  <div>
                    <span className="font-black text-sm block">1330 Travel Hotline</span>
                    <span className="text-[11px] text-slate-500">Free 24/7 EN/JP/CN/KO</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-black text-[#D32F2F]">CALL →</span>
              </a>

              <div className="flex gap-2">
                <a
                  href="tel:112"
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors text-center"
                >
                  Police: 112
                </a>
                <a
                  href="tel:119"
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors text-center"
                >
                  Medical/Fire: 119
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div>
            © 2026 KTrip. Verified according to Republic of Korea immigration and transit guidelines.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for frictionless travel in Korea</span>
            <Heart className="w-3.5 h-3.5 text-[#D32F2F] fill-current" />
          </div>
        </div>
      </div>

      {/* Sun Bousai Smiling Round Floating "Back to Top" Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#7CD73B] hover:bg-[#6ec230] border-2 border-slate-800 text-slate-900 shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:scale-110 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
          <span className="font-mono text-[10px] font-black leading-none mt-0.5">TOP</span>
        </button>
      )}
    </footer>
  );
};
