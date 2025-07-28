#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Configurando proyecto: beam-calculator');

// Copiar la configuración específica de Vercel para beam
const sourceConfig = path.join(__dirname, '..', 'vercel-beam-only.json');
const targetConfig = path.join(__dirname, '..', 'vercel.json');

if (fs.existsSync(sourceConfig)) {
  fs.copyFileSync(sourceConfig, targetConfig);
  console.log(`Configuración copiada: ${sourceConfig} → ${targetConfig}`);
} else {
  console.log(`Error: No se encontró ${sourceConfig}`);
  process.exit(1);
}

console.log('Configuración de beam completada'); 