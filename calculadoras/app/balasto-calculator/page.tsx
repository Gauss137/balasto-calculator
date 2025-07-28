import { Metadata } from 'next';
import { BalastoCalculator } from '@/components/ui/BalastoCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Módulo de Balasto - Coeficiente de Balasto',
  description: 'Calcula el módulo de balasto (coeficiente de balasto) para diseño flexible de losas. Herramienta profesional basada en Terzaghi y otros autores. Gratis y online.',
  keywords: [
    'módulo de balasto',
    'coeficiente de balasto',
    'diseño flexible de losas',
    'terzaghi',
    'cimentaciones',
    'suelos',
    'ingeniería geotécnica',
    'módulo de reacción de subrasante',
    'kp/cm³',
    't/m³',
    'kN/m³',
    'calculadora online',
    'ingeniería civil'
  ],
  openGraph: {
    title: 'Calculadora de Módulo de Balasto - Coeficiente de Balasto',
    description: 'Calcula el módulo de balasto para diseño flexible de losas. Basado en Terzaghi y otros autores.',
    url: 'https://calculadoras-csw.vercel.app/balasto-calculator',
    images: [
      {
        url: '/balasto-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Módulo de Balasto - CSW Ingeniería Civil',
      },
    ],
  },
  alternates: {
    canonical: 'https://calculadoras-csw.vercel.app/balasto-calculator',
  },
};

export default function BalastoCalculatorPage() {
  return <BalastoCalculator />;
} 