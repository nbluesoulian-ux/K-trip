"use client";

import React, { useState } from "react";
import { Language, HelpTopic, HelpRequestDraft } from "@/types/trip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeartHandshake, CheckCircle2 } from "lucide-react";

interface ConciergeDialogProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
  initialTopic?: HelpTopic | "other";
}

export const ConciergeDialog: React.FC<ConciergeDialogProps> = ({
  open,
  lang,
  onClose,
  initialTopic = "other",
}) => {
  const [form, setForm] = useState<HelpRequestDraft>({
    topic: initialTopic,
    travelDate: "",
    city: "Seoul",
    contactMethod: "whatsapp",
    contactInfo: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleReset()}>
      <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl border border-[#EAEAEA] shadow-2xl">
        {!submitted ? (
          <div>
            <DialogHeader className="mb-5 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#D32F2F] bg-red-50 px-2.5 py-1 rounded-full border border-red-100 w-fit mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Local Concierge Backup" : "현지 매니저 지원 요청"}</span>
              </div>
              <DialogTitle className="text-2xl font-extrabold text-[#171717]">
                {lang === "en" ? "Ask a local for assistance" : "현지 담당자에게 도움 요청하기"}
              </DialogTitle>
              <DialogDescription className="text-sm text-[#555555]">
                {lang === "en"
                  ? "Tell us what you need help with. We'll handle phone calls, restaurant reservations, or local payment issues."
                  : "식당 예약, 결제 오류 등 앱으로 해결하기 어려운 현지 문제를 알려주세요."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                  {lang === "en" ? "What do you need help with?" : "어떤 도움이 필요하신가요?"}
                </label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value as HelpTopic | "other" })}
                  className="w-full h-12 px-3.5 rounded-xl border border-[#EAEAEA] bg-white text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                >
                  <option value="delivery">{lang === "en" ? "Food Delivery & Payment Help" : "음식 배달 및 결제 대행"}</option>
                  <option value="stay">{lang === "en" ? "Hotel & Hanok Booking Questions" : "숙소 및 한옥 예약 문의"}</option>
                  <option value="transit">{lang === "en" ? "Train & Subway Guidance" : "기차 및 대중교통 이동 문의"}</option>
                  <option value="rental-car">{lang === "en" ? "Car Rental & IDP Verification" : "렌터카 및 국제면허증 확인"}</option>
                  <option value="entry">{lang === "en" ? "Visa & Entry Guidance" : "비자 및 입국 서류 확인"}</option>
                  <option value="other">{lang === "en" ? "Other Request (Restaurant call, etc.)" : "기타 요청 (식당 전화 예약 등)"}</option>
                </select>
              </div>

              {/* Travel Date & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                    {lang === "en" ? "Travel date" : "여행 일자"}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.travelDate}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    className="w-full h-12 px-3.5 rounded-xl border border-[#EAEAEA] bg-white text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                    {lang === "en" ? "Current city" : "현재 위치/도시"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "en" ? "e.g. Seoul, Busan, Jeju" : "예: 서울, 부산, 제주"}
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full h-12 px-3.5 rounded-xl border border-[#EAEAEA] bg-white text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                  {lang === "en" ? "Preferred contact method" : "선호하는 연락 수단"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["whatsapp", "email", "kakao"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setForm({ ...form, contactMethod: method })}
                      className={`h-11 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors ${
                        form.contactMethod === method
                          ? "bg-[#D32F2F] text-white border-[#D32F2F]"
                          : "bg-white text-[#555555] border-[#EAEAEA] hover:bg-neutral-50"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                  {lang === "en" ? "Your contact (Email or Phone)" : "연락처 (이메일 또는 전화번호)"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    form.contactMethod === "email"
                      ? "your.email@example.com"
                      : "+1 555-0199 or ID"
                  }
                  value={form.contactInfo}
                  onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-xl border border-[#EAEAEA] bg-white text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555555] mb-1.5">
                  {lang === "en" ? "Details (Optional)" : "상세 요청 사항 (선택)"}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    lang === "en"
                      ? "e.g. Please call to reserve a table for 2 at a famous BBQ spot in Hongdae for tonight."
                      : "예: 오늘 저녁 홍대 유명 삼겹살집 2명 전화 예약 부탁드립니다."
                  }
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#EAEAEA] bg-white text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-[52px] bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold text-[16px] rounded-xl shadow-md transition-transform active:scale-[0.98]"
                >
                  {lang === "en" ? "Submit request" : "요청 접수하기"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Safe Demo Completion State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-[#171717]">
              {lang === "en" ? "Request saved for this demo" : "데모 접수가 완료되었습니다"}
            </h3>

            <p className="text-[15px] text-[#555555] leading-relaxed max-w-sm mx-auto">
              {lang === "en"
                ? "This interactive showcase captures your request for demonstration purposes. No booking or payment has been made."
                : "본 인터랙티브 데모에서는 요청 양식 시연만 진행되며, 실제 예약이나 결제는 이루어지지 않았습니다."}
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-[#666666] max-w-sm mx-auto text-left space-y-1">
              <div>
                <strong>{lang === "en" ? "Topic: " : "요청 분류: "}</strong>
                <span className="capitalize">{form.topic}</span>
              </div>
              <div>
                <strong>{lang === "en" ? "Destination: " : "여행지: "}</strong>
                <span>{form.city || "Seoul"}</span>
              </div>
              <div>
                <strong>{lang === "en" ? "Contact: " : "회신 채널: "}</strong>
                <span>{form.contactMethod} ({form.contactInfo || "Demo mode"})</span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleReset}
                className="w-full h-12 bg-neutral-900 hover:bg-black text-white text-sm font-semibold rounded-xl"
              >
                {lang === "en" ? "Close preview" : "확인 및 닫기"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
