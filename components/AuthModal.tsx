'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Mail, Lock, User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalView, closeAuthModal, openAuthModal, signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();
  const { content } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalView) return null;

  const resetState = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSwitchView = (view: 'login' | 'register' | 'forgot') => {
    resetState();
    openAuthModal(view);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await signInWithEmail(email, password);
    setLoading(false);
    if (res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg(content.passwordsDontMatch);
      return;
    }

    setLoading(true);
    const res = await signUpWithEmail(email, password, fullName);
    setLoading(false);
    if (res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await resetPassword(email);
    setLoading(false);
    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg(content.resetSentSuccess);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-line p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-muted hover:text-ink rounded-full hover:bg-paper transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ==================================================================== */}
        {/* VIEW: LOGIN */}
        {/* ==================================================================== */}
        {authModalView === 'login' && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-ink tracking-tight">
                {content.loginTitle}
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {content.loginSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 px-4 mb-4 rounded-lg border border-line hover:bg-paper flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-ink transition-all active:scale-95 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{content.loginWithGoogle}</span>
            </button>

            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-line" />
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-muted font-bold">o con correo</span>
              <div className="flex-grow border-t border-line" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">{content.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="investigador@ejemplo.org"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-ink">{content.passwordLabel}</label>
                  <button
                    type="button"
                    onClick={() => handleSwitchView('forgot')}
                    className="text-[11px] font-semibold text-blue hover:underline"
                  >
                    {content.forgotPasswordPrompt}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue text-white font-bold text-sm hover:bg-blue-dark transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Verificando...' : content.loginButton}
              </button>
            </form>

            <p className="text-center text-xs text-muted mt-6">
              {content.noAccountPrompt}{' '}
              <button
                type="button"
                onClick={() => handleSwitchView('register')}
                className="font-bold text-blue hover:underline"
              >
                {content.registerHere}
              </button>
            </p>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIEW: REGISTER */}
        {/* ==================================================================== */}
        {authModalView === 'register' && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-ink tracking-tight">
                {content.registerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {content.registerSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 px-4 mb-4 rounded-lg border border-line hover:bg-paper flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-ink transition-all active:scale-95 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{content.loginWithGoogle}</span>
            </button>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">{content.fullNameLabel}</label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dra. María Flores"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">{content.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maria.flores@investigacion.bo"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">{content.passwordLabel}</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">{content.confirmPasswordLabel}</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue text-white font-bold text-sm hover:bg-blue-dark transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2"
              >
                {loading ? 'Creando cuenta...' : content.registerButton}
              </button>
            </form>

            <p className="text-center text-xs text-muted mt-5">
              {content.haveAccountPrompt}{' '}
              <button
                type="button"
                onClick={() => handleSwitchView('login')}
                className="font-bold text-blue hover:underline"
              >
                {content.loginHere}
              </button>
            </p>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIEW: FORGOT PASSWORD */}
        {/* ==================================================================== */}
        {authModalView === 'forgot' && (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-ink tracking-tight">
                {content.resetTitle}
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {content.resetSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Enlace enviado</span>
                </div>
                <p>{successMsg}</p>
                <button
                  type="button"
                  onClick={() => handleSwitchView('login')}
                  className="w-full py-2.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                >
                  {content.backToLogin}
                </button>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">{content.emailLabel}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="investigador@ejemplo.org"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:border-blue text-ink bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-blue text-white font-bold text-sm hover:bg-blue-dark transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : content.resetButton}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => handleSwitchView('login')}
                    className="text-xs font-bold text-muted hover:text-ink transition-colors"
                  >
                    ← {content.backToLogin}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
