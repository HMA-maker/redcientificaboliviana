'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import recordsData from '@/data/published-records.json';
import {
  Search,
  Filter,
  ExternalLink,
  MapPin,
  Building2,
  User,
  HelpCircle,
  FolderKanban,
  BookMarked,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { PublicProfileModal } from '@/components/PublicProfileModal';
import { InstitutionModal } from '@/components/InstitutionModal';
import { PublicInstitutionModal } from '@/components/PublicInstitutionModal';

export interface RecordItem {
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
  department?: string;
  country?: string;
  city_region?: string;
  public_location_label_es?: string;
  public_location_label_en?: string;
  orcid_url?: string;
  website_url?: string;
  google_scholar_url?: string;
  linkedin_url?: string;
  avatar_url?: string;
  photo_url?: string;
  role_es?: string;
  role_en?: string;
  languages?: string;
  connection_to_bolivia?: string[];
  participation_interests_es?: string[];
  participation_interests_en?: string[];
  disciplines_es?: string[];
  disciplines_en?: string[];
  research_areas_es?: string[];
  research_areas_en?: string[];
}

function normalizeAssetUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}

const BOLIVIA_DEPARTMENTS = [
  'La Paz',
  'Cochabamba',
  'Santa Cruz',
  'Chuquisaca',
  'Oruro',
  'Potosí',
  'Tarija',
  'Beni',
  'Pando',
  'Exterior / Internacional'
];

const STANDARD_DISCIPLINES = [
  'Ciencias Exactas y Naturales',
  'Ingenierías, Tecnología y Computación',
  'Ciencias Médicas y de la Salud',
  'Ciencias Agrícolas y del Medio Ambiente',
  'Ciencias Sociales y Economía',
  'Humanidades y Artes'
];

