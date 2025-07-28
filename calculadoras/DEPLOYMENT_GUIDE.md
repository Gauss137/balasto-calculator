# Guía de Despliegue por Proyecto

## Configuración de Dominios Específicos

Cada proyecto debe usar su configuración específica para evitar acceso cruzado entre calculadoras.

### 1. Steel Calculator (steelcalculator.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:steel`

**Resultado:**
- ✅ `https://steelcalculator.cswingenieriacivil.com/` → Steel Calculator
- ❌ `https://steelcalculator.cswingenieriacivil.com/balasto-calculator` → Redirige a `/steel-calculator`
- ❌ `https://steelcalculator.cswingenieriacivil.com/vigas/...` → Redirige a `/steel-calculator`

### 2. Balasto Calculator (balasto.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:balasto`

**Resultado:**
- ✅ `https://balasto.cswingenieriacivil.com/` → Balasto Calculator
- ❌ `https://balasto.cswingenieriacivil.com/steel-calculator` → Redirige a `/balasto-calculator`
- ❌ `https://balasto.cswingenieriacivil.com/vigas/...` → Redirige a `/balasto-calculator`

### 3. Beam Calculator (beam.cswingenieriacivil.com)

**En Vercel:**
1. Ve a Settings → General
2. En "Build & Development Settings"
3. Cambia "Build Command" a: `npm run build:beam`

**Resultado:**
- ✅ `https://beam.cswingenieriacivil.com/` → Beam Calculator
- ❌ `https://beam.cswingenieriacivil.com/steel-calculator` → Redirige a `/vigas/simplemente-apoyadas/carga-uniforme`
- ❌ `https://beam.cswingenieriacivil.com/balasto-calculator` → Redirige a `/vigas/simplemente-apoyadas/carga-uniforme`

## Configuración DNS

Para cada dominio, crear un registro CNAME:
- `steelcalculator.cswingenieriacivil.com` → `cname.vercel-dns.com`
- `balasto.cswingenieriacivil.com` → `cname.vercel-dns.com`
- `beam.cswingenieriacivil.com` → `cname.vercel-dns.com`

## Verificación

Después de configurar cada proyecto:
1. Espera 2-3 minutos para que Vercel procese los cambios
2. Prueba el dominio principal
3. Prueba acceder a otras calculadoras desde el dominio (debería redirigir)

## Troubleshooting

Si las redirecciones no funcionan:
1. Verifica que el Build Command esté configurado correctamente
2. Haz un redeploy manual
3. Verifica que el dominio esté configurado en Vercel
4. Revisa los logs de build en Vercel 