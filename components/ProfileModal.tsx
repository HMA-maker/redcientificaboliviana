'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { Profile, ModerationStatus } from '@/types/database';
import { PublicProfileModal } from '@/components/PublicProfileModal';
import {
  X,
  User,
  Building2,
  BookOpen,
  Globe,
  CheckCircle2,
  AlertCircle,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

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

const SUGGESTED_DISCIPLINES = [
  'Ciencias Exactas y Naturales',
  'Ingenierías, Tecnología y Computación',
  'Ciencias Médicas y de la Salud',
  'Ciencias Agrícolas y del Medio Ambiente',
  'Ciencias Sociales y Economía',
  'Humanidades y Artes'
];

export const ProfileModal: React.FC = () => {
  const { user, isProfileOpen, closeProfileModal } = useAuth();
  const { content, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'visibility'>('personal');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [titleEs, setTitleEs] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [institution, setInstitution] = useState('');
  const [department, setDepartment] = useState('La Paz');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Bolivia');
  const [biographyEs, setBiographyEs] = useState('');
  const [biographyEn, setBiographyEn] = useState('');
  const [orcidUrl, setOrcidUrl] = useState('');
  const [googleScholarUrl, setGoogleScholarUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [researchAreas, setResearchAreas] = useState<string[]>([]);
  const [newAreaInput, setNewAreaInput] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [moderationStatus, setModerationStatus] = useState<ModerationStatus>('pending');

  useEffect(() => {
    if (!isProfileOpen || !user) return;

    setErrorMessage(null);
    setSaveSuccess(false);
    setLoading(true);

    const loadProfile = async () => {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();

          if (error) {
            console.warn('Error fetching profile from Supabase:', error);
          }

          if (data) {
            setFullName(data.full_name || user.fullName || '');
            setTitleEs(data.title_es || '');
            setTitleEn(data.title_en || '');
            setInstitution(data.institution || '');
            setDepartment(data.department || 'La Paz');
            setCity(data.city || '');
            setCountry(data.country || 'Bolivia');
            setBiographyEs(data.biography_es || '');
            setBiographyEn(data.biography_en || '');
            setOrcidUrl(data.orcid_url || '');
            setGoogleScholarUrl(data.google_scholar_url || '');
            setWebsiteUrl(data.website_url || '');
            setAvatarUrl(data.avatar_url || user.avatarUrl || '');
            setDisciplines(data.disciplines || []);
            setResearchAreas(data.research_areas || []);
            setIsPublic(data.is_public ?? true);
            setModerationStatus(data.moderation_status || 'pending');
          } else {
            // Valores iniciales por defecto tomados de la cuenta
            setFullName(user.fullName || '');
            setAvatarUrl(user.avatarUrl || '');
            setDepartment('La Paz');
            setCountry('Bolivia');
            setIsPublic(true);
            setModerationStatus('pending');
          }
        } else {
          // Modo Local / Mock
          const savedMock = localStorage.getItem(`rcb_profile_${user.id}`);
          if (savedMock) {
            try {
              const data: Profile = JSON.parse(savedMock);
              setFullName(data.full_name || user.fullName || '');
              setTitleEs(data.title_es || '');
              setTitleEn(data.title_en || '');
              setInstitution(data.institution || '');
              setDepartment(data.department || 'La Paz');
              setCity(data.city || '');
              setCountry(data.country || 'Bolivia');
              setBiographyEs(data.biography_es || '');
              setBiographyEn(data.biography_en || '');
              setOrcidUrl(data.orcid_url || '');
              setGoogleScholarUrl(data.google_scholar_url || '');
              setWebsiteUrl(data.website_url || '');
              setAvatarUrl(data.avatar_url || user.avatarUrl || '');
              setDisciplines(data.disciplines || []);
              setResearchAreas(data.research_areas || []);
              setIsPublic(data.is_public ?? true);
              setModerationStatus(data.moderation_status || 'approved');
            } catch {
              setFullName(user.fullName || '');
            }
          } else {
            setFullName(user.fullName || '');
            setAvatarUrl(user.avatarUrl || '');
            setTitleEs('Investigador / Científico');
            setInstitution('Universidad Boliviana');
            setDepartment('Cochabamba');
            setDisciplines(['Ciencias Exactas y Naturales']);
            setResearchAreas(['Modelación Computacional', 'Sistemas Complejos']);
            setModerationStatus('pending');
            setIsPublic(true);
          }
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isProfileOpen, user]);

  if (!isProfileOpen || !user) return null;

  const handleAddArea = () => {
    const trimmed = newAreaInput.trim();
    if (trimmed && !researchAreas.includes(trimmed)) {
      setResearchAreas([...researchAreas, trimmed]);
      setNewAreaInput('');
    }
  };

  const handleRemoveArea = (area: string) => {
    setResearchAreas(researchAreas.filter((a) => a !== area));
  };

  const toggleDiscipline = (disc: string) => {
    if (disciplines.includes(disc)) {
      setDisciplines(disciplines.filter((d) => d !== disc));
    } else {
      setDisciplines([...disciplines, disc]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaveSuccess(false);

    if (!fullName.trim()) {
      setErrorMessage(language === 'es' ? 'El nombre completo es obligatorio.' : 'Full name is required.');
      return;
    }

    setSaving(true);

    const payload: Partial<Profile> = {
      id: user.id,
      email: user.email,
      full_name: fullName.trim(),
      title_es: titleEs.trim(),
      title_en: titleEn.trim() || titleEs.trim(),
      institution: institution.trim(),
      department,
      city: city.trim(),
      country: country.trim() || 'Bolivia',
      biography_es: biographyEs.trim(),
      biography_en: biographyEn.trim() || biographyEs.trim(),
      orcid_url: orcidUrl.trim(),
      google_scholar_url: googleScholarUrl.trim(),
      website_url: websiteUrl.trim(),
      avatar_url: avatarUrl.trim(),
      disciplines,
      research_areas: researchAreas,
      is_public: isPublic,
      moderation_status: moderationStatus,
      updated_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('profiles')
          .upsert(payload, { onConflict: 'id' });

        if (error) {
          throw error;
        }
      } else {
        // Almacenamiento local mock
        localStorage.setItem(`rcb_profile_${user.id}`, JSON.stringify(payload));
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setErrorMessage(err.message || content.profileSaveError);
    } finally {
      setSaving(false);
    }
  };

  const statusBadge = () => {
    switch (moderationStatus) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {content.profileStatusApproved}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
            <AlertCircle className="w-3.5 h-3.5" />
            {content.profileStatusRejected}
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
            {content.profileStatusArchived}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            {content.profileStatusPending}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-line rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-ink"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-dialog-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-paper">
          <div>
            <h2 id="profile-dialog-title" className="text-xl font-bold text-ink flex items-center gap-2">
              <User className="w-5 h-5 text-blue" />
              {content.profileModalTitle}
            </h2>
            <p className="text-xs text-muted mt-0.5">
              {content.profileModalSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-white hover:bg-slate-100 text-xs font-bold text-ink transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-blue" />
              <span>{content.viewPublicProfile}</span>
            </button>
            <button
              onClick={closeProfileModal}
              className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-slate-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-line bg-slate-50 px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'personal'
                ? 'border-blue text-blue'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Building2 className="w-4 h-4" />
            {content.profileTabPersonal}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'academic'
                ? 'border-blue text-blue'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {content.profileTabAcademic}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('visibility')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'visibility'
                ? 'border-blue text-blue'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            <Globe className="w-4 h-4" />
            {content.profileTabLinks}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2.5 text-xs text-green-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-600" />
              <span className="font-semibold">{content.profileSaveSuccess}</span>
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-xs text-muted">
              <div className="inline-block w-6 h-6 border-2 border-blue border-t-transparent rounded-full animate-spin mb-2" />
              <p>Cargando perfil...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: Personal y Filiación */}
              {activeTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileFullNameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.emailLabel}
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm bg-slate-100 text-muted cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileTitleLabel} (ES)
                      </label>
                      <input
                        type="text"
                        placeholder={content.profileTitlePlaceholder}
                        value={titleEs}
                        onChange={(e) => setTitleEs(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileTitleLabel} (EN)
                      </label>
                      <input
                        type="text"
                        placeholder="E.g. Associate Professor in Computational Science..."
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {content.profileInstitutionLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={content.profileInstitutionPlaceholder}
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileDepartmentLabel}
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue bg-white"
                      >
                        {BOLIVIA_DEPARTMENTS.map((dep) => (
                          <option key={dep} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileCityLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={content.profileCityPlaceholder}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileCountryLabel}
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {content.profileAvatarLabel}
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-paper border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-muted" />
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder={content.profileAvatarPlaceholder}
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="flex-1 px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Investigación & Biografía */}
              {activeTab === 'academic' && (
                <div className="space-y-5">
                  {/* Disciplinas sugeridas */}
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      {content.profileDisciplinesLabel}
                    </label>
                    <p className="text-[11px] text-muted mb-2">
                      {content.profileDisciplinesHint}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_DISCIPLINES.map((disc) => {
                        const isSelected = disciplines.includes(disc);
                        return (
                          <button
                            key={disc}
                            type="button"
                            onClick={() => toggleDiscipline(disc)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-blue text-white border-blue shadow-sm'
                                : 'bg-paper text-muted border-line hover:border-blue hover:text-ink'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {disc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Áreas de Investigación (Tags) */}
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      {content.profileResearchAreasLabel}
                    </label>
                    <p className="text-[11px] text-muted mb-2">
                      {content.profileResearchAreasHint}
                    </p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder={content.profileResearchAreasPlaceholder}
                        value={newAreaInput}
                        onChange={(e) => setNewAreaInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddArea();
                          }
                        }}
                        className="flex-1 px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                      <button
                        type="button"
                        onClick={handleAddArea}
                        className="px-4 py-2 bg-blue text-white rounded-lg text-xs font-bold hover:bg-blue-dark transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-paper border border-line rounded-lg">
                      {researchAreas.length === 0 ? (
                        <span className="text-xs text-muted italic">Sin áreas registradas aún.</span>
                      ) : (
                        researchAreas.map((area) => (
                          <span
                            key={area}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue/30 text-blue font-semibold text-xs rounded-full shadow-xs"
                          >
                            <span>{area}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveArea(area)}
                              className="text-muted hover:text-red-500 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Biografías */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileBioEsLabel}
                      </label>
                      <textarea
                        rows={5}
                        placeholder={content.profileBioPlaceholder}
                        value={biographyEs}
                        onChange={(e) => setBiographyEs(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileBioEnLabel}
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Describe your scientific trajectory and contributions in English..."
                        value={biographyEn}
                        onChange={(e) => setBiographyEn(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Enlaces & Visibilidad */}
              {activeTab === 'visibility' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileOrcidLabel}
                      </label>
                      <input
                        type="url"
                        placeholder={content.profileOrcidPlaceholder}
                        value={orcidUrl}
                        onChange={(e) => setOrcidUrl(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileScholarLabel}
                      </label>
                      <input
                        type="url"
                        placeholder={content.profileScholarPlaceholder}
                        value={googleScholarUrl}
                        onChange={(e) => setGoogleScholarUrl(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {content.profileWebsiteLabel}
                      </label>
                      <input
                        type="url"
                        placeholder={content.profileWebsitePlaceholder}
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line space-y-4">
                    {/* Consentimiento público */}
                    <div className="p-4 bg-paper rounded-xl border border-line flex items-start gap-3">
                      <div className="pt-0.5">
                        <input
                          id="is_public_checkbox"
                          type="checkbox"
                          checked={isPublic}
                          onChange={(e) => setIsPublic(e.target.checked)}
                          className="w-4 h-4 text-blue rounded border-line focus:ring-blue"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="is_public_checkbox" className="text-xs sm:text-sm font-bold text-ink cursor-pointer flex items-center gap-1.5">
                          {isPublic ? <Eye className="w-4 h-4 text-blue" /> : <EyeOff className="w-4 h-4 text-muted" />}
                          {content.profilePublicConsentLabel}
                        </label>
                        <p className="text-[11px] text-muted mt-1 leading-relaxed">
                          {content.profilePublicConsentDesc}
                        </p>
                      </div>
                    </div>

                    {/* Estado de Moderación */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-line rounded-xl">
                      <span className="text-xs font-bold text-ink">
                        {content.profileModerationStatusLabel}
                      </span>
                      {statusBadge()}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={closeProfileModal}
              className="px-4 py-2 border border-line rounded-lg text-xs font-bold text-muted hover:text-ink hover:bg-paper transition-colors"
            >
              Cerrar
            </button>

            <button
              type="submit"
              disabled={saving || loading}
              className="px-6 py-2 bg-blue hover:bg-blue-dark text-white rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? content.profileSavingButton : content.profileSaveButton}</span>
            </button>
          </div>
        </form>
      </div>

      {showPreview && (
        <PublicProfileModal
          profileId={user.id}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};
