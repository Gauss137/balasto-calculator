"use client";

import { useState } from 'react';
import { EXTERNAL_LINKS } from './constants';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-[#f1d475] transition-colors rounded-md hover:bg-gray-100"
        aria-label="Toggle mobile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border border-gray-200 rounded-b-lg z-50 min-w-[200px] max-w-[300px]">
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
