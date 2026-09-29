"use client";

import React, { useState } from "react";
import { Language } from "@/types/trip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertCircle, ExternalLink, CheckCircle2 } from "lucide-react";

interface VisaQuickCheckDialogProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

interface CountryVisaRule {
  code: string;
  name: { en: string; ko: string };
  status: "exempt" | "keta-required" | "visa-required";
  period: string;
  note: { en: string; ko: string };
}

const COUNTRIES: CountryVisaRule[] = [
  {
    code: "US",
    name: { en: "United States", ko: "미국" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026. Just bring a valid passport!",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다. 유효한 여권만으로 입국 가능합니다.",
    },
  },
  {
    code: "GB",
    name: { en: "United Kingdom", ko: "영국" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026. Visa-free entry for up to 90 days.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다. 최대 90일 무비자 체류 가능합니다.",
    },
  },
  {
    code: "JP",
    name: { en: "Japan", ko: "일본" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다.",
    },
  },
  {
    code: "AU",
    name: { en: "Australia", ko: "호주" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다.",
    },
  },
  {
    code: "SG",
    name: { en: "Singapore", ko: "싱가포르" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다.",
    },
  },
  {
    code: "DE",
    name: { en: "Germany", ko: "독일" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다.",
    },
  },
  {
    code: "CA",
    name: { en: "Canada", ko: "캐나다" },
    status: "exempt",
    period: "180 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026. Up to 180 days visa-free.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상이며 최대 180일 무비자 체류 가능합니다.",
    },
  },
  {
    code: "FR",
    name: { en: "France", ko: "프랑스" },
    status: "exempt",
    period: "90 days",
    note: {
      en: "K-ETA temporarily exempt through December 31, 2026.",
      ko: "2026년 12월 31일까지 K-ETA 한시 면제 대상입니다.",
    },
  },
  {
    code: "MY",
    name: { en: "Malaysia", ko: "말레이시아" },
    status: "keta-required",
    period: "90 days",
    note: {
      en: "K-ETA required before boarding (apply at least 72 hours in advance at k-eta.go.kr).",
      ko: "출국 72시간 전 공식 사이트(k-eta.go.kr)에서 K-ETA 전자여행허가를 사전 신청해야 합니다.",
    },
  },
  {
    code: "PH",
    name: { en: "Philippines", ko: "필리핀" },
    status: "visa-required",
    period: "Varies",
    note: {
      en: "Korean Embassy tourist visa (C-3-9) required prior to travel, or Jeju visa-free entry program.",
      ko: "출국 전 주필리핀 한국대사관을 통해 C-3-9 단기일반 관광비자를 발급받아야 합니다 (제주 무비자 제외).",
    },
  },
  {
    code: "CN",
    name: { en: "China", ko: "중국" },
    status: "visa-required",
    period: "Varies",
    note: {
      en: "Tourist visa required prior to travel via authorized travel agents or Korean visa centers.",
      ko: "출국 전 지정 비자신청센터를 통해 대한민국 관광비자 사전 발급이 필요합니다.",
    },
  },
];

export const VisaQuickCheckDialog: React.FC<VisaQuickCheckDialogProps> = ({
  open,
  lang,
  onClose,
}) => {
  const [selectedCode, setSelectedCode] = useState("US");
  const current = COUNTRIES.find((c) => c.code === selectedCode) || COUNTRIES[0];

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl border border-[#EAEAEA] shadow-2xl">
        <DialogHeader className="mb-5 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#D32F2F] bg-red-50 px-2.5 py-1 rounded-full border border-red-100 w-fit mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Entry Requirements" : "여권 국적별 입국 자격"}</span>
          </div>
          <DialogTitle className="text-2xl font-extrabold text-[#171717]">
            {lang === "en" ? "Korea Visa & K-ETA Quick Check" : "비자 & K-ETA 간편 조회"}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#555555]">
            {lang === "en"
              ? "Select your passport nationality to see current visa exemptions and official entry rules."
              : "소지하고 계신 여권의 국적을 선택하시면 면제 여부와 필수 규정을 즉시 확인할 수 있습니다."}
          </DialogDescription>
        </DialogHeader>

        {/* Nationality Selector */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
              {lang === "en" ? "Your Passport Country" : "여권 국적 선택"}
            </label>
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-[#EAEAEA] bg-white text-sm font-semibold text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name[lang]} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#767676]">
                {lang === "en" ? "Entry Status" : "입국 자격 구분"}
              </span>
              <span className="text-xs font-bold text-neutral-600">
                {lang === "en" ? `Stay up to ${current.period}` : `최대 체류: ${current.period}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {current.status === "exempt" ? (
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{lang === "en" ? "K-ETA & Visa Exempt" : "K-ETA 및 비자 한시 면제"}</span>
                </div>
              ) : current.status === "keta-required" ? (
                <div className="flex items-center gap-2 text-amber-700 font-bold text-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>{lang === "en" ? "K-ETA Required (Apply 72h ahead)" : "K-ETA 필수 신청 대상"}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-700 font-bold text-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>{lang === "en" ? "Embassy Visa Required" : "대사관 관광비자 사전 발급 필요"}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-[#444444] leading-relaxed">
              {current.note[lang]}
            </p>
          </div>

          {/* Official Source Warning & Link */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>{lang === "en" ? "Official Government Portals" : "대한민국 정부 공식 포털"}</span>
            </div>
            <p className="text-[12px] text-blue-800 leading-snug">
              {lang === "en"
                ? "Official K-ETA fee is only 10,000 KRW. Beware of third-party scam agency websites charging $80+."
                : "공식 K-ETA 수수료는 1만 원입니다. 과도한 대행 수수료를 요구하는 모방 사이트를 주의하세요."}
            </p>
            <div className="pt-1 flex gap-3">
              <a
                href="https://www.k-eta.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 underline underline-offset-2"
              >
                <span>k-eta.go.kr</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://qcode.kdca.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 underline underline-offset-2"
              >
                <span>qcode.kdca.go.kr</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={onClose}
              className="w-full h-12 bg-neutral-900 hover:bg-black text-white text-sm font-semibold rounded-xl"
            >
              {lang === "en" ? "Close" : "확인 완료"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
