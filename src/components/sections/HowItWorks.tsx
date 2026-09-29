"use client";

import React from "react";
import { Language } from "@/types/trip";
import { MessageSquareText, CheckSquare, UserCheck, Utensils } from "lucide-react";
import { ScrollPopWrapper } from "@/components/ui/ScrollPopWrapper";
import { InteractivePin } from "@/components/ui/InteractivePin";

interface HowItWorksProps {
  lang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ lang }) => {
  const steps = [
    {
      num: "01",
      icon: MessageSquareText,
      badgeColor: "#0284C7",
      title: {
        en: "Describe Your Bottleneck",
        ko: "어떤 상황인지 편하게 입력하세요",
      },
      desc: {
        en: "Type the issue in your own words, from failed card payments to confusing bus transfers.",
        ko: "겪고 있는 불편이나 궁금한 점을 자연스러운 문장으로 입력하세요.",
      },
      previewText: {
        en: "“My delivery app won't accept my foreign Visa card”",
        ko: "“배달앱에서 해외 카드 결제가 안 돼요”",
      },
    },
    {
      num: "02",
      icon: CheckSquare,
      badgeColor: "#16A34A",
      title: {
        en: "Follow Visual 3-Step Procedures",
        ko: "검증된 3단계 절차를 따라 해결하세요",
      },
      desc: {
        en: "Get actionable, official steps verified for 2026 regulations without useless clutter.",
        ko: "장황한 블로그 글 대신 지금 당장 해야 할 구체적인 조치와 화면 안내를 제공합니다.",
      },
      previewText: {
        en: "Step 1: Install Shuttle • Step 2: Pay via WOWPASS • Step 3: 1F Lobby pickup",
        ko: "1단계: 셔틀 앱 설치 • 2단계: 와우패스 결제 • 3단계: 1층 로비 수령",
      },
    },
    {
      num: "03",
      icon: UserCheck,
      badgeColor: "#D32F2F",
      title: {
        en: "Hand Off to 24/7 Concierge",
        ko: "복잡하면 현지 매니저에게 넘기세요",
      },
      desc: {
        en: "If a phone call in Korean or custom booking is needed, our bilingual 1330 team steps in.",
        ko: "직접 전화하거나 해결하기 번거롭다면 24시간 한국관광공사 전담팀이 직접 도와드립니다.",
      },
      previewText: {
        en: "Dial 1330 • Free 24/7 Translation in English/Japanese/Chinese",
        ko: "국번없이 1330 • 영어/일어/중국어 24시간 무료 관광통역",
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative bg-[#FFF9E6] overflow-hidden">
      {/* Top Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#F4F9F6] fill-current"
        >
          <path d="M0,0 C400,90 800,20 1200,85 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <ScrollPopWrapper direction="up" delayMs={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-800 shadow-sm text-slate-800 font-mono text-xs font-black tracking-wider uppercase mb-3">
              <span>04. THE FRAMEWORK</span>
              <span className="text-[#D32F2F]">•</span>
              <span>HOW IT WORKS</span>
            </div>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={100}>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              {lang === "en" ? "How KTrip Eliminates Friction" : "KTrip이 문제를 해결하는 방식"}
            </h2>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={150}>
            <p className="text-slate-600 max-w-xl text-sm sm:text-base font-medium leading-relaxed mb-6">
              {lang === "en"
                ? "A streamlined 3-step pipeline engineered for non-Korean speaking travelers."
                : "외국인 여행자가 언어와 시스템의 장벽 없이 여행할 수 있도록 설계된 3단계 프로세스입니다."}
            </p>
          </ScrollPopWrapper>

          <InteractivePin
            badgeText="FOOD DELIVERY TIP"
            color="#FF6200"
            lang={lang}
            icon={Utensils}
            label={{ en: "Hotel Lobby Delivery", ko: "호텔 로비 수령 팁" }}
            tip={{
              en: "Korean couriers cannot access hotel room floors. Always meet them at the 1F main entrance or front desk.",
              ko: "호텔 보안 정책상 배달 기사님의 객실 층 출입이 불가하므로 반드시 1층 정문 또는 프런트에서 수령하셔야 합니다.",
            }}
          />
        </div>

        {/* 3 Large Sun Bousai Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollPopWrapper
                key={step.num}
                direction="up"
                delayMs={idx * 150}
              >
                <div className="group rounded-[36px] bg-white border-2 border-slate-800 p-7 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Scalloped Badge & Step Icon */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-slate-100">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: step.badgeColor }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="w-12 h-12 rounded-full border-2 border-slate-800 bg-slate-50 flex items-center justify-center font-mono font-black text-base text-slate-900 shadow-sm">
                        {step.num}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                      {step.title[lang]}
                    </h3>

                    <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6">
                      {step.desc[lang]}
                    </p>
                  </div>

                  {/* Visual Example Bubble */}
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200/80">
                    <div className="font-mono text-[10px] font-black text-[#D32F2F] uppercase mb-1">
                      REAL EXAMPLE
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {step.previewText[lang]}
                    </div>
                  </div>
                </div>
              </ScrollPopWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
