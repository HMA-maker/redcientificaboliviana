'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { STATUTES_ARTICLES } from '@/lib/upstreamData';
import { Target, Users, BookOpen, CheckCircle2, Globe2, Scale } from 'lucide-react';

export const About: React.FC = () => {
  const { language, content } = useLanguage();
  const [activeArticleId, setActiveArticleId] = useState<string>('art-1');

  const activeArticle =
    STATUTES_ARTICLES.find((a) => a.id === activeArticleId) || STATUTES_ARTICLES[0];

  const paragraphs =
    language === 'es' ? activeArticle.paragraphs_es : activeArticle.paragraphs_en;
  const items = language === 'es' ? activeArticle.items_es : activeArticle.items_en;

  return (
    <section id="red" className="py-20 bg-warm-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Who We Are */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
            {content.aboutEyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal tracking-tight mb-5">
            {content.aboutTitle}
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            {content.missionText}
          </p>
        </div>

        {/* Goals & Participation */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          {/* Objetivos */}
          <div className="p-8 rounded-2xl bg-pale-sage border border-line shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-charcoal mb-4">
              {content.objectivesTitle}
            </h3>
            <ul className="space-y-3.5">
              {content.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-muted text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiénes pueden participar + Alcance global */}
          <div className="p-8 rounded-2xl bg-pale-sage border border-line shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-charcoal mb-4">
                {content.participateTitle}
              </h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
                {content.participateText}
              </p>

              <div className="p-4 rounded-xl bg-warm-white border border-line mb-6 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-ochre shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                  {language === 'es' ? (
                    <>
                      <strong>Alcance global:</strong> Conectamos a investigadores e investigadoras de Bolivia con colegas de distintos lugares del mundo y construimos una comunidad que cruza fronteras y continentes.
                    </>
                  ) : (
                    <>
                      <strong>Global reach:</strong> We connect researchers in Bolivia with colleagues around the world, building an international community across borders and continents.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(language === 'es'
                ? ['Investigadores', 'Estudiantes', 'Instituciones', 'Divulgadores', 'Diáspora Científica']
                : ['Researchers', 'Students', 'Institutions', 'Communicators', 'Scientific Diaspora']
              ).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-warm-white border border-line text-xs font-semibold text-charcoal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Network Statutes (Estatutos de la Red) */}
        <div id="estatutos" className="rounded-2xl bg-pale-sage border border-line p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-forest text-warm-white flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-forest">
                  {language === 'es' ? 'Marco Institucional' : 'Institutional Framework'}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                  {language === 'es' ? 'Estatutos de la red' : 'Network statutes'}
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted bg-warm-white px-3 py-1.5 rounded-full border border-line self-start sm:self-auto">
              <BookOpen className="w-3.5 h-3.5 text-forest" />
              <span>{language === 'es' ? '9 artículos' : '9 articles'}</span>
            </span>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
            {/* TOC Menu */}
            <nav aria-label={language === 'es' ? 'Índice de estatutos' : 'Statutes index'}>
              <ol className="space-y-1.5">
                {STATUTES_ARTICLES.map((art) => {
                  const isActive = art.id === activeArticle.id;
                  return (
                    <li key={art.id}>
                      <button
                        type="button"
                        onClick={() => setActiveArticleId(art.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all ${
                          isActive
                            ? 'bg-forest text-warm-white shadow-sm'
                            : 'bg-warm-white/80 text-charcoal hover:bg-warm-white border border-line/70'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                            isActive ? 'bg-ochre text-night' : 'bg-pale-sage text-forest'
                          }`}
                        >
                          {art.number}
                        </span>
                        <span className="truncate">
                          {language === 'es' ? art.title_es : art.title_en}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Active Article Body */}
            <article className="bg-warm-white rounded-2xl border border-line p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brick mb-1">
                  {language === 'es' ? `Artículo ${activeArticle.number}` : `Article ${activeArticle.number}`}
                </p>
                <h4 className="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
                  {language === 'es' ? activeArticle.title_es : activeArticle.title_en}
                </h4>

                {paragraphs && paragraphs.length > 0 && (
                  <div className="space-y-3 text-sm sm:text-base text-muted leading-relaxed mb-4">
                    {paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {items && items.length > 0 && (
                  <ul className="space-y-2.5 text-sm sm:text-base text-charcoal">
                    {items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-ochre mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeArticle.timeline && (
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {activeArticle.timeline.map((step) => (
                      <div
                        key={step.phase}
                        className="p-4 rounded-xl bg-pale-sage border border-line"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-forest">
                            {language === 'es' ? `Fase ${step.phase}` : `Phase ${step.phase}`}
                          </span>
                          <span className="text-[11px] font-semibold text-brick bg-warm-white px-2 py-0.5 rounded border border-line">
                            {language === 'es' ? step.period_es : step.period_en}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-charcoal mb-1">
                          {language === 'es' ? step.title_es : step.title_en}
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                          {language === 'es' ? step.desc_es : step.desc_en}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
