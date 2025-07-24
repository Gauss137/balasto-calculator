"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleSection } from "@/components/ui/ToggleSection";
import Image from "next/image";
import { Download } from "lucide-react";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { useBeamCalculator } from '@/hooks/useBeamCalculator';
import { useModal } from '@/hooks/useModal';
import { downloadCSV } from '@/lib/csv-export';
import { BEAM_DEFAULT_UNITS as DEFAULT_UNITS, BEAM_APP_CONFIG as config } from '@/lib/beam-constants';
import { BeamInputData } from '@/types';

export function BeamCalculator() {
  const { inputData, results, isCalculated, isValidInput, updateInput, calculate } = useBeamCalculator();
  const { isOpen: showFormulas, toggleModal: toggleFormulas } = useModal(false);
  const { isOpen: showDiagram, toggleModal: toggleDiagram } = useModal(true);

  const handleInputChange = (field: keyof BeamInputData, value: string) => {
    updateInput(field, value);
  };

  const handleDownloadCSV = () => {
    if (!isCalculated) return;
    downloadCSV(inputData, results);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          {config.TITLE}
        </h1>
        <p className="text-gray-600 mt-3 font-light">
          {config.DESCRIPTION}
        </p>
      </div>

      {/* Diagram Section */}
      <ToggleSection 
        isOpen={showDiagram} 
        onToggle={toggleDiagram} 
        title="Esquema"
      >
        <div className="w-full flex justify-center items-center h-60 md:h-80 bg-white text-gray-500 relative overflow-hidden rounded-lg border border-gray-200">
          <div className="relative w-full h-full flex justify-center items-center select-none">
            <Image
              src="/Calculadora de Viga Simplemente Apoyada con Carga Uniforme.svg"
              alt="Esquema de la viga simplemente apoyada con carga uniforme"
              width={800}
              height={300}
              style={{ 
                objectFit: "contain", 
                maxWidth: "100%", 
                maxHeight: "100%",
                userSelect: 'none'
              }}
              draggable={false}
              priority
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 opacity-50 pointer-events-none select-none">
              © {config.COMPANY}
            </div>
          </div>
        </div>
      </ToggleSection>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Datos de cálculo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="L">Longitud de la viga (L) [{DEFAULT_UNITS.LENGTH}]</Label>
            <Input
              id="L"
              type="number"
              step="0.01"
              value={inputData.L}
              onChange={(e) => handleInputChange('L', e.target.value)}
              placeholder="Ej: 1.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="w">Carga uniforme (w) [{DEFAULT_UNITS.DISTRIBUTED_LOAD}]</Label>
            <Input
              id="w"
              type="number"
              step="0.01"
              value={inputData.w}
              onChange={(e) => handleInputChange('w', e.target.value)}
              placeholder="Ej: 1.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="E">Módulo de elasticidad (E) [{DEFAULT_UNITS.ELASTIC_MODULUS}]</Label>
            <Input
              id="E"
              type="number"
              step="100"
              value={inputData.E}
              onChange={(e) => handleInputChange('E', e.target.value)}
              placeholder="Ej: 200000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="I">Momento de inercia (I) [{DEFAULT_UNITS.MOMENT_INERTIA}]</Label>
            <Input
              id="I"
              type="number"
              step="1000"
              value={inputData.I}
              onChange={(e) => handleInputChange('I', e.target.value)}
              placeholder="Ej: 180000"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="x">Sección analizada (x) [{DEFAULT_UNITS.LENGTH}]</Label>
            <Input
              id="x"
              type="number"
              step="0.01"
              min="0"
              value={inputData.x}
              onChange={(e) => handleInputChange('x', e.target.value)}
              placeholder="Ej: 0.5"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={calculate}
            disabled={!isValidInput}
            className="w-full max-w-xs h-11 px-8 bg-[#f8b133] text-white border border-gray-800 hover:bg-[#e6a030] transition rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calcular
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resultados del cálculo</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Reacción en apoyos (R):</span>
            <span className="font-mono font-semibold">{results.R} {DEFAULT_UNITS.FORCE}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Cortante máximo (Vmax):</span>
            <span className="font-mono font-semibold">{results.Vmax} {DEFAULT_UNITS.FORCE}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Cortante en x (Vx):</span>
            <span className="font-mono font-semibold">{results.Vx} {DEFAULT_UNITS.FORCE}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Momento máximo (Mmax):</span>
            <span className="font-mono font-semibold">{results.Mmax} {DEFAULT_UNITS.MOMENT}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Momento en x (Mx):</span>
            <span className="font-mono font-semibold">{results.Mx} {DEFAULT_UNITS.MOMENT}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Flecha máxima (Δmax):</span>
            <span className="font-mono font-semibold">{results.Dmax} {DEFAULT_UNITS.DEFLECTION}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Flecha en x (Δx):</span>
            <span className="font-mono font-semibold">{results.Dx} {DEFAULT_UNITS.DEFLECTION}</span>
          </div>
        </div>

        {isCalculated && (
          <div className="mt-4 flex justify-center">
            <Button 
              onClick={handleDownloadCSV}
              className="w-full max-w-xs h-11 px-8 bg-[#f8b133] text-white border border-gray-800 hover:bg-[#e6a030] transition rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Descargar resultados (CSV)
            </Button>
          </div>
        )}
      </div>

      {/* Formulas Section */}
      <ToggleSection 
        isOpen={showFormulas} 
        onToggle={toggleFormulas} 
        title="Fórmulas utilizadas"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Reacciones:</h3>
            <div className="bg-gray-50 p-3 rounded border">
              <div className="text-center font-mono text-sm">
                R = wL/2
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Fuerzas cortantes:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Cortante máximo:</span>
                  <div className="font-mono text-sm">V_max = wL/2</div>
                </div>
              </div>
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Cortante en sección x:</span>
                  <div className="font-mono text-sm">V_x = w(L/2 - x)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Momentos flectores:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Momento máximo:</span>
                  <div className="font-mono text-sm">M_max = wL²/8</div>
                </div>
              </div>
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Momento en sección x:</span>
                  <div className="font-mono text-sm">M_x = (wx/2)(L - x)</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Deflexiones:</h3>
            <div className="bg-gray-50 p-3 rounded border space-y-3">
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Flecha máxima:</span>
                  <div className="font-mono text-sm">Δ_max = 5wL⁴/(384EI)</div>
                </div>
              </div>
              <div>
                <div className="text-center">
                  <span className="block text-sm text-gray-600 mb-1">Flecha en sección x:</span>
                  <div className="font-mono text-sm">Δ_x = wx²(L³ - 2Lx² + x³)/(24EI)</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </ToggleSection>
    </div>
  );
} 