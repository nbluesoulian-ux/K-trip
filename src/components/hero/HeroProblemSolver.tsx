"use client";

import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { Language, HelpTopic } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { matchProblemToTopic } from "@/lib/problem-matcher";
import {
  Search,
  ArrowRight,
  Train,
  CreditCard,
  MapPin,
  Plane,
  CheckCircle2,
  Zap,
  Clock,
  ChevronRight,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { ScrollPopWrapper } from "@/components/ui/ScrollPopWrapper";

export interface HeroProblemSolverRef {
  focusInput: () => void;
}

interface HeroProblemSolverProps {
  lang: Language;
  onSolveProblem: (topic: HelpTopic) => void;
  onConciergeClick: () => void;
}

export const HeroProblemSolver = forwardRef<HeroProblemSolverRef, HeroProblemSolverProps>(
  ({ lang, onSolveProblem, onConciergeClick }, ref) => {
    const [query, setQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [clarificationRequired, setClarificationRequired] = useState(false);
    const [candidateTopics, setCandidateTopics] = useState<HelpTopic[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const chevronRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [beakLeftOffset, setBeakLeftOffset] = useState<number | null>(null);

    // Dynamically calculate the upward pointer beak alignment with the chevron button
    React.useEffect(() => {
      const updateBeak = () => {
        if (chevronRef.current && popoverRef.current) {
          const cRect = chevronRef.current.getBoundingClientRect();
          const pRect = popoverRef.current.getBoundingClientRect();
          if (cRect.width > 0 && pRect.width > 0) {
            const chevronCenter = cRect.left + cRect.width / 2;
            // 16px wide beak (w-4), subtract 8px so the tip directly aligns with chevron center
            const offset = chevronCenter - pRect.left - 8;
            setBeakLeftOffset(Math.round(offset));
          }
        }
      };

      updateBeak();
      const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateBeak) : null;
      if (popoverRef.current && ro) ro.observe(popoverRef.current);
      if (chevronRef.current && ro) ro.observe(chevronRef.current);

      window.addEventListener("resize", updateBeak);
      window.addEventListener("scroll", updateBeak, { passive: true });

      return () => {
        if (ro) ro.disconnect();
        window.removeEventListener("resize", updateBeak);
        window.removeEventListener("scroll", updateBeak);
      };
    }, [isDropdownOpen]);

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        setIsDropdownOpen(true);
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          inputRef.current.focus();
        }
      },
    }));

    const handleSolve = (textToMatch?: string) => {
      const q = textToMatch ?? query;
      if (!q.trim()) {
        inputRef.current?.focus();
        return;
      }

      setIsSearching(true);
      setClarificationRequired(false);

      setTimeout(() => {
        setIsSearching(false);
        const result = matchProblemToTopic(q);
        if (result.matched && result.topic) {
          onSolveProblem(result.topic);
        } else {
          setCandidateTopics(result.candidates);
          setClarificationRequired(true);
        }
      }, 200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSolve();
      }
    };

    // 4 Core Quick Solutions (1:1 with user-provided reference design)
    const quickListItems = [
      {
        id: "transit",
        title: { en: "Subway & T-money", ko: "지하철 & 티머니" },
        subtitle: { en: "Routes, fares, card use", ko: "노선, 요금, 카드 사용법" },
        icon: Train,
        iconColor: "text-[#0284C7]",
        iconBg: "bg-[#E8F4FD]",
        action: () => onSolveProblem("transit"),
      },
      {
        id: "delivery",
        title: { en: "Card Payment", ko: "해외 카드 결제" },
        subtitle: { en: "Foreign card, declined, how to fix", ko: "키오스크 거절, 결제 오류 대처법" },
        icon: CreditCard,
        iconColor: "text-[#EF4444]",
        iconBg: "bg-[#FEECEB]",
        action: () => onSolveProblem("delivery"),
      },
      {
        id: "destination",
        title: { en: "Maps & Navigation", ko: "지도 & 길찾기" },
        subtitle: { en: "Naver Map, directions, walking, taxi", ko: "네이버지도, 도보, 전철, 택시 경로" },
        icon: MapPin,
        iconColor: "text-[#10B981]",
        iconBg: "bg-[#E6F8F0]",
        action: () => onSolveProblem("destination"),
      },
      {
        id: "entry",
        title: { en: "Airport & Arrival", ko: "공항 & 입국" },
        subtitle: { en: "Immigration, transport, SIM, baggage", ko: "입국 심사, 공항철도, eSIM, 수하물" },
        icon: Plane,
        iconColor: "text-[#F59E0B]",
        iconBg: "bg-[#FEF6E6]",
        action: () => onSolveProblem("entry"),
      },
    ];

    return (
      <section
        id="hero"
        className="relative w-full py-6 sm:py-10 overflow-hidden text-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          {/* 1. Top Pill Badge: VERIFIED FOR 2026 TRAVEL | 100% FREE */}
          <ScrollPopWrapper direction="up" delayMs={50}>
            <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white border border-[#EAEAEA] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-6 sm:mb-8 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="font-bold text-xs sm:text-[13px] font-mono text-[#171717] tracking-wider uppercase">
                {lang === "en" ? "VERIFIED FOR 2026 TRAVEL" : "2026 최신 여행 규정 반영"}
              </span>
              <span className="text-slate-300 font-light mx-1">|</span>
              <span className="font-black text-xs sm:text-[13px] font-mono text-[#D32F2F] tracking-wider uppercase">
                {lang === "en" ? "100% FREE" : "100% 무료"}
              </span>
            </div>
          </ScrollPopWrapper>

          {/* 2. Main Headline: TRAVEL KOREA / WITHOUT FRICTION. (Fluid clamp(40px, 5vw, 60px)) */}
          <ScrollPopWrapper direction="up" delayMs={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-black tracking-tight leading-[1.08] mb-3 sm:mb-4 select-none">
              <span className="text-[#171717] block">TRAVEL KOREA</span>
              <span className="text-[#D32F2F] block">WITHOUT FRICTION.</span>
            </h1>
          </ScrollPopWrapper>

          {/* 3. Subtitle: Lead 20px / 400 / 1.6 / max-width: 640px */}
          <ScrollPopWrapper direction="up" delayMs={150}>
            <p className="text-base sm:text-lg md:text-[20px] text-[#555555] font-normal leading-relaxed max-w-[640px] mx-auto mb-6 sm:mb-8">
              {lang === "en"
                ? "Get instant, verified travel help for Korea."
                : "한국 여행 중 마주하는 모든 문제에 대한 검증된 해결책을 즉시 제공합니다."}
            </p>
          </ScrollPopWrapper>

          {/* 4. Search Input Capsule Bar + Floating Popover List Card */}
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Search Bar Capsule (Height 58~64px, Input text 16~17px, Button 52px) */}
            <div className="w-full max-w-[680px] min-h-[58px] sm:min-h-[64px] rounded-full bg-white shadow-[0_6px_28px_rgba(0,0,0,0.06)] border border-[#EAEAEA] p-2 sm:p-2.5 pl-5 sm:pl-6 flex items-center justify-between relative z-30 transition-all hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)]">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Search className="w-5 h-5 text-[#8A8A8A] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (clarificationRequired) setClarificationRequired(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    lang === "en"
                      ? "What's blocking your trip? (e.g., T-Money, foreign card, Naver Map...)"
                      : "어떤 문제가 발생했나요? (예: 티머니, 해외카드 오류, 네이버지도...)"
                  }
                  className="w-full bg-transparent text-[#171717] font-medium text-base sm:text-[17px] outline-none placeholder:text-[#8A8A8A] placeholder:font-normal leading-normal"
                  aria-label={lang === "en" ? "Enter your travel problem" : "여행 문제 입력"}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-sm font-semibold text-slate-400 hover:text-slate-600 px-2 cursor-pointer shrink-0"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Divider + Chevron + Solve Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-1">
                <span className="h-6 w-[1px] bg-[#EAEAEA]" />
                
                <button
                  ref={chevronRef}
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-[#171717] hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Toggle quick solutions menu"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-[#171717]" : ""
                    }`}
                  />
                </button>

                <Button
                  onClick={() => handleSolve()}
                  disabled={isSearching}
                  className="h-11 sm:h-12 px-6 sm:px-8 bg-[#D32F2F] hover:bg-[#B92525] active:bg-[#921D1D] text-white font-semibold text-base sm:text-[17px] rounded-full shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_8px_24px_rgba(211,47,47,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>
                    {isSearching
                      ? lang === "en"
                        ? "Solving..."
                        : "해결 중..."
                      : lang === "en"
                      ? "Solve"
                      : "해결하기"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Button>
              </div>
            </div>

            {/* Floating Popover List Card with Pointer Beak (1:1 with reference) */}
            {isDropdownOpen && (
              <div
                ref={popoverRef}
                className="w-[94%] sm:w-[92%] md:w-[620px] bg-white rounded-3xl border border-[#EAEAEA] shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative z-20 mt-3 p-2 sm:p-2.5 mb-8 sm:mb-10 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                {/* Upward Pointer Beak Dynamically Aligned with Chevron Button */}
                <div
                  className="absolute -top-2 w-4 h-4 bg-white border-t border-l border-[#EAEAEA] rotate-45"
                  style={
                    beakLeftOffset !== null
                      ? { left: `${beakLeftOffset}px` }
                      : { right: "128px" }
                  }
                />

                <div className="divide-y divide-slate-100">
                  {quickListItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        className="w-full py-3.5 sm:py-4 px-4 sm:px-5 flex items-center justify-between hover:bg-slate-50/90 rounded-2xl transition-all cursor-pointer group text-left min-h-[64px]"
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <Icon className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${item.iconColor}`} />
                          </div>
                          <div className="flex flex-col min-w-0 text-left">
                            <span className="font-bold text-base sm:text-[17px] text-[#171717] group-hover:text-[#D32F2F] transition-colors leading-snug">
                              {item.title[lang]}
                            </span>
                            <span className="text-sm sm:text-[15px] text-[#737373] mt-0.5 leading-snug truncate">
                              {item.subtitle[lang]}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#555555] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Ambiguous Query Clarification Prompt if needed */}
          {clarificationRequired && (
            <div className="w-full max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-center gap-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-sm font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {lang === "en"
                    ? "Select the situation that matches your issue:"
                    : "가장 알맞은 문제를 선택하세요:"}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {candidateTopics.map((cand) => (
                  <button
                    key={cand}
                    onClick={() => onSolveProblem(cand)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-sm font-bold text-slate-800 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {cand.toUpperCase()} →
                  </button>
                ))}
                <button
                  onClick={onConciergeClick}
                  className="px-3.5 py-2 rounded-xl bg-[#D32F2F] text-white text-sm font-bold hover:bg-[#B92525] transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Ask Live 1330 Concierge" : "1330 현지 통역 연결"}
                </button>
              </div>
            </div>
          )}

          {/* 5. Bottom Trust Indicators Row (DESIGN.md guidelines compliant) */}
          <ScrollPopWrapper direction="up" delayMs={300}>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14 text-left select-none pt-2">
              {/* Item 1: Verified */}
              <div className="flex items-center gap-3.5">
                <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-[#171717] leading-snug">
                    {lang === "en" ? "Verified by local specialists" : "현지 전문가 공식 검증"}
                  </span>
                  <span className="text-xs sm:text-[14px] text-[#737373] font-normal">
                    {lang === "en" ? "Up-to-date for 2026" : "2026 최신 규정 반영"}
                  </span>
                </div>
              </div>

              <span className="h-8 w-[1px] bg-[#EAEAEA] hidden md:block" />

              {/* Item 2: Speed */}
              <div className="flex items-center gap-3.5">
                <Zap className="w-6 h-6 text-[#D32F2F] shrink-0 fill-[#D32F2F]" />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-[#171717] leading-snug">
                    {lang === "en" ? "Solve in 3 minutes" : "3분 만에 빠른 해결"}
                  </span>
                  <span className="text-xs sm:text-[14px] text-[#737373] font-normal">
                    {lang === "en" ? "Clear, step-by-step guides" : "단계별 핵심 체크리스트"}
                  </span>
                </div>
              </div>

              <span className="h-8 w-[1px] bg-[#EAEAEA] hidden md:block" />

              {/* Item 3: 24/7 Support */}
              <div className="flex items-center gap-3.5">
                <Clock className="w-6 h-6 text-[#737373] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-[#171717] leading-snug">
                    {lang === "en" ? "24/7 support" : "24시간 실시간 지원"}
                  </span>
                  <span className="text-xs sm:text-[14px] text-[#737373] font-normal">
                    {lang === "en" ? "Real local information" : "한국관광공사 공식 핫라인"}
                  </span>
                </div>
              </div>
            </div>
          </ScrollPopWrapper>
        </div>
      </section>
    );
  }
);

HeroProblemSolver.displayName = "HeroProblemSolver";
