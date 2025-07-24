import Link from 'next/link';
import Image from 'next/image';
import { APP_CONFIG, EXTERNAL_LINKS, ROUTES } from '@/lib/constants';
import { BeamDropdown } from './BeamDropdown';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link href={ROUTES.HOME} className="flex items-center">
            {/* Logo temporalmente oculto mientras se actualiza el archivo SVG */}
            {/* <Image
              src="/negrologotij webpage.svg"
              alt={APP_CONFIG.COMPANY}
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            /> */}
            <span className="text-xl font-bold text-gray-900">{APP_CONFIG.COMPANY}</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <BeamDropdown />
          <Link 
            href={ROUTES.STEEL_CALCULATOR} 
            className="text-gray-700 hover:text-[#f1d475] transition-colors"
          >
            Acero
          </Link>
          <Link 
            href={ROUTES.BALASTO_CALCULATOR} 
            className="text-gray-700 hover:text-[#f1d475] transition-colors"
          >
            Balasto
          </Link>
          <a 
            href={EXTERNAL_LINKS.CONTACT}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-[#f1d475] transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu />
      </nav>
    </header>
  );
}
