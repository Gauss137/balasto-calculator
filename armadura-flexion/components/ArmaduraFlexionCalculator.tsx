"use client";

import { useState } from 'react';

// Tipos para los resultados
interface ResultadosArmadura {
  armaduraTraccion: number;
  armaduraCompresion: number | null;
  armaduraMinima: number;
  armaduraMaxima: number;
  momentoLimite: number;
  necesitaCompresion: boolean;
  cortanteResistente: number;
  sugerenciaBarras: string[];
}

// Tabla de áreas de redondos comerciales
const AREAS_REDONDOS = [
  { diametro: 6, area: 0.28 },
  { diametro: 8, area: 0.50 },
  { diametro: 10, area: 0.79 },
  { diametro: 12, area: 1.13 },
  { diametro: 16, area: 2.01 },
  { diametro: 20, area: 3.14 },
  { diametro: 25, area: 4.91 },
];

export function ArmaduraFlexionCalculator() {
  // Estados para los datos de entrada
  const [momentoFlector, setMomentoFlector] = useState<string>('');
  const [alturaUtil, setAlturaUtil] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [resistenciaAcero, setResistenciaAcero] = useState<string>('500');
  const [resistenciaHormigon, setResistenciaHormigon] = useState<string>('25');
  const [tipoElemento, setTipoElemento] = useState<'viga' | 'losa' | 'pilar'>('viga');

  // Estado para los resultados
  const [resultados, setResultados] = useState<ResultadosArmadura | null>(null);
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(false);

  // Función para calcular las armaduras
  const calcularArmaduras = () => {
    // Validaciones
    if (!momentoFlector || !alturaUtil || !base || !resistenciaAcero || !resistenciaHormigon) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const M = parseFloat(momentoFlector); // kNm
    const h = parseFloat(alturaUtil); // m
    const b = parseFloat(base); // m
    const fyd = parseFloat(resistenciaAcero); // N/mm²
    const fcd = parseFloat(resistenciaHormigon); // N/mm²

    if (M <= 0 || h <= 0 || b <= 0 || fyd <= 0 || fcd <= 0) {
      alert('Todos los valores deben ser positivos');
      return;
    }

    // Convertir unidades
    const h_mm = h * 1000; // mm
    const b_mm = b * 1000; // mm
    const M_Nmm = M * 1000000; // Nmm

    // Cálculo de la armadura de tracción
    const armaduraTraccion = M_Nmm / (0.8 * h_mm * fyd); // mm²

    // Cálculo del momento límite
    const momentoLimite = 0.37 * fcd * b_mm * Math.pow(h_mm, 2); // Nmm

    // Verificar si necesita armadura de compresión
    const necesitaCompresion = M_Nmm > momentoLimite;
    let armaduraCompresion: number | null = null;

    if (necesitaCompresion) {
      // Si necesita compresión, descomponer en tracción + compresión simétrica
      const momentoExcedente = M_Nmm - momentoLimite;
      const armaduraCompresionExtra = momentoExcedente / (fyd * (h_mm - 0.05)); // mm²
      armaduraCompresion = armaduraCompresionExtra;
    }

    // Cálculo de armadura mínima
    let armaduraMinima: number;
    switch (tipoElemento) {
      case 'viga':
        armaduraMinima = 0.0035 * b_mm * h_mm; // 3.5‰
        break;
      case 'losa':
        armaduraMinima = 0.002 * b_mm * h_mm; // 2‰
        break;
      case 'pilar':
        armaduraMinima = 0.004 * b_mm * h_mm; // 4‰
        break;
      default:
        armaduraMinima = 0.0035 * b_mm * h_mm;
    }

    // Cálculo de armadura máxima
    const armaduraMaxima = 0.01 * fcd * b_mm * h_mm / fyd; // 100% fcd

    // Verificación de cortante simplificada
    const cortanteResistente = 0.5 * b_mm * h_mm / 1000; // kN

    // Sugerencia de barras comerciales
    const areaTotal = armaduraTraccion + (armaduraCompresion || 0);
    const sugerenciaBarras = sugerirBarras(areaTotal);

    setResultados({
      armaduraTraccion,
      armaduraCompresion,
      armaduraMinima,
      armaduraMaxima,
      momentoLimite: momentoLimite / 1000000, // Convertir a kNm
      necesitaCompresion,
      cortanteResistente,
      sugerenciaBarras,
    });
  };

  // Función para sugerir barras comerciales
  const sugerirBarras = (areaRequerida: number): string[] => {
    const sugerencias: string[] = [];
    let areaAcumulada = 0;
    
    // Ordenar barras por área (de mayor a menor)
    const barrasOrdenadas = [...AREAS_REDONDOS].sort((a, b) => b.area - a.area);
    
    for (const barra of barrasOrdenadas) {
      if (areaAcumulada >= areaRequerida) break;
      
      const cantidad = Math.ceil((areaRequerida - areaAcumulada) / barra.area);
      if (cantidad > 0) {
        sugerencias.push(`${cantidad}Ø${barra.diametro} (${(cantidad * barra.area).toFixed(2)} cm²)`);
        areaAcumulada += cantidad * barra.area;
      }
    }
    
    return sugerencias;
  };

  // Función para limpiar formulario
  const limpiarFormulario = () => {
    setMomentoFlector('');
    setAlturaUtil('');
    setBase('');
    setResistenciaAcero('500');
    setResistenciaHormigon('25');
    setTipoElemento('viga');
    setResultados(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-primary inline-block pb-1">
          <span className="block">Calculadora de Armaduras a Flexión</span>
          <span className="block">Diseño Estructural EHE</span>
        </h1>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                      Calculadora para estimar armaduras mínimas, máximas y de compresión en secciones a flexión 
                      según normativa EHE.
                    </p>
      </div>

      {/* Sección: Datos de Entrada */}
      <div className="csw-section">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Datos de Entrada</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="csw-label">Momento flector solicitante M [kNm]</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={momentoFlector}
              onChange={(e) => setMomentoFlector(e.target.value)}
              className="csw-input"
              placeholder="Ej: 150.0"
            />
          </div>

          <div>
            <label className="csw-label">Altura útil de la sección h [m]</label>
            <input
              type="number"
              step="0.01"
              min="0.1"
              value={alturaUtil}
              onChange={(e) => setAlturaUtil(e.target.value)}
              className="csw-input"
              placeholder="Ej: 0.45"
            />
          </div>

          <div>
            <label className="csw-label">Base de la sección b [m]</label>
            <input
              type="number"
              step="0.01"
              min="0.1"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="csw-input"
              placeholder="Ej: 0.25"
            />
          </div>

          <div>
            <label className="csw-label">Resistencia de cálculo del acero fyd [N/mm²]</label>
            <input
              type="number"
              step="10"
              min="400"
              max="600"
              value={resistenciaAcero}
              onChange={(e) => setResistenciaAcero(e.target.value)}
              className="csw-input"
              placeholder="Ej: 500"
            />
          </div>

          <div>
            <label className="csw-label">Resistencia de cálculo del hormigón fcd [N/mm²]</label>
            <input
              type="number"
              step="5"
              min="15"
              max="50"
              value={resistenciaHormigon}
              onChange={(e) => setResistenciaHormigon(e.target.value)}
              className="csw-input"
              placeholder="Ej: 25"
            />
          </div>

          <div>
            <label className="csw-label">Tipo de elemento</label>
            <select
              value={tipoElemento}
              onChange={(e) => setTipoElemento(e.target.value as 'viga' | 'losa' | 'pilar')}
              className="csw-input"
            >
              <option value="viga">Viga</option>
              <option value="losa">Losa/Muro</option>
              <option value="pilar">Pilar</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={calcularArmaduras} className="csw-button">
            Calcular Armaduras
          </button>
          <button onClick={limpiarFormulario} className="csw-button-outline">
            Limpiar
          </button>
        </div>
      </div>

      {/* Sección: Resultados */}
      {resultados && (
        <div className="csw-section">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Resultados del Cálculo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Armaduras principales */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Armadura de Tracción</h4>
                <p className="text-2xl font-bold text-blue-900">
                  {(resultados.armaduraTraccion / 100).toFixed(2)} cm²
                </p>
              </div>

              {resultados.necesitaCompresion && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Armadura de Compresión</h4>
                  <p className="text-2xl font-bold text-orange-900">
                    {(resultados.armaduraCompresion! / 100).toFixed(2)} cm²
                  </p>
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Armadura Total</h4>
                <p className="text-2xl font-bold text-green-900">
                  {((resultados.armaduraTraccion + (resultados.armaduraCompresion || 0)) / 100).toFixed(2)} cm²
                </p>
              </div>
            </div>

            {/* Verificaciones */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-2">Verificaciones</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Armadura mínima:</span> {(resultados.armaduraMinima / 100).toFixed(2)} cm²</p>
                  <p><span className="font-medium">Armadura máxima:</span> {(resultados.armaduraMaxima / 100).toFixed(2)} cm²</p>
                  <p><span className="font-medium">Momento límite:</span> {resultados.momentoLimite.toFixed(1)} kNm</p>
                  <p><span className="font-medium">Cortante resistente:</span> {resultados.cortanteResistente.toFixed(1)} kN</p>
                </div>
              </div>

              {/* Sugerencia de barras */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Sugerencia de Barras</h4>
                <ul className="space-y-1">
                  {resultados.sugerenciaBarras.map((sugerencia, index) => (
                    <li key={index} className="text-sm text-purple-700">{sugerencia}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

                        {/* Sección: Tabla Auxiliar - Tabla 1 de Steel Calculator */}
                  <div className="csw-section">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Tabla 1: Cálculo de Cuantía Total de Acero</h3>
                      <button 
                        onClick={() => setMostrarTabla(!mostrarTabla)}
                        className="csw-button-outline text-sm"
                      >
                        {mostrarTabla ? 'Ocultar tabla' : 'Mostrar tabla'}
                      </button>
                    </div>

                    {mostrarTabla && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                          <strong>Úsala cuando:</strong> Tienes las cantidades de barras y necesitas conocer la cuantía total de acero.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {AREAS_REDONDOS.map((barra) => (
                            <div key={barra.diametro} className="space-y-2">
                              <label className="csw-label">
                                Ø{barra.diametro} ({barra.area} cm²)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                max="999"
                                className="csw-input"
                                placeholder="Cantidad"
                                disabled
                              />
                            </div>
                          ))}
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <div className="text-center space-y-2">
                            <div className="font-semibold text-orange-800">Área Total de Acero:</div>
                            <div className="text-2xl font-bold text-orange-900">
                              — cm²
                            </div>
                          </div>
                        </div>

                        <div className="text-center text-sm text-gray-500">
                          Esta tabla muestra cómo calcular la cuantía total de acero basándose en las cantidades de barras de cada diámetro.
                        </div>
                      </div>
                    )}
                  </div>

      {/* Información adicional */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Información Técnica</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• <strong>Armadura de tracción:</strong> A = M / (0.8 × h × fyd)</p>
          <p>• <strong>Momento límite:</strong> M_lim = 0.37 × fcd × b × d²</p>
          <p>• <strong>Armadura mínima:</strong> Según tipo de elemento (2‰, 3.5‰, 4‰)</p>
          <p>• <strong>Armadura máxima:</strong> 100% fcd × A / fyd</p>
          <p>• <strong>Cortante:</strong> V_cu = 0.5 × b × d (simplificado)</p>
        </div>
      </div>
    </div>
  );
}
