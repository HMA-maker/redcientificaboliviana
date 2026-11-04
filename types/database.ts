export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'archived';

export interface Profile {
  id: string;
  email?: string;
  full_name: string;
  title_es?: string;
  title_en?: string;
  biography_es?: string;
  biography_en?: string;
  institution?: string;
  department?: string;
  city?: string;
  country?: string;
  orcid_url?: string;
  google_scholar_url?: string;
  website_url?: string;
  avatar_url?: string;
  disciplines?: string[];
  research_areas?: string[];
  moderation_status: ModerationStatus;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export type InstitutionType = 'universidad' | 'centro_investigacion' | 'laboratorio' | 'ong' | 'otra';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  department?: string;
  city?: string;
  website_url?: string;
  contact_email?: string;
  logo_url?: string;
  description_es?: string;
  description_en?: string;
  representative_id?: string;
  moderation_status: ModerationStatus;
  created_at: string;
  updated_at?: string;
}

export interface DatabaseActivity {
  id: string;
  type: 'talk' | 'seminar' | 'workshop' | 'meeting' | 'other';
  date: string;
  title_es: string;
  title_en?: string;
  description_es: string;
  description_en?: string;
  registration_url?: string;
  recording_url?: string;
  published: boolean;
  speaker_id?: string;
  created_at: string;
}
