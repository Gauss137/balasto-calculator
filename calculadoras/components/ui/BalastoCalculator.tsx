// Calculadora de Módulo de Balasto
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function BalastoCalculator() {
   const [tipoLosa, setTipoLosa] = useState("Cuadrada");
   const [ladoLargo, setLadoLargo] = useState("0.3");
   const [ladoCorto, setLadoCorto] = useState("0.3");
     const [tabla, setTabla] = useState("2");
     const [tipoSuelo, setTipoSuelo] = useState("Granular");
     const [resultado, setResultado] = useState<number | null>(null);
   const [kUtilizado, setKUtilizado] = useState<number | null>(null);
               const [valoresIntermedios, setValoresIntermedios] = useState<{
       moduloBaseGranular: number, 
       moduloBaseCohesivo: number, 
       moduloReferencia: number, 
       moduloFinalGranular: number, 
       moduloFinalCohesivo: number, 
       factorForma: number
     } | null>(null);
     const [kUsuario, setKUsuario] = useState("");
       const [porcentajeGranular, setPorcentajeGranular] = useState("50");
     // Estado para mostrar/ocultar tablas
   const [mostrarTablas, setMostrarTablas] = useState(false);

  // Manejar cambio de tipo de losa
  const handleTipoLosaChange = (nuevoTipo: string) => {
    setTipoLosa(nuevoTipo);
    // Si cambia a cuadrada, sincronizar los lados
    if (nuevoTipo === "Cuadrada") {
      setLadoCorto(ladoLargo);
    }
  };

     // Manejar cambio de lado largo
   const handleLadoLargoChange = (valor: string) => {
     setLadoLargo(valor);
     if (tipoLosa === "Cuadrada") {
       setLadoCorto(valor);
     }
   };

     // Manejar cambio de lado corto
   const handleLadoCortoChange = (valor: string) => {
     setLadoCorto(valor);
   };

     // Manejar cambio de kUsuario
   const handleKUsuarioChange = (valor: string) => {
     setKUsuario(valor);
   };

     // Manejar cambio de porcentajeGranular
   const handlePorcentajeGranularChange = (valor: string) => {
     setPorcentajeGranular(valor);
   };

     const calcularModulo = () => {
     const J11 = parseFloat(ladoLargo);  // Lado largo
     const J12 = parseFloat(ladoCorto);  // Lado corto
     
     // Validaciones
     if (J11 < 0.3) {
       alert("El lado largo debe ser mayor o igual a 0.3 metros");
       return;
     }
     
     if (tipoLosa === "Rectangular" && J12 < 0.3) {
       alert("El lado corto debe ser mayor o igual a 0.3 metros para losas rectangulares");
       return;
     }
    
     // Calcular k según el tipo de suelo (E15 en Excel)
     if (parseFloat(kUsuario) <= 0) {
       alert("Debe ingresar un valor válido para el coeficiente k");
       return;
     }
     const E15 = parseFloat(kUsuario);

           // Cálculo del factor de forma (n) = SI(E11="Cuadrada", 1, J11/J12)
      const factorForma = tipoLosa === "Cuadrada" ? 1 : J11 / J12;
      
      // Cálculo del módulo base para suelo granular
      let moduloBaseGranular: number;
      if (tipoLosa === "Cuadrada") {
        // Para cuadrada: (((J11*100)+30)*((J11*100)+30)/((2*100*J11)*(2*100*J11)))*E15
        moduloBaseGranular = (((J11 * 100) + 30) * ((J11 * 100) + 30) / ((2 * 100 * J11) * (2 * 100 * J11))) * E15;
      } else {
        // Para rectangular: (2/3)*((((J12*100)+30)*((J12*100)+30)/((2*100*J12)*(2*100*J12)))*E15)*(1+(J12/(2*J11)))
        const basePart = (((J12 * 100) + 30) * ((J12 * 100) + 30) / ((2 * 100 * J12) * (2 * 100 * J12))) * E15;
        moduloBaseGranular = (2/3) * basePart * (1 + (J12 / (2 * J11)));
      }
      
      // Cálculo del módulo base para suelo cohesivo
      // H10 = (((factorForma+0.5)*30)/(1.5*factorForma*100*SI(E11="Cuadrada",J11,J12)))*E15
      const dimensionLosa = tipoLosa === "Cuadrada" ? J11 : J12;
      const moduloBaseCohesivo = (((factorForma + 0.5) * 30) / (1.5 * factorForma * 100 * dimensionLosa)) * E15;
      
      // Cálculo del módulo de referencia general
      // I10 = (((J11*100)+30)*((J11*100)+30)/((2*100*J11)*(2*100*J11)))*E15
      const moduloReferencia = (((J11 * 100) + 30) * ((J11 * 100) + 30) / ((2 * 100 * J11) * (2 * 100 * J11))) * E15;

      // Cálculos finales del coeficiente de balasto corregido
      let moduloFinalGranular, moduloFinalCohesivo; // Valores finales corregidos
      
      // Módulo final granular = SI(E11="Cuadrada", E15*(((J11+0.3)/(2*J11))^2), E15*((factorForma+0.5)/(1.5*factorForma))*(((J12+0.3)/(2*J12))^2))
      if (tipoLosa === "Cuadrada") {
        moduloFinalGranular = E15 * (((J11 + 0.3) / (2 * J11)) ** 2);
      } else {
        moduloFinalGranular = E15 * ((factorForma + 0.5) / (1.5 * factorForma)) * (((J12 + 0.3) / (2 * J12)) ** 2);
      }
      
      // Módulo final cohesivo = SI(E11="Cuadrada", E15*(0.3/J11), E15*((factorForma+0.5)/(1.5*factorForma))*(0.3/J12))
      if (tipoLosa === "Cuadrada") {
        moduloFinalCohesivo = E15 * (0.3 / J11);
      } else {
        moduloFinalCohesivo = E15 * ((factorForma + 0.5) / (1.5 * factorForma)) * (0.3 / J12);
      }

      // Resultado final según tipo de suelo
      // Mixto = SI(E14="Granular", moduloFinalGranular, SI(E14="Cohesivo", moduloFinalCohesivo, ((J14/100)*moduloFinalGranular)+((J15/100)*moduloFinalCohesivo)))
      let coeficienteBalastoFinal: number;
      
      if (tipoSuelo === "Granular") {
        coeficienteBalastoFinal = moduloFinalGranular;
      } else if (tipoSuelo === "Cohesivo") {
        coeficienteBalastoFinal = moduloFinalCohesivo;
      } else { // tipoSuelo === "Mixto"
        const porcentajeCohesivo = 100 - parseFloat(porcentajeGranular);
        coeficienteBalastoFinal = ((parseFloat(porcentajeGranular) / 100) * moduloFinalGranular) + ((porcentajeCohesivo / 100) * moduloFinalCohesivo);
      }

            setResultado(coeficienteBalastoFinal);
       setKUtilizado(E15);
       setValoresIntermedios({
         moduloBaseGranular: moduloBaseGranular,
         moduloBaseCohesivo: moduloBaseCohesivo,
         moduloReferencia: moduloReferencia,
         moduloFinalGranular: moduloFinalGranular,
         moduloFinalCohesivo: moduloFinalCohesivo,
         factorForma: factorForma
       });
   };

     const renderTablaReferencia = () => {
     return (
       <div className="text-sm text-gray-600 space-y-2">
         <p className="font-semibold">Valores de K30 propuestos por Terzaghi para placa de 30x30 cm</p>
         <table className="table-auto w-full border text-xs">
           <thead>
             <tr className="bg-gray-100">
               <th className="border px-2 py-1">Clases de suelo</th>
               <th className="border px-2 py-1">Coeficiente de balasto (MN/m³)</th>
               <th className="border px-2 py-1">Coeficiente de balasto (kp/cm³)</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td className="border px-2 py-1 font-semibold" colSpan={3}>Arena seca o húmeda</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Suelta</td>
               <td className="border px-2 py-1">8 - 25</td>
               <td className="border px-2 py-1">0.8 - 2.5</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Media</td>
               <td className="border px-2 py-1">25 - 125</td>
               <td className="border px-2 py-1">2.5 - 12.7</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Densa</td>
               <td className="border px-2 py-1">125 - 375</td>
               <td className="border px-2 py-1">12.7 - 38.2</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 font-semibold" colSpan={3}>Arena sumergida</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Suelta</td>
               <td className="border px-2 py-1">10 - 15</td>
               <td className="border px-2 py-1">1.0 - 1.5</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Media</td>
               <td className="border px-2 py-1">35 - 40</td>
               <td className="border px-2 py-1">3.6 - 4.1</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Densa</td>
               <td className="border px-2 py-1">130 - 150</td>
               <td className="border px-2 py-1">13.3 - 15.3</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 font-semibold" colSpan={3}>Arcilla</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Rígida</td>
               <td className="border px-2 py-1">10 - 25</td>
               <td className="border px-2 py-1">1.0 - 2.5</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Muy rígida</td>
               <td className="border px-2 py-1">25 - 50</td>
               <td className="border px-2 py-1">2.5 - 5.1</td>
             </tr>
             <tr>
               <td className="border px-2 py-1 pl-4">- Dura</td>
               <td className="border px-2 py-1">&gt; 50</td>
               <td className="border px-2 py-1">&gt; 5.1</td>
             </tr>
           </tbody>
         </table>
       </div>
     );
   };

           return (
             <div className="max-w-3xl mx-auto space-y-6 px-4">
         {/* Header */}
         <div className="text-center">
           <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f8b133] inline-block pb-1">
             Adaptación Del Coeficiente De Balasto De Una Placa De Carga De 30cmx30cm Para Emplearlo En El Método De Diseño Flexible Aproximado De Losas
           </h1>
         </div>
      
      

      {/* Sección: Geometría de la losa */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Geometría de la losa</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tipo-losa">Tipo de losa</Label>
            <select value={tipoLosa} onChange={(e) => handleTipoLosaChange(e.target.value)} id="tipo-losa" className="w-full border rounded p-2">
              <option value="Cuadrada">Cuadrada</option>
              <option value="Rectangular">Rectangular</option>
            </select>
          </div>

                     <div>
             <Label htmlFor="ladoLargo">{tipoLosa === "Cuadrada" ? "Lado (m)" : "Lado largo (m)"}</Label>
                           <Input
                id="ladoLargo"
                type="number"
                min="0.3"
                step="0.01"
                value={ladoLargo}
                onChange={(e) => handleLadoLargoChange(e.target.value)}
                onBlur={() => {
                  if (ladoLargo === "" || parseFloat(ladoLargo) < 0.3 || isNaN(parseFloat(ladoLargo))) {
                    setLadoLargo("0.3");
                    if (tipoLosa === "Cuadrada") setLadoCorto("0.3");
                  }
                }}
              />
           </div>

                       <div>
              <Label htmlFor="ladoCorto">Lado corto (m)</Label>
              <Input
                id="ladoCorto"
                type="number"
                min="0.3"
                step="0.01"
                value={ladoCorto}
                onChange={(e) => handleLadoCortoChange(e.target.value)}
                onBlur={() => {
                  if (ladoCorto === "" || parseFloat(ladoCorto) < 0.3 || isNaN(parseFloat(ladoCorto))) {
                    setLadoCorto("0.3");
                  }
                }}
                disabled={tipoLosa === "Cuadrada"}
                className={tipoLosa === "Cuadrada" ? "bg-gray-100 cursor-not-allowed" : ""}
                placeholder={tipoLosa === "Cuadrada" ? "Igual al lado" : "Ingrese valor"}
              />
            </div>
        </div>
      </div>

             {/* Sección: Tipo de suelo */}
       <div className="bg-gray-50 p-4 rounded-lg border">
         <h3 className="text-lg font-semibold mb-4 text-gray-800">Tipo de suelo</h3>
         
         <div className="max-w-md">
           <div>
             <Label htmlFor="tipo-suelo">Seleccione el tipo de suelo</Label>
                           <select value={tipoSuelo} onChange={(e) => setTipoSuelo(e.target.value)} id="tipo-suelo" className="w-full border rounded p-2">
                <option value="Granular">Granular</option>
                <option value="Cohesivo">Cohesivo</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>
          </div>

                    {/* Proporciones del suelo - siempre visible */}
           <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
             <div className="mb-3">
               <p className="text-sm text-blue-800 font-medium">
                 📝 {tipoSuelo === "Mixto" ? "Suelo Mixto: Defina las proporciones." : `Suelo ${tipoSuelo}: Proporciones del terreno.`}
               </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <Label htmlFor="porcentajeGranular">% Granular</Label>
                                   <Input
                    id="porcentajeGranular"
                    type="number"
                    min="0"
                    max="100"
                    value={tipoSuelo === "Granular" ? 100 : tipoSuelo === "Cohesivo" ? 0 : porcentajeGranular}
                    onChange={(e) => tipoSuelo === "Mixto" && handlePorcentajeGranularChange(e.target.value)}
                    onBlur={() => {
                      if (porcentajeGranular === "" || parseFloat(porcentajeGranular) < 0 || parseFloat(porcentajeGranular) > 100 || isNaN(parseFloat(porcentajeGranular))) {
                        setPorcentajeGranular("50");
                      }
                    }}
                    disabled={tipoSuelo !== "Mixto"}
                    className={tipoSuelo !== "Mixto" ? "bg-gray-100 cursor-not-allowed" : ""}
                  />
               </div>
               <div>
                 <Label htmlFor="porcentajeCohesivo">% Cohesivo</Label>
                 <Input
                   id="porcentajeCohesivo"
                   type="number"
                   value={tipoSuelo === "Granular" ? 0 : tipoSuelo === "Cohesivo" ? 100 : 100 - parseFloat(porcentajeGranular)}
                   disabled
                   className="bg-gray-100 cursor-not-allowed"
                 />
               </div>
             </div>
           </div>
       </div>

             {/* Sección: Valores de k */}
       <div className="bg-gray-50 p-4 rounded-lg border">
         <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-semibold text-gray-800">Coeficiente de balasto (k)</h3>
                       <Button
              onClick={() => setMostrarTablas(!mostrarTablas)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {mostrarTablas ? "Ocultar tabla" : "Mostrar tabla"}
            </Button>
         </div>

         {/* Tablas de referencia - condicionales */}
         {mostrarTablas && (
           <div className="mb-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                           <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📋</span>
                <p className="text-sm text-yellow-800 font-medium">
                  Tabla de referencia para selección del coeficiente k
                </p>
              </div>
              
              {renderTablaReferencia()}
           </div>
         )}
         
                             <div className="space-y-4">
            <div>
              <Label htmlFor="kUsuario">Valor de k adoptado (kp/cm³)</Label>
                             <Input
                 id="kUsuario"
                 type="number"
                 step="0.001"
                 min="0"
                 value={kUsuario === undefined || kUsuario === null || isNaN(Number(kUsuario)) ? "" : kUsuario}
                 onChange={(e) => handleKUsuarioChange(e.target.value)}
                 onBlur={() => {
                   if (kUsuario === "" || parseFloat(kUsuario) <= 0 || isNaN(parseFloat(kUsuario))) {
                     setKUsuario("0");
                   }
                 }}
               />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <p className="text-xs text-gray-500 mt-1">
                      Consulte la tabla de referencia para seleccionar un valor apropiado o utilice un valor k definido por un especialista
                      {tipoSuelo === "Mixto" && ", considerando las proporciones de tipo de suelo definidas"}.
                    </p>
            </div>
          </div>
       </div>

      <div className="mt-6 flex justify-center">
        <Button 
          onClick={calcularModulo}
          className="w-full max-w-xs h-11 px-8 bg-[#f8b133] text-white border border-gray-800 hover:bg-[#e6a030] transition rounded-md font-medium flex items-center justify-center gap-2"
        >
          Calcular
        </Button>
      </div>

             <div className="text-center">
         {resultado !== null && (
                       <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
              <div className="font-semibold text-green-800 mb-4">Resultado del Coeficiente de Balasto (Módulo de Reacción de Subrasante):</div>
              
              {/* Tabla de resultados con conversiones */}
              <div className="bg-white p-4 rounded-lg border mx-auto max-w-lg">
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-2 text-center font-medium">kp/cm³</th>
                      <th className="border px-2 py-2 text-center font-medium">t/m³</th>
                      <th className="border px-2 py-2 text-center font-medium">kN/m³</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-2 text-center font-bold text-lg text-green-900">
                        {resultado.toFixed(3)}
                      </td>
                      <td className="border px-2 py-2 text-center font-bold text-lg text-green-900">
                        {(resultado * 1000).toFixed(0)}
                      </td>
                                                                                         <td className="border px-2 py-2 text-center font-bold text-lg text-green-900">
                          {(resultado * 10000).toFixed(0)}
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
                            <div className="text-sm text-green-700 mt-3">
                 <span className="font-medium">Valor k utilizado:</span> {kUtilizado?.toFixed(3)} kp/cm³
                 <span className="block text-xs mt-1">
                   Tipo de suelo: {tipoSuelo}
                   {tipoSuelo === "Mixto" && ` (${parseFloat(porcentajeGranular)}% granular + ${100 - parseFloat(porcentajeGranular)}% cohesivo)`}
                 </span>
               </div>
              
           </div>
         )}
       </div>
    </div>
  );
}
