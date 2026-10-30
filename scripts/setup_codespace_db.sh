#!/bin/bash
set -e

echo "==> [DB] Configurando PostgreSQL local para Red Científica Boliviana..."

# Instalar PostgreSQL si no está presente
if ! command -v psql &> /dev/null; then
  echo "==> [DB] Instalando paquetes de PostgreSQL..."
  sudo apt-get update -qq
  sudo apt-get install -y -qq postgresql postgresql-contrib
fi

# Asegurar que el servicio esté corriendo
echo "==> [DB] Iniciando servicio PostgreSQL..."
sudo service postgresql start

# Configurar usuario y base de datos
echo "==> [DB] Verificando usuario y base de datos 'redcientifica'..."
sudo -u postgres psql -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'postgres') THEN CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres'; ELSE ALTER USER postgres WITH PASSWORD 'postgres'; END IF; END \$\$;" > /dev/null 2>&1
sudo -u postgres psql -c "SELECT 'CREATE DATABASE redcientifica' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'redcientifica')\gexec" > /dev/null 2>&1

# Ejecutar migraciones y datos semilla
echo "==> [DB] Aplicando esquema de tablas..."
sudo -u postgres psql -d redcientifica -f supabase/migrations/01_initial_schema.sql > /dev/null 2>&1

echo "==> [DB] Cargando datos semilla iniciales..."
sudo -u postgres psql -d redcientifica -f supabase/seed.sql > /dev/null 2>&1

echo "==> [DB] PostgreSQL local listo y conectado (puerto 5432)."
