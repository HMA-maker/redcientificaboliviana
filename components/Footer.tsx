'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  return (
    <footer className="py-12 bg-night text-pale-sage text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 text-warm-white font-bold mb-3">
              <div className="w-8 h-8 rounded-br-xl rounded-tl-full rounded-tr-full rounded-bl-full bg-forest border border-ochre/40 text-warm-white flex items-center justify-center text-[10px] font-black">
                RCB
              </div>
              <span className="font-serif text-lg font-normal">Red Científica Boliviana</span>
            </div>
            <p className="text-xs text-pale-sage/80 max-w-xs leading-relaxed mb-3">
              {content.footerText}
            </p>
            <span className="inline-block text-xs font-bold text-ochre">#CienciaBoliviana</span>
          </div>

          <div>
            <h4 className="text-warm-white font-bold text-xs uppercase tracking-wider mb-3">
              {content.footerNavigate}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#inicio" className="hover:text-ochre transition-colors">{content.navHome}</a></li>
              <li><a href="#red" className="hover:text-ochre transition-colors">{content.navAbout}</a></li>
              <li><a href="#estatutos" className="hover:text-ochre transition-colors">Estatutos</a></li>
              <li><a href="#actividades" className="hover:text-ochre transition-colors">{content.navActivities}</a></li>
              <li><a href="#directorio" className="hover:text-ochre transition-colors">{content.navDirectory}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-warm-white font-bold text-xs uppercase tracking-wider mb-3">
              {content.contactTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#unete" className="hover:text-ochre transition-colors">{content.joinCta}</a></li>
              <li><a href="#charlas" className="hover:text-ochre transition-colors">{content.talkCta}</a></li>
              <li><a href="#contacto" className="hover:text-ochre transition-colors">{content.navContact}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pale-sage/75">
          <p>© {new Date().getFullYear()} Red Científica Boliviana. {content.footerRights}</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-ochre">
              Bolivia y la diáspora
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
