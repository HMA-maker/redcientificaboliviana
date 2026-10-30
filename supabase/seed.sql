-- ==============================================================================
-- Red Científica Boliviana - Datos Semilla Iniciales para Pruebas Locales
-- ==============================================================================

-- 1. Institución inicial de prueba
INSERT INTO public.institutions (id, name, type, department, website_url, moderation_status)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Laboratorio de Demostración en Ciencias del Agua',
  'laboratorio',
  'Cochabamba',
  'https://redcientificaboliviana.org',
  'approved'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Perfil de prueba (Julio Chávez)
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  title_es,
  title_en,
  biography_es,
  biography_en,
  institution,
  department,
  city,
  country,
  orcid_url,
  website_url,
  google_scholar_url,
  disciplines,
  research_areas,
  moderation_status,
  is_public
)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'julio.chavez@example.org',
  'Julio Chávez',
  'Perfil de investigación',
  'Research profile',
  'Julio Chávez es investigador en mecánica de fluidos especializado en el transporte de partículas en flujos turbulentos. Su trabajo combina experimentos y análisis numérico para estudiar sistemas complejos.',
  'Julio Chávez is a fluid mechanics researcher specializing in particle transport in turbulent flows. His work combines experiments and numerical analysis to study complex systems.',
  'Universidad de Washington',
  'Extranjero',
  'Barcelona',
  'España',
  'https://orcid.org/0009-0001-9861-8890',
  'https://julio-chavez.github.io/',
  'https://scholar.google.com/citations?user=qpYRiaUAAAAJ',
  ARRAY['Ingenierías, tecnología e infraestructura'],
  ARRAY['Mecánica de Fluidos', 'Turbulencia', 'Estadística', 'Computación científica'],
  'approved',
  true
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  title_es = EXCLUDED.title_es,
  title_en = EXCLUDED.title_en;

-- 3. Actividad inicial de prueba
INSERT INTO public.activities (
  id,
  type,
  date,
  title_es,
  title_en,
  description_es,
  description_en,
  published,
  speaker_id
)
VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'talk',
  CURRENT_DATE + INTERVAL '14 days',
  'Dinámica de fluidos y transporte de partículas en Bolivia',
  'Fluid dynamics and particle transport in Bolivia',
  'Charla inaugural sobre aplicaciones computacionales en investigación ambiental.',
  'Inaugural talk on computational applications in environmental research.',
  true,
  'b0000000-0000-0000-0000-000000000001'
)
ON CONFLICT (id) DO NOTHING;
