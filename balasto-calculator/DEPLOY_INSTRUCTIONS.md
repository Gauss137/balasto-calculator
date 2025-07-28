# 🚀 Instrucciones para Deploy de Balasto Calculator

## 📋 Problemas Resueltos

✅ **Archivos creados para resolver errores de build:**
- `hooks/useModal.ts` - Hook para manejo de modales
- `lib/constants.ts` - Constantes de la aplicación
- `tsconfig.json` - Configuración actualizada con paths correctos

## 🔧 Pasos para Deploy

### 1. Ejecutar Script de Preparación
```powershell
.\deploy-fix.ps1
```

### 2. Verificar Archivos Creados
Los siguientes archivos deben existir:
- ✅ `hooks/useModal.ts`
- ✅ `lib/constants.ts`
- ✅ `lib/utils.ts`
- ✅ `tsconfig.json` (actualizado)

### 3. Commit y Push Manual (si el script no funciona)
```bash
# Agregar todos los archivos
git add .

# Verificar estado
git status

# Crear commit
git commit -m "Fix: Add missing useModal hook and constants file to resolve build errors"

# Push a GitHub
git push origin main
```

### 4. Verificar en Vercel
1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleccionar el proyecto `balasto-calculator`
3. Verificar que el build sea exitoso
4. Comprobar que el dominio funcione: `https://balasto.cswingenieriacivil.com`

## 🐛 Errores Resueltos

### Antes:
```
❌ Module not found: Can't resolve '@/hooks/useModal'
❌ Module not found: Can't resolve '@/lib/constants'
```

### Después:
```
✅ Todos los módulos encontrados
✅ Build exitoso
✅ Deploy funcional
```

## 📁 Estructura de Archivos

```
balasto-calculator/
├── hooks/
│   └── useModal.ts          # ✅ NUEVO - Hook para modales
├── lib/
│   ├── constants.ts         # ✅ NUEVO - Constantes de la app
│   └── utils.ts             # ✅ Existente
├── components/
│   ├── Header.tsx           # ✅ Importa @/lib/constants
│   ├── Footer.tsx           # ✅ Importa @/hooks/useModal
│   ├── LegalModal.tsx       # ✅ Importa @/lib/constants
│   └── MobileMenu.tsx       # ✅ Importa @/lib/constants
├── tsconfig.json            # ✅ ACTUALIZADO - Paths configurados
└── package.json             # ✅ Existente
```

## 🔍 Verificación Post-Deploy

1. **Build exitoso en Vercel**
2. **Dominio funcional**: `https://balasto.cswingenieriacivil.com`
3. **Redirección correcta**: `/` → `/balasto-calculator`
4. **Componentes cargando sin errores**
5. **SEO metadata funcionando**

## 📞 Soporte

Si persisten errores después del deploy:
1. Verificar logs en Vercel
2. Comprobar que todos los archivos estén en GitHub
3. Verificar que el remote esté configurado correctamente

---

**🎉 ¡Deploy listo para ejecutar!** 