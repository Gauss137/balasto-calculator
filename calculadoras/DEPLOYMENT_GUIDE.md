# Guía de Despliegue por Proyecto

## Configuración de Dominios Específicos

Cada proyecto debe usar su configuración específica para evitar acceso cruzado entre calculadoras.

### 1. Steel Calculator (steelcalculator.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:steel`
4. **IMPORTANTE:** Agrega variable de entorno:
   - **Name:** `NEXT_PUBLIC_PROJECT_NAME`
   - **Value:** `steel-calculator`
   - **Environment:** Production, Preview, Development

**Resultado:**
- ✅ `https://steelcalculator.cswingenieriacivil.com/` → Steel Calculator
- ❌ `https://steelcalculator.cswingenieriacivil.com/balasto-calculator` → Redirige a `/steel-calculator`
- ❌ `https://steelcalculator.cswingenieriacivil.com/vigas/...` → Redirige a `/steel-calculator`

### 2. Balasto Calculator (balasto.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:balasto`
4. **IMPORTANTE:** Agrega variable de entorno:
   - **Name:** `NEXT_PUBLIC_PROJECT_NAME`
   - **Value:** `balasto-calculator`
   - **Environment:** Production, Preview, Development

**Resultado:**
- ✅ `https://balasto.cswingenieriacivil.com/` → Balasto Calculator
- ❌ `https://balasto.cswingenieriacivil.com/steel-calculator` → Redirige a `/balasto-calculator`
- ❌ `https://balasto.cswingenieriacivil.com/vigas/...` → Redirige a `/balasto-calculator`

### 3. Beam Calculator (beam.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:beam`
4. **IMPORTANTE:** Agrega variable de entorno:
   - **Name:** `NEXT_PUBLIC_PROJECT_NAME`
   - **Value:** `beam-calculator`
   - **Environment:** Production, Preview, Development

**Resultado:**
- ✅ `https://beam.cswingenieriacivil.com/` → Beam Calculator
- ❌ `https://beam.cswingenieriacivil.com/steel-calculator` → Redirige a `/vigas/simplemente-apoyadas/carga-uniforme`
- ❌ `https://beam.cswingenieriacivil.com/balasto-calculator` → Redirige a `/vigas/simplemente-apoyadas/carga-uniforme`

## Configuración DNS

Para cada dominio, crear un registro CNAME:
- `steelcalculator.cswingenieriacivil.com` → `cname.vercel-dns.com`
- `balasto.cswingenieriacivil.com` → `cname.vercel-dns.com`
- `beam.cswingenieriacivil.com` → `cname.vercel-dns.com`

## Variables de Entorno Requeridas

### Para cada proyecto, agregar en Vercel:

**Steel Calculator:**
```
NEXT_PUBLIC_PROJECT_NAME=steel-calculator
```

**Balasto Calculator:**
```
NEXT_PUBLIC_PROJECT_NAME=balasto-calculator
```

**Beam Calculator:**
```
NEXT_PUBLIC_PROJECT_NAME=beam-calculator
```

## Verificación

Después de configurar cada proyecto:
1. Espera 2-3 minutos para que Vercel procese los cambios
2. Prueba el dominio principal
3. Prueba acceder a otras calculadoras desde el dominio (debería redirigir)
4. Revisa los logs de build para verificar que se detectó el proyecto correcto

## Troubleshooting

Si las redirecciones no funcionan:
1. **Verifica las variables de entorno** en Vercel
2. **Revisa los logs de build** para ver qué proyecto se detectó
3. **Verifica que el Build Command** esté configurado correctamente
4. **Haz un redeploy manual** después de cambiar las variables
5. **Verifica que el dominio** esté configurado en Vercel

## Logs de Build Esperados

**Steel Calculator:**
```
🔍 Detectando proyecto...
🎯 Proyecto detectado: steel-calculator
📁 Redirigiendo a: /steel-calculator
⚙️ Usando configuración: vercel-steel-only.json
```

**Balasto Calculator:**
```
🔍 Detectando proyecto...
🎯 Proyecto detectado: balasto-calculator
📁 Redirigiendo a: /balasto-calculator
⚙️ Usando configuración: vercel-balasto-only.json
```

**Beam Calculator:**
```
🔍 Detectando proyecto...
🎯 Proyecto detectado: beam-calculator
📁 Redirigiendo a: /vigas/simplemente-apoyadas/carga-uniforme
⚙️ Usando configuración: vercel-beam-only.json
``` 