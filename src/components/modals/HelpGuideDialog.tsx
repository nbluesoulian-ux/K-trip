"use client";

import React from "react";
import { Language, HelpTopic } from "@/types/trip";
import { getGuideBySlug } from "@/data/guides";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, ArrowRight, HeartHandshake, Lightbulb } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface HelpGuideDialogProps {
  slug: HelpTopic | null;
  lang: Language;
  onClose: () => void;
  onConciergeClick: () => void;
  onVisaCheckClick: () => void;
  onDestinationPickerClick: () => void;
}

export const HelpGuideDialog: React.FC<HelpGuideDialogProps> = ({
  slug,
  lang,
  onClose,
  onConciergeClick,
  onVisaCheckClick,
  onDestinationPickerClick,
}) => {
  if (!slug) return null;
  const guide = getGuideBySlug(slug);
  if (!guide) return null;

  const handleQuickAction = () => {
    if (!guide.quickAction) return;
    onClose();
    if (guide.quickAction.actionType === "visa-check") {
      onVisaCheckClick();
    } else if (guide.quickAction.actionType === "concierge") {
      onConciergeClick();
    } else if (guide.quickAction.actionType === "destination-picker") {
      onDestinationPickerClick();
    }
  };

  return (
    <Dialog open={!!slug} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl">
        {/* Header Image */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-neutral-900">
          <img
            src={getAssetPath(guide.image)}
            alt={guide.imageAlt[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-white bg-red-600/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {guide.badge[lang]}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                <span>{guide.estimatedMinutes} min read</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {guide.title[lang]}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-[17px] text-[#444444] font-medium leading-relaxed">
            {guide.shortDescription[lang]}
          </p>

          {/* Quick Action Button if applicable */}
          {guide.quickAction && (
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider block mb-0.5">
                  {lang === "en" ? "Fast-Track Tool" : "빠른 실행 도구"}
                </span>
                <span className="text-[15px] font-bold text-[#171717]">
                  {guide.quickAction.label[lang]}
                </span>
              </div>
              <Button
                onClick={handleQuickAction}
                className="h-10 px-4 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold text-xs rounded-xl shadow-xs shrink-0"
              >
                <span>{lang === "en" ? "Open tool" : "도구 열기"}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          )}

          {/* Checklist */}
          <div className="rounded-2xl bg-neutral-50 p-5 border border-neutral-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#767676] mb-3">
              {lang === "en" ? "Quick Checklist" : "필수 체크리스트"}
            </h4>
            <div className="space-y-2">
              {guide.checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm font-semibold text-[#171717]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#767676]">
              {lang === "en" ? "Actionable Next Steps" : "지금 실행할 단계"}
            </h4>
            {guide.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-[#EAEAEA] bg-white shadow-2xs space-y-2">
                <h5 className="text-[16px] font-bold text-[#171717]">
                  {step.title[lang]}
                </h5>
                <p className="text-[15px] text-[#555555] leading-relaxed">
                  {step.description[lang]}
                </p>
                {step.tip && (
                  <div className="mt-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{step.tip[lang]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Local Concierge Backup Fallback */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50/50 p-4 rounded-2xl">
            <div className="text-center sm:text-left">
              <h5 className="text-sm font-bold text-[#171717]">
                {lang === "en" ? "Still stuck or too complicated?" : "직접 하기 어렵거나 막히셨나요?"}
              </h5>
              <p className="text-xs text-[#767676]">
                {lang === "en"
                  ? "Hand it over to our local concierge team."
                  : "KTrip 현지 매니저에게 대행을 요청하시면 해결해 드립니다."}
              </p>
            </div>
            <Button
              onClick={() => {
                onClose();
                onConciergeClick();
              }}
              variant="outline"
              className="h-11 px-5 border-[#D32F2F] text-[#D32F2F] hover:bg-red-50 text-xs font-bold rounded-xl shrink-0"
            >
              <HeartHandshake className="w-4 h-4 mr-1.5" />
              <span>{lang === "en" ? "Ask local concierge" : "현지 도움 요청"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
