#!/bin/bash

# Script de build para proyecto balasto-calculator
echo "Configurando proyecto balasto-calculator..."

# Copiar configuración específica de balasto
cp vercel-balasto.json vercel.json

# Copiar página principal específica de balasto
cp app/page-balasto.tsx app/page.tsx

# Ejecutar build normal
npm run build 