import './globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { APP_CONFIG } from '@/lib/constants';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.TITLE,
    template: '%s | ' + APP_CONFIG.TITLE
  },
  description: APP_CONFIG.DESCRIPTION,
  authors: [{ name: APP_CONFIG.COMPANY }],
  keywords: [
    'calculadora', 'viga', 'ingeniería civil', 'estructuras', 'momento', 'cortante', 'deflexión',
    'módulo de balasto', 'coeficiente de balasto', 'diseño de acero', 'flexión', 'losas',
    'cálculo estructural', 'ingeniería estructural', 'concreto armado', 'acero estructural',
    'diseño de vigas', 'análisis estructural', 'cimentaciones', 'suelos', 'terzaghi'
  ],
  creator: APP_CONFIG.COMPANY,
  publisher: APP_CONFIG.COMPANY,
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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://calculadoras-csw.vercel.app',
    title: APP_CONFIG.TITLE,
    description: APP_CONFIG.DESCRIPTION,
    siteName: APP_CONFIG.TITLE,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadoras de Acero Estructural - CSW Ingeniería Civil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.TITLE,
    description: APP_CONFIG.DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'tu-google-verification-code',
    yandex: 'tu-yandex-verification-code',
    yahoo: 'tu-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://calculadoras-csw.vercel.app',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f8b133" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Calculadoras de Acero Estructural",
              "description": "Herramientas profesionales para cálculo de estructuras de acero y concreto armado",
              "url": "https://calculadoras-csw.vercel.app",
              "applicationCategory": "EngineeringApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "CSW Ingeniería Civil",
                "url": "https://www.cswingenieriacivil.com"
              }
            })
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
