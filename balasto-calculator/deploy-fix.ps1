# Script para preparar el deploy con los fixes de balasto-calculator
Write-Host "🚀 Preparando deploy con fixes..." -ForegroundColor Green

# Verificar que estamos en el directorio correcto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio balasto-calculator" -ForegroundColor Red
    exit 1
}

# Verificar que todos los archivos necesarios existen
$requiredFiles = @(
    "hooks\useModal.ts",
    "lib\constants.ts",
    "lib\utils.ts",
    "tsconfig.json"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (!(Test-Path $file)) {
        $missingFiles += $file
        Write-Host "❌ Falta: $file" -ForegroundColor Red
    } else {
        Write-Host "✅ Existe: $file" -ForegroundColor Green
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "❌ Faltan archivos necesarios. No se puede proceder con el deploy." -ForegroundColor Red
    exit 1
}

# Verificar si git está inicializado
if (!(Test-Path ".git")) {
    Write-Host "🔧 Inicializando repositorio git..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/Gauss137/balasto-calculator.git
}

# Agregar todos los archivos
Write-Host "📁 Agregando archivos al staging..." -ForegroundColor Yellow
git add .

# Verificar el estado
Write-Host "📊 Estado del repositorio:" -ForegroundColor Cyan
git status

# Crear commit
$commitMessage = "Fix: Add missing useModal hook and constants file to resolve build errors"
Write-Host "💾 Creando commit: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

# Mostrar comandos para push
Write-Host "🎉 ¡Preparación completada!" -ForegroundColor Green
Write-Host "📝 Comandos para completar el deploy:" -ForegroundColor Cyan
Write-Host "   git push origin main" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "🔍 Verificar en Vercel:" -ForegroundColor Cyan
Write-Host "   https://vercel.com/dashboard" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "📋 Archivos agregados al commit:" -ForegroundColor Cyan
git diff --cached --name-only 