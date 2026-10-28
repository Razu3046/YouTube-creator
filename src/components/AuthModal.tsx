import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService';
import { UserProfile, UiLanguage } from '../types';
import { translations } from '../i18n/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  lang: UiLanguage;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  lang,
}) => {
  const t = translations[lang];
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !email.includes('@')) {
      setError(lang === 'bn' ? 'সঠিক ইমেইল এড্রেস প্রদান করুন।' : 'Please enter a valid email address.');
      return;
    }

    if (mode === 'forgot') {
      setMessage(t.passwordResetSent);
      return;
    }

    if (!password || password.length < 6) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
      return;
    }

    if (mode === 'register') {
      const user = storageService.register(email, displayName || 'Creator', password);
      onAuthSuccess(user);
      onClose();
    } else {
      const user = storageService.login(email, password);
      onAuthSuccess(user);
      onClose();
    }
  };

  const handleGuest = () => {
    const guestUser: UserProfile = {
      id: 'guest_user',
      email: 'creator@local.workspace',
      displayName: lang === 'bn' ? 'গেস্ট ক্রিয়েটর' : 'Guest Creator',
      createdAt: Date.now(),
    };
    storageService.setCurrentUser(guestUser);
    onAuthSuccess(guestUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
            <ShieldCheck className="w-5 h-5" />
            <span>AI VIDEO SEO MASTER</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {mode === 'login'
              ? t.authTitleLogin
              : mode === 'register'
              ? t.authTitleRegister
              : t.forgotPassword}
          </h2>
          <p className="text-xs text-slate-400">{t.authSubtitle}</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-950/60 border border-red-800 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {message && (
          <div className="p-3 text-xs bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-300 font-medium">{t.nameLabel}</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Shakib Hasan"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-300 font-medium">{t.emailLabel}</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-300 font-medium">{t.passwordLabel}</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    {t.forgotPassword}
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-lg shadow-rose-950/40"
          >
            {mode === 'login' ? t.loginBtn : mode === 'register' ? t.registerBtn : 'Send Reset Link'}
          </button>
        </form>

        {/* Switch mode */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-800 text-center">
          {mode === 'login' ? (
            <button
              onClick={() => setMode('register')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {t.noAccount}
            </button>
          ) : (
            <button
              onClick={() => setMode('login')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {t.hasAccount}
            </button>
          )}

          <button
            onClick={handleGuest}
            className="py-2 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors bg-slate-950/40"
          >
            {t.guestBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
