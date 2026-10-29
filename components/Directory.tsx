'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import recordsData from '@/data/published-records.json';
import { Search, Filter, ExternalLink, MapPin, Building2, User, HelpCircle, FolderKanban, BookMarked } from 'lucide-react';

interface RecordItem {
  record_id: string;
  record_type: string;
  name?: string;
  title_es?: string;
  title_en?: string;
  summary_es?: string;
  summary_en?: string;
  biography_es?: string;
  biography_en?: string;
  institution?: string;
  country?: string;
  city_region?: string;
  public_location_label_es?: string;
  public_location_label_en?: string;
  orcid_url?: string;
  website_url?: string;
  google_scholar_url?: string;
  disciplines_es?: string[];
  disciplines_en?: string[];
  research_areas_es?: string[];
  research_areas_en?: string[];
}

export const Directory: React.FC = () => {
  const { language, content } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const records = (recordsData.records || []) as RecordItem[];

  const typeIcons: Record<string, any> = {
    person: User,
    institution: Building2,
    problem: HelpCircle,
    project: FolderKanban,
    resource: BookMarked,
  };

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const matchType = selectedType === 'all' || rec.record_type === selectedType;
      const textToSearch = [
        rec.name,
        rec.title_es,
        rec.title_en,
        rec.summary_es,
        rec.summary_en,
        rec.institution,
        ...(rec.disciplines_es || []),
        ...(rec.disciplines_en || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchSearch = searchTerm.trim() === '' || textToSearch.includes(searchTerm.toLowerCase());
      return matchType && matchSearch;
    });
  }, [records, selectedType, searchTerm]);

  return (
    <section id="directorio" className="py-20 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue mb-2">
            {content.recordsEyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {content.recordsTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted">
            {content.recordsText}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-line shadow-sm mb-10 space-y-4">
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 relative">
              <Search className="w-5 h-5 text-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-line focus:outline-none focus:border-blue text-sm"
              />
            </div>

            <div className="sm:col-span-4 relative">
              <Filter className="w-4 h-4 text-muted absolute left-3 top-3.5 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-line focus:outline-none focus:border-blue text-sm bg-white appearance-none cursor-pointer"
              >
                <option value="all">{content.all} ({records.length})</option>
                <option value="person">{content.person}</option>
                <option value="institution">{content.institution}</option>
                <option value="project">{content.project}</option>
                <option value="problem">{content.problem}</option>
                <option value="resource">{content.resource}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-line">
            <p className="text-base font-semibold text-ink mb-1">{content.noRecordsTitle}</p>
            <p className="text-sm text-muted">{content.noRecordsText}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredRecords.map((rec) => {
              const Icon = typeIcons[rec.record_type] || User;
              const title = language === 'es' ? (rec.title_es || rec.name) : (rec.title_en || rec.name);
              const summary = language === 'es' ? rec.summary_es : rec.summary_en;
              const location = language === 'es' ? rec.public_location_label_es : rec.public_location_label_en;
              const disciplines = language === 'es' ? rec.disciplines_es : rec.disciplines_en;

              return (
                <div
                  key={rec.record_id}
                  className="p-6 rounded-xl bg-white border border-line shadow-sm hover:border-blue/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-light text-blue font-bold text-xs uppercase tracking-wide">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{content[rec.record_type as keyof typeof content] as string || rec.record_type}</span>
                      </span>
                      {location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <MapPin className="w-3 h-3 text-muted" />
                          <span>{location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-ink mb-2">
                      {rec.name ? `${rec.name}` : title}
                    </h3>

                    {rec.institution && (
                      <p className="text-xs font-semibold text-blue mb-3 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{rec.institution}</span>
                      </p>
                    )}

                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {summary}
                    </p>

                    {disciplines && disciplines.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {disciplines.map((d, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded bg-paper border border-line text-[11px] font-medium text-muted">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* External links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-line text-xs font-semibold text-blue">
                    {rec.orcid_url && (
                      <a href={rec.orcid_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        ORCID <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {rec.google_scholar_url && (
                      <a href={rec.google_scholar_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        Scholar <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {rec.website_url && (
                      <a href={rec.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                        Web <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
