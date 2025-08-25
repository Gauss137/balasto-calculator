import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
    template: '%s | CSW Ingeniería Civil'
  },
  description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi y otros autores. Ideal para ingenieros civiles y geotécnicos.',
  keywords: ['coeficiente de balasto', 'módulo de balasto', 'módulo de reacción', 'subrasante', 'ingeniería geotécnica', 'terzaghi'],
  authors: [{ name: 'CSW Ingeniería Civil' }],
  creator: 'CSW Ingeniería Civil',
  publisher: 'CSW Ingeniería Civil',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://balasto.cswingenieriacivil.com',
    siteName: 'CSW Ingeniería Civil',
    title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
    description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Coeficiente de Balasto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
    description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://balasto.cswingenieriacivil.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>

        
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 
