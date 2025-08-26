"use client";

import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Aviso Legal y Términos de Uso</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Información General</h3>
            <p>
              Esta calculadora es una herramienta educativa y de referencia para profesionales de la ingeniería civil. 
              Los resultados obtenidos deben ser verificados por un ingeniero calificado antes de su implementación en proyectos reales.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Limitación de Responsabilidad</h3>
            <p>
              CSW Ingeniería Civil no se hace responsable por el uso incorrecto de esta herramienta o por las consecuencias 
              derivadas de su aplicación en proyectos de construcción. El usuario asume toda la responsabilidad por la 
              interpretación y uso de los resultados.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Uso Aceptable</h3>
            <p>
              Esta calculadora está destinada únicamente para uso educativo, de referencia y de diseño preliminar. 
              No debe utilizarse como sustituto del análisis estructural completo realizado por profesionales calificados.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Normativas y Códigos</h3>
            <p>
              Los cálculos se basan en principios generales de la ingeniería estructural y normativas como la EHE. 
              El usuario debe verificar que los resultados cumplan con las normativas vigentes en su jurisdicción.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">5. Propiedad Intelectual</h3>
            <p>
              Esta herramienta es propiedad de CSW Ingeniería Civil. Se permite su uso libre para fines educativos 
              y de referencia, siempre que se cite la fuente.
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
