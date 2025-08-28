import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/shared/Header';
import { Footer } from '../components/shared/Footer';

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
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
