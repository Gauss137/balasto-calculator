/**
 * 🎨 SISTEMA DE DISEÑO CSW - COMPONENTES COMPARTIDOS
 * 
 * Este archivo documenta todos los patrones de diseño, colores, espaciados
 * y estructura utilizados en las aplicaciones CSW para mantener consistencia.
 * 
 * USO: Copiar este archivo y las constantes a cada nueva aplicación
 */

import React from 'react';

// ============================================================================
// 🎨 PALETA DE COLORES
// ============================================================================
export const CSW_COLORS = {
  // Colores principales de marca
  primary: '#f8b133',        // Naranja CSW principal
  primaryHover: '#e6a030',   // Naranja CSW hover
  primaryLight: '#f1d475',   // Naranja CSW claro
  
  // Colores de texto
  textPrimary: '#111827',    // text-gray-900
  textSecondary: '#374151',  // text-gray-700
  textTertiary: '#6b7280',  // text-gray-500
  textQuaternary: '#9ca3af', // text-gray-400
  
  // Colores de fondo
  backgroundPrimary: '#ffffff',   // bg-white
  backgroundSecondary: '#f9fafb', // bg-gray-50
  backgroundTertiary: '#f3f4f6', // bg-gray-100
  
  // Colores de bordes
  borderPrimary: '#e5e7eb',      // border-gray-200
  borderSecondary: '#d1d5db',    // border-gray-300
  borderAccent: '#f8b133',       // border-[#f8b133]
  
  // Colores de estado
  success: {
    light: '#f0fdf4',      // bg-green-50
    border: '#bbf7d0',     // border-green-200
    text: '#166534',       // text-green-800
    textLight: '#15803d',  // text-green-700
  },
  warning: {
    light: '#fffbeb',      // bg-yellow-50
    border: '#fde68a',     // border-yellow-200
    text: '#92400e',       // text-yellow-800
  },
  info: {
    light: '#eff6ff',      // bg-blue-50
    border: '#bfdbfe',     // border-blue-200
    text: '#1e40af',       // text-blue-800
  }
};

// ============================================================================
// 📏 SISTEMA DE ESPACIADO
// ============================================================================
export const CSW_SPACING = {
  // Espaciado vertical entre secciones
  sectionGap: 'space-y-6',        // 1.5rem (24px)
  sectionGapSmall: 'space-y-4',   // 1rem (16px)
  sectionGapLarge: 'space-y-8',   // 2rem (32px)
  
  // Padding de contenedores
  containerPadding: 'p-4',        // 1rem (16px)
  containerPaddingLarge: 'p-6',   // 1.5rem (24px)
  
  // Márgenes
  marginTop: 'mt-6',              // 1.5rem (24px)
  marginBottom: 'mb-4',           // 1rem (16px)
  
  // Gap entre elementos en grid
  gridGap: 'gap-4',               // 1rem (16px)
  gridGapSmall: 'gap-2',          // 0.5rem (8px)
  gridGapLarge: 'gap-6',          // 1.5rem (24px)
};

// ============================================================================
// 🏗️ ESTRUCTURA DE LAYOUT
// ============================================================================
export const CSW_LAYOUT = {
  // Contenedor principal
  mainContainer: 'max-w-3xl mx-auto space-y-6 px-4 py-4',
  
  // Header
  header: 'w-full bg-white shadow-sm border-b border-gray-200',
  headerContent: 'max-w-4xl mx-auto flex items-center justify-between px-6 py-4',
  
  // Footer
  footer: 'w-full bg-gray-50 py-4 mt-4 border-t border-gray-200',
  footerContent: 'max-w-4xl mx-auto px-6 text-center text-sm text-gray-600',
  
  // Secciones de contenido
  section: 'bg-white p-4 rounded-lg border',
  sectionTitle: 'text-lg font-semibold mb-4 text-gray-800',
  
  // Grid layouts
  gridCols1: 'grid grid-cols-1',
  gridCols2: 'grid grid-cols-2',
  gridCols3: 'grid grid-cols-3',
  gridCols1Md2: 'grid grid-cols-1 md:grid-cols-2',
  gridCols1Md3: 'grid grid-cols-1 md:grid-cols-3',
  gridCols2Md4: 'grid grid-cols-2 md:grid-cols-4',
};

// ============================================================================
// 🔤 TIPOGRAFÍA
// ============================================================================
export const CSW_TYPOGRAPHY = {
  // Títulos principales
  h1: 'text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1',
  h2: 'text-2xl font-bold text-gray-800',
  h3: 'text-lg font-semibold text-gray-800',
  
  // Texto de contenido
  body: 'text-gray-600',
  bodySmall: 'text-sm text-gray-600',
  bodyTiny: 'text-xs text-gray-500',
  
  // Texto de estado
  success: 'text-green-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800',
};

// ============================================================================
// 🎯 COMPONENTES REUTILIZABLES
// ============================================================================

