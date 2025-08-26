# Calculadoras CSW - Repositorio Principal

Este repositorio contiene dos calculadoras de ingeniería civil desarrolladas por CSW Ingeniería Civil:

## 📁 Estructura del Proyecto

```
calculadoras_CSW/
├── balasto-calculator/     # Calculadora de Coeficiente de Balasto
├── steel-calculator/       # Calculadora de Acero Estructural
├── .gitignore             # Archivos a ignorar por Git
└── README.md              # Este archivo
```

## 🚀 Calculadoras Disponibles

### 1. Calculadora de Coeficiente de Balasto
- **Ubicación**: `balasto-calculator/`
- **Función**: Cálculo del coeficiente de balasto basado en teorías de Terzaghi
- **Tecnología**: Next.js 14, TypeScript, Tailwind CSS
- **URL de Producción**: https://balasto.cswingenieriacivil.com

### 2. Calculadora de Acero Estructural
- **Ubicación**: `steel-calculator/`
- **Función**: Diseño y cálculo de acero estructural
- **Tecnología**: Next.js 14, TypeScript, Tailwind CSS
- **URL de Producción**: https://steelcalculator.cswingenieriacivil.com

## 🛠️ Despliegue Independiente

Cada calculadora está configurada para ser desplegada de forma independiente:

### Opción 1: Despliegue desde este repositorio
1. Clona este repositorio
2. Navega a la carpeta de la calculadora deseada
3. Ejecuta `npm install` y `npm run build`
4. Despliega en Vercel o tu plataforma preferida

### Opción 2: Repositorios Separados (Recomendado)
1. Crea un nuevo repositorio en GitHub para cada calculadora
2. Copia solo la carpeta de la calculadora deseada
3. Haz commit y push del código
4. Conecta con Vercel para despliegue automático

## 📋 Requisitos del Sistema

- Node.js 18+ 
- npm o yarn
- Git

## 🔧 Instalación y Desarrollo

### Para cada calculadora individual:

```bash
cd [nombre-calculadora]
npm install
npm run dev
```

### Build para producción:

```bash
npm run build
npm start
```

## 🌐 URLs de Producción

- **Balasto Calculator**: https://balasto.cswingenieriacivil.com
- **Steel Calculator**: https://steelcalculator.cswingenieriacivil.com

## 📝 Notas Importantes

- Cada calculadora es completamente independiente
- No hay dependencias compartidas entre calculadoras
- Cada una tiene su propio `package.json` y configuración
- Optimizadas para SEO y rendimiento
- Sin publicidad ni tracking externo

## 🤝 Contribución

Para contribuir a una calculadora específica, por favor:
1. Identifica la calculadora en la que quieres trabajar
2. Crea un issue describiendo tu propuesta
3. Haz fork del repositorio correspondiente
4. Envía un pull request

## 📞 Contacto

**CSW Ingeniería Civil**
- Sitio web: https://cswingenieriacivil.com
- Email: contacto@cswingenieriacivil.com

---

*Desarrollado con ❤️ por el equipo de CSW Ingeniería Civil*
