# 🏗️ Calculadora de Armaduras a Flexión - CSW Ingeniería Civil

## 📋 Descripción

Calculadora profesional para estimar armaduras mínimas, máximas y de compresión en secciones a flexión según normativa EHE. Ideal para ingenieros civiles y estructurales que necesitan dimensionar armaduras de hormigón armado.

## 🎯 Funcionalidades

### ✨ **Cálculos Principales**
- **Armadura de tracción**: A = M / (0.8 × h × fyd)
- **Armadura de compresión**: Cuando M > M_lim
- **Momento límite**: M_lim = 0.37 × fcd × b × d²
- **Armadura mínima**: Según tipo de elemento (2‰, 3.5‰, 4‰)
- **Armadura máxima**: 100% fcd × A / fyd
- **Verificación de cortante**: V_cu = 0.5 × b × d

### 🎨 **Características de la UI**
- **Diseño CSW**: Sistema de diseño consistente con la marca
- **Responsive**: Adaptable a todos los dispositivos
- **Validaciones**: Control de entrada de datos
- **Resultados visuales**: Presentación clara y organizada
- **Tabla auxiliar**: Áreas de redondos comerciales

## 🚀 Tecnologías

- **Framework**: Next.js 15.4.1
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: React Hooks
- **Deploy**: Vercel

## 📁 Estructura del Proyecto

```
armadura-flexion/
├── app/                    # App Router de Next.js
│   ├── armadura-flexion/   # Página específica
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/             # Componentes React
│   ├── Header.tsx         # Encabezado CSW
│   ├── Footer.tsx         # Pie de página CSW
│   └── ArmaduraFlexionCalculator.tsx # Calculadora principal
├── lib/                    # Utilidades y constantes
├── hooks/                  # Hooks personalizados
├── types/                  # Tipos TypeScript
├── public/                 # Archivos estáticos
├── package.json            # Dependencias
├── tailwind.config.ts      # Configuración Tailwind
├── next.config.ts          # Configuración Next.js
├── vercel.json             # Configuración Vercel
└── README.md               # Este archivo
```

## 🛠️ Instalación y Desarrollo

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Entrar al directorio
cd armadura-flexion

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### **Scripts Disponibles**
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Verificación de código
```

## 🌐 Despliegue

### **Vercel (Recomendado)**
1. Conectar repositorio a Vercel
2. Configurar dominio: `armadura-flexion.cswingenieriacivil.com`
3. Deploy automático en cada push

### **Configuración de Dominio**
```json
{
  "domains": [
    "armadura-flexion.cswingenieriacivil.com"
  ]
}
```

## 📊 Entradas y Salidas

### **Datos de Entrada**
- **M**: Momento flector solicitante [kNm]
- **h**: Altura útil de la sección [m]
- **b**: Base de la sección [m]
- **fyd**: Resistencia de cálculo del acero [N/mm²]
- **fcd**: Resistencia de cálculo del hormigón [N/mm²]
- **Tipo de elemento**: Viga, Losa/Muro, Pilar

### **Resultados**
- Armadura requerida de tracción [cm²]
- Armadura de compresión (si es necesaria) [cm²]
- Armadura mínima y máxima [cm²]
- Momento límite [kNm]
- Verificación de cortante [kN]
- Sugerencia de barras comerciales

## 🎨 Sistema de Diseño CSW

### **Colores**
- **Primario**: #f8b133 (Naranja CSW)
- **Primario Hover**: #e6a030
- **Primario Claro**: #f1d475

### **Componentes**
- **csw-container**: Contenedor principal
- **csw-section**: Secciones de contenido
- **csw-button**: Botones principales
- **csw-button-outline**: Botones secundarios
- **csw-input**: Campos de entrada
- **csw-label**: Etiquetas de formulario

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Grid System**: Adaptativo según tamaño de pantalla
- **Typography**: Escalable y legible

## 🔒 Seguridad

- **Validaciones**: Control de entrada de datos
- **Sanitización**: Prevención de XSS
- **Headers**: Configuración de seguridad en Vercel
- **TypeScript**: Tipado estricto para prevenir errores

## 📈 SEO y Metadatos

- **Meta tags**: Títulos, descripciones, keywords
- **Open Graph**: Compartir en redes sociales
- **Twitter Cards**: Optimización para Twitter
- **Canonical URLs**: Prevención de contenido duplicado

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 📞 Contacto

- **Sitio Web**: [https://www.cswingenieriacivil.com](https://www.cswingenieriacivil.com)
- **Email**: contacto@cswingenieriacivil.com
- **Herramientas**: [https://www.cswingenieriacivil.com/herramientas](https://www.cswingenieriacivil.com/herramientas)

---

**Desarrollado con ❤️ por CSW Ingeniería Civil**