// Botón principal CSW
export const CSWButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      w-full max-w-xs h-11 px-8 
      bg-[#f8b133] text-white 
      border border-gray-800 
      hover:bg-[#e6a030] 
      transition rounded-md 
      font-medium 
      flex items-center justify-center gap-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
  >
    {children}
  </button>
);

// Botón outline CSW
export const CSWButtonOutline: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, onClick, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        variant="outline"
        ${sizeClasses[size]}
        border border-gray-300 
        text-gray-700 
        hover:bg-gray-50 
        transition rounded-md 
        font-medium
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// Sección de contenido CSW
export const CSWSection: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => (
  <div className={`${CSW_LAYOUT.section} ${className}`}>
    <h3 className={CSW_LAYOUT.sectionTitle}>{title}</h3>
    {children}
  </div>
);

// Contenedor principal CSW
export const CSWMainContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`${CSW_LAYOUT.mainContainer} ${className}`}>
    {children}
  </div>
);

// Header CSW
export const CSWHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <header className={`${CSW_LAYOUT.header} ${className}`}>
    <nav className={CSW_LAYOUT.headerContent}>
      {children}
    </nav>
  </header>
);

// Footer CSW
export const CSWFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <footer className={`${CSW_LAYOUT.footer} ${className}`}>
    <div className={CSW_LAYOUT.footerContent}>
      {children}
    </div>
  </footer>
);

// ============================================================================
// 📱 RESPONSIVE DESIGN
// ============================================================================
export const CSW_RESPONSIVE = {
  // Breakpoints
  mobile: 'max-w-sm',
  tablet: 'max-w-md',
  desktop: 'max-w-lg',
  wide: 'max-w-xl',
  extraWide: 'max-w-2xl',
  fullWidth: 'max-w-3xl',
  
  // Grid responsive
  gridResponsive: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-2',
    cols3: 'grid-cols-3',
    cols4: 'grid-cols-4',
    mdCols2: 'md:grid-cols-2',
    mdCols3: 'md:grid-cols-3',
    mdCols4: 'md:grid-cols-4',
  },
  
  // Espaciado responsive
  spacing: {
    mobile: 'px-4 py-4',
    tablet: 'px-6 py-6',
    desktop: 'px-8 py-8',
  }
};

// ============================================================================
// 🎨 ESTILOS DE FORMULARIOS
// ============================================================================
export const CSW_FORM_STYLES = {
  // Input
  input: 'w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]',
  
  // Select
  select: 'w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]',
  
  // Label
  label: 'block text-sm font-medium text-gray-700 mb-1',
  
  // Input group
  inputGroup: 'space-y-2',
  
  // Input disabled
  inputDisabled: 'bg-gray-100 cursor-not-allowed opacity-75',
};

// ============================================================================
// 📊 ESTILOS DE TABLAS
// ============================================================================
export const CSW_TABLE_STYLES = {
  // Tabla principal
  table: 'table-auto w-full border text-sm',
  
  // Encabezado
  thead: 'bg-gray-100',
  th: 'border px-2 py-2 text-center font-medium',
  
  // Celdas
  td: 'border px-2 py-2 text-center',
  tdBold: 'border px-2 py-2 text-center font-bold text-lg',
  
  // Tabla pequeña
  tableSmall: 'table-auto w-full border text-xs',
  thSmall: 'border px-2 py-1 align-middle text-center whitespace-normal break-words text-xs',
  tdSmall: 'border px-2 py-1',
};

// ============================================================================
// 🚀 GUÍA DE IMPLEMENTACIÓN
// ============================================================================
export const CSW_IMPLEMENTATION_GUIDE = `
🎯 GUÍA DE IMPLEMENTACIÓN PARA NUEVAS APLICACIONES CSW:

1. 📁 ESTRUCTURA DE CARPETAS:
   - components/shared/DesignSystem.tsx (este archivo)
   - components/Header.tsx
   - components/Footer.tsx
   - lib/constants.ts
   - lib/utils.ts

2. 🎨 IMPLEMENTAR EN NUEVA APP:
   - Copiar este archivo a components/shared/
   - Importar y usar los componentes CSW
   - Seguir la paleta de colores definida
   - Usar el sistema de espaciado consistente

3. 🔧 COMPONENTES OBLIGATORIOS:
   - CSWHeader con logo y navegación
   - CSWFooter con enlaces sociales y legal
   - CSWMainContainer para el contenido principal
   - CSWSection para cada sección de contenido

4. 📱 RESPONSIVE:
   - Usar grid responsive predefinido
   - Seguir breakpoints establecidos
   - Mantener espaciado consistente en móvil

5. 🎨 COLORES:
   - Usar solo la paleta CSW_COLORS
   - Mantener consistencia en estados (success, warning, info)
   - Aplicar hover states consistentes

6. 📏 ESPACIADO:
   - Usar solo CSW_SPACING predefinido
   - Mantener jerarquía visual con espaciado
   - Seguir el sistema de gaps establecido
`;

export default {
  CSW_COLORS,
  CSW_SPACING,
  CSW_LAYOUT,
  CSW_TYPOGRAPHY,
  CSW_RESPONSIVE,
  CSW_FORM_STYLES,
  CSW_TABLE_STYLES,
  CSW_IMPLEMENTATION_GUIDE,
  // Componentes
  CSWButton,
  CSWButtonOutline,
  CSWSection,
  CSWMainContainer,
  CSWHeader,
  CSWFooter,
};
