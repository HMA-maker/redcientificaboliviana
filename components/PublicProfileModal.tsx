'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import recordsData from '@/data/published-records.json';
import {
  X,
  User,
  Building2,
  MapPin,
  ExternalLink,
  Share2,
  Check,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Globe,
  Mail,
  Sparkles
} from 'lucide-react';

export interface PublicProfileData {
  id: string;
  full_name: string;
  title?: string;
  institution?: string;
  department?: string;
  city?: string;
  country?: string;
  biography?: string;
  avatar_url?: string;
  orcid_url?: string;
  google_scholar_url?: string;
  website_url?: string;
  disciplines?: string[];
  research_areas?: string[];
}

interface PublicProfileModalProps {
  profileId: string | null;
  onClose: () => void;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({ profileId, onClose }) => {
  const { content, language } = useLanguage();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!profileId) {
      setProfile(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setNotFound(false);

    const fetchPublicProfile = async () => {
      try {
        // 1. Intentar consultar en Supabase (si está configurado)
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profileId)
            .eq('is_public', true)
            .maybeSingle();

          if (!error && data) {
            setProfile({
              id: data.id,
              full_name: data.full_name,
              title: language === 'es' ? (data.title_es || data.title_en) : (data.title_en || data.title_es),
              institution: data.institution,
              department: data.department,
              city: data.city,
              country: data.country,
              biography: language === 'es' ? (data.biography_es || data.biography_en) : (data.biography_en || data.biography_es),
              avatar_url: data.avatar_url,
              orcid_url: data.orcid_url,
              google_scholar_url: data.google_scholar_url,
              website_url: data.website_url,
              disciplines: data.disciplines || [],
              research_areas: data.research_areas || [],
            });
            setLoading(false);
            return;
          }
        }

        // 2. Intentar buscar en perfiles de desarrollo local (localStorage)
        const localDataStr = localStorage.getItem(`rcb_profile_${profileId}`);
        if (localDataStr) {
          try {
            const data = JSON.parse(localDataStr);
            setProfile({
              id: profileId,
              full_name: data.full_name || 'Investigador',
              title: language === 'es' ? (data.title_es || data.title_en) : (data.title_en || data.title_es),
              institution: data.institution,
              department: data.department,
              city: data.city,
              country: data.country,
              biography: language === 'es' ? (data.biography_es || data.biography_en) : (data.biography_en || data.biography_es),
              avatar_url: data.avatar_url,
              orcid_url: data.orcid_url,
              google_scholar_url: data.google_scholar_url,
              website_url: data.website_url,
              disciplines: data.disciplines || [],
              research_areas: data.research_areas || [],
            });
            setLoading(false);
            return;
          } catch (e) {
            console.error('Error parsing local mock profile:', e);
          }
        }

        // 3. Buscar en published-records.json (registros estáticos de personas / Julio Chávez / demostración)
        const staticRecords = (recordsData.records || []) as any[];
        const match = staticRecords.find(
          (r) => (r.record_id === profileId || r.name?.toLowerCase() === profileId.toLowerCase()) && r.record_type === 'person'
        );

        if (match) {
          setProfile({
            id: match.record_id,
            full_name: match.name || match.title_es || 'Investigador',
            title: language === 'es' ? (match.title_es || match.title_en) : (match.title_en || match.title_es),
            institution: match.institution,
            department: match.department || match.city_region,
            city: match.city_region,
            country: match.country,
            biography: language === 'es' ? (match.biography_es || match.summary_es) : (match.biography_en || match.summary_en),
            avatar_url: match.avatar_url,
            orcid_url: match.orcid_url,
            google_scholar_url: match.google_scholar_url,
            website_url: match.website_url,
            disciplines: language === 'es' ? (match.disciplines_es || []) : (match.disciplines_en || match.disciplines_es || []),
            research_areas: language === 'es' ? (match.research_areas_es || []) : (match.research_areas_en || match.research_areas_es || []),
          });
          setLoading(false);
          return;
        }

        setNotFound(true);
      } catch (err) {
        console.error('Error fetching public profile:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [profileId, language]);

  if (!profileId) return null;

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#investigador=${encodeURIComponent(profileId)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const locationLabel = [profile?.city, profile?.department, profile?.country].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-line rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-ink"
        role="dialog"
        aria-modal="true"
        aria-labelledby="public-profile-title"
      >
        {/* Cover & Top Bar */}
        <div className="relative bg-gradient-to-r from-blue-dark via-blue to-cyan-700 h-28 px-6 pt-4 flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-200" />
            {content.publicProfileBadge}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all flex items-center gap-1.5 px-3 text-xs font-semibold shadow-sm"
              title={content.publicProfileShare}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? content.publicProfileShareCopied : content.publicProfileShare}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all"
              aria-label={content.publicProfileClose}
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
              <p className="text-xs">Cargando perfil público del investigador...</p>
            </div>
          ) : notFound || !profile ? (
            <div className="py-16 text-center space-y-3">
              <User className="w-12 h-12 text-muted mx-auto stroke-1" />
              <p className="text-base font-bold text-ink">Perfil no encontrado</p>
              <p className="text-xs text-muted max-w-sm mx-auto">
                El perfil solicitado no existe o no tiene visibilidad pública autorizada en este momento.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-lg bg-paper border border-line text-xs font-bold text-ink hover:bg-slate-100"
              >
                {content.publicProfileClose}
              </button>
            </div>
          ) : (
            <>
              {/* Header: Avatar, Name & Affiliation */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-2">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0 bg-slate-50">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue text-white flex items-center justify-center text-2xl font-black">
                      {profile.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 id="public-profile-title" className="text-2xl font-black text-ink tracking-tight">
                    {profile.full_name}
                  </h1>
                  {profile.title && (
                    <p className="text-sm font-semibold text-blue mt-0.5">
                      {profile.title}
                    </p>
                  )}
                </div>
              </div>

              {/* Institution & Location Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted">
                {profile.institution && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ink bg-paper px-3 py-1.5 rounded-lg border border-line">
                    <Building2 className="w-4 h-4 text-blue" />
                    <span>{profile.institution}</span>
                  </span>
                )}
                {locationLabel && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-ink bg-paper px-3 py-1.5 rounded-lg border border-line">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{locationLabel}</span>
                  </span>
                )}
              </div>

              {/* Biography */}
              {profile.biography && (
                <div className="space-y-2 pt-2 border-t border-line">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue" />
                    {content.publicProfileBio}
                  </h2>
                  <p className="text-sm text-ink leading-relaxed whitespace-pre-line bg-paper/50 p-4 rounded-xl border border-line">
                    {profile.biography}
                  </p>
                </div>
              )}

              {/* Disciplines & Research Areas */}
              {((profile.disciplines && profile.disciplines.length > 0) ||
                (profile.research_areas && profile.research_areas.length > 0)) && (
                <div className="space-y-4 pt-2 border-t border-line">
                  {profile.disciplines && profile.disciplines.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue" />
                        {content.publicProfileDisciplines}
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.disciplines.map((d, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-blue-light/70 border border-blue/30 text-blue font-bold text-xs"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.research_areas && profile.research_areas.length > 0 && (
                    <div className="space-y-2">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                        {content.publicProfileAreas}
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.research_areas.map((area, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-paper border border-line text-ink font-medium text-xs"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Official Academic Links */}
              {(profile.orcid_url || profile.google_scholar_url || profile.website_url) && (
                <div className="space-y-2 pt-2 border-t border-line">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue" />
                    {content.publicProfileLinks}
                  </h2>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {profile.orcid_url && (
                      <a
                        href={profile.orcid_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-paper border border-line hover:border-emerald-500 hover:text-emerald-700 text-xs font-bold text-ink transition-all shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>ORCID</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted" />
                      </a>
                    )}
                    {profile.google_scholar_url && (
                      <a
                        href={profile.google_scholar_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-paper border border-line hover:border-blue hover:text-blue text-xs font-bold text-ink transition-all shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue" />
                        <span>Google Scholar</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted" />
                      </a>
                    )}
                    {profile.website_url && (
                      <a
                        href={profile.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-paper border border-line hover:border-blue hover:text-blue text-xs font-bold text-ink transition-all shadow-xs"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue" />
                        <span>Web Personal / Lab</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Contact / Collaboration banner */}
              <div className="p-4 bg-paper rounded-xl border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-ink">{content.publicProfileContactCta}</p>
                  <p className="text-muted mt-0.5">Canal oficial de coordinación científica y difusión académica.</p>
                </div>
                <a
                  href="#contacto"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg bg-blue text-white font-bold hover:bg-blue-dark transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{content.navContact}</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
