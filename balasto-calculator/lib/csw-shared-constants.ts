/**
 * 🔧 CONSTANTES COMPARTIDAS CSW - TODAS LAS APLICACIONES
 * 
 * Este archivo contiene todas las constantes que deben ser idénticas
 * en todas las aplicaciones CSW para mantener consistencia.
 */

// ============================================================================
// 🏢 CONFIGURACIÓN DE LA EMPRESA
// ============================================================================
export const CSW_COMPANY_CONFIG = {
  name: 'CSW Ingeniería Civil',
  company: 'CSW Ingeniería Civil',
  website: 'https://www.cswingenieriacivil.com',
  email: 'contacto@cswingenieriacivil.com',
  toolsUrl: 'https://www.cswingenieriacivil.com/herramientas',
  copyrightMessage: '© CSW Ingeniería Civil. Todos los derechos reservados.',
  description: 'Empresa especializada en ingeniería civil y estructural',
};

// ============================================================================
// 🌐 ENLACES EXTERNOS
// ============================================================================
export const CSW_EXTERNAL_LINKS = {
  website: 'https://www.cswingenieriacivil.com',
  tools: 'https://www.cswingenieriacivil.com/herramientas',
  contact: 'https://www.cswingenieriacivil.com/contacto',
  about: 'https://www.cswingenieriacivil.com/nosotros',
  services: 'https://www.cswingenieriacivil.com/servicios',
  blog: 'https://www.cswingenieriacivil.com/blog',
  
  // Redes sociales
  linkedin: 'https://www.linkedin.com/company/csw-ingeniería-civil',
  instagram: 'https://www.instagram.com/cswingenieriacivil',
  facebook: 'https://www.facebook.com/cswingenieriacivil',
  twitter: 'https://twitter.com/cswingenieria',
  youtube: 'https://www.youtube.com/@cswingenieriacivil',
  
  // Donaciones
  cafecito: 'https://cafecito.app/cswingenieriacivil',
  paypal: 'https://www.paypal.com/paypalme/cswingenieriacivil/2',
};

// ============================================================================
// 🎨 CONFIGURACIÓN DE MARCA
// ============================================================================
export const CSW_BRAND_CONFIG = {
  // Colores principales
  primaryColor: '#f8b133',
  primaryHoverColor: '#e6a030',
  primaryLightColor: '#f1d475',
  
  // Logo y assets
  logoPath: '/negrologotij.png',
  logoAlt: 'CSW Ingeniería Civil',
  
  // Favicon
  faviconPath: '/favicon.ico',
  
  // Imágenes sociales
  socialImages: {
    linkedin: '/naranjalinktij.png',
    instagram: '/naranjainsttij.png',
    facebook: '/naranjainsttij.png',
  },
};

// ============================================================================
// 📱 CONFIGURACIÓN DE SEO
// ============================================================================
export const CSW_SEO_CONFIG = {
  // Meta tags comunes
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  language: 'es',
  
  // Open Graph
  ogType: 'website',
  ogLocale: 'es_ES',
  ogSiteName: 'CSW Ingeniería Civil',
  
  // Twitter Cards
  twitterCard: 'summary_large_image',
  twitterSite: '@cswingenieria',
  
  // Robots
  robots: 'index, follow',
  googleBot: 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
};

// ============================================================================
// 🔧 CONFIGURACIÓN TÉCNICA
// ============================================================================
export const CSW_TECH_CONFIG = {
  // Framework
  framework: 'Next.js 15',
  language: 'TypeScript',
  styling: 'Tailwind CSS',
  
  // Deployment
  deployment: 'Vercel',
  domain: 'cswingenieriacivil.com',
  
  // Analytics
  googleAnalytics: 'G-XXXXXXXXXX',
  googleSearchConsole: 'your-google-verification-code',
};

