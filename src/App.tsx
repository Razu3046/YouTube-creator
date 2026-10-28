import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PlatformDashboard } from './components/PlatformDashboard';
import { AuthModal } from './components/AuthModal';
import { SavedProjectsModal } from './components/SavedProjectsModal';
import { Platform, UiLanguage, UserProfile, SavedProject, VideoScriptInput, GenerationResults } from './types';
import { storageService } from './services/storageService';

export default function App() {
  // Navigation: 'home' | 'youtube' | 'facebook' | 'tiktok'
  const [currentView, setCurrentView] = useState<'home' | Platform>(() => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    if (path === 'youtube' || path === 'facebook' || path === 'tiktok') {
      return path;
    }
    return 'home';
  });

  // Default interface language is Bengali (বাংলা) as required
  const [lang, setLang] = useState<UiLanguage>('bn');
  const [user, setUser] = useState<UserProfile | null>(() => storageService.getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(() => storageService.getSavedProjects().length);

  // Active loaded project data
  const [activeProject, setActiveProject] = useState<{
    input: VideoScriptInput;
    results: GenerationResults;
  } | null>(null);

  // Sync browser URL with views
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '').toLowerCase();
      if (path === 'youtube' || path === 'facebook' || path === 'tiktok') {
        setCurrentView(path);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: 'home' | Platform) => {
    setCurrentView(view);
    const targetPath = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleLoadProject = (project: SavedProject) => {
    setActiveProject({
      input: project.input,
      results: project.results,
    });
    navigateTo(project.platform);
  };

  const handleProjectSaved = () => {
    setSavedCount(storageService.getSavedProjects().length);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Header Contract */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        lang={lang}
        onToggleLang={handleToggleLang}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedCount}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <HomePage onSelectPlatform={(plat) => navigateTo(plat)} lang={lang} />
        ) : (
          <PlatformDashboard
            key={currentView}
            platform={currentView}
            lang={lang}
            onBackToHome={() => navigateTo('home')}
            onProjectSaved={handleProjectSaved}
            initialProjectData={activeProject || undefined}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium text-slate-400">
            <span>AI VIDEO SEO MASTER</span>
            <span>·</span>
            <span>All-in-One Video Optimization Tool</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('youtube')}
              className="hover:text-red-400 transition-colors"
            >
              YouTube
            </button>
            <button
              onClick={() => navigateTo('facebook')}
              className="hover:text-blue-400 transition-colors"
            >
              Facebook
            </button>
            <button
              onClick={() => navigateTo('tiktok')}
              className="hover:text-cyan-400 transition-colors"
            >
              TikTok
            </button>
            <button
              onClick={() => setIsSavedOpen(true)}
              className="hover:text-white transition-colors"
            >
              Saved ({savedCount})
            </button>
          </div>

          <div className="text-[11px] text-slate-600">
            Powered by Gemini AI · Bengali & English Localization
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => {
          setUser(u);
          setSavedCount(storageService.getSavedProjects().length);
        }}
        lang={lang}
      />

      <SavedProjectsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        onLoadProject={handleLoadProject}
        lang={lang}
      />
    </div>
  );
}
