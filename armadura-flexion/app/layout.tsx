import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Calculadora de Armaduras a Flexión - CSW Ingeniería Civil',
    template: '%s | CSW Ingeniería Civil'
  },
  description: 'Calculadora para estimar armaduras mínimas, máximas y de compresión en secciones a flexión según normativa EHE.',
  keywords: ['armaduras flexión', 'cálculo estructural', 'hormigón armado', 'EHE', 'ingeniería civil'],
  authors: [{ name: 'CSW Ingeniería Civil' }],
  creator: 'CSW Ingeniería Civil',
  publisher: 'CSW Ingeniería Civil',
  robots: 'index, follow',
  openGraph: {
    title: 'Calculadora de Armaduras a Flexión - CSW Ingeniería Civil',
    description: 'Calculadora para estimar armaduras mínimas, máximas y de compresión en secciones a flexión según normativa EHE.',
    type: 'website',
    url: 'https://armadura-flexion.cswingenieriacivil.com',
    siteName: 'CSW Ingeniería Civil',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Armaduras a Flexión - CSW Ingeniería Civil',
    description: 'Calculadora para estimar armaduras mínimas, máximas y de compresión en secciones a flexión según normativa EHE.',
  },
  alternates: {
    canonical: 'https://armadura-flexion.cswingenieriacivil.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header simple */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">CSW Ingeniería Civil</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-500 hover:text-gray-900">Inicio</a>
                  <a href="/armadura-flexion" className="text-gray-900 font-medium">Armadura a Flexión</a>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          {/* Footer simple */}
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-500 text-sm">
                <p>&copy; 2025 CSW Ingeniería Civil. Todos los derechos reservados.</p>
                <p className="mt-2">
                  <a href="https://cswingenieriacivil.com" className="text-blue-600 hover:text-blue-800">
                    Visita nuestro sitio web
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