// ============================================================================
// 📊 CONFIGURACIÓN DE APLICACIONES
// ============================================================================
export const CSW_APPS_CONFIG = {
  // Aplicaciones existentes
  balasto: {
    name: 'Calculadora de Coeficiente de Balasto',
    path: '/balasto-calculator',
    domain: 'balasto.cswingenieriacivil.com',
    description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
  },
  steel: {
    name: 'Calculadora de Acero Estructural',
    path: '/steel-calculator',
    domain: 'steelcalculator.cswingenieriacivil.com',
    description: 'Calculadora especializada para diseño de acero estructural',
  },
  beam: {
    name: 'Calculadora de Vigas',
    path: '/beam-calculator',
    domain: 'beam.cswingenieriacivil.com',
    description: 'Calculadora para análisis de vigas y elementos estructurales',
  },
  asSlab: {
    name: 'Calculadora de Losas',
    path: '/as-slab-calculator',
    domain: 'slab.cswingenieriacivil.com',
    description: 'Calculadora para diseño de losas de concreto armado',
  },
};

// ============================================================================
// 🎯 CONFIGURACIÓN DE COMPONENTES
// ============================================================================
export const CSW_COMPONENT_CONFIG = {
  // Header
  header: {
    maxWidth: 'max-w-4xl',
    padding: 'px-6 py-4',
    shadow: 'shadow-sm',
    border: 'border-b border-gray-200',
  },
  
  // Footer
  footer: {
    maxWidth: 'max-w-4xl',
    padding: 'px-6 py-4',
    background: 'bg-gray-50',
    border: 'border-t border-gray-200',
  },
  
  // Contenido principal
  main: {
    maxWidth: 'max-w-3xl',
    padding: 'px-4 py-4',
    spacing: 'space-y-6',
  },
  
  // Secciones
  section: {
    background: 'bg-white',
    padding: 'p-4',
    borderRadius: 'rounded-lg',
    border: 'border',
    spacing: 'space-y-4',
  },
};

// ============================================================================
// 📱 CONFIGURACIÓN RESPONSIVE
// ============================================================================
export const CSW_RESPONSIVE_CONFIG = {
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Grid responsive
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
  
  // Espaciado responsive
  spacing: {
    mobile: 'px-4 py-4',
    tablet: 'px-6 py-6',
    desktop: 'px-8 py-8',
  },
};

// ============================================================================
// 🎨 CONFIGURACIÓN DE ESTILOS
// ============================================================================
export const CSW_STYLE_CONFIG = {
  // Tipografía
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Bordes y sombras
  borders: {
    radius: {
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    width: {
      thin: '1px',
      base: '2px',
      thick: '4px',
    },
  },
  
  // Transiciones
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ============================================================================
// 🚀 GUÍA DE IMPLEMENTACIÓN RÁPIDA
// ============================================================================
export const CSW_QUICK_START = `
🚀 IMPLEMENTACIÓN RÁPIDA PARA NUEVA APLICACIÓN CSW:

1. 📁 COPIAR ARCHIVOS:
   - components/shared/DesignSystem.tsx
   - lib/csw-shared-constants.ts (este archivo)
   - components/Header.tsx
   - components/Footer.tsx

2. 🔧 CONFIGURAR:
   - Actualizar CSW_APPS_CONFIG con la nueva app
   - Configurar dominio en vercel.json
   - Actualizar constantes específicas de la app

3. 🎨 IMPLEMENTAR:
   - Usar CSWMainContainer como contenedor principal
   - Usar CSWSection para cada sección
   - Usar CSWButton para botones principales
   - Seguir paleta de colores CSW_COLORS

4. 📱 RESPONSIVE:
   - Usar grid responsive predefinido
   - Seguir breakpoints establecidos
   - Mantener espaciado consistente

5. ✅ VERIFICAR:
   - Header y Footer idénticos
   - Colores y espaciado consistentes
   - Responsive design funcionando
   - SEO configurado correctamente
`;

export default {
  CSW_COMPANY_CONFIG,
  CSW_EXTERNAL_LINKS,
  CSW_BRAND_CONFIG,
  CSW_SEO_CONFIG,
  CSW_TECH_CONFIG,
  CSW_APPS_CONFIG,
  CSW_COMPONENT_CONFIG,
  CSW_RESPONSIVE_CONFIG,
  CSW_STYLE_CONFIG,
  CSW_QUICK_START,
};
