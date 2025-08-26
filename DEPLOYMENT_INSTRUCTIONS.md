# 📋 Instrucciones de Despliegue - Calculadoras CSW

## 🎯 Objetivo

Este documento explica cómo desplegar cada calculadora de forma independiente, ya sea desde este repositorio principal o creando repositorios separados en GitHub.

## 🚀 Opción 1: Despliegue desde este repositorio

### Requisitos Previos
- Node.js 18+ instalado
- Git configurado
- Cuenta en Vercel (opcional, para despliegue automático)

### Pasos para desplegar una calculadora específica:

#### 1. Balasto Calculator
```bash
# Navegar a la carpeta de la calculadora
cd balasto-calculator

# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Ejecutar en modo desarrollo (opcional)
npm run dev
```

#### 2. Steel Calculator
```bash
# Navegar a la carpeta de la calculadora
cd steel-calculator

# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Ejecutar en modo desarrollo (opcional)
npm run dev
```

### Despliegue en Vercel

#### Método 1: Vercel CLI
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Navegar a la calculadora deseada
cd [balasto-calculator|steel-calculator]

# Desplegar
vercel --prod
```

#### Método 2: Vercel Dashboard
1. Conecta tu repositorio de GitHub a Vercel
2. Configura el directorio raíz como la carpeta de la calculadora
3. Vercel detectará automáticamente que es un proyecto Next.js

## 🌟 Opción 2: Repositorios Separados (Recomendado)

### Ventajas:
- ✅ Mejor organización del código
- ✅ Despliegues independientes
- ✅ Mantenimiento más fácil
- ✅ URLs personalizadas por calculadora

### Pasos para crear repositorios separados:

#### 1. Crear repositorio para Balasto Calculator
```bash
# Crear nuevo repositorio en GitHub: balasto-calculator
# Clonar el repositorio vacío
git clone https://github.com/[usuario]/balasto-calculator.git
cd balasto-calculator

# Copiar solo la carpeta balasto-calculator
cp -r ../calculadoras_CSW/balasto-calculator/* .

# Hacer commit inicial
git add .
git commit -m "Initial commit: Balasto Calculator"
git push origin main
```

#### 2. Crear repositorio para Steel Calculator
```bash
# Crear nuevo repositorio en GitHub: steel-calculator
# Clonar el repositorio vacío
git clone https://github.com/[usuario]/steel-calculator.git
cd steel-calculator

# Copiar solo la carpeta steel-calculator
cp -r ../calculadoras_CSW/steel-calculator/* .

# Hacer commit inicial
git add .
git commit -m "Initial commit: Steel Calculator"
git push origin main
```

### Configuración de Vercel para repositorios separados:

1. **Conectar repositorio**: En Vercel, conecta cada repositorio
2. **Configurar dominio**: Cada calculadora puede tener su propio dominio
3. **Variables de entorno**: Configurar según sea necesario
4. **Despliegue automático**: Cada push a main desplegará automáticamente

## 🔧 Configuración de Dominios

### Balasto Calculator
- **Dominio principal**: `balasto.cswingenieriacivil.com`
- **Subdominio alternativo**: `balasto.vercel.app`

### Steel Calculator
- **Dominio principal**: `steelcalculator.cswingenieriacivil.com`
- **Subdominio alternativo**: `steel.vercel.app`

## 📱 Verificación del Despliegue

### Checklist de verificación:
- [ ] La aplicación se carga correctamente
- [ ] Los cálculos funcionan como esperado
- [ ] La interfaz es responsive
- [ ] No hay errores en la consola del navegador
- [ ] Los metadatos SEO están configurados correctamente
- [ ] El favicon se muestra correctamente

### Comandos de verificación:
```bash
# Verificar que el build es exitoso
npm run build

# Verificar que no hay errores de linting
npm run lint

# Verificar que la aplicación inicia correctamente
npm start
```

## 🚨 Solución de Problemas Comunes

### Error: "Module not found"
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Build failed"
```bash
# Verificar versión de Node.js (debe ser 18+)
node --version

# Verificar que todas las dependencias están instaladas
npm install

# Verificar configuración de TypeScript
npx tsc --noEmit
```

### Error: "Vercel deployment failed"
```bash
# Verificar que el build local funciona
npm run build

# Verificar configuración de vercel.json
# Verificar que no hay archivos .env necesarios
```

## 📞 Soporte

Si encuentras problemas durante el despliegue:

1. **Revisar logs**: Los logs de Vercel proporcionan información detallada
2. **Verificar configuración**: Asegúrate de que vercel.json esté configurado correctamente
3. **Contactar soporte**: Para problemas específicos de Vercel, contacta su soporte
4. **Issues de GitHub**: Crea un issue en el repositorio correspondiente

## 🔄 Actualizaciones

### Para mantener las calculadoras actualizadas:

1. **Pull de cambios**: `git pull origin main`
2. **Instalar dependencias**: `npm install`
3. **Verificar cambios**: `npm run dev`
4. **Build y deploy**: `npm run build` + `vercel --prod`

---

*Última actualización: $(Get-Date)*
