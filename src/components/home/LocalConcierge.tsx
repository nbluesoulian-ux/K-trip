"use client";

import React from "react";
import { Language } from "@/types/trip";
import { Button } from "@/components/ui/button";
import { PhoneCall, Calendar, Utensils, Navigation, ArrowRight, HeartHandshake, Phone } from "lucide-react";
import { ScrollPopWrapper } from "@/components/illustrations/ScrollPopWrapper";
import { InteractivePin } from "@/components/illustrations/InteractivePin";

interface LocalConciergeProps {
  lang: Language;
  onOpenConcierge: () => void;
}

export const LocalConcierge: React.FC<LocalConciergeProps> = ({
  lang,
  onOpenConcierge,
}) => {
  const exampleChips = [
    { label: { en: "Restaurant Reservations", ko: "유명 식당 전화 예약" }, icon: Utensils },
    { label: { en: "Custom Booking Support", ko: "숙소 & 티켓 예약 지원" }, icon: Calendar },
    { label: { en: "Food Delivery Assistance", ko: "배달앱 주문 & 결제 대행" }, icon: PhoneCall },
    { label: { en: "Complex Transit Transfers", ko: "복잡한 지방 환승 문의" }, icon: Navigation },
  ];

  return (
    <section id="concierge" className="py-20 md:py-32 relative bg-[#FFF0EC] overflow-hidden">
      {/* Top Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#FFF9E6] fill-current"
        >
          <path d="M0,0 C300,80 750,20 1200,90 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <ScrollPopWrapper direction="up" delayMs={100}>
          {/* Main Sun Bousai Pavilion Card */}
          <div className="rounded-[40px] bg-white border-2 border-slate-800 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Photo Composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-[32px] overflow-hidden border-2 border-slate-800 shadow-md aspect-[4/5] bg-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
                    alt={lang === "en" ? "Traveler in a lively Seoul street" : "활기찬 서울 종로 골목의 여행자"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Overlaid Badge */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-black mb-2 border-2 border-slate-800 shadow-sm">
                      <HeartHandshake className="w-4 h-4 text-[#D32F2F]" />
                      <span>{lang === "en" ? "Real Bilingual Humans" : "서울 현지 전담 매니저"}</span>
                    </div>
                    <p className="text-xs text-white/90 font-medium leading-relaxed">
                      {lang === "en"
                        ? "Direct assistance for friction-heavy tasks and restaurant phone reservations."
                        : "외국인 여행자가 전화나 한국어 장벽으로 해결하기 어려운 일을 현지에서 직접 처리해 드립니다."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Copy & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-300 font-mono text-xs font-black text-slate-700 uppercase tracking-wider mb-4 w-fit">
                  <span>05. LOCAL HUMAN BACKUP</span>
                  <span className="text-[#D32F2F]">•</span>
                  <span>24/7 SUPPORT</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  {lang === "en"
                    ? "When an App Can't Solve It, A Local Can."
                    : "앱으로 안 될 때는, 현지 담당자가 직접 돕습니다."}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6 max-w-xl">
                  {lang === "en"
                    ? "Some situations in Korea still require a domestic phone call, resident ID, or Korean banking card. Our Seoul-based team and the official 1330 Korea Travel Hotline take care of it for you."
                    : "전화 예약만 받는 맛집, 본인 인증이 필요한 배달, 복잡한 지방 교통 환승까지. 혼자 끙끙 앓지 마시고 전담팀 및 1330 공식 핫라인에 도움을 요청하세요."}
                </p>

                {/* Status & Response Time Pills with Interactive Pin */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-xs font-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{lang === "en" ? "Active Now • Seoul (GMT+9)" : "현재 응대 가능 • 서울 (GMT+9)"}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold font-mono">
                    <span className="text-[#D32F2F]">⚡</span>
                    <span>{lang === "en" ? "Avg Response: < 3 Mins" : "평균 응답: 3분 이내"}</span>
                  </div>
                  <InteractivePin
                    badgeText="1330 HOTLINE"
                    color="#D32F2F"
                    lang={lang}
                    icon={Phone}
                    label={{ en: "24/7 Tourism Translation", ko: "24시간 1330 관광통역" }}
                    tip={{
                      en: "Official KTO hotline for English/Japanese/Chinese emergency interpretation, transport routes, and lost property.",
                      ko: "한국관광공사 공식 24시간 무료 관광통역 및 유실물/응급 지원 서비스입니다.",
                    }}
                  />
                </div>

                {/* Example Request Chips */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {exampleChips.map((chip, idx) => {
                    const Icon = chip.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#D32F2F] shrink-0" />
                        <span className="truncate">{chip.label[lang]}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="tel:1330"
                    className="h-13 px-7 bg-[#D32F2F] hover:bg-[#B92525] text-white font-black text-sm rounded-2xl shadow-[0_6px_20px_rgba(211,47,47,0.35)] hover:shadow-[0_8px_24px_rgba(211,47,47,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{lang === "en" ? "Call 1330 Hotline (Free)" : "1330 전화 걸기 (무료)"}</span>
                  </a>

                  <Button
                    onClick={onOpenConcierge}
                    className="h-13 px-7 bg-white hover:bg-slate-50 border-2 border-slate-800 text-slate-900 font-black text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{lang === "en" ? "Send Custom Request" : "온라인 문의 접수"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollPopWrapper>
      </div>
    </section>
  );
};
