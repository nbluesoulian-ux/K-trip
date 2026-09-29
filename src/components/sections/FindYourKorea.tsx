"use client";

import React from "react";
import { Language } from "@/types/trip";
import { DESTINATIONS } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, ArrowRight } from "lucide-react";
import { ScrollPopWrapper } from "@/components/ui/ScrollPopWrapper";
import { getAssetPath } from "@/lib/utils";

interface FindYourKoreaProps {
  lang: Language;
  onHelpMeChoose: () => void;
}

const GPS_COORDS: Record<string, string> = {
  seoul: "37.56° N / 126.97° E",
  busan: "35.17° N / 129.07° E",
  jeju: "33.49° N / 126.53° E",
  gyeongju: "35.85° N / 129.22° E",
};

export const FindYourKorea: React.FC<FindYourKoreaProps> = ({
  lang,
  onHelpMeChoose,
}) => {
  return (
    <section id="destinations" className="py-20 md:py-32 relative bg-[#F4F9F6] overflow-hidden">
      {/* Top Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-[#EAF3EE] fill-current"
        >
          <path d="M0,0 C300,90 700,10 1200,80 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <ScrollPopWrapper direction="up" delayMs={50}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-slate-800 shadow-sm text-slate-800 font-mono text-xs font-black tracking-wider uppercase mb-3">
                <span>03. SENSE OF PLACE</span>
                <span className="text-[#D32F2F]">•</span>
                <span>WHERE TO LAND</span>
              </div>
            </ScrollPopWrapper>

            <ScrollPopWrapper direction="up" delayMs={100}>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
                {lang === "en" ? "Not Sure Where to Land?" : "어디로 향할지 고민되시나요?"}
              </h2>
            </ScrollPopWrapper>
          </div>

          <ScrollPopWrapper direction="up" delayMs={150}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm sm:text-base text-slate-600 max-w-md font-medium leading-relaxed">
                {lang === "en"
                  ? "Select an atmosphere rather than checking off arbitrary tourist boxes."
                  : "남들이 다 가는 빽빽한 체크리스트 대신, 내가 원하는 도시의 온도를 선택해 보세요."}
              </p>
              <Button
                onClick={onHelpMeChoose}
                className="h-11 px-5 rounded-full bg-white border-2 border-slate-800 text-slate-900 hover:bg-slate-100 font-black text-xs shadow-sm hover:shadow shrink-0 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#D32F2F] mr-1.5" />
                <span>{lang === "en" ? "Help Me Choose" : "취향 맞춤 추천"}</span>
              </Button>
            </div>
          </ScrollPopWrapper>
        </div>

        {/* 4 Large Arched Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest, idx) => (
            <ScrollPopWrapper
              key={dest.id}
              direction="up"
              delayMs={idx * 100}
            >
              <div
                onClick={onHelpMeChoose}
                className="group relative rounded-[32px] overflow-hidden bg-white border-2 border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.14)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between aspect-[3/4] min-h-[420px] cursor-pointer"
              >
                {/* Background Photo */}
                <img
                  src={getAssetPath(dest.image)}
                  alt={dest.imageAlt[lang]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Soft Gradient Scrim for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Top GPS Badge */}
                <div className="relative p-5 flex items-center justify-between text-white z-10">
                  <span className="font-mono text-[10px] font-black tracking-wider uppercase bg-white/95 text-slate-900 border-2 border-slate-800 px-2.5 py-1 rounded-full shadow-sm">
                    {GPS_COORDS[dest.id] || "KOREA HUB"}
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#D32F2F] ring-4 ring-white/30" />
                </div>

                {/* Bottom Card Content */}
                <div className="relative p-6 text-white z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-4 h-4 text-[#D32F2F]" />
                    <span className="font-mono text-[11px] font-bold text-white/80 uppercase">
                      {dest.tags[0] ? dest.tags[0][lang] : "CITY"}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                    {dest.name[lang]}
                  </h3>

                  <p className="text-xs text-white/80 line-clamp-2 mb-4 font-normal">
                    {dest.bestFor[lang]}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs font-bold text-white">
                    <span>{lang === "en" ? "Explore City Guide" : "도시 가이드 보기"}</span>
                    <ArrowRight className="w-4 h-4 text-[#D32F2F] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </ScrollPopWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};
