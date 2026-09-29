"use client";

import React, { useState } from "react";
import { Language } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, PhoneCall } from "lucide-react";
import { ScrollPopWrapper } from "@/components/ui/ScrollPopWrapper";

interface FinalCTAProps {
  lang: Language;
  onSolveProblem: (query: string) => void;
  onConciergeClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  lang,
  onSolveProblem,
  onConciergeClick,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSolveProblem(query.trim());
    }
  };

  return (
    <section className="py-20 md:py-28 relative bg-[#FAF8F5] overflow-hidden">
      {/* Top Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#FFF0EC] fill-current"
        >
          <path d="M0,0 C350,80 750,20 1200,90 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <ScrollPopWrapper direction="scale" delayMs={100}>
          <div className="rounded-[40px] bg-white border-2 border-slate-800 p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)] flex flex-col items-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-black uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === "en" ? "FREE REAL-TIME TRAVEL RESOLUTION" : "무료 실시간 한국 여행 솔루션"}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 max-w-2xl leading-tight">
              {lang === "en"
                ? "Don't Let A Roadblock Slow Down Your Korea Trip."
                : "작은 문제로 소중한 여행을 망치지 마세요."}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mb-8 leading-relaxed">
              {lang === "en"
                ? "Type whatever is blocking you right now, or call the 1330 hotline for immediate human guidance in English."
                : "지금 겪고 있는 불편을 검색하거나, 24시간 1330 핫라인으로 즉시 도움을 받으세요."}
            </p>

            {/* Quick Search Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl flex flex-col sm:flex-row items-stretch gap-3 mb-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    lang === "en"
                      ? "Search your issue (e.g. subway, card, bus)..."
                      : "문제를 입력하세요 (예: 지하철, 카드, 버스)..."
                  }
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-[#D32F2F] focus:bg-white text-slate-900 font-bold text-sm sm:text-base outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 bg-[#D32F2F] hover:bg-[#B92525] text-white font-black text-sm rounded-2xl shadow-[0_6px_20px_rgba(211,47,47,0.3)] hover:shadow-[0_8px_24px_rgba(211,47,47,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === "en" ? "Solve Now" : "해결하기"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Direct Call Button */}
            <button
              type="button"
              onClick={onConciergeClick}
              className="font-mono text-xs font-black text-slate-500 hover:text-[#D32F2F] transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span>{lang === "en" ? "OR CALL 24/7 FREE 1330 TOURISM HOTLINE" : "또는 24시간 1330 무료 관광안내 전화 걸기"}</span>
            </button>
          </div>
        </ScrollPopWrapper>
      </div>
    </section>
  );
};
