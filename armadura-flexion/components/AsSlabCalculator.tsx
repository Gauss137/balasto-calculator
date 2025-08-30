"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function AsSlabCalculator() {
  // Entradas
  // b fijo en 1m
  const b = "1";
  const [h, setH] = useState<string>("0.15"); // [m]
  const [recubEje, setRecubEje] = useState<string>("0.025"); // [m]
  const [fc, setFc] = useState<string>("25"); // [MPa]
  const [fy, setFy] = useState<string>("420"); // [MPa]
  const [Mu, setMu] = useState<string>("12"); // [kN-m]

  // Resultados / mensajes
  const [resultado, setResultado] = useState<string>("");

  const calcular = () => {
    // Parseos
    const _b = parseFloat(b);
    const _h = parseFloat(h);
    const _recub = parseFloat(recubEje);
    const _fc = parseFloat(fc);
    const _fy = parseFloat(fy);
    const _Mu = parseFloat(Mu);

    if (
      [_b, _h, _recub, _fc, _fy, _Mu].some(
        (v) => isNaN(v) || !isFinite(v)
      )
    ) {
      setResultado("Complete todos los valores numéricamente válidos.");
      return;
    }

    // ======= REPLICACIÓN FIDEDIGNA DE LAS FÓRMULAS / CONDICIONALES DEL HTML =======
    let signoMomento = 0;
    if (_Mu >= 0) {
      signoMomento = 1;
    } else {
      signoMomento = -1;
    }

    const d = _h - _recub;

    let beta: number;
    if (_fc < 28) {
      beta = 0.85;
    } else if (_fc > 55) {
      beta = 0.65;
    } else {
      beta = 0.85 - (0.05 * (_fc - 28)) / 7;
    }

    const eu = 0.003; // deform. unit. hormigón
    const RoMax = (0.85 * beta * _fc * eu) / (_fy * (eu + 0.005));
    const AsMax = RoMax * _b * d; // m²
    const AsMaxCm = Math.round(AsMax * 1000000) / 100; // cm²
    let fiMmax =
      0.9 *
      AsMax *
      _fy *
      (d - (AsMax * _fy) / (2 * 0.85 * _fc * _b)) *
      1000; // kN-m
    fiMmax = Math.round(fiMmax * 100) / 100;

    const AsMin = 0.0018 * _h * 10000; // cm²/m
    const AsMinCm = parseFloat(AsMin.toFixed(2)); // cm² con 2 decimales
    const AsMinCmFormatted = AsMin.toFixed(2); // cm² con 2 decimales para mostrar

    let texto = "";

    if (_Mu < fiMmax) {
      const As =
        (0.9 * d -
          Math.sqrt(
            0.81 * Math.pow(d, 2) - 1.8 * (_Mu / 1000) / (0.85 * _fc * _b)
          )) /
        (0.9 * _fy / (0.85 * _fc * _b));
      const AsCm = Math.round(As * 1000000) / 100;

      texto =
        "La losa **no necesita** acero a compresion.\n" +
        "As-max= " +
        AsMaxCm +
        " cm2/m\n" +
        "fi Mn-max= " +
        fiMmax +
        " kNm/m\n" +
        "As-min = " +
        AsMinCmFormatted +
        " cm2/m\n" +
        "As = " +
        AsCm +
        " cm2/m";
    } else {
      const M2 = (_Mu - fiMmax) / 0.9;
      const As2 = (M2 / 1000) / (_fy * (d - _recub));
      const As = AsMax + As2;
      const AsCm = Math.round(As * 1000000) / 100;
      const AsComp = As2;
      const AsCompCm = Math.round(AsComp * 1000000) / 100;

      const RoY =
        ((0.85 * _fc) / _fy) * beta * (eu / (eu - _fy / 200000)) * (_recub / d) +
        AsComp / (_b * d);
      const Ro = As / (_b * d);

      if (Ro > RoY) {
        texto =
          "La losa **necesitaría** acero a compresion. Incrementar h para evitar el uso de acero a compresion.\n" +
          "As-max= " +
          AsMaxCm +
          " cm2/m\n" +
          "fi Mn-max= " +
          fiMmax +
          " kNm/m\n" +
          "As-min = " +
          AsMinCmFormatted +
          " cm2/m\n" +
          "As = " +
          AsCm +
          " cm2/m\n " +
          "As' = " +
          AsCompCm +
          " cm2/m";
      } else {
        const a = ((As - AsComp) * _fy) / (0.85 * _fc * _b);
        const c = a / beta;
        const fsComp = eu * 200000 * ((c - _recub) / c);
        const AsCompRev = (AsComp * _fy) / fsComp;
        const AsCompRevCm = Math.round(AsCompRev * 1000000) / 100;

        texto =
          "La losa **necesitaría** acero a compresion. Incrementar h para evitar el uso de acero a compresion.\n" +
          "As-max= " +
          AsMaxCm +
          " cm2/m\n " +
          "fi Mn-max= " +
          fiMmax +
          " kNm/m\n" +
          "As-min = " +
          AsMinCmFormatted +
          " cm2/m\n" +
          "As = " +
          AsCm +
          " cm2/m\n " +
          "As' = " +
          AsCompRevCm +
          " cm2/m";
      }
    }

    setResultado(texto);
  };

  // Función para descargar resultados en CSV
  const descargarResultados = () => {
    if (!resultado) return;
    
    // Parsear el resultado para extraer los valores
    const lines = resultado.split('\n');
    const csvData = [
      'DATOS DE ENTRADA',
      'Parámetro,Valor,Unidad',
      `Ancho de losa (b),${b},m`,
      `Altura de losa (h),${h},m`,
      `Recubrimiento al eje (recub_eje),${recubEje},m`,
      `Resistencia del hormigón (f'c),${fc},MPa`,
      `Fluencia del acero (fy),${fy},MPa`,
      `Momento mayorado (Mu),${Mu},kNm/m`,
      '',
      'RESULTADOS DEL CÁLCULO',
      'Concepto,Valor,Unidad'
    ];
    
    // Agregar resultados parseados separando valor y unidad
    lines.forEach(line => {
      const eqIdx = line.indexOf('=');
      if (eqIdx > 0) {
        const label = line.slice(0, eqIdx).trim();
        const valueWithUnit = line.slice(eqIdx + 1).trim();
        
        // Separar valor y unidad para los resultados
        if (label.includes('As-max') || label.includes('fi Mn-max') || label.includes('As-min') || label.includes('As') || label.includes("As'")) {
          // Para valores numéricos, extraer solo el número
          const numericValue = valueWithUnit.match(/[\d.]+/)?.[0] || valueWithUnit;
          const unit = valueWithUnit.replace(/[\d.]+/, '').trim();
          csvData.push(`${label},${numericValue},${unit}`);
        } else if (label.includes('Refuerzo')) {
          // Para el refuerzo, mantener el valor completo sin unidad
          csvData.push(`${label},${valueWithUnit},`);
        } else {
          // Para otros casos, mantener como está
          csvData.push(`${label},${valueWithUnit},`);
        }
      }
    });
    
    const csvContent = csvData.join('\n');
    const filename = `diseno_acero_losas.csv`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
          Armadura a flexión en losas
        </h1>
        <p className="text-gray-600 mt-3 font-light">
          Calcula el área de acero necesaria para resistir momentos flectores en losas de hormigón armado
        </p>
      </div>

      <section className="bg-white p-4 rounded-lg border space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Datos de entrada
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="b">Ancho de Losa b [m]</Label>
            <Input id="b" type="number" value={b} disabled className="bg-gray-100 cursor-not-allowed" />
          </div>
          <div>
            <Label htmlFor="h">Altura de Losa h [m]</Label>
            <Input 
              id="h" 
              type="number" 
              value={h} 
              onChange={(e) => setH(e.target.value)}
              step="0.01"
              min="0.05"
              max="1.00"
            />
          </div>
          <div>
            <Label htmlFor="recub">Recub_eje [m]</Label>
            <Input 
              id="recub" 
              type="number" 
              value={recubEje} 
              onChange={(e) => setRecubEje(e.target.value)}
              step="0.001"
              min="0.015"
              max="0.050"
            />
          </div>
          <div>
            <Label htmlFor="fc">f'c [MPa]</Label>
            <Input id="fc" type="number" value={fc} onChange={(e) => setFc(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="fy">fy [MPa]</Label>
            <Input id="fy" type="number" value={fy} onChange={(e) => setFy(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="Mu">Mu [kNm/m]</Label>
            <Input id="Mu" type="number" value={Mu} onChange={(e) => setMu(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={calcular}
            className="w-full max-w-xs h-11 px-8 bg-[#f8b133] text-white border border-gray-800 hover:bg-[#e6a030] transition rounded-md font-medium flex items-center justify-center gap-2"
          >
            Calcular
          </Button>
        </div>
      </section>

      {/* Bloque de resultados igual a BeamCalculator, siempre visible */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resultados del cálculo</h2>
        <div className="space-y-0.5">
          {resultado
            ? resultado.split('\n').map((line, idx) => {
                const eqIdx = line.indexOf('=');
                if (eqIdx > 0) {
                  // Separar nombre y valor
                  const label = line.slice(0, eqIdx + 1).trim();
                  const value = line.slice(eqIdx + 1).trim();
                  return (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{label}</span>
                      <span className="font-mono font-semibold">{value}</span>
                    </div>
                  );
                } else {
                  // Mensaje o línea única con soporte para markdown básico
                  const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  return (
                    <div key={idx} className="flex justify-center py-2 border-b border-gray-100 last:border-b-0">
                      <span 
                        className="text-gray-700 text-center w-full"
                        dangerouslySetInnerHTML={{ __html: formattedLine }}
                      />
                    </div>
                  );
                }
              })
            : <div className="text-center text-gray-400 text-sm">—</div>
          }
        </div>
        
                 {/* Enlace a calculadora de acero estructural - Solo cuando NO necesita acero a compresión */}
         {resultado && !resultado.includes('**necesitaría** acero a compresion') && (
           <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
             <h3 className="text-md font-semibold text-blue-800 mb-2">
               🏗️ Calcular refuerzo y espaciamiento
             </h3>
                          <p className="text-sm text-blue-700 mb-3">
                Con el área de acero calculada, puedes determinar el número de barras y espaciamiento. Una vez en la página, haz clic en la pestaña "Cuantías y Separaciones" (la tercera calculadora de izquierda a derecha).
              </p>
             <div className="flex justify-center">
               <a 
                 href="https://steelcalculator.cswingenieriacivil.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
               >
                 Ir a Calculadora de Cuantías y Separaciones →
               </a>
             </div>
           </div>
         )}
        

      </div>

    </div>
  );
}
