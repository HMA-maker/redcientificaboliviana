'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import recordsData from '@/data/published-records.json';
import { getAssetPath } from '@/lib/assets';
import {
  X,
  Building2,
  MapPin,
  ExternalLink,
  Share2,
  Check,
  Globe,
  Mail,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface PublicInstitutionModalProps {
  institutionId: string | null;
  onClose: () => void;
  onSelectResearcher?: (researcherId: string) => void;
}

interface AffiliatedScientist {
  id: string;
  name: string;
  title?: string;
  avatar_url?: string;
}

export const PublicInstitutionModal: React.FC<PublicInstitutionModalProps> = ({
  institutionId,
  onClose,
  onSelectResearcher,
}) => {
  const { content, language } = useLanguage();
  const [institution, setInstitution] = useState<any | null>(null);
  const [affiliated, setAffiliated] = useState<AffiliatedScientist[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!institutionId) {
      setInstitution(null);
      setAffiliated([]);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    const loadData = async () => {
      try {
        let foundInst: any = null;

        // 1. Supabase
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('institutions')
            .select('*')
            .eq('id', institutionId)
            .maybeSingle();

          if (!error && data) {
            foundInst = data;
          }
        }

        // 2. Local storage mock
        if (!foundInst) {
          const localList = JSON.parse(localStorage.getItem('rcb_institutions') || '[]');
          foundInst = localList.find((i: any) => i.id === institutionId || i.name?.toLowerCase() === institutionId.toLowerCase());
        }

        // 3. Static published records
        if (!foundInst) {
          const staticRecords = (recordsData.records || []) as any[];
          foundInst = staticRecords.find(
            (r) => (r.record_id === institutionId || r.name?.toLowerCase() === institutionId.toLowerCase()) && r.record_type === 'institution'
          );
        }

        if (!foundInst) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setInstitution(foundInst);

        // Buscar científicos vinculados a esta institución
        const instName = foundInst.name || '';
        const scientists: AffiliatedScientist[] = [];

        // Desde Supabase si está disponible
        if (isSupabaseConfigured) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, title_es, title_en, avatar_url, institution')
            .eq('is_public', true)
            .ilike('institution', `%${instName.split('(')[0].trim()}%`);

          if (profilesData) {
            profilesData.forEach((p: any) => {
              scientists.push({
                id: p.id,
                name: p.full_name,
                title: language === 'es' ? p.title_es : (p.title_en || p.title_es),
                avatar_url: p.avatar_url,
              });
            });
          }
        }

        // Desde static records
        const staticRecords = (recordsData.records || []) as any[];
        staticRecords.forEach((r) => {
          if (
            r.record_type === 'person' &&
            r.institution &&
            instName &&
            (r.institution.toLowerCase().includes(instName.toLowerCase()) || instName.toLowerCase().includes(r.institution.toLowerCase()))
          ) {
            if (!scientists.some((s) => s.id === r.record_id)) {
              scientists.push({
                id: r.record_id,
                name: r.name,
                title: language === 'es' ? r.title_es : (r.title_en || r.title_es),
                avatar_url: r.avatar_url,
              });
            }
          }
        });

        // Desde local mock profiles
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('rcb_profile_')) {
            try {
              const p = JSON.parse(localStorage.getItem(key) || '{}');
              if (
                p.full_name &&
                p.institution &&
                instName &&
                p.institution.toLowerCase().includes(instName.toLowerCase())
              ) {
                if (!scientists.some((s) => s.id === p.id)) {
                  scientists.push({
                    id: p.id || key.replace('rcb_profile_', ''),
                    name: p.full_name,
                    title: language === 'es' ? p.title_es : (p.title_en || p.title_es),
                    avatar_url: p.avatar_url,
                  });
                }
              }
            } catch (e) {
              console.warn(e);
            }
          }
        }

        setAffiliated(scientists);
      } catch (err) {
        console.error('Error loading institution details:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [institutionId, language]);

  if (!institutionId) return null;

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#institucion=${encodeURIComponent(institutionId)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const name = institution?.name || '';
  const description =
    language === 'es'
      ? (institution?.description_es || institution?.summary_es || institution?.biography_es)
      : (institution?.description_en || institution?.summary_en || institution?.biography_en || institution?.description_es);
  const locationLabel = [institution?.city, institution?.department, 'Bolivia'].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-line rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-ink"
        role="dialog"
        aria-modal="true"
        aria-labelledby="public-institution-title"
      >
        {/* Cover Bar */}
        <div className="relative bg-gradient-to-r from-blue-dark via-slate-800 to-blue h-28 px-6 pt-4 flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-200" />
            {content.publicInstitutionBadge}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all flex items-center gap-1.5 px-3 text-xs font-semibold shadow-sm"
              title={content.publicInstitutionShare}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? content.publicProfileShareCopied : content.publicInstitutionShare}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all"
              aria-label={content.publicInstitutionClose}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-0 space-y-6">
          {loading ? (
            <div className="py-16 text-center text-muted">
              <div className="inline-block w-8 h-8 border-3 border-blue border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs">Cargando perfil institucional...</p>
            </div>
          ) : notFound || !institution ? (
            <div className="py-16 text-center space-y-3">
              <Building2 className="w-12 h-12 text-muted mx-auto stroke-1" />
              <p className="text-base font-bold text-ink">Institución no encontrada</p>
              <p className="text-xs text-muted max-w-sm mx-auto">
                No se encontró la entidad solicitada en la Red Científica Boliviana.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-lg bg-paper border border-line text-xs font-bold text-ink hover:bg-slate-100"
              >
                {content.publicInstitutionClose}
              </button>
            </div>
          ) : (
            <>
              {/* Header: Logo, Name & Type */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-2">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-slate-50">
                  {institution.logo_url || institution.avatar_url ? (
                    <img
                      src={getAssetPath(institution.logo_url || institution.avatar_url)}
                      alt={name}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <Building2 className="w-9 h-9 text-blue" />
                  )}
                </div>

                <div className="flex-1">
                  <h1 id="public-institution-title" className="text-2xl font-black text-ink tracking-tight">
                    {name}
                  </h1>
                  {institution.type && (
                    <p className="text-xs font-bold text-blue uppercase tracking-wider mt-0.5">
                      {institution.type.replace('_', ' ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Location & External Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                {locationLabel && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ink bg-paper px-3 py-1.5 rounded-lg border border-line">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{locationLabel}</span>
                  </span>
                )}

                <div className="flex items-center gap-2">
                  {institution.website_url && (
                    <a
                      href={institution.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue text-white hover:bg-blue-dark font-bold text-xs transition-colors shadow-xs"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{content.publicInstitutionWebsite}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {institution.contact_email && (
                    <a
                      href={`mailto:${institution.contact_email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-paper hover:bg-slate-100 text-ink font-semibold text-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue" />
                      <span>{content.publicInstitutionContact}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              {description && (
                <div className="space-y-2 pt-2 border-t border-line">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue" />
                    {content.publicInstitutionAbout}
                  </h2>
                  <p className="text-sm text-ink leading-relaxed whitespace-pre-line bg-paper/50 p-4 rounded-xl border border-line">
                    {description}
                  </p>
                </div>
              )}

              {/* Affiliated Scientists Section */}
              <div className="space-y-3 pt-2 border-t border-line">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue" />
                    {content.publicInstitutionAffiliatedTitle} ({affiliated.length})
                  </h2>
                </div>

                {affiliated.length === 0 ? (
                  <p className="text-xs text-muted italic bg-paper p-4 rounded-xl border border-line text-center">
                    {content.publicInstitutionAffiliatedEmpty}
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {affiliated.map((sci) => (
                      <button
                        key={sci.id}
                        type="button"
                        onClick={() => {
                          if (onSelectResearcher) {
                            onSelectResearcher(sci.id);
                          }
                        }}
                        className="p-2.5 bg-paper hover:bg-slate-100 border border-line hover:border-blue/40 rounded-xl flex items-center justify-between text-left transition-all group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {sci.avatar_url ? (
                              <img src={getAssetPath(sci.avatar_url)} alt={sci.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              sci.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-ink truncate group-hover:text-blue transition-colors">
                              {sci.name}
                            </p>
                            {sci.title && (
                              <p className="text-[11px] text-muted truncate">
                                {sci.title}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted group-hover:text-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
