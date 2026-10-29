'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, content } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: content.navHome },
    { href: '#red', label: content.navAbout },
    { href: '#actividades', label: content.navActivities },
    { href: '#directorio', label: content.navDirectory },
    { href: '#contacto', label: content.navContact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
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

        {/* Language switcher & mobile button */}
        <div className="flex items-center gap-3">
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
        </div>
      )}
    </header>
  );
};
