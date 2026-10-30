'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, LogIn, User, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const { user, openAuthModal, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: content.navHome },
    { href: '#red', label: content.navAbout },
    { href: '#actividades', label: content.navActivities },
    { href: '#directorio', label: content.navDirectory },
    { href: '#contacto', label: content.navContact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[76px] flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-2.5 text-blue-dark font-bold leading-tight tracking-tight no-underline">
          <div className="w-10 h-10 rounded-br-2xl rounded-tl-full rounded-tr-full rounded-bl-full bg-blue text-white flex items-center justify-center text-xs tracking-wider font-extrabold shadow-sm">
            RCB
          </div>
          <span className="text-sm">
            Red Científica<br />Boliviana
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-blue font-semibold text-sm transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Auth, Language switcher & mobile button */}
        <div className="flex items-center gap-3">
          {/* Auth Button (Desktop) */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full border border-line bg-paper hover:bg-slate-100 text-xs font-bold text-ink transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center text-[10px] font-black">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user.fullName}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-line rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-line">
                    <p className="text-xs font-bold text-ink truncate">{user.fullName}</p>
                    <p className="text-[11px] text-muted truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{content.logoutButton}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-blue/40 text-blue font-bold text-xs hover:bg-blue/10 transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{content.loginNav}</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center p-1 border border-line rounded-full bg-paper" role="group" aria-label={content.languageLabel}>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'es' ? 'bg-blue text-white shadow-sm' : 'text-muted hover:text-ink'
              }`}
              aria-pressed={language === 'es'}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'en' ? 'bg-blue text-white shadow-sm' : 'text-muted hover:text-ink'
              }`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:text-blue focus:outline-none"
            aria-label={mobileMenuOpen ? content.closeMenu : content.openMenu}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-muted hover:text-blue hover:bg-paper rounded-md font-semibold text-base transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Auth button */}
          <div className="pt-2 border-t border-line">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-paper rounded-lg">
                  <p className="text-xs font-bold text-ink">{user.fullName}</p>
                  <p className="text-[11px] text-muted">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full text-left py-2 px-3 text-xs text-red-600 font-bold flex items-center gap-2 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{content.logoutButton}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-blue text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>{content.loginNav}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
