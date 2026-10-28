import React, { useState } from 'react';
import { Sparkles, Globe, User, Bookmark, Menu, X } from 'lucide-react';
import { UiLanguage, UserProfile, Platform } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentView: 'home' | Platform;
  onNavigate: (view: 'home' | Platform) => void;
  lang: UiLanguage;
  onToggleLang: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenSaved: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  lang,
  onToggleLang,
  user,
  onOpenAuth,
  onOpenSaved,
  savedCount,
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'home' | Platform) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
              AI VIDEO SEO MASTER
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('home')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              currentView === 'home' ? 'text-white font-semibold' : 'text-slate-400'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNav('youtube')}
            className={`whitespace-nowrap transition-colors hover:text-red-400 flex items-center gap-1.5 ${
              currentView === 'youtube' ? 'text-red-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            YouTube
          </button>
          <button
            onClick={() => handleNav('facebook')}
            className={`whitespace-nowrap transition-colors hover:text-blue-400 flex items-center gap-1.5 ${
              currentView === 'facebook' ? 'text-blue-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Facebook
          </button>
          <button
            onClick={() => handleNav('tiktok')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 flex items-center gap-1.5 ${
              currentView === 'tiktok' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            TikTok
          </button>
          <button
            onClick={onOpenSaved}
            className="whitespace-nowrap text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t.navSaved}</span>
            {savedCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions (Language & User Profile) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switch */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* User Account Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline max-w-[90px] truncate">
              {user ? user.displayName : t.navLogin}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 px-4 py-3 flex flex-col gap-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-medium ${
              currentView === 'home' ? 'bg-slate-900 text-white' : 'text-slate-400'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => handleNav('youtube')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentView === 'youtube' ? 'bg-red-950/40 text-red-400' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            YouTube Dashboard
          </button>
          <button
            onClick={() => handleNav('facebook')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentView === 'facebook' ? 'bg-blue-950/40 text-blue-400' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Facebook Dashboard
          </button>
          <button
            onClick={() => handleNav('tiktok')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentView === 'tiktok' ? 'bg-cyan-950/40 text-cyan-400' : 'text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            TikTok Dashboard
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSaved();
            }}
            className="text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {t.navSaved}
            </span>
            {savedCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
