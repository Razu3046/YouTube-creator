import React, { useState } from 'react';
import { X, Trash2, ExternalLink, Download, Upload, Search, Calendar, Film } from 'lucide-react';
import { SavedProject, Platform, UiLanguage } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../i18n/translations';

interface SavedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject: (project: SavedProject) => void;
  lang: UiLanguage;
}

export const SavedProjectsModal: React.FC<SavedProjectsModalProps> = ({
  isOpen,
  onClose,
  onLoadProject,
  lang,
}) => {
  const t = translations[lang];
  const [projects, setProjects] = useState<SavedProject[]>(() => storageService.getSavedProjects());
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const refreshList = () => {
    setProjects(storageService.getSavedProjects());
  };

  const handleDelete = (id: string) => {
    storageService.deleteProject(id);
    setConfirmDeleteId(null);
    refreshList();
  };

  const handleExport = () => {
    const jsonStr = storageService.exportProjectsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai_video_seo_projects_${Date.now()}.json`;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const added = storageService.importProjectsJson(content);
        alert(lang === 'bn' ? `${added}টি প্রজেক্ট সফলভাবে ইমপোর্ট হয়েছে!` : `${added} projects imported successfully!`);
        refreshList();
      }
    };
    reader.readAsText(file);
  };

  const filtered = projects.filter((p) => {
    if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchScript = p.input.script.toLowerCase().includes(q);
      const matchTopic = p.input.topic?.toLowerCase().includes(q);
      return matchName || matchScript || matchTopic;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-white">{t.savedProjectsTitle}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {projects.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              title={t.exportJson}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.exportJson}</span>
            </button>
            <label className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.importJson}</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'প্রজেক্ট বা বিষয় খুঁজুন...' : 'Search projects...'}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            {['all', 'youtube', 'facebook', 'tiktok'].map((plat) => (
              <button
                key={plat}
                onClick={() => setPlatformFilter(plat)}
                className={`px-3 py-1 rounded font-medium capitalize transition-colors ${
                  platformFilter === plat ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {plat === 'all' ? t.filterAll : plat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              {t.noSavedProjects}
            </div>
          ) : (
            filtered.map((proj) => {
              const platBadge =
                proj.platform === 'youtube'
                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                  : proj.platform === 'facebook'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

              const dateStr = new Date(proj.createdAt).toLocaleDateString(
                lang === 'bn' ? 'bn-BD' : 'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              );

              return (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${platBadge}`}>
                        {proj.platform}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                      {proj.input.category && (
                        <span className="text-xs text-slate-500">· {proj.input.category}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white truncate">{proj.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {proj.input.script}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {confirmDeleteId === proj.id ? (
                      <div className="flex items-center gap-1 bg-red-950/70 p-1 rounded-lg border border-red-800">
                        <span className="text-[11px] text-red-200 px-1">
                          {lang === 'bn' ? 'নিশ্চিত?' : 'Confirm?'}
                        </span>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-semibold"
                        >
                          {lang === 'bn' ? 'হ্যাঁ' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                        >
                          {lang === 'bn' ? 'না' : 'No'}
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            onLoadProject(proj);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t.loadProject}</span>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(proj.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                          title={t.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
