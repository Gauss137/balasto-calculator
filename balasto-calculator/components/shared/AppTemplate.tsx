/**
 * 🚀 PLANTILLA DE APLICACIÓN CSW - NUEVAS APLICACIONES
 * 
 * Este archivo muestra la estructura completa que debe tener
 * una nueva aplicación CSW para mantener consistencia.
 * 
 * USO: Copiar este archivo y adaptarlo a la nueva aplicación
 */

import React from 'react';
import { CSWMainContainer, CSWSection, CSWButton, CSWButtonOutline } from './DesignSystem';
import { CSW_COMPANY_CONFIG, CSW_EXTERNAL_LINKS } from '../../lib/csw-shared-constants';

// ============================================================================
// 🎯 COMPONENTE PRINCIPAL DE LA APLICACIÓN
// ============================================================================
export function NewCalculatorTemplate() {
  // Estados de la aplicación
  const [inputValue, setInputValue] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);
  const [showResults, setShowResults] = React.useState(false);

  // Función de cálculo principal
  const calculateResult = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      alert('Por favor ingrese un valor válido');
      return;
    }
    
    const value = parseFloat(inputValue);
    const calculatedResult = value * 2; // Ejemplo de cálculo
    
    setResult(calculatedResult);
    setShowResults(true);
  };

  // Función de reset
  const resetCalculator = () => {
    setInputValue('');
    setResult(null);
    setShowResults(false);
  };

  return (
    <CSWMainContainer>
      {/* ======================================== */}
      {/* 🎨 HEADER DE LA APLICACIÓN */}
      {/* ======================================== */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          <span className="block">Nombre de la Nueva Calculadora</span>
          <span className="block">Descripción Corta</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Descripción completa de la calculadora. Explicar qué hace, para quién es útil
          y qué problemas resuelve. Mantener consistencia con el tono profesional de CSW.
        </p>
      </div>

      {/* ======================================== */}
      {/* 📊 SECCIÓN: DATOS DE ENTRADA */}
      {/* ======================================== */}
      <CSWSection title="Datos de Entrada">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="input-field" className="block text-sm font-medium text-gray-700 mb-1">
              Campo de Entrada
            </label>
            <input
              id="input-field"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]"
              placeholder="Ingrese un valor"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="select-field" className="block text-sm font-medium text-gray-700 mb-1">
              Campo de Selección
            </label>
            <select 
              id="select-field"
              className="w-full border rounded p-2 focus:ring-2 focus:ring-[#f8b133] focus:border-[#f8b133]"
            >
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
              <option value="option3">Opción 3</option>
            </select>
          </div>
        </div>
      </CSWSection>

      {/* ======================================== */}
      {/* 🔧 SECCIÓN: OPCIONES DE CÁLCULO */}
      {/* ======================================== */}
      <CSWSection title="Opciones de Cálculo">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="option1"
              className="w-4 h-4 text-[#f8b133] border-gray-300 rounded focus:ring-[#f8b133]"
            />
            <label htmlFor="option1" className="text-sm text-gray-700">
              Opción de cálculo adicional
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="option2"
              className="w-4 h-4 text-[#f8b133] border-gray-300 rounded focus:ring-[#f8b133]"
            />
            <label htmlFor="option2" className="text-sm text-gray-700">
              Otra opción de cálculo
            </label>
          </div>
        </div>
      </CSWSection>

      {/* ======================================== */}
      {/* 🎯 SECCIÓN: BOTONES DE ACCIÓN */}
      {/* ======================================== */}
      <div className="mt-6 flex justify-center space-x-4">
        <CSWButton onClick={calculateResult}>
          Calcular
        </CSWButton>
        
        <CSWButtonOutline onClick={resetCalculator}>
          Resetear
        </CSWButtonOutline>
      </div>

      {/* ======================================== */}
      {/* 📊 SECCIÓN: RESULTADOS */}
      {/* ======================================== */}
      {showResults && result !== null && (
        <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
          <div className="font-semibold text-green-800 mb-4">
            Resultado del Cálculo:
          </div>
          
          {/* Tabla de resultados */}
          <div className="bg-white p-4 rounded-lg border mx-auto max-w-lg">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-2 text-center font-medium">Valor Original</th>
                  <th className="border px-2 py-2 text-center font-medium">Resultado</th>
                  <th className="border px-2 py-2 text-center font-medium">Unidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-2 text-center">
                    {inputValue}
                  </td>
                  <td className="border px-2 py-2 text-center font-bold text-lg text-green-900">
                    {result.toFixed(3)}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    unidades
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-sm text-green-700 mt-3">
            <span className="font-medium">Valor calculado:</span> {result.toFixed(3)} unidades
          </div>
        </div>
      )}

      {/* ======================================== */}
      {/* 📚 SECCIÓN: INFORMACIÓN ADICIONAL */}
      {/* ======================================== */}
      <CSWSection title="Información Técnica">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 mb-4">
            Aquí puedes incluir información técnica relevante, fórmulas utilizadas,
            referencias normativas, o cualquier dato que sea útil para el usuario.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">📖 Referencias:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Norma técnica relevante</li>
              <li>• Manual de diseño</li>
              <li>• Publicación científica</li>
            </ul>
          </div>
        </div>
      </CSWSection>
    </CSWMainContainer>
  );
}

// ============================================================================
// 🎨 COMPONENTE DE LAYOUT COMPLETO
// ============================================================================
export function NewCalculatorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Usar el componente Header.tsx existente */}
      {/* <Header /> */}
      
      {/* Contenido principal */}
      <main>
        <NewCalculatorTemplate />
      </main>
      
      {/* Footer - Usar el componente Footer.tsx existente */}
      {/* <Footer /> */}
    </div>
  );
}

// ============================================================================
// 📝 GUÍA DE IMPLEMENTACIÓN
// ============================================================================
export const IMPLEMENTATION_GUIDE = `
🎯 GUÍA PARA IMPLEMENTAR NUEVA CALCULADORA CSW:

1. 📁 ESTRUCTURA DE ARCHIVOS:
   - Copiar este template a la nueva aplicación
   - Renombrar NewCalculatorTemplate a [Nombre]Calculator
   - Actualizar imports y referencias

2. 🎨 PERSONALIZAR:
   - Cambiar título y descripción
   - Agregar campos de entrada específicos
   - Implementar lógica de cálculo real
   - Ajustar validaciones según necesidades

3. 🔧 INTEGRAR:
   - Importar Header y Footer existentes
   - Usar constantes compartidas de CSW
   - Seguir sistema de colores y espaciado
   - Implementar responsive design

4. 📱 RESPONSIVE:
   - Usar grid responsive predefinido
   - Probar en diferentes tamaños de pantalla
   - Mantener espaciado consistente

5. ✅ VERIFICAR:
   - Consistencia visual con otras apps CSW
   - Funcionamiento correcto de cálculos
   - Validaciones apropiadas
   - SEO y metadatos configurados
`;

export default NewCalculatorTemplate;
