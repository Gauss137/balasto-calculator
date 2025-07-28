# Calculadora de Coeficiente de Balasto

## 📋 Descripción

Calculadora especializada para determinar el **coeficiente de balasto** (módulo de reacción de subrasante) basada en las teorías de Terzaghi y otros autores reconocidos en ingeniería geotécnica.

## 🎯 Características

- **Cálculo preciso** del coeficiente de balasto según diferentes metodologías
- **Tablas de referencia** con valores típicos para diferentes tipos de suelo
- **Interfaz intuitiva** diseñada para ingenieros civiles y geotécnicos
- **Resultados detallados** con explicaciones técnicas
- **Responsive design** para uso en desktop y móviles

## 🛠️ Tecnologías

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsive
- **React Hook Form** - Manejo de formularios
- **KaTeX** - Renderizado de fórmulas matemáticas

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Gauss137/balasto-calculator.git

# Entrar al directorio
cd balasto-calculator

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## 📊 Funcionalidades

### Cálculo de Coeficiente de Balasto
- **Método de Terzaghi**: Basado en la teoría clásica de cimentaciones
- **Método de Bowles**: Considerando diferentes tipos de suelo
- **Método de Vesić**: Para análisis más avanzados

### Tablas de Referencia
- **Suelos granulares**: Arena, grava, limo
- **Suelos cohesivos**: Arcilla, limo arcilloso
- **Rocas**: Diferentes tipos de roca y su resistencia

### Resultados
- Coeficiente de balasto (k) en kN/m³
- Recomendaciones según el tipo de suelo
- Explicaciones técnicas de los métodos utilizados

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# Build para producción
npm run build

# Desplegar en Vercel
vercel --prod
```

### Dominio Personalizado
- **URL**: `https://balasto.cswingenieriacivil.com`
- **Configuración**: Automática con Vercel

## 📁 Estructura del Proyecto

```
balasto-calculator/
├── app/
│   ├── balasto-calculator/
│   │   └── page.tsx          # Página principal de la calculadora
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Redirección automática
├── components/
│   ├── ui/                   # Componentes de UI reutilizables
│   │   ├── BalastoCalculator.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── ToggleSection.tsx
│   ├── Header.tsx            # Encabezado de la aplicación
│   ├── Footer.tsx            # Pie de página
│   ├── MobileMenu.tsx        # Menú móvil
│   └── LegalModal.tsx        # Modal legal
├── lib/
│   └── utils.ts              # Utilidades y funciones auxiliares
├── types/
│   └── index.ts              # Definiciones de tipos TypeScript
├── public/                   # Archivos estáticos
├── vercel.json               # Configuración de Vercel
└── package.json              # Dependencias y scripts
```

## 🔧 Configuración

### Variables de Entorno
```env
# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console (opcional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### SEO y Metadatos
- **Título**: Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil
- **Descripción**: Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi
- **Keywords**: coeficiente de balasto, módulo de balasto, módulo de reacción, subrasante, ingeniería geotécnica, terzaghi
- **Canonical URL**: https://balasto.cswingenieriacivil.com

## 📈 SEO Optimizado

- **Meta tags** completos para motores de búsqueda
- **Open Graph** para redes sociales
- **Twitter Cards** para Twitter
- **Schema.org** markup para rich snippets
- **Sitemap.xml** automático
- **Robots.txt** configurado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de acceso libre y gratuito. Desarrollado por **CSW Ingeniería Civil**.

## 👨‍💻 Autor

**CSW Ingeniería Civil**
- **Website**: https://www.cswingenieriacivil.com
- **Email**: contacto@cswingenieriacivil.com

## 🙏 Agradecimientos

- **Terzaghi, K.** - Teoría de cimentaciones
- **Bowles, J.E.** - Análisis y diseño de cimentaciones
- **Vesić, A.S.** - Métodos avanzados de análisis geotécnico

---

**Desarrollado con ❤️ para la comunidad de ingeniería civil** 