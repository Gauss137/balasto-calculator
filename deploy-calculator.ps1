# Script para desplegar calculadoras de forma independiente
# Uso: .\deploy-calculator.ps1 [balasto|steel]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("balasto", "steel")]
    [string]$Calculator
)

Write-Host "🚀 Desplegando calculadora: $Calculator" -ForegroundColor Green

# Determinar la carpeta de la calculadora
$calculatorFolder = switch ($Calculator) {
    "balasto" { "balasto-calculator" }
    "steel" { "steel-calculator" }
}

# Verificar que la carpeta existe
if (-not (Test-Path $calculatorFolder)) {
    Write-Host "❌ Error: No se encontró la carpeta $calculatorFolder" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Navegando a $calculatorFolder..." -ForegroundColor Yellow
Set-Location $calculatorFolder

# Verificar que package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encontró package.json en $calculatorFolder" -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

# Build del proyecto
Write-Host "🔨 Construyendo proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir el proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Proyecto construido exitosamente!" -ForegroundColor Green

# Verificar si Vercel CLI está instalado
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if ($vercelInstalled) {
    Write-Host "🌐 Vercel CLI detectado. ¿Deseas desplegar ahora? (y/n)" -ForegroundColor Cyan
    $response = Read-Host
    
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "🚀 Desplegando en Vercel..." -ForegroundColor Yellow
        vercel --prod
    } else {
        Write-Host "ℹ️  Para desplegar manualmente, ejecuta: vercel --prod" -ForegroundColor Blue
    }
} else {
    Write-Host "ℹ️  Vercel CLI no está instalado." -ForegroundColor Blue
    Write-Host "   Para instalarlo: npm i -g vercel" -ForegroundColor Blue
    Write-Host "   Para desplegar manualmente: vercel --prod" -ForegroundColor Blue
}

Write-Host "✅ Proceso completado para $Calculator!" -ForegroundColor Green

# Volver al directorio raíz
Set-Location ..
