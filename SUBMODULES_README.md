# 🏗️ Sistema de Submodules CSW - Componentes Compartidos

## 📋 **Descripción General**

Este sistema permite que todas las aplicaciones CSW compartan los mismos componentes (Header, Footer, MobileMenu, LegalModal) y constantes, manteniendo la consistencia visual y funcional en todo el ecosistema.

## 🎯 **Beneficios**

- ✅ **Consistencia**: Header y Footer idénticos en todas las apps
- ✅ **Mantenimiento**: Cambios en un solo lugar se propagan automáticamente
- ✅ **Independencia**: Cada app mantiene su repositorio separado
- ✅ **Versionado**: Control de versiones de componentes compartidos
- ✅ **Gratuito**: No requiere servicios premium

## 🏗️ **Arquitectura**

```
csw-shared-components/          ← Repositorio compartido
├── src/
│   ├── components/            ← Header, Footer, MobileMenu, LegalModal
│   ├── hooks/                 ← useModal
│   ├── constants/             ← APP_CONFIG, EXTERNAL_LINKS, etc.
│   └── types/                 ← Interfaces TypeScript

calculadoras_CSW/               ← Directorio principal
├── armadura-flexion/
│   └── shared/                ← Submodule
├── balasto-calculator/
│   └── shared/                ← Submodule
└── steel-calculator/
    └── shared/                ← Submodule
```

## 🚀 **Configuración Inicial (Ya Completada)**

Los submodules ya están configurados en todas las aplicaciones:

- ✅ **armadura-flexion/shared**
- ✅ **balasto-calculator/shared**  
- ✅ **steel-calculator/shared**

## 🔄 **Flujo de Actualización**

### **1. Hacer cambios en el repositorio compartido**

```bash
cd csw-shared-components
# Hacer cambios en los componentes
git add .
git commit -m "Update header design"
git push origin main
```

### **2. Actualizar submodules en todas las apps**

#### **Opción A: Script automático (Recomendado)**
```bash
./update-shared-components.ps1
```

#### **Opción B: Manual en cada app**
```bash
# En cada aplicación
cd armadura-flexion
git submodule update --remote shared
git add shared
git commit -m "Update shared components"
git push

cd ../balasto-calculator
git submodule update --remote shared
git add shared
git commit -m "Update shared components"
git push

cd ../steel-calculator
git submodule update --remote shared
git add shared
git commit -m "Update shared components"
git push
```

## 📱 **Uso en las Aplicaciones**

### **Importación de componentes**

```tsx
// En layout.tsx de cada app
import { Header } from '../shared/src/components/Header';
import { Footer } from '../shared/src/components/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

### **Importación de constantes**

```tsx
import { APP_CONFIG, EXTERNAL_LINKS } from '../shared/src/constants';

console.log(APP_CONFIG.company); // "CSW Ingeniería Civil"
```

## 🛠️ **Comandos Útiles**

### **Ver estado de submodules**
```bash
git submodule status
```

### **Inicializar submodules (primera vez)**
```bash
git submodule init
git submodule update
```

### **Actualizar submodule específico**
```bash
cd armadura-flexion
git submodule update --remote shared
```

### **Ver cambios en submodule**
```bash
cd armadura-flexion/shared
git log --oneline
```

## ⚠️ **Consideraciones Importantes**

### **1. Clonar repositorio con submodules**
```bash
git clone --recursive https://github.com/user/repo.git
# O después de clonar:
git submodule init
git submodule update
```

### **2. Trabajar en equipo**
- Todos los desarrolladores deben ejecutar `git submodule update` después de pull
- Los cambios en componentes compartidos requieren coordinación

### **3. Deploy**
- Asegurarse de que el submodule esté actualizado antes del deploy
- Verificar que la ruta `../shared/src/components/` sea accesible

## 🔧 **Solución de Problemas**

### **Submodule no se actualiza**
```bash
cd app-name
git submodule update --remote --force shared
```

### **Error de ruta en importación**
Verificar que la ruta relativa sea correcta:
```tsx
// Correcto
import { Header } from '../shared/src/components/Header';

// Incorrecto
import { Header } from '@/shared/components/Header';
```

### **Submodule corrupto**
```bash
cd app-name
rm -rf shared
git submodule add https://github.com/Gauss137/csw-shared-components.git shared
```

## 📚 **Recursos Adicionales**

- **Repositorio compartido**: [csw-shared-components](https://github.com/Gauss137/csw-shared-components)
- **Script de actualización**: `update-shared-components.ps1`
- **Documentación del repositorio**: `csw-shared-components/README.md`

## 🤝 **Contribución**

1. Hacer cambios en `csw-shared-components`
2. Commit y push
3. Ejecutar script de actualización
4. Verificar que todas las apps funcionen correctamente

---

**🎉 ¡El sistema está listo para usar!**

Ahora puedes cambiar el Header o Footer en un solo lugar y se propagará automáticamente a todas las aplicaciones.
