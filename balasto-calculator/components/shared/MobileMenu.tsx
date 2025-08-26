"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-700 hover:text-[#f1d475] transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="px-6 py-4 space-y-4">
            <a
              href="https://www.cswingenieriacivil.com/herramientas"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-700 hover:text-[#f1d475] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Más
            </a>
            <a
              href={EXTERNAL_LINKS.CONTACT}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-700 hover:text-[#f1d475] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
