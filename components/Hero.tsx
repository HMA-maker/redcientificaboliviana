'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LANDING_IMAGES } from '@/lib/upstreamData';
import { Sparkles, ArrowRight, Image as ImageIcon, X, ExternalLink } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, content } = useLanguage();
  const [creditsOpen, setCreditsOpen] = useState(false);
  // Rotate featured mosaic subset periodically when motion is allowed
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % LANDING_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Pick 9 tiles for a 3x3 mosaic grid
  const mosaicTiles = Array.from({ length: 9 }, (_, i) => {
    const idx = (offset + i * 2) % LANDING_IMAGES.length;
    return LANDING_IMAGES[idx];
  });

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-canopy text-warm-white border-b border-night"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-10 md:gap-14">
          {/* Left Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-ochre font-semibold text-xs uppercase tracking-wider mb-5 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.heroEyebrow}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-warm-white tracking-tight leading-[1.06] mb-6">
              {content.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-pale-sage/90 max-w-2xl leading-relaxed mb-8">
              {content.heroText}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#unete"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm bg-ochre text-night hover:bg-warm-white transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>{content.joinCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#directorio"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-bold text-sm border border-warm-white/35 text-warm-white hover:bg-white/10 transition-all active:scale-95"
              >
                {content.navDirectory}
              </a>

              <a
                href="#charlas"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg font-semibold text-sm text-pale-sage underline underline-offset-4 hover:text-ochre transition-colors"
              >
                {content.talkCta}
              </a>
            </div>
          </div>

          {/* Right Dynamic Mosaic + Center Brand Mark */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3 rounded-2xl bg-night/70 border border-white/10 shadow-2xl">
              {mosaicTiles.map((img, i) => {
                // Center tile (index 4) holds the RCB orbital mark
                if (i === 4) {
                  return (
                    <div
                      key="rcb-center-tile"
                      className="aspect-square rounded-xl bg-forest border border-ochre/40 flex flex-col items-center justify-center relative overflow-hidden p-2 shadow-inner"
                    >
                      <div className="absolute w-[115%] h-[42%] border border-ochre/45 rounded-full -rotate-[28deg]" />
                      <div className="absolute w-[42%] h-[115%] border border-ochre/45 rounded-full -rotate-[28deg]" />
                      <span className="relative z-10 font-serif text-2xl sm:text-3xl tracking-wider text-warm-white">
                        RCB
                      </span>
                      <span className="relative z-10 text-[9px] uppercase tracking-widest text-ochre mt-0.5 font-bold">
                        Bolivia
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${img.src}-${i}`}
                    className="aspect-square rounded-xl overflow-hidden bg-night border border-white/10 relative group"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] font-medium text-warm-white leading-tight line-clamp-2">
                        {img.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Credits Button */}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setCreditsOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-pale-sage/85 hover:text-ochre transition-colors underline underline-offset-4"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>
                  {language === 'es' ? 'Créditos de imágenes' : 'Image credits'} ({LANDING_IMAGES.length})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Credits Dialog */}
      {creditsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/75 backdrop-blur-sm">
          <div
            className="bg-warm-white text-charcoal border border-line rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-modal-title"
          >
            <div className="px-6 py-4 bg-pale-sage border-b border-line flex items-center justify-between">
              <h2 id="credits-modal-title" className="font-serif text-2xl text-forest">
                {language === 'es' ? 'Créditos de imágenes del mosaico' : 'Mosaic image credits'}
              </h2>
              <button
                type="button"
                onClick={() => setCreditsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white text-charcoal transition-colors"
                aria-label={language === 'es' ? 'Cerrar' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <p className="text-xs text-muted mb-2">
                {language === 'es'
                  ? 'Todas las fotografías provienen de Wikimedia Commons bajo licencias libres o dominio público.'
                  : 'All photographs come from Wikimedia Commons under open licenses or public domain.'}
              </p>
              <ul className="divide-y divide-line">
                {LANDING_IMAGES.map((item) => (
                  <li key={item.src} className="py-3 flex items-start gap-3">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-14 h-14 rounded-lg object-cover border border-line shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-bold text-charcoal">{item.title}</p>
                      <p className="text-muted mt-0.5">
                        {language === 'es' ? 'Autoría:' : 'Creator:'} {item.creator} ·{' '}
                        <a
                          href={item.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-forest underline hover:text-brick"
                        >
                          {item.license}
                        </a>
                      </p>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-forest hover:underline mt-1 font-medium"
                      >
                        <span>Wikimedia Commons</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
