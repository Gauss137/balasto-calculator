# 🎨 SISTEMA DE DISEÑO CSW - GUÍA COMPLETA

## 📋 Descripción

Este sistema de diseño garantiza la **consistencia visual y estructural** en todas las aplicaciones de CSW Ingeniería Civil. Proporciona componentes reutilizables, constantes compartidas y patrones de diseño estandarizados.

## 🚀 Implementación Rápida

### 1. Copiar Archivos Base
```bash
# En la nueva aplicación, crear:
components/shared/DesignSystem.tsx
lib/csw-shared-constants.ts
components/shared/AppTemplate.tsx
```

### 2. Importar Componentes
```tsx
import { 
  CSWMainContainer, 
  CSWSection, 
  CSWButton,
  CSW_COLORS,
  CSW_SPACING 
} from '@/components/shared/DesignSystem';
```

### 3. Usar Estructura Base
```tsx
export function NuevaCalculadora() {
  return (
    <CSWMainContainer>
      <CSWSection title="Datos de Entrada">
        {/* Contenido de la sección */}
      </CSWSection>
      
      <CSWButton onClick={calcular}>
        Calcular
      </CSWButton>
    </CSWMainContainer>
  );
}
```

## 🎨 Paleta de Colores

### Colores Principales
- **Primary**: `#f8b133` (Naranja CSW)
- **Primary Hover**: `#e6a030`
- **Primary Light**: `#f1d475`

### Colores de Texto
- **Primary**: `#111827` (text-gray-900)
- **Secondary**: `#374151` (text-gray-700)
- **Tertiary**: `#6b7280` (text-gray-500)

### Colores de Fondo
- **Primary**: `#ffffff` (bg-white)
- **Secondary**: `#f9fafb` (bg-gray-50)
- **Tertiary**: `#f3f4f6` (bg-gray-100)

### Estados
- **Success**: Verde (bg-green-50, border-green-200, text-green-800)
- **Warning**: Amarillo (bg-yellow-50, border-yellow-200, text-yellow-800)
- **Info**: Azul (bg-blue-50, border-blue-200, text-blue-800)

## 📏 Sistema de Espaciado

### Espaciado Vertical
- **Sección**: `space-y-6` (24px)
- **Sección Pequeña**: `space-y-4` (16px)
- **Sección Grande**: `space-y-8` (32px)

### Padding de Contenedores
- **Estándar**: `p-4` (16px)
- **Grande**: `p-6` (24px)

### Grid Gaps
- **Estándar**: `gap-4` (16px)
- **Pequeño**: `gap-2` (8px)
- **Grande**: `gap-6` (24px)

## 🏗️ Estructura de Layout

### Contenedor Principal
```tsx
<CSWMainContainer>
  {/* Contenido de la aplicación */}
</CSWMainContainer>
```

### Secciones de Contenido
```tsx
<CSWSection title="Título de la Sección">
  {/* Contenido de la sección */}
</CSWSection>
```

### Grid Responsive
```tsx
// 1 columna en móvil, 2 en tablet, 3 en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// 2 columnas en móvil, 4 en desktop
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
```

## 🔤 Tipografía

### Títulos
- **H1**: `text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133]`
- **H2**: `text-2xl font-bold text-gray-800`
- **H3**: `text-lg font-semibold text-gray-800`

### Texto de Contenido
- **Body**: `text-gray-600`
- **Small**: `text-sm text-gray-600`
- **Tiny**: `text-xs text-gray-500`

## 🎯 Componentes Reutilizables

### Botón Principal
```tsx
<CSWButton onClick={handleClick}>
  Texto del Botón
</CSWButton>
```

### Botón Outline
```tsx
<CSWButtonOutline onClick={handleClick} size="sm">
  Texto del Botón
</CSWButtonOutline>
```

### Sección
```tsx
<CSWSection title="Título de la Sección">
  {/* Contenido */}
</CSWSection>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 768px`
- **Desktop**: `768px - 1024px`
- **Wide**: `1024px - 1280px`

### Grid Responsive
```tsx
// Siempre usar grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Espaciado Responsive
```tsx
// Padding adaptativo
<div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
```

## 🎨 Estilos de Formularios

### Input
```tsx
<input
  className="w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]"
  // ... otros props
/>
```

### Select
```tsx
<select className="w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]">
  {/* opciones */}
</select>
```

### Label
```tsx
<label className="block text-sm font-medium text-gray-700 mb-1">
  Texto del Label
