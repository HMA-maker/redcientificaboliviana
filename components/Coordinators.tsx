'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COORDINATORS } from '@/lib/content';

export const Coordinators: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="coordinacion" className="py-20 bg-pale-sage border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
            {content.coordinatorsEyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight mb-3">
            {content.coordinatorsTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted">
            {content.coordinatorsText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {COORDINATORS.map((coord) => (
            <figure
              key={coord.id}
              className="p-5 rounded-2xl bg-warm-white border border-line text-center shadow-sm hover:shadow-md transition-all flex flex-col items-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-forest/20 mb-4 bg-pale-sage shadow-inner shrink-0">
                <img
                  src={coord.photo}
                  alt={coord.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <h3 className="text-base font-bold text-charcoal mb-1 leading-snug">
                  {coord.name}
                </h3>
                <p className="text-xs font-medium text-forest">
                  {content.coordinatorRole}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
