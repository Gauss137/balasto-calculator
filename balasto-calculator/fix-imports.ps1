# Script para verificar y corregir imports en balasto-calculator
Write-Host "🔧 Verificando imports en balasto-calculator..." -ForegroundColor Green

# Verificar que existan todos los archivos necesarios
$requiredFiles = @(
    "hooks\useModal.ts",
    "lib\constants.ts",
    "lib\utils.ts",
    "types\index.ts"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Existe: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Falta: $file" -ForegroundColor Red
    }
}

# Verificar que existan todos los directorios necesarios
$requiredDirs = @(
    "components",
    "components\ui",
    "hooks",
    "lib",
    "types",
    "public"
)

foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ Existe directorio: $dir" -ForegroundColor Green
    } else {
        Write-Host "❌ Falta directorio: $dir" -ForegroundColor Red
        New-Item -ItemType Directory -Path $dir -Force
        Write-Host "✅ Creado directorio: $dir" -ForegroundColor Green
    }
}

# Verificar archivos de configuración
$configFiles = @(
    "package.json",
    "vercel.json",
    "next.config.ts",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "tsconfig.json",
    "eslint.config.mjs"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Existe: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Falta: $file" -ForegroundColor Red
    }
}

Write-Host "🎉 Verificación completada!" -ForegroundColor Green
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Commit y push de los cambios" -ForegroundColor White
Write-Host "   2. Verificar build en Vercel" -ForegroundColor White 