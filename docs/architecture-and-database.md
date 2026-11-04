# Arquitectura del Sistema y Diccionario de Base de Datos
## Plataforma Web - Red Científica Boliviana (Fase 2 MVP)

---

### 1. Resumen de Arquitectura Tecnológica

La plataforma web de la **Red Científica Boliviana (RCB)** está diseñada como una aplicación web moderna, rápida, accesible y bilingüe (Español / Inglés).

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Frontend (Next.js 16)                         │
│  - App Router & Turbopack                                              │
│  - Tailwind CSS + Lucide Icons                                         │
│  - Contextos: LanguageContext (ES/EN) + AuthContext                    │
│  - Modales: Auth, Profile, PublicProfile, PublicInstitution            │
└───────────────────▲────────────────────────────────▲───────────────────┘
                    │                                │
                    ▼ (Supabase JS Client)           ▼ (Fallback Offline)
┌─────────────────────────────────────────┐   ┌──────────────────────────┐
│          Backend (Supabase BaaS)        │   │    Local Dev Storage     │
│  - PostgreSQL 15 Relacional             │   │  - localStorage / Mock   │
│  - Supabase Auth (Email / Google OAuth) │   │  - Códigos de prueba     │
│  - Row Level Security (RLS)             │   │  - Codespaces script     │
└─────────────────────────────────────────┘   └──────────────────────────┘
```

#### Componentes del Stack:
* **Framework:** Next.js 16 (App Router) con Turbopack y TypeScript.
* **Estilos:** Tailwind CSS con paleta corporativa y diseño adaptativo a móviles (*mobile-first*).
* **Despliegue:** Exportación estática optimizada (`output: 'export'`) compatible con **GitHub Pages** y **Vercel**.
* **Base de Datos y Autenticación:** Supabase (PostgreSQL 15) con seguridad a nivel de filas (*Row Level Security* - RLS) y soporte de modo desarrollo sin conexión (mock transparente para Codespaces).

---

### 2. Diccionario de Datos (Modelo Relacional PostgreSQL)

#### A. Tabla: `public.profiles`
Almacena la información académica, profesional y de visibilidad de los científicos e investigadores vinculados.

| Campo | Tipo | Nulo | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | `UUID` | No | Clave primaria. Referencia foránea a `auth.users(id) ON DELETE CASCADE`. |
| `email` | `TEXT` | Sí | Correo electrónico de la cuenta. |
| `full_name` | `TEXT` | No | Nombre completo y apellidos del científico. |
| `title_es` | `TEXT` | Sí | Título profesional o cargo en español (ej. *PhD en Biología Molecular*). |
| `title_en` | `TEXT` | Sí | Título profesional o cargo en inglés. |
| `biography_es` | `TEXT` | Sí | Biografía académica y trayectoria en español. |
| `biography_en` | `TEXT` | Sí | Biografía académica en inglés. |
| `institution` | `TEXT` | Sí | Nombre de la institución de afiliación principal. |
| `department` | `TEXT` | Sí | Departamento en Bolivia (ej. *Cochabamba*, *La Paz*, *Santa Cruz* o *Exterior*). |
| `city` | `TEXT` | Sí | Ciudad o localidad de residencia. |
| `country` | `TEXT` | Sí | País (por defecto `'Bolivia'`). |
| `orcid_url` | `TEXT` | Sí | Enlace o identificador único oficial ORCID. |
| `google_scholar_url` | `TEXT` | Sí | Enlace al perfil de Google Académico / Google Scholar. |
| `website_url` | `TEXT` | Sí | Enlace a página web personal o del laboratorio. |
| `avatar_url` | `TEXT` | Sí | URL pública de la fotografía o avatar del investigador. |
| `disciplines` | `TEXT[]` | Sí | Lista de disciplinas científicas principales (ej. *Ciencias Exactas*, *Ingenierías*). |
| `research_areas` | `TEXT[]` | Sí | Lista de áreas específicas de investigación (tags). |
| `moderation_status` | `TEXT` | No | Estado de verificación: `'pending'`, `'approved'`, `'rejected'`, `'archived'`. |
| `is_public` | `BOOLEAN` | No | Consentimiento explícito para visibilidad en el directorio público (`true`/`false`). |
| `created_at` | `TIMESTAMPTZ` | No | Fecha y hora UTC de creación del registro. |
| `updated_at` | `TIMESTAMPTZ` | No | Fecha y hora UTC de la última modificación. |

---

#### B. Tabla: `public.institutions`
Almacena las universidades, centros de investigación, laboratorios y entidades aliadas a la red.

| Campo | Tipo | Nulo | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | `UUID` | No | Clave primaria generada por `gen_random_uuid()`. |
| `name` | `TEXT` | No | Nombre oficial de la institución. |
| `type` | `TEXT` | No | Tipo: `'universidad'`, `'centro_investigacion'`, `'laboratorio'`, `'ong'`, `'otra'`. |
| `department` | `TEXT` | Sí | Departamento de la sede en Bolivia. |
| `city` | `TEXT` | Sí | Ciudad donde se ubica la sede central. |
| `website_url` | `TEXT` | Sí | Sitio web institucional oficial. |
| `contact_email` | `TEXT` | Sí | Correo electrónico oficial de contacto o enlace. |
| `logo_url` | `TEXT` | Sí | URL del logotipo institucional. |
| `description_es` | `TEXT` | Sí | Descripción institucional y líneas científicas en español. |
| `description_en` | `TEXT` | Sí | Descripción institucional en inglés. |
| `representative_id` | `UUID` | Sí | ID del investigador representante (`REFERENCES public.profiles(id)`). |
| `moderation_status` | `TEXT` | No | Estado: `'pending'`, `'approved'`, `'rejected'`. |
| `created_at` | `TIMESTAMPTZ` | No | Fecha y hora UTC de registro. |
| `updated_at` | `TIMESTAMPTZ` | No | Fecha y hora UTC de actualización. |

---

#### C. Tabla: `public.activities`
Almacena los eventos, charlas científicas, seminarios y talleres organizados por la red.

| Campo | Tipo | Nulo | Descripción |
| :--- | :--- | :---: | :--- |
| `id` | `UUID` | No | Clave primaria (`gen_random_uuid()`). |
| `type` | `TEXT` | No | Tipo: `'talk'`, `'seminar'`, `'workshop'`, `'meeting'`, `'other'`. |
| `date` | `DATE` | No | Fecha programada del evento (YYYY-MM-DD). |
| `title_es` | `TEXT` | No | Título de la actividad en español. |
| `title_en` | `TEXT` | Sí | Título en inglés. |
| `description_es` | `TEXT` | No | Resumen y contenido del evento en español. |
| `description_en` | `TEXT` | Sí | Resumen en inglés. |
| `registration_url` | `TEXT` | Sí | Formulario o enlace de inscripción previo. |
| `recording_url` | `TEXT` | Sí | Enlace a la grabación en diferido (YouTube, Drive). |
| `speaker_id` | `UUID` | Sí | Disertante (`REFERENCES public.profiles(id)`). |
| `published` | `BOOLEAN` | No | Visibilidad pública en el calendario. |
| `created_at` | `TIMESTAMPTZ` | No | Fecha y hora de creación. |

---

### 3. Políticas de Seguridad (Row Level Security - RLS)

Todas las tablas en PostgreSQL tienen RLS habilitado para proteger los datos privados y prevenir accesos no autorizados:

1. **Perfiles (`public.profiles`):**
   * **Lectura Pública:** Autorizada únicamente si `moderation_status = 'approved' AND is_public = true`, O si el usuario autenticado consulta su propio perfil (`auth.uid() = id`).
   * **Inserción:** El usuario autenticado solo puede insertar una fila con su propio `id` (`auth.uid() = id`).
   * **Actualización:** El usuario autenticado solo puede modificar su propia fila (`auth.uid() = id`).

2. **Instituciones (`public.institutions`):**
   * **Lectura Pública:** Disponible para instituciones con `moderation_status = 'approved'`.
   * **Registro:** Cualquier usuario autenticado puede proponer una institución.
   * **Edición:** Exclusiva para el usuario registrado como representante (`auth.uid() = representative_id`).

3. **Actividades (`public.activities`):**
   * **Lectura Pública:** Registros con `published = true`.
