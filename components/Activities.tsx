'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, MessageSquare, Radio, Network } from 'lucide-react';

export const Activities: React.FC = () => {
  const { content } = useLanguage();

  const icons = [MessageSquare, Radio, Network];

  return (
    <section id="actividades" className="py-20 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
            {content.activitiesEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {content.activitiesTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {content.activities.map((act, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="p-8 rounded-xl bg-paper border border-line flex flex-col justify-between hover:border-blue/40 transition-all hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-3">{act.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{act.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Programme Box */}
        <div className="max-w-3xl mx-auto p-8 rounded-xl bg-gradient-to-r from-paper to-white border border-line text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-light text-blue mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-ink mb-2">
            {content.activitiesListTitle}
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto mb-6">
            {content.noActivitiesText}
          </p>
          <a
            href="#charlas"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold bg-blue text-white hover:bg-blue-dark transition-colors"
          >
            {content.talkCta}
          </a>
        </div>
      </div>
    </section>
  );
};
