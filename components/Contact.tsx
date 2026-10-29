'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/lib/content';
import { UserPlus, Presentation, ExternalLink, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="contacto" className="py-20 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
            {content.contactTitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Participa en la Red
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          {/* Card: Unirse a la Red */}
          <div id="unete" className="p-8 sm:p-10 rounded-2xl bg-blue-dark text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-aqua flex items-center justify-center mb-6">
                <UserPlus className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-aqua mb-2">
                {content.joinEyebrow}
              </p>
              <h3 className="text-2xl font-bold mb-3">{content.joinTitle}</h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                {content.joinText}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={SITE_CONFIG.forms.join.es}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg font-bold text-sm bg-white text-blue-dark hover:bg-slate-100 transition-all shadow active:scale-95"
              >
                <span>{content.joinCta}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-slate-300 mt-3">
                {content.formSpanishNotice}
              </p>
            </div>
          </div>

          {/* Card: Proponer una Charla */}
          <div id="charlas" className="p-8 sm:p-10 rounded-2xl bg-[#e7f4f4] border border-line text-ink flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-6">
                <Presentation className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
                {content.submitEyebrow}
              </p>
              <h3 className="text-2xl font-bold mb-3">{content.submitTitle}</h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
                {content.submitText}
              </p>
            </div>

            <div className="pt-4 border-t border-line/60">
              <a
                href={SITE_CONFIG.talkFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg font-bold text-sm bg-blue text-white hover:bg-blue-dark transition-all shadow active:scale-95"
              >
                <span>{content.submitCta}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Correo directo */}
        <div className="p-6 rounded-xl bg-paper border border-line max-w-xl mx-auto text-center">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
            Contacto Directo
          </p>
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="inline-flex items-center gap-2 text-base font-bold text-blue hover:underline"
          >
            <Mail className="w-4 h-4" />
            <span>{SITE_CONFIG.contactEmail}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
