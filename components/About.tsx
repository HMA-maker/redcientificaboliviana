'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Target, Users, BookOpen, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="red" className="py-20 bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
            {content.aboutEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {content.aboutTitle}
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {content.missionText}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Objetivos */}
          <div className="p-8 rounded-xl bg-paper border border-line shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-4">
              {content.objectivesTitle}
            </h3>
            <ul className="space-y-3.5">
              {content.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-muted text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-blue shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiénes pueden participar */}
          <div className="p-8 rounded-xl bg-paper border border-line shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-4">
              {content.participateTitle}
            </h3>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
              {content.participateText}
            </p>
            <div className="flex flex-wrap gap-2">
              {['Investigadores', 'Estudiantes', 'Instituciones', 'Divulgadores', 'Comunidad Científica'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-white border border-line text-xs font-semibold text-ink">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
