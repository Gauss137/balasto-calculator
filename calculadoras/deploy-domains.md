# Guía para Configurar Dominios Personalizados

## Configuración de Proyectos Separados en Vercel

### 1. Proyecto Steel Calculator
- **Dominio:** `steelcalculator.cswingenieriacivil.com`
- **Archivo de configuración:** `vercel-steel.json`
- **Redirección:** Todo el tráfico va a `/steel-calculator`

### 2. Proyecto Balasto Calculator
- **Dominio:** `balastocalculator.cswingenieriacivil.com`
- **Archivo de configuración:** `vercel-balasto.json`
- **Redirección:** Todo el tráfico va a `/balasto-calculator`

### 3. Proyecto Beam Calculator
- **Dominio:** `beamcalculator.cswingenieriacivil.com`
- **Archivo de configuración:** `vercel-beam.json`
- **Redirección:** Todo el tráfico va a `/vigas/simplemente-apoyadas/carga-uniforme`

## Pasos para Configurar:

### Paso 1: Crear Proyectos en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Crea 3 proyectos nuevos desde el mismo repositorio
3. Nombra cada proyecto según su función

### Paso 2: Configurar Dominios
1. En cada proyecto, ve a **Settings → Domains**
2. Agrega el dominio correspondiente
3. Configura el DNS según las instrucciones de Vercel

### Paso 3: Configurar vercel.json
1. Para cada proyecto, renombra el archivo correspondiente a `vercel.json`
2. O copia el contenido del archivo específico

### Paso 4: Configurar DNS
Para cada dominio, agrega en tu proveedor DNS:

```
steelcalculator.cswingenieriacivil.com → CNAME → cname.vercel-dns.com
balastocalculator.cswingenieriacivil.com → CNAME → cname.vercel-dns.com
beamcalculator.cswingenieriacivil.com → CNAME → cname.vercel-dns.com
```

## URLs Finales:
- ✅ `https://steelcalculator.cswingenieriacivil.com/` → Steel Calculator
- ✅ `https://balastocalculator.cswingenieriacivil.com/` → Balasto Calculator
- ✅ `https://beamcalculator.cswingenieriacivil.com/` → Beam Calculator

## Ventajas de esta configuración:
- ✅ Cada dominio va directamente a su calculadora
- ✅ SEO optimizado para cada herramienta
- ✅ Fácil mantenimiento
- ✅ Escalabilidad para futuras calculadoras 