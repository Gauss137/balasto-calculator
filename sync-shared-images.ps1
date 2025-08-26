# Script para sincronizar imágenes compartidas en todas las aplicaciones CSW
Write-Host "🖼️  Sincronizando imágenes compartidas..." -ForegroundColor Cyan

$apps = @("armadura-flexion", "balasto-calculator", "steel-calculator")

foreach ($app in $apps) {
    Write-Host "📱 Sincronizando $app..." -ForegroundColor Yellow
    
    if (Test-Path "$app/public") {
        $sharedDir = "$app/shared/src/assets"
        if (-not (Test-Path $sharedDir)) {
            New-Item -ItemType Directory -Path $sharedDir -Force | Out-Null
        }
        
        $images = @("naranjainsttij.png", "naranjalinktij.png", "negrologotij.png", "PRORecurso 4tij.png")
        
        foreach ($img in $images) {
            $source = "$app/public/$img"
            $dest = "$sharedDir/$img"
            
            if (Test-Path $source) {
                Copy-Item -Path $source -Destination $dest -Force
                Write-Host "  ✅ $img" -ForegroundColor Green
            } else {
                Write-Host "  ❌ $img no encontrada" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "  ❌ Directorio public no encontrado" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "🎉 ¡Sincronización completada!" -ForegroundColor Green
