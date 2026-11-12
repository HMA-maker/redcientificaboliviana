'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ACTIVITIES } from '@/lib/content';
import { FEATURED_SEMINAR, PAST_SEMINARS, HIGHLIGHTS } from '@/lib/upstreamData';
import {
  Calendar,
  MessageSquare,
  Radio,
  Network,
  Video,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';

function formatEventDate(dateStr: string, lang: 'es' | 'en') {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return { day: dateStr, month: '', year: '' };
  const monthsEs = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    day: String(day),
    month: lang === 'es' ? monthsEs[month - 1] : monthsEn[month - 1],
    year: String(year),
  };
}

export const Activities: React.FC = () => {
  const { language, content } = useLanguage();
  const icons = [MessageSquare, Radio, Network];
  const publishedActivities = ACTIVITIES.filter((a) => a.published);

  return (
    <section id="actividades" className="py-20 bg-warm-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header & Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-forest mb-2">
              {content.activitiesEyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-charcoal tracking-tight mb-4">
              {content.activitiesTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.activities.map((act, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-pale-sage border border-line flex flex-col justify-between hover:border-forest/40 transition-all hover:-translate-y-1 shadow-sm"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-charcoal mb-3">{act.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{act.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirmed Upcoming Events */}
        <div id="eventos" className="rounded-2xl bg-pale-sage border border-line p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-line">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-forest mb-1">
                {content.activitiesListEyebrow}
              </p>
              <h3 className="font-serif text-3xl font-normal text-charcoal">
                {content.activitiesListTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted max-w-md">
              {content.noActivitiesText}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {publishedActivities.map((item) => {
              const d = formatEventDate(item.date, language);
              return (
                <article
                  key={item.id}
                  className="p-6 rounded-2xl bg-warm-white border border-line flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-baseline gap-1.5 text-forest">
                        <span className="font-serif text-4xl leading-none">{d.day}</span>
                        <span className="text-sm font-bold uppercase">{d.month}</span>
                        <span className="text-xs text-muted">{d.year}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-pale-sage border border-line text-[11px] font-bold text-forest">
                        {content.activityTypes[item.type] || item.type}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-charcoal mb-2">
                      {language === 'es' ? item.title_es : item.title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-ochre shrink-0 mt-0.5" />
                      <span>{language === 'es' ? item.description_es : item.description_en}</span>
                    </p>
                  </div>
                </article>
              );
            })}

            {/* Submit Your Event Tile */}
            <a
              href="#charlas"
              className="p-6 rounded-2xl bg-forest text-warm-white flex flex-col justify-between hover:bg-night transition-colors shadow-sm group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 text-ochre flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl font-normal mb-2">
                  {language === 'es' ? 'Envía tu evento o charla' : 'Submit your event or talk'}
                </h4>
                <p className="text-xs sm:text-sm text-pale-sage/90 leading-relaxed">
                  {language === 'es'
                    ? 'Abierto a investigadores, universidades e institutos.'
                    : 'Open to researchers, universities and institutes.'}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ochre group-hover:underline">
                {content.talkCta} →
              </span>
            </a>
          </div>
        </div>

        {/* Monthly Seminar & Archive */}
        <div id="seminarios" className="rounded-2xl bg-night text-warm-white p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ochre mb-1">
                {language === 'es' ? 'Archivo audiovisual' : 'Video archive'}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal">
                {language === 'es' ? 'Seminario mensual' : 'Monthly seminar'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-pale-sage/85 max-w-lg leading-relaxed">
              {language === 'es'
                ? 'Cada mes, una persona de la red presenta su investigación en línea y responde preguntas. Todas las grabaciones quedan abiertas en YouTube.'
                : 'Every month, a network member presents their research online and takes questions. Every recording stays open on YouTube.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
            {/* Featured Recorded Seminar */}
            <div className="p-6 rounded-2xl bg-canopy border border-white/15 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ochre text-night text-[11px] font-bold mb-4">
                  <Video className="w-3.5 h-3.5" />
                  <span>{content.recording}</span>
                </span>
                <p className="text-xs text-pale-sage/80 mb-1">{FEATURED_SEMINAR.fecha}</p>
                <h4 className="font-serif text-2xl font-normal text-warm-white mb-2">
                  {language === 'es' ? FEATURED_SEMINAR.title_es : FEATURED_SEMINAR.title_en}
                </h4>
                <p className="text-sm text-pale-sage mb-6">{FEATURED_SEMINAR.ponente}</p>
              </div>
              {FEATURED_SEMINAR.youtube && (
                <a
                  href={FEATURED_SEMINAR.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ochre text-night font-bold text-xs hover:bg-warm-white transition-colors"
                >
                  <Video className="w-4 h-4" />
                  <span>{language === 'es' ? 'Ver grabación en YouTube' : 'Watch on YouTube'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Past Seminars with Posters */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pale-sage/80">
                {content.past}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {PAST_SEMINARS.map((sem, idx) => (
                  <article
                    key={idx}
                    className="rounded-xl bg-white/5 border border-white/10 overflow-hidden flex flex-col"
                  >
                    {sem.banner && (
                      <div className="aspect-[16/10] bg-night overflow-hidden border-b border-white/10">
                        <img
                          src={sem.banner}
                          alt={language === 'es' ? sem.alt_es || sem.title_es : sem.alt_en || sem.title_en}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {sem.fecha && (
                          <p className="text-[11px] font-semibold text-ochre mb-1">{sem.fecha}</p>
                        )}
                        <h5 className="text-sm font-bold text-warm-white mb-1 leading-snug">
                          {language === 'es' ? sem.title_es : sem.title_en}
                        </h5>
                        {(sem.subtitle_es || sem.subtitle_en) && (
                          <p className="text-xs text-pale-sage/80 leading-relaxed mb-2">
                            {language === 'es' ? sem.subtitle_es : sem.subtitle_en}
                          </p>
                        )}
                      </div>
                      <div className="pt-2 border-t border-white/10 text-[11px] text-pale-sage">
                        <p className="font-semibold text-warm-white">{sem.ponente}</p>
                        {(sem.detail_es || sem.detail_en) && (
                          <p className="opacity-80">
                            {language === 'es' ? sem.detail_es : sem.detail_en}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div id="destacados">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-brick" />
            <h3 className="font-serif text-3xl font-normal text-charcoal">
              {language === 'es' ? 'Destacados de la red' : 'Network highlights'}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {HIGHLIGHTS.map((hl) => (
              <div
                key={hl.id}
                className="p-7 rounded-2xl bg-pale-sage border border-line flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-ochre/20 text-charcoal font-bold text-xs mb-3 border border-ochre/40">
                    {language === 'es' ? hl.badge_es : hl.badge_en}
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-charcoal mb-2">
                    {language === 'es' ? hl.title_es : hl.title_en}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {language === 'es' ? hl.text_es : hl.text_en}
                  </p>
                </div>
                <div>
                  <a
                    href={hl.href}
                    target={hl.external ? '_blank' : undefined}
                    rel={hl.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest text-warm-white text-xs font-bold hover:bg-night transition-colors"
                  >
                    <span>{language === 'es' ? hl.cta_es : hl.cta_en}</span>
                    {hl.external && <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
