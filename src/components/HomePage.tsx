import React from 'react';
import { Youtube, Facebook, Play, ArrowRight, Zap, Target, Search, BarChart3, CheckCircle2 } from 'lucide-react';
import { Platform, UiLanguage } from '../types';
import { translations } from '../i18n/translations';

interface HomePageProps {
  onSelectPlatform: (platform: Platform) => void;
  lang: UiLanguage;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPlatform, lang }) => {
  const t = translations[lang];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-rose-600/15 via-red-500/10 to-indigo-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-rose-400 mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold tracking-wide">AI Powered Video Growth Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight sm:leading-none text-balance">
            {t.appName}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
            {t.tagline}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl">
            {t.homeSubtitle}
          </p>
        </div>
      </section>

      {/* The EXACT THREE Main Platform Buttons Section */}
      <section className="px-4 sm:px-6 pb-16 max-w-6xl mx-auto w-full">
        <div className="flex flex-col mb-8 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.homeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'bn'
              ? 'নিচের যেকোনো একটি প্ল্যাটফর্মে ক্লিক করে ডেডিকেটেড এআই ড্যাশবোর্ডে প্রবেশ করুন:'
              : 'Choose one of the 3 platforms below to launch its dedicated AI workspace:'}
          </p>
        </div>

        {/* EXACTLY THREE LARGE PLATFORM BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BUTTON 1: YouTube */}
          <button
            onClick={() => onSelectPlatform('youtube')}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-red-500/80 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40 hover:-translate-y-1 focus:outline-none"
          >
            {/* Visual Cover Header */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <img
                src="/src/assets/images/youtube_creator_card_1793167078543.jpg"
                alt="YouTube Video Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-red-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-red-950/50">
                <Youtube className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-red-950/80 text-red-300 border border-red-800/80">
                16:9 & Shorts
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {t.ytTitle}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-xs font-semibold text-red-400 mt-0.5">
                  {t.ytSubtitle}
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {t.ytDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Search className="w-3.5 h-3.5 text-red-400" />
                  SEO, Tags, Hooks & 16:9
                </span>
                <span className="text-red-400 group-hover:underline">
                  {t.openDashboard} &rarr;
                </span>
              </div>
            </div>
          </button>

          {/* BUTTON 2: Facebook */}
          <button
            onClick={() => onSelectPlatform('facebook')}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/80 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1 focus:outline-none"
          >
            {/* Visual Cover Header */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <img
                src="/src/assets/images/facebook_creator_card_1793167078636.jpg"
                alt="Facebook Video Creator"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-blue-600/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-blue-950/50">
                <Facebook className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-300 border border-blue-800/80">
                Reels & Video
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {t.fbTitle}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-xs font-semibold text-blue-400 mt-0.5">
                  {t.fbSubtitle}
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {t.fbDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Target className="w-3.5 h-3.5 text-blue-400" />
                  Captions, Feed & 9:16 Covers
                </span>
                <span className="text-blue-400 group-hover:underline">
                  {t.openDashboard} &rarr;
                </span>
              </div>
            </div>
          </button>

          {/* BUTTON 3: TikTok */}
          <button
            onClick={() => onSelectPlatform('tiktok')}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-400/80 text-left transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/40 hover:-translate-y-1 focus:outline-none"
          >
            {/* Visual Cover Header */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <img
                src="/src/assets/images/tiktok_creator_card_1793167078889.jpg"
                alt="TikTok Short Creator Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-rose-500 backdrop-blur-md flex items-center justify-center text-slate-950 font-black shadow-lg">
                <Play className="w-6 h-6 fill-slate-950" />
              </div>
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                9:16 Viral Short
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {t.ttTitle}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-xs font-semibold text-cyan-400 mt-0.5">
                  {t.ttSubtitle}
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {t.ttDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  3s Hooks & Length Advisor
                </span>
                <span className="text-cyan-400 group-hover:underline">
                  {t.openDashboard} &rarr;
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {lang === 'bn' ? 'বাংলা ও ইংরেজি সম্পূর্ণ সাপোর্ট' : 'Bangla & English Unicode'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn'
                  ? 'উভয় ভাষার জন্য নিখুঁত টাইটেল, ডেসক্রিপশন এবং থাম্বনেইল ফন্ট রেন্ডারিং।'
                  : 'Flawless Unicode rendering for titles, descriptions, and thumbnail text overlays.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {lang === 'bn' ? 'স্বচ্ছ এআই এসইও স্কোর (০-১০০)' : 'Transparent AI SEO Scoring'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn'
                  ? 'কীওয়ার্ড রিটেনশন, হুক পাওয়ার ও রিডাবিলিটি অনুযায়ী বিস্তারিত নম্বর বিশ্লেষণ।'
                  : 'Objective evaluation of keyword density, hook strength, and viewer retention.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {lang === 'bn' ? 'প্রকৃত স্ক্রিপ্ট ও ভিডিও অডিট' : 'Retention & Pacing Audits'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn'
                  ? 'দর্শক কোন অংশে ভিডিও ছেড়ে চলে যেতে পারে তা চিহ্নিত করে সমাধান দেয়।'
                  : 'Identifies drop-off points in script narration and suggests proven retention fixes.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
