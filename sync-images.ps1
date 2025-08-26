# Sync shared images across all CSW applications
Write-Host "Syncing shared images..." -ForegroundColor Cyan

$apps = @("armadura-flexion", "balasto-calculator", "steel-calculator")

foreach ($app in $apps) {
    Write-Host "Processing $app..." -ForegroundColor Yellow
    
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
                Write-Host "  OK: $img" -ForegroundColor Green
            } else {
                Write-Host "  Missing: $img" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "  Public directory not found" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "Sync completed!" -ForegroundColor Green
