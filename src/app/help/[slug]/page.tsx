import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, SOLUTION_GUIDES } from "@/data/guides";
import { HelpTopic } from "@/types/trip";
import { ArrowLeft, Clock, CheckCircle2, Lightbulb, HeartHandshake } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
  return SOLUTION_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug as HelpTopic);
  if (!guide) return { title: "Help Guide Not Found | KTrip" };

  return {
    title: `${guide.title.en} | KTrip Travel OS`,
    description: guide.shortDescription.en,
  };
}

export default async function HelpGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug as HelpTopic);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-[#171717]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#EAEAEA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#555555] hover:text-[#171717] transition-colors p-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to KTrip Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              {guide.badge.en}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Cover */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl mb-8 bg-neutral-900">
          <img
            src={guide.image}
            alt={guide.imageAlt.en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-white/90 mb-2">
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                <Clock className="w-3.5 h-3.5" />
                <span>{guide.estimatedMinutes} min read</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              {guide.title.en}
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-xl">
              {guide.shortDescription.en}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Checklist */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#767676] mb-4">
              Essential Checklist
            </h2>
            <div className="space-y-3">
              {guide.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[15px] font-semibold text-[#171717]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Steps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAEA] shadow-sm space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#767676]">
              Step-by-Step Instructions
            </h2>

            <div className="space-y-6">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="border-b border-neutral-100 last:border-0 pb-6 last:pb-0 space-y-2">
                  <h3 className="text-xl font-bold text-[#171717]">
                    {step.title.en}
                  </h3>
                  <p className="text-[17px] text-[#555555] leading-relaxed">
                    {step.description.en}
                  </p>
                  {step.tip && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-900 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{step.tip.en}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Need Local Backup Card */}
          <div className="bg-red-50/50 rounded-3xl p-6 sm:p-8 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D32F2F] uppercase tracking-wider mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Local Concierge Backup</span>
              </div>
              <h3 className="text-lg font-bold text-[#171717]">
                Still running into friction?
              </h3>
              <p className="text-sm text-[#555555]">
                Ask our Korean local team to place calls or assist with reservations.
              </p>
            </div>
            <Link
              href="/#problem-solver"
              className="px-6 py-3 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold text-sm rounded-xl shadow-sm transition-colors whitespace-nowrap"
            >
              Ask KTrip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
