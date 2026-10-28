import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Save,
  FileText,
  Clock,
  Tag,
  Hash,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon,
  Sliders,
  ChevronDown,
  Upload,
  ArrowLeft,
  Share2,
  Edit2,
  Film,
} from 'lucide-react';
import {
  Platform,
  UiLanguage,
  VideoScriptInput,
  GenerationResults,
  VideoCategory,
  ContentLanguage,
  TargetAudience,
  VideoFormat,
  TitleItem,
} from '../types';
import { apiService } from '../services/apiService';
import { storageService } from '../services/storageService';
import { translations } from '../i18n/translations';
import { CanvasThumbnailEditor } from './CanvasThumbnailEditor';

interface PlatformDashboardProps {
  platform: Platform;
  lang: UiLanguage;
  onBackToHome: () => void;
  onProjectSaved: () => void;
  initialProjectData?: {
    input: VideoScriptInput;
    results: GenerationResults;
  };
}

const CATEGORIES: VideoCategory[] = [
  'News',
  'Education',
  'Islamic Content',
  'Comedy',
  'Entertainment',
  'Technology',
  'Facts and Information',
  'Tutorial',
  'Reviews',
  'Other',
];

const LANGUAGES: ContentLanguage[] = ['Bengali', 'English', 'Hindi', 'Arabic', 'Other'];

const AUDIENCES: TargetAudience[] = [
  'Bangladesh',
  'United States',
  'United Kingdom',
  'India',
  'Global Audience',
  'Custom',
];

const SAMPLE_SCRIPTS: Record<Platform, { topic: string; script: string; category: VideoCategory }> = {
  youtube: {
    topic: 'কিভাবে AI ব্যবহার করে ভিডিও এডিটিং ৫ গুণ দ্রুত করবেন',
    category: 'Technology',
    script: `আজকের এই ভিডিওতে আমি আপনাদের দেখাবো কিভাবে কৃত্রিম বুদ্ধিমত্তা বা AI টুলস ব্যবহার করে আপনার ভিডিও এডিটিং এর সময় ৮০% পর্যন্ত কমিয়ে ফেলতে পারেন।
অনেকেই ভাবেন ভালো ভিডিও বানাতে ঘণ্টার পর ঘণ্টা টাইমলাইনে বসে কাটাতে হয়। কিন্তু সত্যি বলতে, ২০২৬ সালে এসে ম্যানুয়ালি কাটছাঁট করা বোকামি!
প্রথমেই আমরা কথা বলব অটোমেটিক সাইলেন্স রিমুভার নিয়ে। এটি আপনার কথার মাঝখানের অপ্রয়োজনীয় নীরবতা এক ক্লিকে মুছে ফেলে।
এরপর আসবে কালার গ্রেডিং এবং অটো ক্যাপশন জেনারেশন। যারা বাংলা ভাষায় কনটেন্ট বানান, তাদের জন্য সঠিক সাবটাইটেল তৈরি করা এখন মাত্র কয়েক সেকেন্ডের ব্যাপার।
ভিডিওটি সম্পূর্ণ দেখুন, কারণ শেষের দিকে এমন একটি গোপন ট্রিকস শেয়ার করব যা আপনার রিটেনশন রেট আকাশচুম্বী করে তুলবে। চলুন শুরু করা যাক!`,
  },
  facebook: {
    topic: 'স্মার্টফোনে সিনেমাটিক ফেসবুক রিলস বানানোর ৩টি গোপন ট্রিকস',
    category: 'Tutorial',
    script: `আপনি কি জানেন আপনার সাধারণ মোবাইল ফোন দিয়েই লাখ লাখ ভিউ পাওয়া সিনেমাটিক রিলস তৈরি সম্ভব?
অধিকাংশ ক্রিয়েটর প্রথম ৩ সেকেন্ডেই দর্শক হারিয়ে ফেলেন কারণ তাদের ফ্রেম স্ট্যাটিক থাকে।
ট্রিকস নাম্বার ১: ক্যামেরা কখনো স্থির রাখবেন না, পুশ-ইন অথবা প্যারালাক্স মুভমেন্ট ব্যবহার করুন।
ট্রিকস নাম্বার ২: ডাইরেক্ট সানলাইটের বদলে গোল্ডেন আওয়ারের আলোতে শুট করুন।
ট্রিকস নাম্বার ৩: ব্যাকগ্রাউন্ড মিউজিকের বিটের সাথে কাট মেলান।
কমেন্টে জানান আপনি কোন ব্র্যান্ডের ফোন দিয়ে ভিডিও বানান? পরের ভিডিওতে আমরা লাইটিং সেটআপ নিয়ে আলোচনা করব!`,
  },
  tiktok: {
    topic: '৩টি ভুল যা আপনার টিকটক ভিডিওর ভিউ ফ্রিজ করে দেয়',
    category: 'Facts and Information',
    script: `থামুন! আপনি যদি এই ৩টি ভুল করতে থাকেন, আপনার টিকটক একাউন্ট কখনোই ভাইরাল হবে না।
ভুল ১: প্রথম ১ সেকেন্ডে হাই-এনার্জি হুক না দিয়ে 'হ্যালো বন্ধুরা' বলে সময় নষ্ট করা।
ভুল ২: ট্রেন্ডিং অডিও ব্যবহার না করে শুধু সাধারণ মিউজিক রাখা।
ভুল ৩: ভিডিওর শেষে এমন কোনো প্রশ্ন না রাখা যা দর্শককে কমেন্ট করতে বাধ্য করে।
ভিডিওটি সেভ করে রাখুন এবং নিজের পরবর্তী ভিডিওতে এই নিয়মগুলো টেস্ট করে রেজাল্ট দেখুন!`,
  },
};

