"use client";

import React, { useState } from "react";
import { Language } from "@/types/trip";
import { DESTINATIONS } from "@/data/destinations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Compass, Sparkles, MapPin, CheckCircle2, RotateCcw, Clock } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

type DurationType = "short" | "medium" | "long";
type VibeType = "urban" | "beach" | "nature" | "history";
type PaceType = "active" | "relaxed";

interface DestinationPickerModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

export const DestinationPickerModal: React.FC<DestinationPickerModalProps> = ({
  open,
  lang,
  onClose,
}) => {
  const [duration, setDuration] = useState<DurationType>("medium");
  const [vibe, setVibe] = useState<VibeType>("urban");
  const [pace, setPace] = useState<PaceType>("active");
  const [showResult, setShowResult] = useState(false);

  // Compute recommendation
  const getRecommendation = () => {
    if (vibe === "beach") return DESTINATIONS.find((d) => d.id === "busan")!;
    if (vibe === "nature") return DESTINATIONS.find((d) => d.id === "jeju")!;
    if (vibe === "history") return DESTINATIONS.find((d) => d.id === "gyeongju")!;
    return DESTINATIONS.find((d) => d.id === "seoul")!;
  };

  const rec = getRecommendation();

  const getPaceNote = () => {
    if (pace === "active") {
      return lang === "en"
        ? "Active pacing: Pack 3-4 key landmarks daily with efficient transit/rail connections."
        : "부지런한 코스: 지하철 및 대중교통을 활용해 하루 3~4개 핵심 명소를 알차게 순회하는 동선입니다.";
    }
    return lang === "en"
      ? "Relaxed pacing: Focus on 1-2 neighborhoods per day with leisurely cafe and street strolling."
      : "여유로운 힐링 코스: 하루 1~2개 동네에 머물며 골목길과 카페를 느긋하게 즐기는 동선입니다.";
  };

  const getDurationBadge = () => {
    switch (duration) {
      case "short":
        return lang === "en" ? "3-5 Days Plan" : "3~5일 단기 코스";
      case "long":
        return lang === "en" ? "10+ Days Deep Dive" : "10일 이상 심층 여행";
      default:
        return lang === "en" ? "6-9 Days Recommended" : "6~9일 추천 일정";
    }
  };

  const handleReset = () => {
    setShowResult(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleReset()}>
      <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl border border-[#EAEAEA] shadow-2xl">
        {!showResult ? (
          <div>
            <DialogHeader className="mb-6 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#D32F2F] bg-red-50 px-2.5 py-1 rounded-full border border-red-100 w-fit mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Trip Vibe Matcher" : "나만의 여행지 추천"}</span>
              </div>
              <DialogTitle className="text-2xl font-extrabold text-[#171717]">
                {lang === "en" ? "Help Me Choose" : "어디로 여행할지 골라보세요"}
              </DialogTitle>
              <DialogDescription className="text-sm text-[#555555]">
                {lang === "en"
                  ? "Select your trip length and preferred vibe to find your ideal Korean destination."
                  : "여행 기간과 선호하는 여행 분위기를 고르면 최적의 거점 도시를 제안합니다."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {/* Question 1: Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-2">
                  {lang === "en" ? "1. Trip duration" : "1. 총 여행 기간"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "short" as const, label: { en: "3-5 Days", ko: "3~5일" } },
                    { id: "medium" as const, label: { en: "6-9 Days", ko: "6~9일" } },
                    { id: "long" as const, label: { en: "10+ Days", ko: "10일 이상" } },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDuration(opt.id)}
                      className={`h-11 rounded-xl text-xs font-bold border transition-colors ${
                        duration === opt.id
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-[#555555] border-[#EAEAEA] hover:bg-neutral-50"
                      }`}
                    >
                      {opt.label[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Vibe */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-2">
                  {lang === "en" ? "2. What vibe matters most?" : "2. 가장 원하는 여행의 분위기는?"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: "urban" as const, label: { en: "Nightlife, Street Food & Palaces", ko: "화려한 야경, 길거리 음식과 궁궐" } },
                    { id: "beach" as const, label: { en: "Ocean Breeze, Beaches & Markets", ko: "해운대 바다, 해변 카페와 어시장" } },
                    { id: "nature" as const, label: { en: "Scenic Road Trips & Volcanic Coast", ko: "화산 자연, 오름과 해안 드라이브" } },
                    { id: "history" as const, label: { en: "Ancient Heritage & Quiet Hanoks", ko: "천년 유적, 고즈넉한 전통 한옥" } },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setVibe(opt.id)}
                      className={`p-3 rounded-xl text-xs font-bold border text-left transition-colors flex items-center justify-between ${
                        vibe === opt.id
                          ? "bg-red-50 text-[#D32F2F] border-red-200"
                          : "bg-white text-[#555555] border-[#EAEAEA] hover:bg-neutral-50"
                      }`}
                    >
                      <span>{opt.label[lang]}</span>
                      {vibe === opt.id && <CheckCircle2 className="w-4 h-4 text-[#D32F2F] shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Pace */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-2">
                  {lang === "en" ? "3. Travel pace" : "3. 선호하는 여행 속도"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "active" as const, label: { en: "Active explorer (Pack lots in)", ko: "부지런한 탐험형 (많은 곳 방문)" } },
                    { id: "relaxed" as const, label: { en: "Slower days (Cafe & wander)", ko: "여유로운 힐링형 (카페 & 산책)" } },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPace(opt.id)}
                      className={`p-3 rounded-xl text-xs font-bold border text-left transition-colors ${
                        pace === opt.id
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-[#555555] border-[#EAEAEA] hover:bg-neutral-50"
                      }`}
                    >
                      {opt.label[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  onClick={() => setShowResult(true)}
                  className="w-full h-[52px] bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold text-[16px] rounded-xl shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-red-200" />
                  <span>{lang === "en" ? "See recommendation" : "추천 결과 확인하기"}</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Recommendation Result View */
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md">
              <img
                src={getAssetPath(rec.image)}
                alt={rec.imageAlt[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-red-300 font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D32F2F]" />
                  <span>{lang === "en" ? "Top Match" : "최적의 추천 도시"}</span>
                </div>
                <h3 className="text-3xl font-black text-white">
                  {rec.name[lang]}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-neutral-200/60 pb-2">
                <p className="text-sm font-bold text-[#171717]">
                  {rec.subtitle[lang]}
                </p>
                <span className="text-[11px] font-bold text-[#D32F2F] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full shrink-0">
                  {getDurationBadge()}
                </span>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed">
                {rec.bestFor[lang]}
              </p>

              <div className="p-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-slate-700 font-medium flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                <span className="leading-snug">{getPaceNote()}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {rec.tags.map((tag) => (
                  <span
                    key={tag.en}
                    className="text-[11px] font-semibold text-neutral-700 bg-white border border-neutral-200 px-2 py-0.5 rounded-md"
                  >
                    {tag[lang]}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowResult(false)}
                className="flex-1 h-12 rounded-xl text-xs font-bold border-neutral-300"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                <span>{lang === "en" ? "Change answers" : "조건 변경하기"}</span>
              </Button>
              <Button
                onClick={handleReset}
                className="flex-1 h-12 bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold rounded-xl"
              >
                <span>{lang === "en" ? "Got it" : "확인 완료"}</span>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
