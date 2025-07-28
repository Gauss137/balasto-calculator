@echo off

REM Script de build para proyecto balasto-calculator (Windows)
echo Configurando proyecto balasto-calculator...

REM Copiar configuración específica de balasto
copy vercel-balasto.json vercel.json

REM Copiar página principal específica de balasto
copy app\page-balasto.tsx app\page.tsx

REM Ejecutar build normal
npm run build 