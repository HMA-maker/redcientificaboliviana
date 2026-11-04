#!/bin/bash
set -e

echo "==> [Codespaces] Configurando entorno y base de datos para Red Científica Boliviana..."

# 1. Configurar archivo de variables de entorno si no existe
if [ ! -f .env.local ] && [ -f .env.example ]; then
  echo "==> [Codespaces] Creando .env.local a partir de plantilla .env.example..."
  cp .env.example .env.local
fi

# 2. Instalar PostgreSQL si no está presente
if ! command -v psql &> /dev/null; then
  echo "==> [DB] Instalando paquetes de PostgreSQL..."
  sudo apt-get update -qq
  sudo apt-get install -y -qq postgresql postgresql-contrib
fi

# 3. Asegurar que el servicio de PostgreSQL esté activo
echo "==> [DB] Iniciando servicio PostgreSQL local..."
sudo service postgresql start

# 4. Configurar usuario y base de datos
echo "==> [DB] Verificando usuario y base de datos 'redcientifica'..."
sudo -u postgres psql -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres'; ELSE ALTER USER postgres WITH PASSWORD 'postgres'; END IF; END \$\$;" > /dev/null 2>&1
sudo -u postgres psql -c "SELECT 'CREATE DATABASE redcientifica' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'redcientifica')\gexec" > /dev/null 2>&1

# 5. Ejecutar todas las migraciones en orden correlativo (PB-03, PB-10, etc.)
echo "==> [DB] Aplicando migraciones de esquema en 'supabase/migrations/'..."
for migration_file in $(ls -1 supabase/migrations/*.sql | sort); do
  echo "    -> Ejecutando: $migration_file"
  sudo -u postgres psql -d redcientifica -f "$migration_file" > /dev/null 2>&1
done

# 6. Cargar datos semilla
if [ -f supabase/seed.sql ]; then
  echo "==> [DB] Cargando datos semilla iniciales ('supabase/seed.sql')..."
  sudo -u postgres psql -d redcientifica -f supabase/seed.sql > /dev/null 2>&1
fi

# 7. Resumen de verificación
echo "==> [Codespaces] Estado de la Base de Datos Local:"
sudo -u postgres psql -d redcientifica -c "SELECT 'profiles' as tabla, count(*) as total FROM public.profiles UNION ALL SELECT 'institutions', count(*) FROM public.institutions UNION ALL SELECT 'activities', count(*) FROM public.activities;" || true

echo "==> [Codespaces] Entorno preparado con éxito."
echo "==> Para iniciar la plataforma ejecuta: npm run dev"
