#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Obtener el nombre del proyecto desde variables de entorno
const projectName = process.env.VERCEL_PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME;

console.log(`Configurando proyecto: ${projectName}`);

// Configuraciones específicas por proyecto
const projectConfigs = {
  'steel-calculator': {
    redirect: '/steel-calculator',
    description: 'Calculadora de Acero',
    vercelConfig: 'vercel-steel-only.json'
  },
  'balasto-calculator': {
    redirect: '/balasto-calculator',
    description: 'Calculadora de Balasto',
    vercelConfig: 'vercel-balasto-only.json'
  },
  'beam-calculator': {
    redirect: '/vigas/simplemente-apoyadas/carga-uniforme',
    description: 'Calculadora de Vigas',
    vercelConfig: 'vercel-beam-only.json'
  }
};

// Obtener configuración del proyecto
const config = projectConfigs[projectName] || projectConfigs['steel-calculator'];

console.log(`Redirigiendo a: ${config.redirect}`);
console.log(`Descripción: ${config.description}`);
console.log(`Usando configuración: ${config.vercelConfig}`);

// Copiar la configuración específica de Vercel
const sourceConfig = path.join(__dirname, '..', config.vercelConfig);
const targetConfig = path.join(__dirname, '..', 'vercel.json');

if (fs.existsSync(sourceConfig)) {
  fs.copyFileSync(sourceConfig, targetConfig);
  console.log(`Configuración copiada: ${sourceConfig} → ${targetConfig}`);
} else {
  console.log(`Advertencia: No se encontró ${sourceConfig}`);
}

// Crear archivo de configuración temporal
const configFile = path.join(__dirname, '..', 'project-config.json');
fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

console.log('Configuración completada'); 