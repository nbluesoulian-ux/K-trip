"use client";

import React, { useState } from "react";
import { LucideIcon } from "lucide-react";

interface InteractivePinProps {
  label: { en: string; ko: string };
  tip: { en: string; ko: string };
  badgeText: string;
  icon?: LucideIcon;
  lang: "en" | "ko";
  className?: string;
  color?: string;
  onClick?: () => void;
}

export const InteractivePin: React.FC<InteractivePinProps> = ({
  label,
  tip,
  badgeText,
  icon: Icon,
  lang,
  className = "",
  color = "#FF6200", // Sun Bousai vibrant orange signature
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative inline-block group z-30 ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Outer pulsing ring (Sun Bousai style) */}
      <div
        className="absolute -inset-2 rounded-full opacity-35 animate-ping pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Main Clickable Teardrop / Pill Pin Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          onClick?.();
        }}
        className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F]"
        aria-label={label[lang]}
      >
        {/* Sun Bousai Icon Badge */}
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0 shadow-sm"
          style={{ backgroundColor: color }}
        >
          {Icon ? <Icon className="w-2.5 h-2.5 text-white" /> : "★"}
        </span>
        <span className="font-bold text-[11px] text-slate-900 tracking-tight whitespace-nowrap">
          {badgeText}
        </span>
      </button>

      {/* Pop-Out Detail Speech Bubble (Sun Bousai style) */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-64 sm:w-72 p-4 rounded-2xl bg-white border-2 border-slate-800 text-slate-900 shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 pointer-events-none ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-90"
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <h4 className="text-xs font-black text-slate-900 tracking-tight">
            {label[lang]}
          </h4>
        </div>
        <p className="text-[12px] text-slate-600 font-normal leading-relaxed">
          {tip[lang]}
        </p>

        {/* Triangle Speech Pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[4px] w-0 h-0 border-x-[7px] border-x-transparent border-t-[7px] border-t-white" />
      </div>
    </div>
  );
};
