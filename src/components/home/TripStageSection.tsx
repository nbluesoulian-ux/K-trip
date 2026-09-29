"use client";

import React from "react";
import { Language, HelpTopic } from "@/types/trip";
import { Plane, Sparkles, CreditCard, Train } from "lucide-react";
import { ScrollPopWrapper } from "@/components/illustrations/ScrollPopWrapper";
import { InteractivePin } from "@/components/illustrations/InteractivePin";
import { getAssetPath } from "@/lib/utils";

interface TripStageSectionProps {
  lang: Language;
  onSelectTopic: (topic: HelpTopic) => void;
  onConciergeClick: () => void;
}

export const TripStageSection: React.FC<TripStageSectionProps> = ({
  lang,
  onSelectTopic,
  onConciergeClick,
}) => {
  const beforeTripItems = [
    {
      title: { en: "K-ETA & Entry Documents", ko: "입국 서류 및 비자 사전 확인" },
      time: "3 min guide",
      image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=700&q=80",
      imageAlt: { en: "Seoul palace gate", ko: "서울 궁궐 정문" },
      topic: "entry" as HelpTopic,
      tag: "PRE-DEPARTURE",
      desc: {
        en: "Check 22 exempt countries and avoid unofficial fee scams.",
        ko: "22개국 한시 면제 대상 확인 및 비공식 수수료 바가지 방지.",
      },
    },
    {
      title: { en: "Naver Map & Apps Setup", ko: "네이버지도 및 필수 앱 설치" },
      time: "4 min guide",
      image: "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=700&q=80",
      imageAlt: { en: "Seoul city skyline", ko: "서울 도심 전경" },
      topic: "destination" as HelpTopic,
      tag: "NAVIGATION",
      desc: {
        en: "Switch Naver Map to English for exact walking directions.",
        ko: "구글 도보길 대신 네이버지도 영문 모드로 완벽 길찾기.",
      },
    },
    {
      title: { en: "Airport Express & eSIM", ko: "공항철도 직통 & eSIM 예약" },
      time: "2 min guide",
      image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=700&q=80",
      imageAlt: { en: "Hanok street", ko: "한옥마을 거리" },
      topic: "transit" as HelpTopic,
      tag: "CONNECTIVITY",
      desc: {
        en: "Reserve AREX non-stop train and pick up eSIM at Incheon Airport.",
        ko: "인천공항 43분 서울역 직통열차 및 공항 현장 수령 안내.",
      },
    },
  ];

  const inKoreaItems = [
    {
      title: { en: "Subway Pass (T-Money vs Climate)", ko: "지하철 & 티머니 vs 기후동행카드" },
      time: "3 min guide",
      image: "/images/n-seoul-tower.jpg",
      imageAlt: { en: "Seoul subway landscape", ko: "서울 도심 대중교통 풍경" },
      topic: "transit" as HelpTopic,
      tag: "TRANSIT",
      desc: {
        en: "How to choose between Climate Card (unlimited) and standard T-Money.",
        ko: "서울 무제한 기후동행카드와 범용 티머니 카드 비교 선택법.",
      },
    },
    {
      title: { en: "Foreign Card Kiosk Payment", ko: "무인 결제기 해외카드 오류 대처" },
      time: "2 min guide",
      image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=700&q=80",
      imageAlt: { en: "Korean food table", ko: "한국 음식 상차림" },
      topic: "delivery" as HelpTopic,
      tag: "PAYMENT",
      desc: {
        en: "Overcoming payment declines at self-service kiosks with WOWPASS.",
        ko: "식당 및 올리브영 무인 키오스크 결제 오류 시 즉시 우회법.",
      },
    },
    {
      title: { en: "Kakao T & Taxi Hailing", ko: "카카오택시 호출 및 주소 카드" },
      time: "3 min guide",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=700&q=80",
      imageAlt: { en: "Coastal road", ko: "해안 도로" },
      topic: "stay" as HelpTopic,
      tag: "TAXIS",
      desc: {
        en: "Call taxis without Korean phone number using 'Pay to Driver'.",
        ko: "한국 번호 없이 '기사님께 직접 결제'로 카카오택시 부르기.",
      },
    },
  ];

  return (
    <section id="trip-stages" className="py-20 md:py-32 relative bg-[#EAF3EE] overflow-hidden">
      {/* Top Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#FDF0E4] fill-current"
        >
          <path d="M0,0 C350,80 750,20 1200,90 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <ScrollPopWrapper direction="up" delayMs={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-800 shadow-sm text-slate-800 font-mono text-xs font-black tracking-wider uppercase mb-3">
              <span>02. TRAVEL TIMELINE</span>
              <span className="text-[#D32F2F]">•</span>
              <span>WHEN YOU NEED IT</span>
            </div>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={100}>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
              {lang === "en" ? "Timing Is Everything in Korea" : "여행 시점별 핵심 체크리스트"}
            </h2>
          </ScrollPopWrapper>

          <ScrollPopWrapper direction="up" delayMs={150}>
            <p className="text-slate-600 max-w-2xl text-sm sm:text-base font-medium leading-relaxed">
              {lang === "en"
                ? "Prepare key logistics before flying, and execute frictionless fixes once your plane touches down."
                : "비행기 타기 전 챙겨야 할 필수 준비부터, 도착 후 겪는 현장 문제까지 시점별로 대비하세요."}
            </p>
          </ScrollPopWrapper>
        </div>

        {/* Two Large Sun Bousai Pavilions Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Stage 1: Before Departure Pavilion */}
          <ScrollPopWrapper direction="left" delayMs={200}>
            <div className="rounded-[36px] bg-white border-2 border-slate-800 p-6 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] flex flex-col justify-between h-full">
              <div>
                {/* Pavilion Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                      <Plane className="w-6 h-6" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] font-black text-amber-600 tracking-wider uppercase">
                        STAGE 01
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        {lang === "en" ? "Before You Fly" : "출국 전 사전 준비"}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold">
                    3 PRE-CHECKS
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {beforeTripItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectTopic(item.topic)}
                      className="group p-4 rounded-2xl bg-slate-50 border-2 border-slate-200/80 hover:border-slate-800 hover:bg-white transition-all cursor-pointer flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0">
                        <img
                          src={getAssetPath(item.image)}
                          alt={item.imageAlt[lang]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[10px] font-black text-[#D32F2F] uppercase">
                            {item.tag}
                          </span>
                          <span className="text-[11px] text-slate-400">• {item.time}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-[#D32F2F] transition-colors truncate">
                          {item.title[lang]}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {item.desc[lang]}
                        </p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-800 transition-colors shrink-0">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Local Tip Pin */}
              <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                <InteractivePin
                  badgeText="AIRPORT eSIM"
                  color="#D97706"
                  icon={Sparkles}
                  lang={lang}
                  label={{ en: "Reserve eSIM in Advance", ko: "eSIM 사전 예약 팁" }}
                  tip={{
                    en: "Purchasing eSIM online before departure is 30% cheaper than airport counter rates and activates instantly.",
                    ko: "출국 전 온라인으로 eSIM을 예약하시면 공항 현장 구매보다 30% 이상 저렴하며 도착 즉시 개통됩니다.",
                  }}
                />
                <span className="text-xs font-bold text-slate-500">
                  {lang === "en" ? "Tap to preview rule" : "규정 확인"}
                </span>
              </div>
            </div>
          </ScrollPopWrapper>

          {/* Stage 2: On The Ground in Korea Pavilion */}
          <ScrollPopWrapper direction="right" delayMs={200}>
            <div className="rounded-[36px] bg-white border-2 border-slate-800 p-6 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)] flex flex-col justify-between h-full">
              <div>
                {/* Pavilion Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-black text-xl shadow-md">
                      <Train className="w-6 h-6" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] font-black text-[#0284C7] tracking-wider uppercase">
                        STAGE 02
                      </span>
                      <h3 className="text-2xl font-black text-slate-900">
                        {lang === "en" ? "On The Ground" : "한국 도착 후 현장 해결"}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-mono text-xs font-bold">
                    3 ON-SITE STEPS
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {inKoreaItems.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectTopic(item.topic)}
                      className="group p-4 rounded-2xl bg-slate-50 border-2 border-slate-200/80 hover:border-slate-800 hover:bg-white transition-all cursor-pointer flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 shrink-0">
                        <img
                          src={getAssetPath(item.image)}
                          alt={item.imageAlt[lang]}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[10px] font-black text-[#D32F2F] uppercase">
                            {item.tag}
                          </span>
                          <span className="text-[11px] text-slate-400">• {item.time}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-[#D32F2F] transition-colors truncate">
                          {item.title[lang]}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {item.desc[lang]}
                        </p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:border-slate-800 transition-colors shrink-0">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Local Tip Pin */}
              <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                <InteractivePin
                  badgeText="CASH WON BUFFER"
                  color="#0284C7"
                  icon={CreditCard}
                  lang={lang}
                  label={{ en: "Keep 50,000 KRW Cash", ko: "5만원 현금 소지 팁" }}
                  tip={{
                    en: "Always carry at least 50,000 KRW cash for T-Money recharge and street food stalls.",
                    ko: "티머니 카드 현금 충전 및 전통시장/길거리 음식 결제를 위해 항상 최소 5만 원 현금을 소지하세요.",
                  }}
                />
                <button
                  type="button"
                  onClick={onConciergeClick}
                  className="font-bold text-xs text-[#D32F2F] hover:underline"
                >
                  {lang === "en" ? "Need live help? Call 1330" : "현지 1330 문의하기"}
                </button>
              </div>
            </div>
          </ScrollPopWrapper>
        </div>
      </div>
    </section>
  );
};
