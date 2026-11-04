'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { InstitutionType } from '@/types/database';
import {
  X,
  Building2,
  Globe,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Save,
  Image as ImageIcon
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

interface InstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const InstitutionModal: React.FC<InstitutionModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { content, language } = useLanguage();

  const [name, setName] = useState('');
  const [type, setType] = useState<InstitutionType>('universidad');
  const [department, setDepartment] = useState('Cochabamba');
  const [city, setCity] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [descriptionEs, setDescriptionEs] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(false);

    if (!name.trim()) {
      setErrorMsg(language === 'es' ? 'El nombre de la institución es obligatorio.' : 'Institution name is required.');
      return;
    }

    setLoading(true);

    const newInst = {
      id: isSupabaseConfigured ? undefined : `local-inst-${Date.now()}`,
      name: name.trim(),
      type,
      department,
      city: city.trim(),
      website_url: websiteUrl.trim(),
      contact_email: contactEmail.trim(),
      logo_url: logoUrl.trim(),
      description_es: descriptionEs.trim(),
      description_en: descriptionEn.trim() || descriptionEs.trim(),
      representative_id: user?.id || null,
      moderation_status: 'approved', // En desarrollo/Codespaces aprobado para visibilidad inmediata
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('institutions')
          .insert([newInst]);

        if (error) throw error;
      } else {
        // Almacenamiento local mock en Codespaces
        const existingStr = localStorage.getItem('rcb_institutions') || '[]';
        const existingList = JSON.parse(existingStr);
        existingList.push(newInst);
        localStorage.setItem('rcb_institutions', JSON.stringify(existingList));
      }

      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Error saving institution:', err);
      setErrorMsg(err.message || content.institutionRegisterError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white border border-line rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-ink"
        role="dialog"
        aria-modal="true"
        aria-labelledby="institution-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-paper">
          <div>
            <h2 id="institution-modal-title" className="text-xl font-bold text-ink flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue" />
              {content.institutionModalTitle}
            </h2>
            <p className="text-xs text-muted mt-0.5">
              {content.institutionModalSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-slate-200 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2.5 text-xs text-green-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-green-600" />
              <span className="font-semibold">{content.institutionRegisterSuccess}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink mb-1">
              {content.institutionNameLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={content.institutionNamePlaceholder}
              className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionTypeLabel}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InstitutionType)}
                className="w-full px-3 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue bg-white"
              >
                <option value="universidad">Universidad</option>
                <option value="centro_investigacion">Centro de Investigación</option>
                <option value="laboratorio">Laboratorio Especializado</option>
                <option value="ong">ONG / Fundación Científica</option>
                <option value="otra">Otra Entidad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionDeptLabel}
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
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionCityLabel}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={content.institutionCityPlaceholder}
                className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionWebsiteLabel}
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder={content.institutionWebsitePlaceholder}
                  className="w-full pl-9 pr-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionEmailLabel}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={content.institutionEmailPlaceholder}
                  className="w-full pl-9 pr-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionLogoLabel}
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-muted absolute left-3 top-2.5" />
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder={content.institutionLogoPlaceholder}
                  className="w-full pl-9 pr-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionDescEsLabel}
              </label>
              <textarea
                rows={3}
                value={descriptionEs}
                onChange={(e) => setDescriptionEs(e.target.value)}
                placeholder={content.institutionDescPlaceholder}
                className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {content.institutionDescEnLabel}
              </label>
              <textarea
                rows={3}
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                placeholder="Institutional mission, research lines and facilities..."
                className="w-full px-3.5 py-2 border border-line rounded-lg text-xs sm:text-sm focus:outline-none focus:border-blue resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-line flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-line rounded-lg text-xs font-bold text-muted hover:text-ink hover:bg-paper transition-colors"
            >
              Cerrar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue hover:bg-blue-dark text-white rounded-lg text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? content.institutionRegistering : content.institutionRegisterButton}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
