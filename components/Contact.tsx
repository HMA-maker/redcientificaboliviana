'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SITE_CONFIG } from '@/lib/content';
import { PARTNER_INSTITUTIONS } from '@/lib/upstreamData';
import { UserPlus, Presentation, ExternalLink, Mail, Copy, Check, FileEdit } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, content } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(SITE_CONFIG.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-warm-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
            {content.contactTitle}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal tracking-tight mb-4">
            {language === 'es' ? 'Participa en la Red' : 'Get involved'}
          </h2>
          <p className="text-sm sm:text-base text-muted">
            {language === 'es'
              ? 'Escríbenos para colaborar, proponer una charla, enviar un evento o sumar tu perfil e institución.'
              : 'Write to us to collaborate, propose a talk, submit an event, or add your profile and institution.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-14">
          {/* Card: Unirse a la Red / Perfil oficial */}
          <div id="unete" className="p-8 sm:p-10 rounded-2xl bg-night text-warm-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-ochre flex items-center justify-center mb-6">
                <UserPlus className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-ochre mb-2">
                {content.joinEyebrow}
              </p>
              <h3 className="font-serif text-3xl font-normal mb-3">{content.joinTitle}</h3>
              <p className="text-pale-sage/90 text-sm sm:text-base leading-relaxed mb-6">
                {content.joinText}
              </p>
            </div>

            <div className="pt-5 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.profileEditorWebappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-sm bg-ochre text-night hover:bg-warm-white transition-all shadow active:scale-95"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>
                    {language === 'es' ? 'Crear o editar perfil' : 'Create or edit profile'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {SITE_CONFIG.forms.join.es && (
                  <a
                    href={SITE_CONFIG.forms.join.es}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-sm border border-white/30 text-warm-white hover:bg-white/10 transition-all"
                  >
                    <span>{content.joinCta}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-xs text-pale-sage/75">
                {language === 'es'
                  ? 'Las solicitudes se revisan de forma privada antes de publicarse en el directorio.'
                  : 'Submissions are reviewed privately before being published in the directory.'}
              </p>
            </div>
          </div>

          {/* Card: Proponer una Charla */}
          <div id="charlas" className="p-8 sm:p-10 rounded-2xl bg-pale-sage border border-line text-charcoal flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                <Presentation className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
                {content.submitEyebrow}
              </p>
              <h3 className="font-serif text-3xl font-normal mb-3">{content.submitTitle}</h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
                {content.submitText}
              </p>
            </div>

            <div className="pt-5 border-t border-line">
              <a
                href={SITE_CONFIG.talkFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-lg font-bold text-sm bg-forest text-warm-white hover:bg-night transition-all shadow active:scale-95"
              >
                <span>{content.submitCta}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Correo directo */}
        <div className="p-6 rounded-2xl bg-pale-sage border border-line max-w-xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
            {language === 'es' ? 'Contacto Directo' : 'Direct Contact'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="inline-flex items-center gap-2 text-base font-bold text-forest hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>{SITE_CONFIG.contactEmail}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warm-white border border-line text-xs font-semibold text-charcoal hover:border-forest transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-forest" /> : <Copy className="w-3.5 h-3.5" />}
              <span>
                {copied
                  ? language === 'es'
                    ? 'Copiado'
                    : 'Copied'
                  : language === 'es'
                  ? 'Copiar'
                  : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Partner Wordmarks Band */}
        <div id="aliados" className="pt-10 border-t border-line text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-6">
            {language === 'es'
              ? 'Instituciones bolivianas vinculadas y ecosistema académico'
              : 'Bolivian partner institutions & academic ecosystem'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PARTNER_INSTITUTIONS.map((inst) => (
              <span
                key={inst}
                className="px-3.5 py-1.5 rounded-lg bg-pale-sage border border-line text-xs sm:text-sm font-serif tracking-wide text-charcoal"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
