# Script para actualizar todos los submodules de componentes compartidos
# CSW Ingeniería Civil

Write-Host "🔄 Actualizando componentes compartidos en todas las aplicaciones..." -ForegroundColor Cyan

# Función para actualizar submodule en una aplicación
function Update-Submodule {
    param(
        [string]$AppName
    )
    
    Write-Host "📱 Actualizando $AppName..." -ForegroundColor Yellow
    
    if (Test-Path "$AppName/shared") {
        Set-Location "$AppName"
        
        # Actualizar submodule
        git submodule update --remote shared
        
        # Verificar si hay cambios
        $status = git status --porcelain
        if ($status) {
            Write-Host "  ✅ Cambios detectados en $AppName" -ForegroundColor Green
            
            # Agregar cambios del submodule
            git add shared
            git commit -m "Update shared components"
            
            Write-Host "  📤 Haciendo push de cambios..." -ForegroundColor Blue
            git push
        } else {
            Write-Host "  ℹ️  No hay cambios en $AppName" -ForegroundColor Gray
        }
        
        Set-Location ".."
    } else {
        Write-Host "  ❌ Submodule no encontrado en $AppName" -ForegroundColor Red
    }
}

# Lista de aplicaciones
$apps = @("armadura-flexion", "balasto-calculator", "steel-calculator")

# Actualizar cada aplicación
foreach ($app in $apps) {
    Update-Submodule -AppName $app
    Write-Host ""
}

Write-Host "🎉 ¡Actualización completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Resumen de comandos manuales:" -ForegroundColor Cyan
Write-Host "  git submodule update --remote shared  # Actualizar submodule"
Write-Host "  git add shared                       # Agregar cambios"
Write-Host "  git commit -m 'Update shared'        # Commit cambios"
Write-Host "  git push                            # Push cambios"
Write-Host ""
Write-Host "🔗 Repositorio compartido: https://github.com/Gauss137/csw-shared-components" -ForegroundColor Blue
