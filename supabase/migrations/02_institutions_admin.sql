-- ==============================================================================
-- Red Científica Boliviana - Extensión de Instituciones y Políticas RLS
-- Tarea: PB-10 (Sprint 9 / Fase 2)
-- ==============================================================================

-- 1. Ampliación de columnas para instituciones aliadas
ALTER TABLE public.institutions
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS description_es TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS representative_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::TEXT, now()) NOT NULL;

-- 2. Políticas de Seguridad Row Level Security (RLS)
CREATE POLICY "Usuarios autenticados pueden registrar instituciones"
  ON public.institutions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Representantes pueden actualizar sus instituciones"
  ON public.institutions FOR UPDATE
  USING (auth.uid() = representative_id)
  WITH CHECK (auth.uid() = representative_id);

CREATE POLICY "Representantes pueden consultar sus propias instituciones pendientes"
  ON public.institutions FOR SELECT
  USING (auth.uid() = representative_id);
