"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Language, HelpTopic } from "@/types/trip";
import { FastForward, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroProblemSolver, HeroProblemSolverRef } from "@/components/home/HeroProblemSolver";
import { getAssetPath } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Client store for prefers-reduced-motion
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface HeroScrollExperienceProps {
  lang: Language;
  onSolveProblem: (topic: HelpTopic) => void;
  onConciergeClick: () => void;
  onVideoEnd?: () => void;
}

export const HeroScrollExperience = forwardRef<HeroProblemSolverRef, HeroScrollExperienceProps>(
  ({ lang, onSolveProblem, onConciergeClick, onVideoEnd }, ref) => {
    // Container Refs
    const trackRef = useRef<HTMLDivElement>(null);
    const stickyContainerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrimRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const heroLayerRef = useRef<HTMLDivElement>(null);
    const openingHeroRef = useRef<HTMLDivElement>(null);

    // Inner HeroProblemSolver ref
    const heroSolverRef = useRef<HeroProblemSolverRef>(null);

    // States & Performance Refs
    const progressBarRef = useRef<HTMLDivElement>(null);
    const phaseBadgeTextRef = useRef<HTMLSpanElement>(null);
    const isHeroActiveRef = useRef(false);
    const [isHeroActive, setIsHeroActive] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const onVideoEndRef = useRef(onVideoEnd);
    onVideoEndRef.current = onVideoEnd;
    const langRef = useRef(lang);
    langRef.current = lang;

    const reducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      getReducedMotionServerSnapshot
    );

    // Skip to Hero immediately
    const handleSkipToHero = () => {
      setIsHeroActive(true);
      onVideoEnd?.();
      const track = trackRef.current;
      if (track) {
        const targetScroll = track.offsetTop + track.offsetHeight * 0.95;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };

    // Expose focusInput to parent components
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        setIsHeroActive(true);
        onVideoEnd?.();
        const track = trackRef.current;
        if (track) {
          const targetScroll = track.offsetTop + track.offsetHeight * 0.95;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
        setTimeout(() => {
          heroSolverRef.current?.focusInput();
        }, 450);
      },
    }));

    useEffect(() => {
      if (typeof window === "undefined") return;
      gsap.registerPlugin(ScrollTrigger);

      if (reducedMotion) return;

      const track = trackRef.current;
      const stickyContainer = stickyContainerRef.current;
      const videoContainer = videoContainerRef.current;
      const video = videoRef.current;
      const scrim = scrimRef.current;
      const message = messageRef.current;
      const heroLayer = heroLayerRef.current;
      const openingHero = openingHeroRef.current;

      if (!track || !stickyContainer || !videoContainer || !video || !heroLayer) return;

      let ctx: gsap.Context | null = null;

      const setupExperience = () => {
        setIsReady(true);
        video.pause();
        try {
          video.currentTime = 0.001;
        } catch {
          // ignore if seeking not ready
        }

        const duration = video.duration && !isNaN(video.duration) && video.duration > 0
          ? video.duration
          : 4.0;
        // Clamp slightly before EOF to guarantee no black screen or video reset
        const targetDuration = Math.max(0.1, duration - 0.05);

        let maxTimeReached = 0.001;
        let introCompleted = false;

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: track,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5, // Highly responsive, silky smooth without dragging or input lag
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              onUpdate: (self) => {
                const p = self.progress;

                // 1. Direct DOM update for micro progress bar (zero React re-renders)
                if (progressBarRef.current) {
                  progressBarRef.current.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
                }

                // 2. Direct DOM update for phase badge text (zero React re-renders)
                if (phaseBadgeTextRef.current) {
                  const currentLang = langRef.current;
                  const badgeText =
                    p < 0.6
                      ? currentLang === "en"
                        ? "SCENE 01 // PLANNING"
                        : "장면 01 // 여행 계획"
                      : p < 0.88
                      ? currentLang === "en"
                        ? "SCENE 02 // REALIZATION"
                        : "장면 02 // 발견의 순간"
                      : currentLang === "en"
                      ? "SCENE 03 // RESOLUTION"
                      : "장면 03 // 솔루션";
                  if (phaseBadgeTextRef.current.textContent !== badgeText) {
                    phaseBadgeTextRef.current.textContent = badgeText;
                  }
                }

                // 3. Video animation finished threshold (85%+)
                if (p >= 0.85) {
                  introCompleted = true;
                  if (!isHeroActiveRef.current) {
                    isHeroActiveRef.current = true;
                    setIsHeroActive(true);
                    onVideoEndRef.current?.();
                  }
                }

                // If already completed, lock Hero in view and don't rewind
                if (introCompleted) {
                  if (!isHeroActiveRef.current) {
                    isHeroActiveRef.current = true;
                    setIsHeroActive(true);
                  }
                  if (heroLayer.style.opacity !== "1") {
                    heroLayer.style.opacity = "1";
                    heroLayer.style.transform = "none";
                  }
                  if (videoContainer.style.opacity !== "0") {
                    videoContainer.style.opacity = "0";
                    videoContainer.style.pointerEvents = "none";
                  }
                  if (stickyContainer.style.backgroundColor !== "rgb(250, 248, 245)") {
                    stickyContainer.style.backgroundColor = "#FAF8F5";
                  }
                  return;
                } else {
                  const shouldBeActive = p >= 0.88;
                  if (isHeroActiveRef.current !== shouldBeActive) {
                    isHeroActiveRef.current = shouldBeActive;
                    setIsHeroActive(shouldBeActive);
                  }
                }

                // 4. Ultra-smooth video scrubbing (Forward-only, zero re-decode overhead with All-Intra frames)
                if (video && video.readyState >= 1) {
                  let targetTime = 0.001;

                  if (p < 0.15) {
                    // 0 ~ 15%: Hold video start frame
                    targetTime = 0.001;
                  } else if (p <= 0.60) {
                    // 15 ~ 60%: Naturally progress video from 0s to 4s
                    const ratio = (p - 0.15) / (0.60 - 0.15);
                    targetTime = ratio * targetDuration;
                  } else {
                    // 60%+: Hold last frame of the video
                    targetTime = targetDuration;
                  }

                  // Forward-only: Do not rewind when scrolling up
                  if (targetTime > maxTimeReached) {
                    maxTimeReached = targetTime;
                  }

                  const clampedTime = Math.min(maxTimeReached, targetDuration);
                  const diff = Math.abs(video.currentTime - clampedTime);
                  // Update frame when difference exceeds half frame (~0.02s)
                  if (diff > 0.02) {
                    video.currentTime = clampedTime;
                  }
                }
              },
            },
          });

          // ===================================================================
          // SCROLL TIMELINE SEQUENCE
          // ===================================================================

          // 1. Initial Opening Editorial Narrative fades out smoothly as scroll begins (0.00 -> 0.16)
          if (openingHero) {
            tl.to(
              openingHero,
              {
                opacity: 0,
                y: -36,
                scale: 0.96,
                filter: "blur(6px)",
                duration: 0.14,
                ease: "power2.inOut",
              },
              0.01
            );
          }

          // 2. 72% ~ 88%: Slow scale 1 -> 1.08 + Brightness dimming
          tl.to(
            video,
            {
              scale: 1.08,
              filter: "brightness(0.68)",
              duration: 0.16,
              ease: "power1.inOut",
            },
            0.72
          );

          if (scrim) {
            tl.to(
              scrim,
              {
                opacity: 0.52,
                duration: 0.16,
                ease: "power1.inOut",
              },
              0.72
            );
          }

          // 3. ~80% (0.78 ~ 0.88): Headline & Subheadline smoothly appear
          if (message) {
            tl.fromTo(
              message,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.08,
                ease: "power2.out",
              },
              0.78
            );
          }

          // 4. 88% ~ 100%: Smooth transition into current Hero screen
          tl.to(
            videoContainer,
            {
              opacity: 0,
              scale: 1.10,
              filter: "blur(8px)",
              duration: 0.12,
              ease: "power2.inOut",
            },
            0.88
          );

          tl.to(
            stickyContainer,
            {
              backgroundColor: "#FAF8F5",
              duration: 0.12,
              ease: "power2.inOut",
            },
            0.88
          );

          tl.fromTo(
            heroLayer,
            { opacity: 0, scale: 0.98, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.12,
              ease: "power2.out",
            },
            0.88
          );
        }, track);

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        setupExperience();
      } else {
        video.onloadedmetadata = () => {
          setupExperience();
        };
      }

      return () => {
        if (ctx) ctx.revert();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === track) st.kill();
        });
      };
    }, [reducedMotion]);

    // If user prefers reduced motion, render Hero directly without scroll track
    if (reducedMotion) {
      return (
        <HeroProblemSolver
          ref={ref}
          lang={lang}
          onSolveProblem={onSolveProblem}
          onConciergeClick={onConciergeClick}
        />
      );
    }

    return (
      <section
        ref={trackRef}
        id="hero-scroll-track"
        className="relative w-full h-[380vh]"
        aria-label="Korea Travel Interactive Scrollytelling"
      >
        {/* Sticky Viewport Frame (100vh) */}
        <div
          ref={stickyContainerRef}
          className="sticky top-0 w-full h-screen overflow-hidden bg-black select-none"
        >
          {/* ================================================================= */}
          {/* LAYER 1: Full-Screen Scroll-Scrubbed Video & Editorial Scrollytelling */}
          {/* ================================================================= */}
          <div
            ref={videoContainerRef}
            className={`absolute inset-0 w-full h-full overflow-hidden select-none z-20 will-change-transform ${
              isHeroActive ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {/* Loading Indicator */}
            {!isReady && (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 z-30">
                <div className="w-8 h-8 border-2 border-[#EB3C30] border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                  {lang === "en" ? "LOADING VISUALS..." : "영상 준비 중..."}
                </span>
              </div>
            )}

            {/* Main Video (Full Bleed Cover) */}
            <video
              ref={videoRef}
              src={getAssetPath("/videos/Woman_planning_trip_to_Korea_20260929102431.mp4")}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none will-change-transform"
              style={{ transformOrigin: "center center" }}
            />

            {/* Dark Scrim Overlay (Smoothly fades in during 72% ~ 88%) */}
            <div
              ref={scrimRef}
              className="absolute inset-0 bg-black pointer-events-none opacity-0 z-10"
            />

            {/* Subtle Japanese Minimalist Vignettes (Top & Bottom for Soft Blending) */}
            <div className="absolute inset-x-0 top-0 h-36 sm:h-48 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10" />

            {/* Top Micro Progress Bar (Updated via direct DOM ref, 0 React re-renders) */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10 z-30 pointer-events-none">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#EB3C30] via-rose-400 to-amber-300 will-change-[width]"
                style={{ width: "0%" }}
              />
            </div>

            {/* Top HUD Bar (Placed with ample breathing room below the Header) */}
            <div className="absolute top-20 sm:top-24 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between pointer-events-none">
              {/* Minimal Phase Badge (Updated via direct DOM ref) */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#EB3C30] animate-pulse" />
                <span
                  ref={phaseBadgeTextRef}
                  className="text-[11px] font-mono font-medium tracking-widest uppercase"
                >
                  {lang === "en" ? "SCENE 01 // PLANNING" : "장면 01 // 여행 계획"}
                </span>
              </div>

              {/* Minimalist Skip Button */}
              <button
                type="button"
                onClick={handleSkipToHero}
                className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md border border-white/25 text-white text-xs font-medium tracking-wide transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                aria-label="Skip to Hero Section"
              >
                <span>{lang === "en" ? "Skip Intro" : "건너뛰기"}</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* =================================================================== */}
            {/* =================================================================== */}
            {/* LAYER 1A: Grand Opening Editorial Narrative (Visible at 0% Scroll) */}
            {/* =================================================================== */}
            <div
              ref={openingHeroRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none z-20 will-change-transform"
            >
              {/* Subtle Ambient Radial Glow for High-Contrast Readability against Video */}
              <div
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.25) 55%, transparent 85%)",
                }}
              />

              {/* Cinematic Opening Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-white leading-[1.08] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] select-none mt-2">
                {lang === "en" ? (
                  <>
                    <span className="block font-light text-slate-100/90 text-2xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">Planning Korea?</span>
                    <span className="block font-black text-white">So many questions.</span>
                  </>
                ) : (
                  <>
                    <span className="block font-light text-slate-100/90 text-2xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">한국 여행을 준비하시나요?</span>
                    <span className="block font-black text-white">시작부터 막막한 순간들.</span>
                  </>
                )}
              </h1>

              {/* Editorial Subtitle (Lead typography scale: 18~20px) */}
              <p className="text-base sm:text-lg md:text-xl text-slate-100 font-light tracking-wide mt-4 sm:mt-5 max-w-2xl leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {lang === "en"
                  ? "Foreign cards, subway passes, Naver Map vs Google Maps... Every traveler to Korea faces the same roadblocks."
                  : "해외 카드 결제 오류, 티머니 교통카드, 네이버지도 길찾기... 한국을 찾는 모든 여행자가 마주하는 막막한 고민들."}
              </p>

              {/* Floating Thought Chips (44px+ touch targets & readable body text) */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8 max-w-2xl">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/95 shadow-md">
                  <span>💳</span>
                  <span>{lang === "en" ? "Will my foreign card decline?" : "해외 카드 결제 안 되면?"}</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/95 shadow-md">
                  <span>🚇</span>
                  <span>{lang === "en" ? "Which transit card to buy?" : "어떤 교통카드를 사야 할까?"}</span>
                </div>
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/95 shadow-md">
                  <span>🗺️</span>
                  <span>{lang === "en" ? "Google Maps doesn't walk route?" : "구글맵 도보 길찾기가 안 된다고?"}</span>
                </div>
              </div>

              {/* Elegant Interactive Scroll Prompt */}
              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2 text-white/80 text-xs font-mono tracking-[0.25em] uppercase select-none">
                <span className="flex items-center gap-1.5">
                  <span>{lang === "en" ? "SCROLL DOWN TO SOLVE" : "스크롤하여 해결하기"}</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </span>
                <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm">
                  <div className="w-1 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* Center / Right Editorial Text Overlay (Appears ~80%) */}
            {/* =================================================================== */}
            <div
              ref={messageRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 pointer-events-none z-20 opacity-0 will-change-transform"
            >
              {/* Subtle Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-mono tracking-widest uppercase mb-4 sm:mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                <span>KOREA TRAVEL // 2026</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.15] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
                Planning Korea{" "}
                <span className="font-semibold text-white underline decoration-[#D32F2F] decoration-2 underline-offset-8">
                  shouldn&apos;t be this hard.
                </span>
              </h2>

              {/* Subheadline */}
              <p className="text-base sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide mt-5 sm:mt-7 max-w-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                Everything you need for your Korea trip, in one place.
              </p>

              {/* Bilingual Subtitle for Korean language mode */}
              {lang === "ko" && (
                <p className="text-sm sm:text-base text-slate-300/80 font-normal mt-3 tracking-normal">
                  한국 여행 준비, 이렇게 힘들 필요는 없으니까요. 필요한 모든 것을 한곳에서.
                </p>
              )}
            </div>
          </div>

          {/* =================================================================== */}
          {/* LAYER 2: Original 1:1 Hero Section (Emerges Naturally at 88% ~ 100%) */}
          {/* =================================================================== */}
          <div
            ref={heroLayerRef}
            className={`absolute inset-0 w-full h-full overflow-y-auto z-30 ${
              isHeroActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{ opacity: 0 }}
          >
            {/* Clear fixed header (pt-24 ~ pt-32) and vertically center via my-auto on tall displays */}
            <div className="w-full min-h-full flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
              <div className="w-full max-w-4xl my-auto">
                {/* Preserves 100% of original Hero design, typography, cards & internal animations */}
                <HeroProblemSolver
                  ref={heroSolverRef}
                  lang={lang}
                  onSolveProblem={onSolveProblem}
                  onConciergeClick={onConciergeClick}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HeroScrollExperience.displayName = "HeroScrollExperience";