</label>
```

## 📊 Estilos de Tablas

### Tabla Principal
```tsx
<table className="table-auto w-full border text-sm">
  <thead className="bg-gray-100">
    <th className="border px-2 py-2 text-center font-medium">Encabezado</th>
  </thead>
  <tbody>
    <td className="border px-2 py-2 text-center">Dato</td>
  </tbody>
</table>
```

### Tabla Pequeña
```tsx
<table className="table-auto w-full border text-xs">
  <th className="border px-2 py-1 align-middle text-center whitespace-normal break-words text-xs">
    Encabezado
  </th>
  <td className="border px-2 py-1">Dato</td>
</table>
```

## 🔧 Configuración de Aplicaciones

### Actualizar Constantes
```tsx
// En csw-shared-constants.ts
export const CSW_APPS_CONFIG = {
  nuevaApp: {
    name: 'Nombre de la Nueva Calculadora',
    path: '/nueva-calculadora',
    domain: 'nueva.cswingenieriacivil.com',
    description: 'Descripción de la calculadora',
  },
  // ... otras apps
};
```

### Configurar Dominio
```json
// vercel.json
{
  "domains": ["nueva.cswingenieriacivil.com"]
}
```

## 📁 Estructura de Carpetas

```
nueva-aplicacion/
├── components/
│   ├── shared/
│   │   ├── DesignSystem.tsx      # Sistema de diseño
│   │   └── AppTemplate.tsx       # Plantilla base
│   ├── Header.tsx                # Header estándar CSW
│   ├── Footer.tsx                # Footer estándar CSW
│   └── NuevaCalculadora.tsx      # Componente principal
├── lib/
│   ├── csw-shared-constants.ts   # Constantes compartidas
│   └── constants.ts              # Constantes específicas
├── app/
│   └── nueva-calculadora/
│       └── page.tsx              # Página principal
└── vercel.json                   # Configuración de dominio
```

## ✅ Checklist de Implementación

### Estructura Base
- [ ] Copiar `DesignSystem.tsx` a `components/shared/`
- [ ] Copiar `csw-shared-constants.ts` a `lib/`
- [ ] Copiar `AppTemplate.tsx` a `components/shared/`
- [ ] Copiar `Header.tsx` y `Footer.tsx`

### Configuración
- [ ] Actualizar `CSW_APPS_CONFIG` con nueva app
- [ ] Configurar dominio en `vercel.json`
- [ ] Actualizar constantes específicas

### Implementación
- [ ] Usar `CSWMainContainer` como contenedor principal
- [ ] Usar `CSWSection` para cada sección
- [ ] Usar `CSWButton` para botones principales
- [ ] Seguir paleta de colores `CSW_COLORS`

### Responsive
- [ ] Usar grid responsive predefinido
- [ ] Seguir breakpoints establecidos
- [ ] Mantener espaciado consistente

### Verificación
- [ ] Header y Footer idénticos a otras apps
- [ ] Colores y espaciado consistentes
- [ ] Responsive design funcionando
- [ ] SEO configurado correctamente

## 🚨 Reglas Importantes

### ✅ HACER
- Usar **SIEMPRE** los componentes CSW
- Seguir la paleta de colores establecida
- Mantener espaciado consistente
- Implementar responsive design
- Usar constantes compartidas

### ❌ NO HACER
- Crear nuevos componentes sin consultar el sistema
- Usar colores fuera de la paleta CSW
- Cambiar espaciado sin justificación
- Ignorar responsive design
- Duplicar constantes existentes

## 📚 Recursos Adicionales

### Archivos de Referencia
- `components/shared/DesignSystem.tsx` - Sistema completo
- `lib/csw-shared-constants.ts` - Constantes compartidas
- `components/shared/AppTemplate.tsx` - Plantilla base

### Ejemplos de Implementación
- `balasto-calculator/` - Calculadora de balasto
- `steel-calculator/` - Calculadora de acero

### Documentación
- Este README
- Comentarios en el código
- Guías de implementación

## 🤝 Soporte

Para dudas sobre el sistema de diseño:
1. Revisar este README
2. Consultar los archivos de referencia
3. Revisar implementaciones existentes
4. Contactar al equipo de desarrollo

---

**🎯 Objetivo**: Mantener **consistencia visual y estructural** en todas las aplicaciones CSW para una experiencia de usuario unificada y profesional.
