"use client";

import React, { useState, useRef } from "react";
import { Language, HelpTopic } from "@/types/trip";
import { AmbientCanvas } from "@/components/hero/AmbientCanvas";
import { ScrollProgressRail } from "@/components/layout/ScrollProgressRail";
import { Header } from "@/components/layout/Header";
import { HeroScrollExperience } from "@/components/hero/HeroScrollExperience";
import { HeroProblemSolverRef } from "@/components/hero/HeroProblemSolver";
import { PopularHelpTopics } from "@/components/sections/PopularHelpTopics";
import { TripStageSection } from "@/components/sections/TripStageSection";
import { FindYourKorea } from "@/components/sections/FindYourKorea";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LocalConcierge } from "@/components/sections/LocalConcierge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { HelpGuideDialog } from "@/components/modals/HelpGuideDialog";
import { ConciergeDialog } from "@/components/modals/ConciergeDialog";
import { VisaQuickCheckDialog } from "@/components/modals/VisaQuickCheckDialog";
import { DestinationPickerModal } from "@/components/modals/DestinationPickerModal";
import { matchProblemToTopic } from "@/lib/problem-matcher";

export default function Home() {
  // English is the default language as requested in requirements!
  const [lang, setLang] = useState<Language>("en");

  // Dialog & Modal states
  const [activeGuideSlug, setActiveGuideSlug] = useState<HelpTopic | null>(null);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [visaCheckOpen, setVisaCheckOpen] = useState(false);
  const [destinationPickerOpen, setDestinationPickerOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  // Hero ref for focusing problem input
  const heroRef = useRef<HeroProblemSolverRef>(null);

  // If page was already scrolled down on load, reveal header
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setIsHeaderVisible(true);
      }
    };
    const timer = setTimeout(handleScroll, 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === "en" ? "ko" : "en"));
  };

  const handleAskClick = () => {
    setIsHeaderVisible(true);
    heroRef.current?.focusInput();
  };

  const handleSolveProblem = (topic: HelpTopic) => {
    setActiveGuideSlug(topic);
  };

  const handleFinalCTASolve = (query: string) => {
    const result = matchProblemToTopic(query);
    if (result.matched && result.topic) {
      setActiveGuideSlug(result.topic);
    } else {
      heroRef.current?.focusInput();
    }
  };

  const handleOpenConcierge = () => {
    setConciergeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-[#D32F2F] selection:text-white relative overflow-x-clip">
      {/* 0. Ambient Canvas with Parallax Bokeh Orbs (Okina-Inspired) */}
      <AmbientCanvas />

      {/* Persistent Left Scroll Rail with Progress & Chapter Navigation (2XL Screens) */}
      <ScrollProgressRail lang={lang} />

      {/* 1. Header with Integrated Scroll Progress Underline (Reveals when video animation finishes) */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        onAskClick={handleAskClick}
        onConciergeClick={handleOpenConcierge}
        visible={isHeaderVisible}
      />

      <main className="relative z-10">
        {/* Act 00: Scroll Video Experience with In-Place Hero Reveal */}
        <HeroScrollExperience
          ref={heroRef}
          lang={lang}
          onSolveProblem={handleSolveProblem}
          onConciergeClick={handleOpenConcierge}
          onVideoEnd={() => setIsHeaderVisible(true)}
        />

        {/* Act 01: Core Solution Playbooks (Pinned Split Sticky Layout) */}
        <PopularHelpTopics
          lang={lang}
          onSelectTopic={(topic) => setActiveGuideSlug(topic)}
        />

        {/* Act 02: Travel Timeline (Pre-departure vs On the ground) */}
        <TripStageSection
          lang={lang}
          onSelectTopic={(topic) => setActiveGuideSlug(topic)}
          onConciergeClick={handleOpenConcierge}
        />

        {/* Act 03: Sense of Place (Cities by Vibe) */}
        <FindYourKorea
          lang={lang}
          onHelpMeChoose={() => setDestinationPickerOpen(true)}
        />

        {/* Act 04: The Framework (How It Works) */}
        <HowItWorks lang={lang} />

        {/* Act 05: Local Concierge (Direct Seoul Team & 1330 Hotline) */}
        <LocalConcierge
          lang={lang}
          onOpenConcierge={handleOpenConcierge}
        />

        {/* Act 06: Instant Resolution CTA */}
        <FinalCTA
          lang={lang}
          onSolveProblem={handleFinalCTASolve}
          onConciergeClick={handleOpenConcierge}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onToggleLang={handleToggleLang}
        onAskClick={handleAskClick}
        onConciergeClick={handleOpenConcierge}
        onSelectTopic={(topic) => setActiveGuideSlug(topic)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        lang={lang}
        onAskClick={handleAskClick}
      />

      {/* Interactive Modals & Dialogs (Preserving all original actions & data) */}
      <HelpGuideDialog
        slug={activeGuideSlug}
        lang={lang}
        onClose={() => setActiveGuideSlug(null)}
        onConciergeClick={handleOpenConcierge}
        onVisaCheckClick={() => setVisaCheckOpen(true)}
        onDestinationPickerClick={() => setDestinationPickerOpen(true)}
      />

      <ConciergeDialog
        open={conciergeOpen}
        lang={lang}
        onClose={() => setConciergeOpen(false)}
        initialTopic={activeGuideSlug || "other"}
      />

      <VisaQuickCheckDialog
        open={visaCheckOpen}
        lang={lang}
        onClose={() => setVisaCheckOpen(false)}
      />

      <DestinationPickerModal
        open={destinationPickerOpen}
        lang={lang}
        onClose={() => setDestinationPickerOpen(false)}
      />
    </div>
  );
}
