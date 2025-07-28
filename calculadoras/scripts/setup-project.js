#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Métodos para detectar el proyecto
const getProjectName = () => {
  // 1. Variable de entorno específica de Vercel
  if (process.env.VERCEL_PROJECT_NAME) {
    return process.env.VERCEL_PROJECT_NAME;
  }
  
  // 2. Variable de entorno personalizada
  if (process.env.NEXT_PUBLIC_PROJECT_NAME) {
    return process.env.NEXT_PUBLIC_PROJECT_NAME;
  }
  
  // 3. Detectar por dominio (si está disponible)
  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL;
    if (url.includes('steelcalculator')) return 'steel-calculator';
    if (url.includes('balasto')) return 'balasto-calculator';
    if (url.includes('beam')) return 'beam-calculator';
  }
  
  // 4. Detectar por branch/commit
  if (process.env.VERCEL_GIT_COMMIT_REF) {
    const branch = process.env.VERCEL_GIT_COMMIT_REF;
    if (branch.includes('steel')) return 'steel-calculator';
    if (branch.includes('balasto')) return 'balasto-calculator';
    if (branch.includes('beam')) return 'beam-calculator';
  }
  
  // 5. Fallback: leer de archivo de configuración
  try {
    const configPath = path.join(__dirname, '..', 'project-config.json');
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.projectName || 'steel-calculator';
    }
  } catch (error) {
    console.log('No se pudo leer project-config.json');
  }
  
  // 6. Default
  return 'steel-calculator';
};

const projectName = getProjectName();

console.log(`🔍 Detectando proyecto...`);
console.log(`📋 Variables de entorno disponibles:`);
console.log(`   VERCEL_PROJECT_NAME: ${process.env.VERCEL_PROJECT_NAME || 'no disponible'}`);
console.log(`   NEXT_PUBLIC_PROJECT_NAME: ${process.env.NEXT_PUBLIC_PROJECT_NAME || 'no disponible'}`);
console.log(`   VERCEL_URL: ${process.env.VERCEL_URL || 'no disponible'}`);
console.log(`   VERCEL_GIT_COMMIT_REF: ${process.env.VERCEL_GIT_COMMIT_REF || 'no disponible'}`);
console.log(`🎯 Proyecto detectado: ${projectName}`);

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

console.log(`📁 Redirigiendo a: ${config.redirect}`);
console.log(`📝 Descripción: ${config.description}`);
console.log(`⚙️ Usando configuración: ${config.vercelConfig}`);

// Copiar la configuración específica de Vercel
const sourceConfig = path.join(__dirname, '..', config.vercelConfig);
const targetConfig = path.join(__dirname, '..', 'vercel.json');

if (fs.existsSync(sourceConfig)) {
  fs.copyFileSync(sourceConfig, targetConfig);
  console.log(`✅ Configuración copiada: ${sourceConfig} → ${targetConfig}`);
} else {
  console.log(`❌ Error: No se encontró ${sourceConfig}`);
  process.exit(1);
}

// Crear archivo de configuración temporal con información del proyecto
const configFile = path.join(__dirname, '..', 'project-config.json');
const projectInfo = {
  projectName,
  redirect: config.redirect,
  description: config.description,
  vercelConfig: config.vercelConfig,
  timestamp: new Date().toISOString(),
  environment: {
    VERCEL_PROJECT_NAME: process.env.VERCEL_PROJECT_NAME,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF
  }
};

fs.writeFileSync(configFile, JSON.stringify(projectInfo, null, 2));
console.log(`💾 Configuración guardada en: ${configFile}`);

console.log('🎉 Configuración completada exitosamente'); 