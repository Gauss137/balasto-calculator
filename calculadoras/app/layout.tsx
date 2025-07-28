import './globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { APP_CONFIG } from '@/lib/constants';
import { ANALYTICS_CONFIG } from '@/lib/analytics';

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
    'módulo de balasto', 'coeficiente de balasto', 'diseño de acero', 'flexión'
  ],
  openGraph: {
    title: APP_CONFIG.TITLE,
    description: APP_CONFIG.DESCRIPTION,
    type: 'website',
    locale: 'es_ES',
    siteName: APP_CONFIG.COMPANY,
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.TITLE,
    description: APP_CONFIG.DESCRIPTION,
  },
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
    google: ANALYTICS_CONFIG.GOOGLE_SITE_VERIFICATION,
    yandex: ANALYTICS_CONFIG.YANDEX_SITE_VERIFICATION,
    yahoo: ANALYTICS_CONFIG.BING_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://calculadoras-csw.vercel.app',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {ANALYTICS_CONFIG.GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
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
