#!/bin/bash
set -e

echo "🏁 =========================================="
echo "   Iniciando despliegue de LSA Live Timing   "
echo "=========================================="

# 1. Asegurar últimas actualizaciones
echo "📥 Descargando cambios de Git..."
git pull origin main

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 3. Compilar TypeScript
echo "🔨 Compilando proyecto..."
npm run build

# 4. Iniciar o reiniciar con PM2
echo "🔄 Reiniciando servicio con PM2..."
if pm2 describe lsa-live-timing > /dev/null 2>&1; then
    pm2 restart lsa-live-timing
else
    pm2 start ecosystem.config.cjs
fi

pm2 save

echo "✅ =========================================="
echo "   ¡Despliegue completado con éxito!        "
echo "=========================================="
