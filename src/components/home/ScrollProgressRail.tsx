"use client";

import React, { useEffect, useState } from "react";
import { Language } from "@/types/trip";

interface Chapter {
  id: string;
  num: string;
  label: { en: string; ko: string };
}

const CHAPTERS: Chapter[] = [
  { id: "hero", num: "00", label: { en: "SOLVE", ko: "검색" } },
  { id: "help-topics", num: "01", label: { en: "GUIDES", ko: "가이드" } },
  { id: "trip-stages", num: "02", label: { en: "TIMELINE", ko: "타임라인" } },
  { id: "destinations", num: "03", label: { en: "CITIES", ko: "도시" } },
  { id: "how-it-works", num: "04", label: { en: "SYSTEM", ko: "시스템" } },
  { id: "concierge", num: "05", label: { en: "BACKUP", ko: "현지지원" } },
];

interface ScrollProgressRailProps {
  lang: Language;
}

export const ScrollProgressRail: React.FC<ScrollProgressRailProps> = ({ lang }) => {
  const [activeChapter, setActiveChapter] = useState<string>("hero");
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    let ticking = false;
    let lastProgress = -1;
    let lastChapter = "hero";

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;
      
      if (progress !== lastProgress) {
        lastProgress = progress;
        setProgressPercent(progress);
      }

      // Quick shortcut: if inside top hero intro, chapter is always hero without reflow
      if (scrollY < 500) {
        if (lastChapter !== "hero") {
          lastChapter = "hero";
          setActiveChapter("hero");
        }
        ticking = false;
        return;
      }

      // Determine active section only when scrolled past intro
      const targetMidPoint = window.innerHeight * 0.45;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetMidPoint) {
            const nextChap = CHAPTERS[i].id;
            if (nextChap !== lastChapter) {
              lastChapter = nextChap;
              setActiveChapter(nextChap);
            }
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollMetrics);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollMetrics();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      aria-label="Page scroll navigation"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-6 pointer-events-auto"
    >
      {/* Top micro percentage counter */}
      <div className="font-mono text-[10px] tracking-widest text-slate-500 font-bold select-none">
        {String(progressPercent).padStart(2, "0")}%
      </div>

      {/* Vertical Track with Active Fill */}
      <div className="relative w-[3px] h-28 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-[#D32F2F] transition-all duration-150 ease-out"
          style={{ height: `${progressPercent}%` }}
        />
      </div>

      {/* Chapters Nav list */}
      <nav className="flex flex-col items-center gap-4">
        {CHAPTERS.map((chap) => {
          const isActive = activeChapter === chap.id;
          return (
            <button
              key={chap.id}
              onClick={() => scrollTo(chap.id)}
              className="group relative flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] rounded p-1"
              aria-label={`Jump to ${chap.label[lang]}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Dot / Pill indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#D32F2F] ring-4 ring-[#D32F2F]/20 scale-110"
                    : "w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-500"
                }`}
              />

              {/* Hover Floating Label */}
              <div
                className="absolute left-6 px-3 py-1.5 rounded-xl bg-white border border-[#EAEAEA] text-[#171717] font-mono text-xs tracking-wider whitespace-nowrap shadow-lg transition-all duration-200 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              >
                <span className="text-[#D32F2F] mr-1.5 font-bold">{chap.num}</span>
                {chap.label[lang]}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
