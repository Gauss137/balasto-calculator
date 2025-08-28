"use client";

import { useModal } from './useModal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Aviso Legal y Términos de Uso</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm text-gray-700 space-y-4">
            <p>
              Esta calculadora es una herramienta educativa y de referencia. Los resultados obtenidos deben ser verificados 
              por un profesional calificado antes de su uso en proyectos reales.
            </p>
            
            <p>
              CSW Ingeniería Civil no se hace responsable por el uso incorrecto de esta herramienta o por las decisiones 
              tomadas basándose en sus resultados.
            </p>
            
            <p>
              El uso de esta calculadora implica la aceptación de estos términos y condiciones.
            </p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#f8b133] text-white rounded-md hover:bg-[#e6a030] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
