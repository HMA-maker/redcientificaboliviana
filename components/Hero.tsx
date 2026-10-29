'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="inicio" className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-[#e6f5f5] via-[#f8fcfd] to-[#e8f1f6] border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[1.3fr_0.7fr] items-center gap-10 md:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/40 text-blue font-bold text-xs uppercase tracking-wider mb-4 border border-aqua/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.heroEyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.15] mb-5">
              {content.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed mb-8">
              {content.heroText}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#unete"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm bg-blue text-white hover:bg-blue-dark transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>{content.joinCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#charlas"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-bold text-sm border-2 border-blue text-blue-dark hover:bg-blue/10 transition-all active:scale-95"
              >
                {content.talkCta}
              </a>
            </div>
          </div>

          {/* Visual Science Badge with orbits */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-blue-dark flex items-center justify-center shadow-2xl border-4 border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue/30 via-transparent to-transparent" />
              
              {/* Orbits */}
              <div className="absolute w-[120%] h-[45%] border border-aqua/60 rounded-full -rotate-[28deg] animate-pulse" />
              <div className="absolute w-[45%] h-[120%] border border-aqua/60 rounded-full -rotate-[28deg]" />

              {/* Orbital Nodes */}
              <div className="absolute top-1/4 left-1/5 w-3.5 h-3.5 rounded-full bg-aqua shadow-[0_0_12px_#b9e4e4]" />
              <div className="absolute bottom-1/4 right-1/5 w-3 h-3 rounded-full bg-aqua shadow-[0_0_10px_#b9e4e4]" />

              {/* Center Typography */}
              <span className="relative z-10 text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-md">
                RCB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
