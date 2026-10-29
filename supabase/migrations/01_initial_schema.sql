-- ==============================================================================
-- Red Científica Boliviana - Esquema Inicial de Base de Datos (PostgreSQL / Supabase)
-- Tarea: PB-03 (Sprint 4 / Fase 2)
-- ==============================================================================

-- 1. Tabla de Perfiles de Científicos e Investigadores
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT NOT NULL,
  title_es TEXT,
  title_en TEXT,
  biography_es TEXT,
  biography_en TEXT,
  institution TEXT,
  department TEXT, -- La Paz, Cochabamba, Santa Cruz, etc.
  city TEXT,
  country TEXT DEFAULT 'Bolivia',
  orcid_url TEXT,
  google_scholar_url TEXT,
  website_url TEXT,
  avatar_url TEXT,
  disciplines TEXT[] DEFAULT '{}',
  research_areas TEXT[] DEFAULT '{}',
  moderation_status TEXT DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'archived')),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- 2. Tabla de Instituciones Vinculadas
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'universidad' CHECK (type IN ('universidad', 'centro_investigacion', 'laboratorio', 'ong', 'otra')),
  department TEXT,
  website_url TEXT,
  logo_url TEXT,
  moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- 3. Tabla de Actividades y Charlas Científicas
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'talk' CHECK (type IN ('talk', 'seminar', 'workshop', 'meeting', 'other')),
  date DATE NOT NULL,
  title_es TEXT NOT NULL,
  title_en TEXT,
  description_es TEXT NOT NULL,
  description_en TEXT,
  registration_url TEXT,
  recording_url TEXT,
  published BOOLEAN DEFAULT true,
  speaker_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- ==============================================================================
-- 4. Automatización: Creación de Perfil al registrarse en Supabase Auth
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado tras registrar usuario en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. Seguridad: Row Level Security (RLS)
-- ==============================================================================

-- A. Perfiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de perfiles aprobados"
  ON public.profiles FOR SELECT
  USING (
    (moderation_status = 'approved' AND is_public = true)
    OR (auth.uid() = id)
  );

CREATE POLICY "El usuario puede actualizar su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "El usuario puede insertar su propio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- B. Instituciones
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de instituciones aprobadas"
  ON public.institutions FOR SELECT
  USING (moderation_status = 'approved');

-- C. Actividades
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de actividades publicadas"
  ON public.activities FOR SELECT
  USING (published = true);
