"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LegalModal } from './LegalModal';
import { useModal } from '@/hooks/useModal';
import { APP_CONFIG, EXTERNAL_LINKS } from '@/lib/constants';

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <>
      <footer className="w-full bg-white py-4 mt-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-600">
          <p className="mt-4 text-xs text-gray-500">
            Todo el contenido de esta página es de acceso libre y gratuito. Si los recursos ofrecidos resultan útiles, es posible colaborar con una pequeña contribución voluntaria a través de los siguientes medios. Estos aportes ayudan a mantener y mejorar el desarrollo de nuevos contenidos abiertos para la comunidad.
          </p>
          
          <div className="flex justify-center items-center space-x-4 mt-2">
            <a 
              href="https://cafecito.app/cswingenieriacivil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f8b133] text-white px-3 py-1 rounded-full text-xs border border-gray-800 hover:bg-[#e6a030] transition min-w-[80px]"
            >
              Cafecito
            </a>
            <a 
              href="https://www.paypal.com/paypalme/cswingenieriacivil/2"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f8b133] text-white px-3 py-1 rounded-full text-xs border border-gray-800 hover:bg-[#e6a030] transition min-w-[80px]"
            >
              PayPal
            </a>
          </div>
          
          <div className="mt-3 border-t border-gray-100 pt-3">
            <button
              onClick={openModal}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
            >
              Aviso Legal y Términos de Uso
            </button>
          </div>
          
          <p className="font-semibold mt-4">
            {APP_CONFIG.COPYRIGHT_MESSAGE} – {currentYear}
          </p>
          
          <div className="flex justify-center items-center space-x-4 mt-4">
            <a 
              href={EXTERNAL_LINKS.LINKEDIN}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <Image
                src="/naranjalinktij.png"
                alt="LinkedIn"
                width={35}
                height={35}
                style={{ objectFit: "contain" }}
              />
            </a>
            
            <a 
              href={EXTERNAL_LINKS.INSTAGRAM}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Image
                src="/naranjainsttij.png"
                alt="Instagram"
                width={35}
                height={35}
                style={{ objectFit: "contain" }}
              />
            </a>
          </div>
        </div>
      </footer>
      
      <LegalModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
  