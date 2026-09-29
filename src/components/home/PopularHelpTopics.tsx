"use client";

import React from "react";
import { Language, HelpTopic } from "@/types/trip";
import { SOLUTION_GUIDES } from "@/data/guides";
import { Clock, ArrowRight, Sparkles, CreditCard, Train, MapPin, Plane, Car, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollPopWrapper } from "@/components/illustrations/ScrollPopWrapper";

interface PopularHelpTopicsProps {
  lang: Language;
  onSelectTopic: (topic: HelpTopic) => void;
}

export const PopularHelpTopics: React.FC<PopularHelpTopicsProps> = ({
  lang,
  onSelectTopic,
}) => {
  const getTopicIcon = (slug: string) => {
    switch (slug) {
      case "entry":
        return Plane;
      case "transit":
        return Train;
      case "delivery":
        return CreditCard;
      case "destination":
        return MapPin;
      case "stay":
        return Navigation;
      case "rental-car":
        return Car;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="help-topics" className="py-20 md:py-32 relative bg-[#FDF0E4] overflow-hidden">
      {/* Top Wavy Hill Divider from previous section */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#FAF8F5] fill-current"
        >
          <path d="M0,0 C300,90 600,30 900,80 C1050,105 1150,40 1200,60 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <ScrollPopWrapper direction="up" delayMs={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-800 shadow-sm text-slate-800 font-mono text-xs font-black tracking-wider uppercase mb-3">
              <span>01. ROADBLOCKS & PLAYBOOKS</span>
              <span className="text-[#D32F2F]">•</span>
              <span>6 CORE GUIDES</span>
            </div>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={100}>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              {lang === "en" ? "Immediate Steps for Real Bottlenecks" : "한국 여행 6대 핵심 해결책"}
            </h2>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={150}>
            <p className="text-slate-600 max-w-2xl text-sm sm:text-base font-medium leading-relaxed">
              {lang === "en"
                ? "Rather than reading long fragmented blog posts, tap any playbook for verified, step-by-step visual procedures in English."
                : "장황한 여행 블로그 대신, 지금 닥친 문제를 3분 만에 해결할 수 있는 공식 검증 절차를 제공합니다."}
            </p>
          </ScrollPopWrapper>
        </div>

        {/* 6 Arched Sun Bousai Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTION_GUIDES.map((guide, idx) => {
            const Icon = getTopicIcon(guide.slug);
            return (
              <ScrollPopWrapper
                key={guide.slug}
                direction="up"
                delayMs={(idx % 3) * 120}
              >
                <article
                  id={`guide-card-${guide.slug}`}
                  className="group relative rounded-[32px] bg-white border-2 border-slate-800 p-6 sm:p-7 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  {/* Top Row: Scalloped Numbered Seal Badge + Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 font-mono text-[11px] font-black text-slate-700 tracking-wider">
                      {guide.badge[lang].toUpperCase()}
                    </span>

                    {/* Scalloped Number Badge (Sun Bousai style) */}
                    <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-black text-sm shadow-[0_4px_10px_rgba(211,47,47,0.3)] group-hover:scale-110 transition-transform">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Card Visual Photo Box with rounded corners */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-slate-800 mb-5 bg-slate-100">
                    <img
                      src={guide.image}
                      alt={guide.imageAlt[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={idx < 3 ? "eager" : "lazy"}
                    />
                    {/* Time Solve Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border-2 border-slate-800 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-[#D32F2F]" />
                      <span className="font-mono text-xs font-black text-slate-800">
                        {guide.estimatedMinutes} MIN SOLVE
                      </span>
                    </div>

                    {/* Corner Icon Badge */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/95 border-2 border-slate-800 flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#D32F2F]" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-[#D32F2F] transition-colors leading-snug">
                        {guide.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mb-5 font-normal leading-relaxed line-clamp-2">
                        {guide.shortDescription[lang]}
                      </p>

                      {/* 3 Step Action Checklist Preview */}
                      <div className="space-y-2 mb-6 pt-4 border-t-2 border-slate-100">
                        {guide.steps.slice(0, 3).map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-left"
                          >
                            <span className="font-mono text-[10px] font-black text-[#D32F2F] bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                              0{sIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-700 truncate">
                              {step.title[lang]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <Button
                      onClick={() => onSelectTopic(guide.slug)}
                      className="w-full h-12 bg-[#D32F2F] hover:bg-[#B92525] text-white text-xs sm:text-sm font-black rounded-2xl shadow-[0_4px_14px_rgba(211,47,47,0.3)] hover:shadow-[0_6px_20px_rgba(211,47,47,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{lang === "en" ? "Open 3-Step Playbook" : "해결 가이드 열기"}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </article>
              </ScrollPopWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
