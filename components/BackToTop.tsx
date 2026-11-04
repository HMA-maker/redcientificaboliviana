'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={language === 'es' ? 'Volver al inicio de la página' : 'Back to top'}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue text-white shadow-xl hover:bg-blue-dark hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 animate-in fade-in"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
