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

  const [selectedTab, setSelectedTab] = useState<string>('tabla1');
  // Estado para saber si estamos en cliente
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

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

  // Íconos pequeños para tabs
  const tabIcons = {
    tabla1: <span className="text-lg mr-1 align-middle">A<sub className="text-xs">s</sub></span>,
    tabla2: <span className="text-lg mr-1 align-middle">⌀</span>,
    tabla3: <span className="text-base mr-1 align-middle">A<sub className="text-xs">s</sub>/m</span>,
  };

  // Opciones de tabs y descripciones
  const tabOptions = [
    {
      value: 'tabla1',
      label: 'Cuantía Total',
      title: 'CALCULADORA 1: Cálculo de Cuantía Total de Acero',
      description: 'Tienes las cantidades de barras y necesitas conocer la cuantía total de acero.',
      useCase: '💡 Úsala cuando: Ya tienes definidas las cantidades de barras por diámetro.'
    },
    {
      value: 'tabla2',
      label: 'Cantidades de Barras',
      title: 'CALCULADORA 2: Cálculo de Cantidades de Barras',
      description: 'Tienes una cuantía objetivo y necesitas saber cuántas barras usar de cada diámetro.',
      useCase: '💡 Úsala cuando: Tienes el área de acero requerida del diseño estructural.'
    },
    {
      value: 'tabla3',
      label: 'Cuantías y Separaciones',
      title: 'CALCULADORA 3: Cálculo de Cuantías y Separaciones',
      description: 'Necesitas calcular cuantías de acero por metro lineal o determinar separaciones entre barras.',
      useCase: '💡 Úsala cuando: Necesites cuantías por metro lineal o espaciamientos específicos.'
    }
  ];

  // Renderizado de tabs
  const renderTabs = () => (
    <div className="flex flex-col md:flex-row justify-center border-b border-gray-200 mb-4 gap-2 md:gap-2">
      {tabOptions.map((tab, idx) => (
        <button
          key={tab.value}
          onClick={() => setSelectedTab(tab.value)}
          className={`flex items-center justify-center w-full md:w-56 px-5 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 rounded-t-lg md:rounded-t-lg md:border-b-4 border-l-4 md:border-l-0 -mb-px md:-mb-px whitespace-nowrap ${
            selectedTab === tab.value
              ? 'border-[#f8b133] text-[#f8b133] bg-white shadow-lg'
              : 'border-transparent text-gray-600 hover:text-[#f8b133] hover:bg-gray-50'
          }`}
          style={
            selectedTab === tab.value && isClient
              ? (window.innerWidth < 768
                  ? { boxShadow: '4px 0 16px 0 rgba(248,177,51,0.18)' }
                  : { boxShadow: '0 -4px 16px 0 rgba(248,177,51,0.18)' })
              : undefined
          }
          type="button"
        >
          {tabIcons[tab.value as keyof typeof tabIcons]}
          {tab.label}
        </button>
      ))}
    </div>
  );

  // Renderizado de descripciones siempre visible
  const renderDescriptions = () => (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-col divide-y divide-gray-100">
        {tabOptions.map((option) => (
          <div key={option.value} className="flex flex-col gap-0.5 px-4 py-2">
            <span className="font-bold text-gray-800 text-sm md:text-base">{option.label}</span>
            <span className="text-gray-500 text-xs md:text-sm leading-tight">{option.description}</span>
            <span className="text-xs md:text-sm text-gray-600 mt-1">{option.useCase.replace('💡 ', '')}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizado de la calculadora activa
  const renderActiveCalculator = () => {
    switch (selectedTab) {
      case 'tabla1':
        return renderTable1();
      case 'tabla2':
        return renderTable2();
      case 'tabla3':
        return renderTable3();
      default:
        return null;
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
              value={inputData.table1.quantities[spec.diameter.toString()] === 0 ? "" : inputData.table1.quantities[spec.diameter.toString()]}
              onChange={(e) => {
                const val = e.target.value;
                // Permite vacío en el input, pero guarda 0 en el estado si está vacío
                updateTable1Quantity(spec.diameter.toString(), val === "" ? 0 : Number(val));
              }}
              onBlur={(e) => {
                if (e.target.value === "" || isNaN(Number(e.target.value)) || Number(e.target.value) < 0) {
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
          value={inputData.table2.targetArea === 0 ? "" : inputData.table2.targetArea}
          onChange={(e) => {
            const val = e.target.value;
            updateTable2TargetArea(val === "" ? 0 : Number(val));
          }}
          onBlur={(e) => {
            if (e.target.value === "" || isNaN(Number(e.target.value)) || Number(e.target.value) < 0) {
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
    </div>
  );

  const renderTable3 = () => (
    <div className="space-y-4">
      {/* Selección de barras */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">1. Seleccionar Barras y Cantidades:</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
          {rebarSpecs.map((spec) => (
            <div
              key={spec.diameter}
              className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 border rounded"
            >
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
                className="w-3 h-3 md:w-4 md:h-4"
              />
              <Label htmlFor={`table3-check-${spec.diameter}`} className="flex-1 text-sm md:text-base">
                {spec.label}
              </Label>
              <Input
                type="number"
                min="1"
                step="1"
                max="99"
                value={inputData.table3.quantities[spec.diameter.toString()] === 0 ? "" : inputData.table3.quantities[spec.diameter.toString()]}
                onChange={(e) => {
                  const val = e.target.value;
                  updateTable3({
                    quantities: {
                      ...inputData.table3.quantities,
                      [spec.diameter.toString()]: val === "" ? 0 : Number(val)
                    }
                  });
                }}
                onBlur={(e) => {
                  if (e.target.value === "" || isNaN(Number(e.target.value)) || Number(e.target.value) < 1) {
                    updateTable3({
                      quantities: {
                        ...inputData.table3.quantities,
                        [spec.diameter.toString()]: 1
                      }
                    });
                  }
                }}
                className="w-12 md:w-16 text-sm md:text-base"
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
              value={inputData.table3.steelRatio === 0 || inputData.table3.steelRatio === undefined ? "" : inputData.table3.steelRatio}
              onChange={(e) => updateTable3({ steelRatio: e.target.value === "" ? 0 : Number(e.target.value), spacing: undefined })}
              onBlur={(e) => {
                if (e.target.value === "" || isNaN(Number(e.target.value)) || Number(e.target.value) < 0) {
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
              value={inputData.table3.spacing === 0 || inputData.table3.spacing === undefined ? "" : inputData.table3.spacing}
              onChange={(e) => updateTable3({ spacing: e.target.value === "" ? 0 : Number(e.target.value), steelRatio: undefined })}
              onBlur={(e) => {
                if (e.target.value === "" || isNaN(Number(e.target.value)) || Number(e.target.value) < 0) {
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

      {/* Descripciones siempre visibles */}
      {renderDescriptions()}

      {/* Tabs y calculadora activa */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {renderTabs()}
        <div className="mt-6">{renderActiveCalculator()}</div>
      </div>

    </div>
  );
} 