export const PlatformDashboard: React.FC<PlatformDashboardProps> = ({
  platform,
  lang,
  onBackToHome,
  onProjectSaved,
  initialProjectData,
}) => {
  const t = translations[lang];

  // Default format based on platform
  const defaultFormat: VideoFormat =
    platform === 'youtube'
      ? 'youtube_long'
      : platform === 'facebook'
      ? 'fb_reels'
      : 'tiktok_short';

  // Form inputs
  const [script, setScript] = useState(initialProjectData?.input.script || '');
  const [category, setCategory] = useState<VideoCategory>(initialProjectData?.input.category || 'Technology');
  const [contentLang, setContentLang] = useState<ContentLanguage>(initialProjectData?.input.language || 'Bengali');
  const [audience, setAudience] = useState<TargetAudience>(initialProjectData?.input.audience || 'Bangladesh');
  const [customAudience, setCustomAudience] = useState(initialProjectData?.input.customAudience || '');
  const [format, setFormat] = useState<VideoFormat>(initialProjectData?.input.format || defaultFormat);
  const [topic, setTopic] = useState(initialProjectData?.input.topic || '');

  // Generation state
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [activeStepName, setActiveStepName] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [loadingModules, setLoadingModules] = useState<Record<string, boolean>>({});
  const [errorMsg, setErrorMsg] = useState('');

  // Results state
  const [results, setResults] = useState<GenerationResults>(initialProjectData?.results || {});

  // Copied states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Video file upload state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);
  const [videoAnalysisError, setVideoAnalysisError] = useState('');

  // Word count & metrics
  const wordCount = script.trim() ? script.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = script.length;
  const estMinutes = (wordCount / 140).toFixed(1);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = () => {
    const parts: string[] = [];
    if (results.titles?.length) {
      parts.push(`=== ${t.cardTitles} ===\n` + results.titles.map((t, idx) => `${idx + 1}. ${t.title} (SEO: ${t.seoScore}/100)`).join('\n'));
    }
    if (results.hooks?.length) {
      parts.push(`\n=== ${t.cardHooks} ===\n` + results.hooks.map((h, idx) => `${idx + 1}. [${h.style}] ${h.hook}`).join('\n'));
    }
    if (results.description) {
      parts.push(`\n=== ${t.cardDescription} ===\n${results.description.fullDescription}`);
    }
    if (results.tags) {
      parts.push(`\n=== ${t.cardTags} ===\n${results.tags.commaSeparated}`);
    }
    if (results.keywords) {
      parts.push(`\n=== ${t.cardKeywords} ===\nPrimary: ${results.keywords.primaryKeywords.join(', ')}\nSecondary: ${results.keywords.secondaryKeywords.join(', ')}\nIntent: ${results.keywords.searchIntent}`);
    }

    if (parts.length > 0) {
      navigator.clipboard.writeText(parts.join('\n\n'));
      setCopiedKey('copy_all');
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleSaveProject = () => {
    const input: VideoScriptInput = {
      script,
      category,
      language: contentLang,
      audience,
      customAudience,
      format,
      topic,
    };
    storageService.saveProject(platform, topic || script.substring(0, 35), input, results);
    setSaveSuccess(true);
    onProjectSaved();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const loadSampleScript = () => {
    const sample = SAMPLE_SCRIPTS[platform];
    setScript(sample.script);
    setTopic(sample.topic);
    setCategory(sample.category);
  };

  const validateScript = (): boolean => {
    if (!script.trim() || script.trim().length < 30) {
      setErrorMsg(t.scriptMinLengthWarning);
      return false;
    }
    setErrorMsg('');
    return true;
  };

  // Run all generators
  const handleGenerateAll = async () => {
    if (!validateScript()) return;
    setIsGeneratingAll(true);
    setErrorMsg('');

    const input: VideoScriptInput = {
      script,
      category,
      language: contentLang,
      audience,
      customAudience,
      format,
      topic,
    };

    try {
      const generated = await apiService.generateAll(input, platform, (step, pct) => {
        setActiveStepName(step);
        setProgressPercent(pct);
      });
      setResults(generated);
    } catch (err: any) {
      setErrorMsg(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGeneratingAll(false);
    }
  };

  // Individual generators
  const runIndividual = async (key: string, fn: () => Promise<void>) => {
    if (!validateScript()) return;
    setLoadingModules((prev) => ({ ...prev, [key]: true }));
    setErrorMsg('');
    try {
      await fn();
    } catch (err: any) {
      setErrorMsg(`${key}: ${err.message || 'Failed'}`);
    } finally {
      setLoadingModules((prev) => ({ ...prev, [key]: false }));
    }
  };

  const currentInput: VideoScriptInput = {
    script,
    category,
    language: contentLang,
    audience,
    customAudience,
    format,
    topic,
  };

  // Video File Upload Analysis
  const handleVideoUpload = async () => {
    if (!videoFile) return;
    setIsAnalyzingVideo(true);
    setVideoAnalysisError('');
    try {
      const data = await apiService.analyzeVideo(videoFile, script, platform);
      setResults((prev) => ({ ...prev, videoAnalysis: data }));
    } catch (err: any) {
      setVideoAnalysisError(err.message || 'Video analysis failed. Please verify video format and size.');
    } finally {
      setIsAnalyzingVideo(false);
    }
  };

  // Platform themed styles
  const themeColors = {
    youtube: {
      accent: 'text-red-500',
      border: 'border-red-500/30',
      bgGlow: 'from-red-600/10 via-red-950/20 to-transparent',
      btnPrimary: 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/50',
      badge: 'bg-red-950/80 text-red-300 border-red-800/80',
    },
    facebook: {
      accent: 'text-blue-500',
      border: 'border-blue-500/30',
      bgGlow: 'from-blue-600/10 via-blue-950/20 to-transparent',
      btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50',
      badge: 'bg-blue-950/80 text-blue-300 border-blue-800/80',
    },
    tiktok: {
      accent: 'text-cyan-400',
      border: 'border-cyan-400/30',
      bgGlow: 'from-cyan-600/10 via-pink-950/20 to-transparent',
      btnPrimary: 'bg-gradient-to-r from-cyan-500 to-rose-500 hover:opacity-95 text-slate-950 font-bold shadow-cyan-950/50',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80',
    },
  }[platform];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={t.backToHome}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${themeColors.badge}`}>
                {platform}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-white capitalize">
                {platform === 'youtube' ? t.ytTitle : platform === 'facebook' ? t.fbTitle : t.ttTitle} Dashboard
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {platform === 'youtube' ? t.ytSubtitle : platform === 'facebook' ? t.fbSubtitle : t.ttSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyAll}
            disabled={!results.titles && !results.description}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            {copiedKey === 'copy_all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.copiedAll}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyAll}</span>
              </>
            )}
          </button>

          <button
            onClick={handleSaveProject}
            disabled={!script.trim()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors disabled:opacity-40"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.projectSaved}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.saveProject}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg('')}
            className="text-slate-400 hover:text-white text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Script Input Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className={`absolute top-0 right-0 w-80 h-40 bg-gradient-to-b ${themeColors.bgGlow} blur-3xl pointer-events-none`} />

        {/* Header & Character Counters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>{t.pasteScriptLabel}</span>
          </label>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>
              <strong className="text-slate-200">{wordCount}</strong> {t.wordsCount}
            </span>
            <span>·</span>
            <span>
              <strong className="text-slate-200">{charCount}</strong> {t.charsCount}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-amber-400" />
              ~{estMinutes} min
            </span>
            <button
              onClick={loadSampleScript}
              className="text-rose-400 hover:underline font-sans ml-1 text-xs"
            >
              {t.sampleScript}
            </button>
            {script && (
              <button
                onClick={() => setScript('')}
                className="text-slate-500 hover:text-slate-300 font-sans text-xs"
              >
                {t.clearScript}
              </button>
            )}
          </div>
        </div>

        {/* Large Text Area */}
        <textarea
          rows={7}
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder={t.pasteScriptPlaceholder}
          className="w-full p-4 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
        />

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {/* 1. Category */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">{t.categoryLabel}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VideoCategory)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Content Language */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">{t.languageLabel}</label>
            <select
              value={contentLang}
              onChange={(e) => setContentLang(e.target.value as ContentLanguage)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Target Audience */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">{t.audienceLabel}</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as TargetAudience)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
            >
              {AUDIENCES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Video Format */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">{t.formatLabel}</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as VideoFormat)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
            >
              {platform === 'youtube' ? (
                <>
                  <option value="youtube_long">{t.formatYtLong}</option>
                  <option value="youtube_shorts">{t.formatYtShorts}</option>
                </>
              ) : platform === 'facebook' ? (
                <>
                  <option value="fb_reels">{t.formatFbReels}</option>
                  <option value="fb_standard">{t.formatFbStandard}</option>
                </>
              ) : (
                <>
                  <option value="tiktok_short">{t.formatTtShort}</option>
                  <option value="tiktok_long">{t.formatTtLong}</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Optional Topic & Custom Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">{t.topicLabel}</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.topicPlaceholder}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
          {audience === 'Custom' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400">Custom Audience Specification</label>
              <input
                type="text"
                value={customAudience}
                onChange={(e) => setCustomAudience(e.target.value)}
                placeholder={t.customAudiencePlaceholder}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          )}
        </div>

        {/* Primary GENERATE ALL Button */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleGenerateAll}
            disabled={isGeneratingAll}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-xl ${themeColors.btnPrimary} disabled:opacity-50`}
          >
            {isGeneratingAll ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>
                  {t.generatingAll} ({progressPercent}%) - {activeStepName}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.generateAll}</span>
              </>
            )}
          </button>

          {/* Progress bar when running */}
          {isGeneratingAll && (
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Individual Generator Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-xs font-semibold text-slate-400 mb-2">
            {lang === 'bn' ? 'আলাদা আলাদা তৈরি করুন:' : 'Generate individual components:'}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                runIndividual('titles', async () => {
                  const data = await apiService.generateTitles(currentInput, platform);
                  setResults((prev) => ({ ...prev, titles: data }));
                })
              }
              disabled={loadingModules['titles']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['titles'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genTitles}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('hooks', async () => {
                  const data = await apiService.generateHooks(currentInput, platform);
                  setResults((prev) => ({ ...prev, hooks: data }));
                })
              }
              disabled={loadingModules['hooks']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['hooks'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genHooks}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('description', async () => {
                  const data = await apiService.generateDescription(currentInput, platform);
                  setResults((prev) => ({ ...prev, description: data }));
                })
              }
              disabled={loadingModules['description']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['description'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genDescription}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('tags', async () => {
                  const data = await apiService.generateTags(currentInput, platform);
                  setResults((prev) => ({ ...prev, tags: data }));
                })
              }
              disabled={loadingModules['tags']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['tags'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{platform === 'tiktok' ? t.genHashtags : t.genTags}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('keywords', async () => {
                  const data = await apiService.generateKeywords(currentInput, platform);
                  setResults((prev) => ({ ...prev, keywords: data }));
                })
              }
              disabled={loadingModules['keywords']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['keywords'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genKeywords}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('analysis', async () => {
                  const data = await apiService.analyzeScript(currentInput, platform);
                  setResults((prev) => ({ ...prev, analysis: data }));
                })
              }
              disabled={loadingModules['analysis']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['analysis'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genAnalysis}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('thumbnail', async () => {
                  const data = await apiService.generateThumbnail(currentInput, platform);
                  setResults((prev) => ({ ...prev, thumbnail: data }));
                })
              }
              disabled={loadingModules['thumbnail']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['thumbnail'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genThumbnail}</span>
            </button>

            <button
              onClick={() =>
                runIndividual('videoLength', async () => {
                  const data = await apiService.calculateVideoLength(currentInput, platform);
                  setResults((prev) => ({ ...prev, videoLength: data }));
                })
              }
              disabled={loadingModules['videoLength']}
              className="px-3 py-1.5 text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {loadingModules['videoLength'] && <RotateCcw className="w-3 h-3 animate-spin" />}
              <span>{t.genVideoLength}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video File Upload & Multimodal Analysis Section */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>{t.videoUploadTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.videoUploadDesc}</p>
          </div>
          {videoFile && (
            <button
              onClick={handleVideoUpload}
              disabled={isAnalyzingVideo}
              className="px-3.5 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isAnalyzingVideo ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>{t.analyzingVideo}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.analyzeVideoBtn}</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="relative border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 text-center cursor-pointer bg-slate-950/40 transition-colors">
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setVideoFile(e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-1.5 text-xs text-slate-400">
            <Film className="w-6 h-6 text-slate-500" />
            {videoFile ? (
              <span className="text-white font-medium">
                {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} MB)
              </span>
            ) : (
              <span>{t.dragDropVideo}</span>
            )}
          </div>
        </div>

        {videoAnalysisError && (
          <div className="mt-2 text-xs text-red-400 p-2 bg-red-950/40 rounded-lg border border-red-900">
            {videoAnalysisError}
          </div>
        )}

        {/* Video Analysis Result Card */}
        {results.videoAnalysis && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                {t.cardVideoAnalysis}
              </span>
              <span className="text-slate-500 font-mono">
                {results.videoAnalysis.fileName} ({results.videoAnalysis.fileSizeMb} MB)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300">Visual Scenes & Lighting:</span>
                <p className="text-slate-400 mt-1">{results.videoAnalysis.visualScenesSummary}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300">Audio Clarity & Pacing:</span>
                <p className="text-slate-400 mt-1">{results.videoAnalysis.audioPacingObservations}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
              <span className="font-semibold text-amber-400">Retention Risks Identified:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400">
                {results.videoAnalysis.retentionRisks.map((risk, idx) => (
                  <li key={idx}>{risk}</li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              {results.videoAnalysis.distinctionNotice}
            </p>
          </div>
        )}
      </div>

      {/* RESULTS SECTION: ORGANIZED CARDS */}
      <div className="space-y-6 pt-4">
        {/* CARD A: SEO TITLES */}
        {results.titles && results.titles.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span>{t.cardTitles}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{t.seoScoreNotice}</p>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    results.titles!.map((t, idx) => `${idx + 1}. ${t.title}`).join('\n'),
                    'titles_all'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
              >
                {copiedKey === 'titles_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'titles_all' ? t.copied : t.copy}</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {results.titles.map((item, idx) => {
                const isUnderYouTubeLimit = item.charCount <= 100;
                const isOptimal = item.charCount >= 50 && item.charCount <= 70;

                return (
                  <div
                    key={item.id || idx}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      item.isRecommended
                        ? 'bg-rose-950/20 border-rose-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <span className="text-xs font-mono text-slate-500 pt-0.5">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-white leading-snug">
                              {item.title}
                            </span>
                            {item.isRecommended && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm">
                                AI Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap font-mono">
                            <span className={isOptimal ? 'text-emerald-400' : isUnderYouTubeLimit ? 'text-slate-300' : 'text-amber-400'}>
                              {item.charCount} chars {isOptimal && '· Optimal length'}
                            </span>
                            <span>·</span>
                            <span className="text-slate-300">
                              Readability: {item.readability}
                            </span>
                            <span>·</span>
                            <span className="text-rose-400 font-semibold">
                              Est. SEO Score: {item.seoScore}/100
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 font-sans">
                            {item.reasoning}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => copyToClipboard(item.title, `title_${idx}`)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title={t.copy}
                        >
                          {copiedKey === `title_${idx}` ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CARD B: THUMBNAIL & COVER ART */}
        {results.thumbnail && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>{t.cardThumbnail}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {platform === 'youtube'
                    ? '16:9 Aspect Ratio Studio Canvas'
                    : platform === 'facebook'
                    ? 'Cover Image Generator (Reels & Feed)'
                    : '9:16 Vertical Video Cover Art'}
                </p>
              </div>

              <button
                onClick={() =>
                  runIndividual('thumbnail', async () => {
                    const data = await apiService.generateThumbnail(currentInput, platform);
                    setResults((prev) => ({ ...prev, thumbnail: data }));
                  })
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.regenerate}</span>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Canvas Live Renderer */}
              <div className="lg:col-span-7">
                <CanvasThumbnailEditor
                  data={results.thumbnail}
                  lang={lang}
                  onUpdateText={(txt) => {
                    setResults((prev) =>
                      prev.thumbnail
                        ? { ...prev, thumbnail: { ...prev.thumbnail, shortText: txt } }
                        : prev
                    );
                  }}
                />
              </div>

              {/* Right Column: Prompt & Visual Strategy Details */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>{lang === 'bn' ? 'এআই ইমেজ প্রম্পট' : 'AI Generation Prompt'}</span>
                    <button
                      onClick={() => copyToClipboard(results.thumbnail!.prompt, 'thumb_prompt')}
                      className="text-slate-400 hover:text-white"
                      title={t.copy}
                    >
                      {copiedKey === 'thumb_prompt' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={results.thumbnail.prompt}
                    onChange={(e) => {
                      const newPrompt = e.target.value;
                      setResults((prev) =>
                        prev.thumbnail
                          ? { ...prev, thumbnail: { ...prev.thumbnail, prompt: newPrompt } }
                          : prev
                      );
                    }}
                    className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-rose-500 font-mono leading-relaxed"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lang === 'bn' ? 'ভিজ্যুয়াল স্টাইল:' : 'Style:'}</span>
                    <span className="font-semibold text-white">{results.thumbnail.style}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{lang === 'bn' ? 'মূল ভিজ্যুয়াল উপাদান:' : 'Visual Elements:'}</span>
                    <ul className="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                      {results.thumbnail.visualElements.map((el, idx) => (
                        <li key={idx}>{el}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD C: HOOK GENERATOR (10 HOOKS) */}
        {results.hooks && results.hooks.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.cardHooks}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {platform === 'youtube'
                    ? '0-5s First Impression Hooks'
                    : platform === 'facebook'
                    ? '0-3s Feed Scroll Stopping Openers'
                    : '0-2s High Retention TikTok Openers'}
                </p>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    results.hooks!.map((h, idx) => `${idx + 1}. [${h.style}] ${h.hook}`).join('\n'),
                    'hooks_all'
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
              >
                {copiedKey === 'hooks_all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hooks_all' ? t.copied : t.copy}</span>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.hooks.map((h, idx) => (
                <div
                  key={h.id || idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60">
                        {h.style}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {h.targetDuration}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                      "{h.hook}"
                    </p>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => copyToClipboard(h.hook, `hook_${idx}`)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedKey === `hook_${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.copy}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CARD D: SCRIPT & RETENTION AUDIT */}
        {results.analysis && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>{t.cardAnalysis}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{results.analysis.scoreNotice}</p>
              </div>

              {/* Overall SEO Score Circle / Badge */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Overall SEO Score</span>
                  <span className="text-xl font-black text-rose-500 font-mono">
                    {results.analysis.overallSeoScore}/100
                  </span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-bold font-mono">
                  Hook Grade: {results.analysis.hookGrade}
                </div>
              </div>
            </div>

            {/* Score Breakdown Bar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[11px]">Relevance</span>
                <span className="text-white font-bold">{results.analysis.scoreBreakdown.relevance}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Keywords</span>
                <span className="text-white font-bold">{results.analysis.scoreBreakdown.keywordDensity}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Hook Impact</span>
                <span className="text-white font-bold">{results.analysis.scoreBreakdown.hookImpact}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Clarity</span>
                <span className="text-white font-bold">{results.analysis.scoreBreakdown.clarityAndReadability}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Audience Fit</span>
                <span className="text-white font-bold">{results.analysis.scoreBreakdown.audienceMatch}%</span>
              </div>
            </div>

            {/* Hook Feedback */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="font-semibold text-white block mb-1">
                {lang === 'bn' ? 'ওপেনিং হুক মূল্যায়ন:' : 'Opening Hook Evaluation:'}
              </span>
              <p className="text-slate-300 leading-relaxed">{results.analysis.hookFeedback}</p>
            </div>

            {/* Weak Sections & Drop-off Fixes */}
            {results.analysis.weakSections.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 block">
                  {lang === 'bn' ? 'রিটেনশন দুর্বল অংশ ও সমাধান:' : 'Potential Drop-off Sections & Fixes:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.analysis.weakSections.map((sec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                      <div className="font-semibold text-rose-400">{sec.section}</div>
                      <div className="text-slate-400"><strong className="text-slate-300">Issue:</strong> {sec.issue}</div>
                      <div className="text-emerald-400"><strong className="text-emerald-300">Fix:</strong> {sec.suggestedFix}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Retention Tips & Unsupported Claims */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-semibold text-white block mb-2">
                  {lang === 'bn' ? 'ভিউয়ার রিটেনশন বাড়ানোর কৌশল:' : 'Viewer Retention Tips:'}
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {results.analysis.retentionTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-semibold text-amber-400 block mb-2">
                  {lang === 'bn' ? 'অস্পষ্ট বা প্রমাণহীন তথ্য অডিট:' : 'Unclear or Unsupported Claims:'}
                </span>
                {results.analysis.unclearOrUnsupportedClaims.length > 0 ? (
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {results.analysis.unclearOrUnsupportedClaims.map((claim, idx) => (
                      <li key={idx}>{claim}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">No major unverified claims detected in script.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CARD E: DESCRIPTION GENERATOR */}
        {results.description && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>{t.cardDescription}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {platform === 'youtube'
                    ? 'Structured YouTube Description with Chapters & Links'
                    : platform === 'facebook'
                    ? 'Facebook Post / Reels Caption'
                    : 'Concise TikTok Video Description'}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(results.description!.fullDescription, 'desc')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
              >
                {copiedKey === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'desc' ? t.copied : t.copy}</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <textarea
                rows={9}
                value={results.description.fullDescription}
                onChange={(e) => {
                  const val = e.target.value;
                  setResults((prev) =>
                    prev.description
                      ? { ...prev, description: { ...prev.description, fullDescription: val } }
                      : prev
                  );
                }}
                className="w-full p-4 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-rose-500 font-sans leading-relaxed"
              />

              {/* Hashtag List */}
              {results.description.hashtags && results.description.hashtags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  {results.description.hashtags.map((ht, idx) => (
                    <button
                      key={idx}
                      onClick={() => copyToClipboard(ht, `ht_${idx}`)}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors font-mono"
                    >
                      {ht}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CARD F: TAGS & HASHTAGS */}
        {results.tags && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-rose-500" />
                  <span>{t.cardTags}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Total character count: <strong className="text-white">{results.tags.totalChars}</strong>
                  {platform === 'youtube' && ' / 500 limit'}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(results.tags!.commaSeparated, 'tags_copy')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors self-start sm:self-auto"
              >
                {copiedKey === 'tags_copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tags_copy' ? t.copied : 'Copy Tags (CSV)'}</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {results.tags.tags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => copyToClipboard(tag, `tag_${idx}`)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-600 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CARD G: KEYWORD RESEARCH */}
        {results.keywords && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-400" />
                <span>{t.cardKeywords}</span>
              </h3>
            </div>

            <p className="text-xs text-slate-400">{results.keywords.disclaimer}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-semibold text-rose-400 block mb-2">Primary Core Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {results.keywords.primaryKeywords.map((k, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-semibold text-blue-400 block mb-2">Secondary / Long-Tail:</span>
                <div className="flex flex-wrap gap-1.5">
                  {results.keywords.secondaryKeywords.map((k, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-800">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="font-semibold text-slate-300 block mb-2">
                Related Search Bar Phrases (Search Intent: {results.keywords.searchIntent}):
              </span>
              <div className="flex flex-wrap gap-2">
                {results.keywords.searchPhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(phrase, `phrase_${idx}`)}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CARD H: VIDEO LENGTH ADVISOR */}
        {results.videoLength && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{t.cardVideoLength}</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Recommended Duration:</span>
                <span className="text-base font-bold text-cyan-400 mt-0.5 block">
                  {results.videoLength.recommendedDuration}
                </span>
                <p className="text-slate-400 mt-1">{results.videoLength.pacingNote}</p>
              </div>

              <div className="flex items-center gap-4 text-right font-mono shrink-0">
                <div>
                  <span className="text-slate-500 block">Words</span>
                  <span className="text-white font-bold">{results.videoLength.wordCount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Speaking Time</span>
                  <span className="text-white font-bold">~{results.videoLength.estimatedSpeakingDurationSec}s</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
