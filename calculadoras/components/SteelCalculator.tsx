"use client";

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";

import { useSteelCalculator } from '@/hooks/useSteelCalculator';
import { STEEL_APP_CONFIG as APP_CONFIG, STEEL_DEFAULT_UNITS as DEFAULT_UNITS } from '@/lib/steel-constants';

export function SteelCalculator() {
  const {
    inputData,
    results,
    rebarSpecs,
    calculateTable1,
    calculateTable2,
    calculateTable3,
    updateTable1Quantity,
    updateTable2TargetArea,
    updateTable3,
    resetTable1,
    resetTable2,
    resetTable3
  } = useSteelCalculator();

  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Auto-calcular cuando cambien los datos
  useEffect(() => {
    calculateTable1();
  }, [calculateTable1]);

  useEffect(() => {
    calculateTable2();
  }, [calculateTable2]);

  useEffect(() => {
    calculateTable3();
  }, [calculateTable3]);

  const tableOptions = [
    { 
      value: 'tabla1', 
      label: 'CALCULADORA 1',
      icon: <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"><span className="text-3xl font-bold text-gray-700">A<sub className="text-xl">s</sub></span></div>,
      title: 'CALCULADORA 1: Cálculo de Cuantía Total de Acero',
      description: 'Tienes las cantidades de barras y necesitas conocer la cuantía total de acero.',
      useCase: '💡 Úsala cuando: Ya tienes definidas las cantidades de barras por diámetro.'
    },
    { 
      value: 'tabla2', 
      label: 'CALCULADORA 2',
      icon: <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"><span className="text-3xl font-bold text-gray-700">⌀</span></div>,
      title: 'CALCULADORA 2: Cálculo de Cantidades de Barras', 
      description: 'Tienes una cuantía objetivo y necesitas saber cuántas barras usar de cada diámetro.',
      useCase: '💡 Úsala cuando: Tienes el área de acero requerida del diseño estructural.'
    },
    { 
      value: 'tabla3', 
      label: 'CALCULADORA 3',
      icon: <div className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"><span className="text-2xl font-bold text-gray-700">A<sub className="text-base">s</sub>/m</span></div>,
      title: 'CALCULADORA 3: Cálculo de Cuantías y Separaciones',
      description: 'Necesitas calcular cuantías de acero por metro lineal o determinar separaciones entre barras.',
      useCase: '💡 Úsala cuando: Necesites cuantías por metro lineal o espaciamientos específicos.'
    }
  ];

  const renderTableSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Qué necesitas calcular?</h2>
        <p className="text-gray-600">Selecciona la calculadora que mejor se adapte a tu situación:</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {tableOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => setSelectedTable(option.value)}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#f8b133] hover:shadow-lg transition-all duration-200 group h-full"
          >
                        <div className="text-center h-full grid grid-rows-[auto_auto_auto_auto] gap-4">
              <div className="flex justify-center">{option.icon}</div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-[#f8b133]">
                {option.label}
              </h3>
              <p className="text-gray-700 font-medium">{option.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">{option.useCase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelectedTable = () => {
    if (!selectedTable) {
      return renderTableSelection();
    }

    switch (selectedTable) {
      case 'tabla1':
        return renderTable1();
      case 'tabla2':
        return renderTable2();
      case 'tabla3':
        return renderTable3();
      default:
        return renderTableSelection();
    }
  };

  const renderTable1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rebarSpecs.map((spec) => (
          <div key={spec.diameter} className="space-y-2">
            <Label htmlFor={`table1-${spec.diameter}`}>
              {spec.label} ({spec.area.toFixed(2)} {DEFAULT_UNITS.AREA})
            </Label>
            <Input
              id={`table1-${spec.diameter}`}
              type="number"
              min="0"
              step="1"
              max="999"
              value={inputData.table1.quantities[spec.diameter.toString()] === undefined ? "" : inputData.table1.quantities[spec.diameter.toString()]}
              onChange={(e) => {
                // Solo permitir enteros positivos o vacío
                const val = e.target.value;
                if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0)) {
                  updateTable1Quantity(spec.diameter.toString(), val === "" ? undefined : Number(val));
                }
              }}
              onBlur={(e) => {
                const val = e.target.value;
                if (val === "" || isNaN(Number(val)) || Number(val) < 0) {
                  updateTable1Quantity(spec.diameter.toString(), 0);
                }
              }}
              placeholder="Cantidad"
            />
          </div>
        ))}
      </div>

      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <div className="text-center space-y-2">
          <div className="font-semibold text-orange-800">Área Total de Acero:</div>
          <div className="text-2xl font-bold text-orange-900">
            {results.table1.totalArea.toFixed(2)} {DEFAULT_UNITS.AREA}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={resetTable1}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Resetear
        </Button>
      </div>
      <div className="flex justify-center mb-4 md:justify-end md:mb-0">
        <Button variant="outline" size="sm" onClick={() => setSelectedTable(null)}>
          Cambiar tabla
        </Button>
      </div>
    </div>
  );

  const renderTable2 = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <Label htmlFor="targetArea">Área Total Deseada ({DEFAULT_UNITS.AREA})</Label>
        <Input
          id="targetArea"
          type="number"
          min="0"
          step="0.01"
          value={inputData.table2.targetArea === 0 ? "" : inputData.table2.targetArea.toString()}
          onChange={(e) => {
            const val = e.target.value;
            updateTable2TargetArea(val === "" ? 0 : Number(val));
          }}
          onBlur={(e) => {
            const val = e.target.value;
            if (val === "" || isNaN(Number(val)) || Number(val) < 0) {
              updateTable2TargetArea(0);
            }
          }}
          placeholder="Área total deseada"
          className="mt-2"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Cantidades Sugeridas:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rebarSpecs.map((spec) => (
            <div key={spec.diameter} className="bg-gray-50 p-3 rounded border">
              <div className="text-center">
                <div className="font-semibold text-gray-700">{spec.label}</div>
                <div className="text-lg font-bold text-gray-900">
                  {inputData.table2.targetArea > 0 
                    ? (results.table2.suggestedQuantities[spec.diameter.toString()]?.toFixed(2) || '0.00')
                    : '—'
                  }
                </div>
                <div className="text-xs text-gray-500">{DEFAULT_UNITS.QUANTITY}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={resetTable2}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Resetear
        </Button>
      </div>
      <div className="flex justify-center mb-4 md:justify-end md:mb-0">
        <Button variant="outline" size="sm" onClick={() => setSelectedTable(null)}>
          Cambiar tabla
        </Button>
      </div>
    </div>
  );

  const renderTable3 = () => (
    <div className="space-y-4">
      {/* Selección de barras */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">1. Seleccionar Barras y Cantidades:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rebarSpecs.map((spec) => (
            <div key={spec.diameter} className="flex items-center space-x-3 p-3 border rounded">
              <input
                type="checkbox"
                id={`table3-check-${spec.diameter}`}
                checked={inputData.table3.selectedBars[spec.diameter.toString()] || false}
                onChange={(e) => updateTable3({
                  selectedBars: {
                    ...inputData.table3.selectedBars,
                    [spec.diameter.toString()]: e.target.checked
                  }
                })}
                className="w-4 h-4"
              />
              <Label htmlFor={`table3-check-${spec.diameter}`} className="flex-1">
                {spec.label}
              </Label>
              <Input
                type="number"
                min="1"
                step="1"
                max="99"
                value={inputData.table3.quantities[spec.diameter.toString()] === undefined ? "" : inputData.table3.quantities[spec.diameter.toString()]}
                onChange={(e) => {
                  // Solo permitir enteros positivos o vacío
                  const val = e.target.value;
                  if (val === "" || (/^\d+$/.test(val) && Number(val) > 0)) {
                    updateTable3({
                      quantities: {
                        ...inputData.table3.quantities,
                        [spec.diameter.toString()]: val === "" ? undefined : Number(val)
                      }
                    });
                  }
                }}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (val === "" || isNaN(Number(val)) || Number(val) < 1) {
                    updateTable3({
                      quantities: {
                        ...inputData.table3.quantities,
                        [spec.diameter.toString()]: 1
                      }
                    });
                  }
                }}
                className="w-16"
                disabled={!inputData.table3.selectedBars[spec.diameter.toString()]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Opciones de cálculo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">OPCIÓN 1: Cuantía → Separación</h3>
          <div>
            <Label htmlFor="steel-ratio">Cuantía de Acero ({DEFAULT_UNITS.STEEL_RATIO})</Label>
            <Input
              id="steel-ratio"
              type="number"
              step="0.01"
              min="0"
              value={inputData.table3.steelRatio === undefined ? "" : inputData.table3.steelRatio}
              onChange={(e) => updateTable3({ steelRatio: e.target.value === "" ? 0 : Number(e.target.value), spacing: undefined })}
              onBlur={(e) => {
                const val = e.target.value;
                if (val === "" || isNaN(Number(val)) || Number(val) < 0) {
                  updateTable3({ steelRatio: 0, spacing: undefined });
                }
              }}
              placeholder="Ej: 5.0"
            />
          </div>
          {results.table3.spacing !== undefined && (
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <span className="font-semibold text-green-800">Separación Calculada:</span>
              <span className="ml-2 text-lg font-bold text-green-900">
                {results.table3.spacing.toFixed(2)} {DEFAULT_UNITS.SPACING}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">OPCIÓN 2: Separación → Cuantía</h3>
          <div>
            <Label htmlFor="spacing">Separación de Barras ({DEFAULT_UNITS.SPACING})</Label>
            <Input
              id="spacing"
              type="number"
              step="0.1"
              min="0"
              value={inputData.table3.spacing === undefined ? "" : inputData.table3.spacing}
              onChange={(e) => updateTable3({ spacing: e.target.value === "" ? 0 : Number(e.target.value), steelRatio: undefined })}
              onBlur={(e) => {
                const val = e.target.value;
                if (val === "" || isNaN(Number(val)) || Number(val) < 0) {
                  updateTable3({ spacing: 0, steelRatio: undefined });
                }
              }}
              placeholder="Ej: 20.0"
            />
          </div>
          {results.table3.steelRatio !== undefined && (
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <span className="font-semibold text-blue-800">Cuantía Calculada:</span>
              <span className="ml-2 text-lg font-bold text-blue-900">
                {results.table3.steelRatio.toFixed(2)} {DEFAULT_UNITS.STEEL_RATIO}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={resetTable3}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Resetear
        </Button>
      </div>
      <div className="flex justify-center mb-4 md:justify-end md:mb-0">
        <Button variant="outline" size="sm" onClick={() => setSelectedTable(null)}>
          Cambiar tabla
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          {APP_CONFIG.TITLE}
        </h1>
        <p className="text-gray-600 mt-3 font-light">
          {APP_CONFIG.DESCRIPTION}
        </p>
      </div>

      {/* Contenido Principal */}
      {selectedTable ? (
        <>
          {/* Header de tabla seleccionada con botón para cambiar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {/* Encabezado de cada calculadora */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0">
              <h2 className="text-lg font-bold text-gray-800 text-center md:text-left">
                {tableOptions.find(option => option.value === selectedTable!)?.title}
              </h2>
              <Button
                onClick={() => setSelectedTable(null)}
                className="w-full max-w-xs md:w-auto md:max-w-none h-11 px-8 bg-[#f8b133] text-white border border-gray-800 hover:bg-[#e6a030] transition rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8 md:mt-0 md:ml-4"
                size="sm"
              >
                Cambiar tabla
              </Button>
            </div>
            {renderSelectedTable()}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          {renderSelectedTable()}
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">Especificaciones de Barras de Acero:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rebarSpecs.map((spec) => (
            <div key={spec.diameter} className="text-center">
              <div className="font-semibold text-gray-700">{spec.label}</div>
              <div className="text-sm text-gray-600">
                Área: {spec.area.toFixed(2)} {DEFAULT_UNITS.AREA}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 