export const Directory: React.FC = () => {
  const { language, content } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | null>(null);
  const [dynamicProfiles, setDynamicProfiles] = useState<RecordItem[]>([]);
  const [loadingDynamic, setLoadingDynamic] = useState(false);
  const [isInstModalOpen, setIsInstModalOpen] = useState(false);

  // Listen to deep links (#investigador=<id>, #institucion=<id>)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#investigador=')) {
        const id = decodeURIComponent(hash.replace('#investigador=', ''));
        if (id) {
          setSelectedProfileId(id);
        }
      } else if (hash.startsWith('#institucion=')) {
        const id = decodeURIComponent(hash.replace('#institucion=', ''));
        if (id) {
          setSelectedInstitutionId(id);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch approved & public profiles from Supabase / Local storage (PB-07)
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoadingDynamic(true);
      const loadedItems: RecordItem[] = [];

      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('is_public', true)
            .eq('moderation_status', 'approved');

          if (!error && data) {
            data.forEach((p: any) => {
              loadedItems.push({
                record_id: p.id,
                record_type: 'person',
                name: p.full_name,
                title_es: p.title_es || 'Investigador',
                title_en: p.title_en || 'Researcher',
                summary_es: p.biography_es ? p.biography_es.slice(0, 180) + '...' : undefined,
                summary_en: p.biography_en ? p.biography_en.slice(0, 180) + '...' : undefined,
                biography_es: p.biography_es,
                biography_en: p.biography_en,
                institution: p.institution,
                department: p.department,
                city_region: p.city,
                country: p.country,
                public_location_label_es: [p.city, p.department, p.country].filter(Boolean).join(', '),
                public_location_label_en: [p.city, p.department, p.country].filter(Boolean).join(', '),
                avatar_url: p.avatar_url,
                orcid_url: p.orcid_url,
                google_scholar_url: p.google_scholar_url,
                website_url: p.website_url,
                disciplines_es: p.disciplines || [],
                disciplines_en: p.disciplines || [],
                research_areas_es: p.research_areas || [],
                research_areas_en: p.research_areas || [],
              });
            });
          }

          // Consultar instituciones en Supabase
          const { data: instData } = await supabase
            .from('institutions')
            .select('*')
            .eq('moderation_status', 'approved');

          if (instData) {
            instData.forEach((inst: any) => {
              loadedItems.push({
                record_id: inst.id,
                record_type: 'institution',
                name: inst.name,
                title_es: inst.name,
                title_en: inst.name,
                summary_es: inst.description_es,
                summary_en: inst.description_en,
                institution: inst.name,
                department: inst.department,
                city_region: inst.city,
                country: 'Bolivia',
                public_location_label_es: [inst.city, inst.department, 'Bolivia'].filter(Boolean).join(', '),
                public_location_label_en: [inst.city, inst.department, 'Bolivia'].filter(Boolean).join(', '),
                avatar_url: inst.logo_url,
                website_url: inst.website_url,
              });
            });
          }
        } else {
          // Escanear localStorage en modo demostración local
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('rcb_profile_')) {
              try {
                const p = JSON.parse(localStorage.getItem(key) || '{}');
                if (p.is_public && p.full_name) {
                  loadedItems.push({
                    record_id: p.id || key.replace('rcb_profile_', ''),
                    record_type: 'person',
                    name: p.full_name,
                    title_es: p.title_es || 'Investigador',
                    title_en: p.title_en || 'Researcher',
                    summary_es: p.biography_es ? p.biography_es.slice(0, 180) + '...' : undefined,
                    summary_en: p.biography_en ? p.biography_en.slice(0, 180) + '...' : undefined,
                    biography_es: p.biography_es,
                    biography_en: p.biography_en,
                    institution: p.institution,
                    department: p.department,
                    city_region: p.city,
                    country: p.country,
                    public_location_label_es: [p.city, p.department, p.country].filter(Boolean).join(', '),
                    public_location_label_en: [p.city, p.department, p.country].filter(Boolean).join(', '),
                    avatar_url: p.avatar_url,
                    orcid_url: p.orcid_url,
                    google_scholar_url: p.google_scholar_url,
                    website_url: p.website_url,
                    disciplines_es: p.disciplines || [],
                    disciplines_en: p.disciplines || [],
                    research_areas_es: p.research_areas || [],
                    research_areas_en: p.research_areas || [],
                  });
                }
              } catch (e) {
                console.warn('Error parsing local mock profile:', e);
              }
            }
          }

          // Escanear instituciones locales en Codespaces
          const localInstStr = localStorage.getItem('rcb_institutions') || '[]';
          try {
            const localInstList = JSON.parse(localInstStr);
            localInstList.forEach((inst: any) => {
              loadedItems.push({
                record_id: inst.id || `inst-${Date.now()}`,
                record_type: 'institution',
                name: inst.name,
                title_es: inst.name,
                title_en: inst.name,
                summary_es: inst.description_es,
                summary_en: inst.description_en,
                institution: inst.name,
                department: inst.department,
                city_region: inst.city,
                country: 'Bolivia',
                public_location_label_es: [inst.city, inst.department, 'Bolivia'].filter(Boolean).join(', '),
                public_location_label_en: [inst.city, inst.department, 'Bolivia'].filter(Boolean).join(', '),
                avatar_url: inst.logo_url,
                website_url: inst.website_url,
              });
            });
          } catch (e) {
            console.warn('Error parsing local institutions:', e);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic profiles:', err);
      } finally {
        setDynamicProfiles(loadedItems);
        setLoadingDynamic(false);
      }
    };

    fetchProfiles();
  }, []);

  const staticRecords = (recordsData.records || []) as RecordItem[];

  // Merge dynamic profiles with static records (avoiding duplicates by name or id)
  const allRecords = useMemo(() => {
    const list = [...dynamicProfiles];
    staticRecords.forEach((item) => {
      const alreadyIn = list.some(
        (p) => p.record_id === item.record_id || (p.name && item.name && p.name.toLowerCase() === item.name.toLowerCase())
      );
      if (!alreadyIn) {
        list.push(item);
      }
    });
    return list;
  }, [dynamicProfiles, staticRecords]);

  // Extract all unique disciplines across records
  const availableDisciplines = useMemo(() => {
    const set = new Set<string>(STANDARD_DISCIPLINES);
    allRecords.forEach((r) => {
      (r.disciplines_es || []).forEach((d) => set.add(d));
      (r.disciplines_en || []).forEach((d) => set.add(d));
    });
    return Array.from(set);
  }, [allRecords]);

  // Dynamic Filtering Logic
  const filteredRecords = useMemo(() => {
    return allRecords.filter((rec) => {
      // 1. Tipo de registro
      const matchType = selectedType === 'all' || rec.record_type === selectedType;

      // 2. Disciplina
      let matchDiscipline = true;
      if (selectedDiscipline !== 'all') {
        const allDiscs = [...(rec.disciplines_es || []), ...(rec.disciplines_en || [])];
        matchDiscipline = allDiscs.some(
          (d) => d.toLowerCase().includes(selectedDiscipline.toLowerCase()) || selectedDiscipline.toLowerCase().includes(d.toLowerCase())
        );
      }

      // 3. Departamento / Ubicación
      let matchDepartment = true;
      if (selectedDepartment !== 'all') {
        const loc = [
          rec.department,
          rec.city_region,
          rec.country,
          rec.public_location_label_es,
          rec.public_location_label_en
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        matchDepartment = loc.includes(selectedDepartment.toLowerCase());
      }

      // 4. Búsqueda de texto libre (Nombre, títulos, biografía, institución, áreas)
      let matchSearch = true;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const textToSearch = [
          rec.name,
          rec.title_es,
          rec.title_en,
          rec.summary_es,
          rec.summary_en,
          rec.biography_es,
          rec.biography_en,
          rec.institution,
          rec.department,
          rec.city_region,
          rec.country,
          ...(rec.disciplines_es || []),
          ...(rec.disciplines_en || []),
          ...(rec.research_areas_es || []),
          ...(rec.research_areas_en || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        matchSearch = textToSearch.includes(query);
      }

      return matchType && matchDiscipline && matchDepartment && matchSearch;
    });
  }, [allRecords, selectedType, selectedDiscipline, selectedDepartment, searchTerm]);

  const hasActiveFilters =
    selectedType !== 'all' ||
    selectedDiscipline !== 'all' ||
    selectedDepartment !== 'all' ||
    searchTerm.trim() !== '';

  const handleClearFilters = () => {
    setSelectedType('all');
    setSelectedDiscipline('all');
    setSelectedDepartment('all');
    setSearchTerm('');
  };

  const typeIcons: Record<string, any> = {
    person: User,
    institution: Building2,
    problem: HelpCircle,
    project: FolderKanban,
    resource: BookMarked,
  };

  // Quick type counts
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allRecords.length,
      person: 0,
      institution: 0,
      project: 0,
      problem: 0,
      resource: 0,
    };
    allRecords.forEach((r) => {
      if (counts[r.record_type] !== undefined) {
        counts[r.record_type]++;
      }
    });
    return counts;
  }, [allRecords]);

  return (
    <section id="directorio" className="py-20 bg-paper border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
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

        {/* Quick Filter Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
              selectedType === 'all'
                ? 'bg-blue text-white shadow-sm'
                : 'bg-white text-muted hover:text-ink border border-line hover:border-blue/40'
            }`}
          >
            {content.all} ({typeCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('person')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              selectedType === 'person'
                ? 'bg-blue text-white shadow-sm'
                : 'bg-white text-muted hover:text-ink border border-line hover:border-blue/40'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{content.person}</span>
            <span className="opacity-80">({typeCounts.person})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('institution')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              selectedType === 'institution'
                ? 'bg-blue text-white shadow-sm'
                : 'bg-white text-muted hover:text-ink border border-line hover:border-blue/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{content.institution}</span>
            <span className="opacity-80">({typeCounts.institution})</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('project')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              selectedType === 'project'
                ? 'bg-blue text-white shadow-sm'
                : 'bg-white text-muted hover:text-ink border border-line hover:border-blue/40'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>{content.project}</span>
            <span className="opacity-80">({typeCounts.project})</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInstModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue/40 bg-blue/5 text-blue hover:bg-blue hover:text-white flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>+ {content.institutionCta}</span>
          </button>
        </div>

        {/* Filter Controls Card */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-line shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-line rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue"
              />
            </div>

            {/* Discipline Filter */}
            <div className="sm:col-span-3 relative">
              <Filter className="w-3.5 h-3.5 text-muted absolute left-3 top-3 pointer-events-none" />
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full pl-9 pr-6 py-2 border border-line rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue bg-white appearance-none cursor-pointer truncate"
              >
                <option value="all">{content.allDisciplines}</option>
                {availableDisciplines.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Department / Location Filter */}
            <div className="sm:col-span-3 relative">
              <MapPin className="w-3.5 h-3.5 text-muted absolute left-3 top-3 pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-9 pr-6 py-2 border border-line rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue bg-white appearance-none cursor-pointer truncate"
              >
                <option value="all">{content.allDepartments}</option>
                {BOLIVIA_DEPARTMENTS.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Clear */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line text-xs">
            <div className="flex items-center gap-2 text-muted">
              <span className="font-semibold text-ink">
                {content.showingResults}: <strong className="text-blue">{filteredRecords.length}</strong> de {allRecords.length}
              </span>
              {loadingDynamic && (
                <span className="text-[11px] text-blue animate-pulse">Sincronizando con Supabase...</span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{content.clearFilters}</span>
              </button>
            )}
          </div>
        </div>

        {/* Records Grid */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-line shadow-xs space-y-3">
            <User className="w-12 h-12 text-muted mx-auto stroke-1" />
            <p className="text-base font-bold text-ink mb-1">{content.noRecordsTitle}</p>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">{content.noRecordsText}</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-2 px-4 py-2 rounded-lg bg-blue text-white text-xs font-bold hover:bg-blue-dark transition-colors"
              >
                {content.clearFilters}
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredRecords.map((rec) => {
              const Icon = typeIcons[rec.record_type] || User;
              const isPerson = rec.record_type === 'person';
              const title = language === 'es' ? (rec.title_es || rec.name) : (rec.title_en || rec.name);
              const summary = language === 'es' ? (rec.summary_es || rec.biography_es) : (rec.summary_en || rec.biography_en);
              const location = language === 'es' ? rec.public_location_label_es : rec.public_location_label_en;
              const disciplines = language === 'es' ? (rec.disciplines_es || []) : (rec.disciplines_en || rec.disciplines_es || []);
              const researchAreas = language === 'es' ? (rec.research_areas_es || []) : (rec.research_areas_en || rec.research_areas_es || []);
              const avatarSrc = normalizeAssetUrl(rec.avatar_url || rec.photo_url);

              return (
                <div
                  key={rec.record_id}
                  className={`p-6 rounded-2xl bg-white border border-line shadow-xs hover:border-blue/50 hover:shadow-md transition-all flex flex-col justify-between ${
                    isPerson ? 'ring-1 ring-blue/10' : ''
                  }`}
                >
                  <div>
                    {/* Header badge & location */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-light text-blue font-bold text-xs uppercase tracking-wide">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{content[rec.record_type as keyof typeof content] as string || rec.record_type}</span>
                      </span>

                      {isPerson && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verificado</span>
                        </span>
                      )}

                      {!isPerson && location && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <MapPin className="w-3 h-3 text-muted" />
                          <span>{location}</span>
                        </span>
                      )}
                    </div>

                    {/* Name & Avatar */}
                    <div className="flex items-start gap-3.5 mb-2">
                      {isPerson && (
                        <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs">
                          {avatarSrc ? (
                            <img src={avatarSrc} alt={rec.name || ''} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue to-canopy text-white flex items-center justify-center text-sm font-black">
                              {(rec.name || 'C').charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-lg font-extrabold text-ink leading-tight">
                          {rec.name ? `${rec.name}` : title}
                        </h3>
                        {isPerson && rec.title_es && (
                          <p className="text-xs font-semibold text-blue mt-0.5">
                            {language === 'es' ? rec.title_es : (rec.title_en || rec.title_es)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Institution and Location */}
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
                      {rec.institution && (
                        <span className="inline-flex items-center gap-1 font-semibold text-ink">
                          <Building2 className="w-3.5 h-3.5 text-blue" />
                          <span>{rec.institution}</span>
                        </span>
                      )}
                      {isPerson && location && (
                        <span className="inline-flex items-center gap-1 text-muted">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{location}</span>
                        </span>
                      )}
                    </div>

                    {/* Summary */}
                    {summary && (
                      <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {summary}
                      </p>
                    )}

                    {/* Disciplines Chips */}
                    {disciplines && disciplines.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {disciplines.map((d, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-full bg-blue-light/60 border border-blue/20 text-[11px] font-semibold text-blue"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Research Areas (Tags) */}
                    {researchAreas && researchAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {researchAreas.slice(0, 4).map((area, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-paper border border-line text-[11px] font-medium text-ink"
                          >
                            <Tag className="w-2.5 h-2.5 text-muted" />
                            <span>{area}</span>
                          </span>
                        ))}
                        {researchAreas.length > 4 && (
                          <span className="px-2 py-0.5 text-[11px] text-muted italic">
                            +{researchAreas.length - 4} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Links & Profile Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line text-xs font-semibold text-blue">
                    <div className="flex items-center gap-3">
                      {rec.orcid_url && (
                        <a
                          href={rec.orcid_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1"
                        >
                          ORCID <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {rec.google_scholar_url && (
                        <a
                          href={rec.google_scholar_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1"
                        >
                          Scholar <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {rec.website_url && (
                        <a
                          href={rec.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1"
                        >
                          Web <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {isPerson && (
                      <button
                        type="button"
                        onClick={() => setSelectedProfileId(rec.record_id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue text-white hover:bg-blue-dark font-bold text-xs transition-colors shadow-xs ml-auto"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{content.viewPublicProfile}</span>
                      </button>
                    )}

                    {rec.record_type === 'institution' && (
                      <button
                        type="button"
                        onClick={() => setSelectedInstitutionId(rec.record_id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue text-white hover:bg-blue-dark font-bold text-xs transition-colors shadow-xs ml-auto"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{content.viewInstitutionProfile}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal de Vista Pública Detallada de Investigador */}
        <PublicProfileModal
          profileId={selectedProfileId}
          onClose={() => {
            setSelectedProfileId(null);
            if (window.location.hash.startsWith('#investigador=')) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
        />

        {/* Modal de Vista Pública Detallada de Institución (PB-11) */}
        <PublicInstitutionModal
          institutionId={selectedInstitutionId}
          onClose={() => {
            setSelectedInstitutionId(null);
            if (window.location.hash.startsWith('#institucion=')) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
          onSelectResearcher={(researcherId) => {
            setSelectedInstitutionId(null);
            setSelectedProfileId(researcherId);
          }}
        />

        {/* Modal de Registro de Institución (PB-10) */}
        <InstitutionModal
          isOpen={isInstModalOpen}
          onClose={() => setIsInstModalOpen(false)}
        />
      </div>
    </section>
  );
};
