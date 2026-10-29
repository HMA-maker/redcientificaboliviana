'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { COORDINATORS } from '@/lib/content';
import { UserCheck } from 'lucide-react';

export const Coordinators: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section className="py-16 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
            {content.coordinatorsEyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
            {content.coordinatorsTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted">
            {content.coordinatorsText}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {COORDINATORS.map((coord) => (
            <div
              key={coord.id}
              className="p-6 rounded-xl bg-white border border-line text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-blue-light text-blue mx-auto flex items-center justify-center mb-4">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-ink mb-1">
                {coord.name}
              </h3>
              <p className="text-xs font-medium text-muted">
                {content.coordinatorRole}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
