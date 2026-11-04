# Red Científica Boliviana (RCB)

Plataforma web dinámica y bilingüe (Español / Inglés) de la **Red Científica Boliviana**, diseñada para conectar, dar visibilidad y potenciar la colaboración entre investigadores, científicos y centros académicos relacionados con Bolivia y la comunidad internacional.

---

## 🌟 Características Principales (Fase 2 MVP)

* **Directorio Dinámico de Investigadores:** Directorio interactivo con filtros por especialidad científica, disciplina y departamento en Bolivia, con sincronización en tiempo real vía Supabase.
* **Perfiles Públicos Detallados:** Fichas individuales con enlaces académicos oficiales (ORCID, Google Scholar, Web personal), biografía académica bilingüe y opción de compartir con enlaces directos (*deep-links*).
* **Gestión y Edición de Perfil de Científico:** Panel modal para que investigadores autenticados administren sus datos académicos, filiación institucional, áreas de investigación y consentimiento de visibilidad pública.
* **Autenticación Bilingüe:** Inicio de sesión, registro y recuperación de contraseña mediante Supabase Auth (correo/contraseña y OAuth con Google), con emulación local offline para desarrollo y Codespaces.
* **Catálogo y Administración Institucional:** Registro y perfiles públicos de universidades, centros de investigación y laboratorios aliados, vinculando a los científicos pertenecientes a cada entidad.
* **Programa y Calendario de Charlas Científicas:** Difusión de actividades, seminarios y conferencias académicas virtuales con grabaciones en diferido.
* **Optimización y Accesibilidad (WCAG 2.1 AA):** Metadatos SEO enriquecidos, marcado semántico JSON-LD (Schema.org), navegación por teclado (*Skip to Content*, `:focus-visible`) y soporte para motores de búsqueda con IA (`robots.txt`, `sitemap.xml`, `llms.txt`).

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Next.js 16](https://nextjs.org/) (App Router) + TypeScript + [Turbopack](https://turbo.build/).
* **Estilos & UI:** [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/).
* **Backend as a Service:** [Supabase](https://supabase.com/) (PostgreSQL 15, Auth & Row Level Security).
* **Despliegue:** CI/CD automatizado en GitHub Pages y compatibilidad con Vercel.

---

## 🚀 Inicio Rápido en Desarrollo Local

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/redcientificaboliviana/redcientificaboliviana.github.io.git
cd RedCientificaBoliviana
npm install
```

### 2. Configurar variables de entorno (Opcional)
Copia el archivo de ejemplo:
```bash
cp .env.example .env.local
```
Edita `.env.local` con las credenciales de tu proyecto en Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```
*(Si no se configuran, la aplicación funciona automáticamente en Modo Demostración Local).*

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

### 4. Compilar para Producción
```bash
npm run build
```
Genera una exportación estática optimizada en el directorio `out/`.

---

## 📁 Estructura del Proyecto

```
RedCientificaBoliviana/
├── app/                  # Next.js App Router (layout, page, globals.css)
├── components/           # Componentes modulares y reactivos de UI
│   ├── AuthModal.tsx     # Modal de Login, Registro y Recuperación
│   ├── ProfileModal.tsx  # Editor y administración de perfil de científico
│   ├── PublicProfileModal.tsx     # Ficha pública de investigador
│   ├── PublicInstitutionModal.tsx # Ficha pública de institución
│   ├── InstitutionModal.tsx       # Registro de instituciones aliadas
│   ├── Directory.tsx     # Directorio dinámico con filtros por especialidad
│   ├── Navbar.tsx        # Navegación responsive, auth y selector ES/EN
│   └── BackToTop.tsx     # Botón flotante accesible de retorno al inicio
├── context/              # React Contexts (LanguageContext y AuthContext)
├── docs/                 # Documentación técnica, arquitectura y manuales
│   ├── architecture-and-database.md
│   ├── operations-and-deployment-manual.md
│   └── Propuesta Plan de Trabajo - Red Científica Boliviana V3.pdf
├── lib/                  # Contenido bilingüe y cliente de Supabase
├── public/               # Archivos públicos estáticos (robots.txt, sitemap.xml, llms.txt, favicon)
├── supabase/             # Migraciones SQL y datos semilla para PostgreSQL
│   ├── migrations/
│   │   ├── 01_initial_schema.sql
│   │   └── 02_institutions_admin.sql
│   └── seed.sql
└── types/                # Definiciones de tipos TypeScript
```

---

## 📚 Documentación Técnica Detallada

Para consultar la especificación completa del sistema, consulta los documentos en la carpeta `docs/`:
* [Arquitectura y Diccionario de Base de Datos](docs/architecture-and-database.md)
* [Manual de Operaciones y Despliegue](docs/operations-and-deployment-manual.md)
* [Propuesta Plan de Trabajo V3](docs/Propuesta%20Plan%20de%20Trabajo%20-%20Red%20Científica%20Boliviana%20V3.pdf)

---

## 👥 Equipo y Coordinación

* **Julio Chávez** — Coordinador y Fundador
* **Kenji Shoji** — Coordinador y Fundador
* **Natalia Machaca** — Coordinadora y Fundadora
* **Hernán Maldonado** — Desarrollo e Infraestructura Web

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.
