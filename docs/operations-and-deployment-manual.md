# Manual de Operaciones, Administración y Despliegue
## Plataforma Web - Red Científica Boliviana (Fase 2 MVP)

Este manual describe los procedimientos operativos para la administración de contenidos, moderación de perfiles, configuración de infraestructura y despliegue en producción.

---

### 1. Variables de Entorno

Para conectar la aplicación con Supabase en producción o en un entorno de pruebas propio, crea un archivo `.env.local` con las siguientes variables:

```bash
# URL del proyecto en Supabase (Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co

# Llave anónima pública de Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-llave-anonima-publica
```

> **Nota para desarrollo local / Codespaces:** Si no se suministran estas variables, la aplicación conmuta automáticamente a **Modo Emulación Local**, permitiendo probar inicios de sesión, guardado de perfiles e instituciones utilizando `localStorage` sin romper la interfaz ni requerir servicios externos.

---

### 2. Ejecución de Migraciones de Base de Datos en Supabase

Para inicializar o actualizar la base de datos de producción en Supabase:

1. Ingresa a la consola web de Supabase: [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Selecciona tu proyecto y abre el **SQL Editor** en la barra lateral.
3. Ejecuta en orden los scripts contenidos en `supabase/migrations/`:
   * **Paso 1:** [`01_initial_schema.sql`](../supabase/migrations/01_initial_schema.sql) (Tablas base, triggers de auth y políticas RLS iniciales).
   * **Paso 2:** [`02_institutions_admin.sql`](../supabase/migrations/02_institutions_admin.sql) (Campos institucionales y RLS de administración).
4. Opcionalmente, ejecuta [`seed.sql`](../supabase/seed.sql) para cargar datos de demostración y científicos aliados iniciales (ej. Julio Chávez, UMSS, UMSA).

---

### 3. Manual de Moderación y Administración

Los coordinadores de la Red Científica Boliviana tienen control sobre los registros mediante las siguientes directrices:

#### A. Aprobación de Perfiles de Científicos
1. Cuando un investigador se registra y completa su perfil marcando "Hacer público mi perfil", su estado inicial es `moderation_status = 'pending'`.
2. Para autorizar su publicación en el Directorio:
   * En el Table Editor de Supabase (`profiles`), verifica que el nombre, filiación y ORCID sean legítimos.
   * Cambia el valor de `moderation_status` de `'pending'` a `'approved'`.
   * En caso de requerir correcciones, asigna `'rejected'` o comunícate vía correo.

#### B. Aprobación de Instituciones Aliadas
1. Cuando se propone una institución mediante el botón "+ Registrar Institución Aliada":
   * En la tabla `institutions`, verifica que el sitio web oficial y el correo de contacto pertenezcan a la entidad.
   * Cambia `moderation_status` a `'approved'`.

#### C. Publicación de Actividades y Charlas
1. Inserta o edita actividades en la tabla `activities` asignando `published = true`.
2. Las actividades con fecha pasada se clasificarán automáticamente en la sección "Actividades pasadas" del calendario, permitiendo enlazar la grabación en diferido.

---

### 4. Guía de Despliegue en Producción

#### Opción A: GitHub Pages (CI/CD Automatizado)
El repositorio cuenta con una acción de GitHub Actions en `.github/workflows/deploy-pages.yml`:
1. Todo `push` a la rama `main` o `fase-2` ejecuta automáticamente:
   * Instalación limpia (`npm ci`).
   * Compilación y exportación estática (`npm run build`).
   * Creación del archivo `.nojekyll`.
   * Publicación del directorio `out/` en el entorno de GitHub Pages.
2. El dominio institucional se gestiona a través del archivo `CNAME` en la raíz del repositorio.

#### Opción B: Vercel (Recomendado para escalabilidad dinámica)
1. Conecta el repositorio de GitHub en el panel de Vercel.
2. Vercel detectará Next.js automáticamente con configuración zero-config.
3. En **Environment Variables**, añade:
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Cada push generará despliegues de vista previa (*Preview Deployments*) y la rama principal se desplegará en Producción.

---

### 5. Comandos de Mantenimiento

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar proyecto y validar tipos TypeScript
npm run build

# Exportar datos CSV a JSON de demostración
npm run build:data
```
