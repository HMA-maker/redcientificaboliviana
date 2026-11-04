-- ==============================================================================
-- Red Científica Boliviana - Datos Semilla Iniciales para Pruebas Locales
-- ==============================================================================

-- 1. Instituciones iniciales de prueba (PB-10)
INSERT INTO public.institutions (id, name, type, department, city, website_url, contact_email, description_es, description_en, moderation_status)
VALUES 
(
  'a0000000-0000-0000-0000-000000000001',
  'Laboratorio de Demostración en Ciencias del Agua',
  'laboratorio',
  'Cochabamba',
  'Cochabamba',
  'https://redcientificaboliviana.org',
  'ciencias.agua@redcientificaboliviana.org',
  'Unidad experimental dedicada a la investigación hidrológica, modelado de cuencas y calidad de recursos hídricos en los valles bolivianos.',
  'Experimental unit dedicated to hydrological research, watershed modeling and water resources quality in the Bolivian valleys.',
  'approved'
),
(
  'a0000000-0000-0000-0000-000000000002',
  'Universidad Mayor de San Simón (UMSS)',
  'universidad',
  'Cochabamba',
  'Cochabamba',
  'https://www.umss.edu.bo',
  'investigacion@umss.edu.bo',
  'Principal casa superior de estudios de Cochabamba, líder en investigación en biotecnología, ingeniería y ciencias de la salud.',
  'Leading higher education institution in Cochabamba, pioneering research in biotechnology, engineering and health sciences.',
  'approved'
),
(
  'a0000000-0000-0000-0000-000000000003',
  'Universidad Mayor de San Andrés (UMSA)',
  'universidad',
  'La Paz',
  'La Paz',
  'https://www.umsa.bo',
  'dipgis@umsa.bo',
  'Institución pública de educación superior con centros de investigación de alto nivel en física atmosférica, medicina de altura y geociencias.',
  'Public higher education institution with high-level research centers in atmospheric physics, high-altitude medicine and geosciences.',
  'approved'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description_es = EXCLUDED.description_es,
  description_en = EXCLUDED.description_en;

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
