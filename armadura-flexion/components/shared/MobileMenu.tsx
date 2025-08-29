"use client";

import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { EXTERNAL_LINKS } from './constants';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 hover:text-[#f1d475] transition-colors focus:outline-none"
        aria-label="Abrir menú"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />
      )}

      {/* Menú lateral */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header del menú */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Navegación</h2>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenido del menú */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {/* Más */}
              <a
                href="https://www.cswingenieriacivil.com/herramientas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 text-gray-700 hover:text-[#f1d475] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                <span className="font-medium">Más</span>
              </a>

              {/* Contacto */}
              <a
                href={EXTERNAL_LINKS.CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 text-gray-700 hover:text-[#f1d475] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                <span className="font-medium">Contacto</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
