import { Metadata } from 'next';
import { SteelCalculator } from '@/components/SteelCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Acero Estructural - Diseño de Vigas y Losas',
  description: 'Calcula áreas de acero, cuantías y espaciamientos para vigas y losas de concreto armado. Herramienta profesional para ingenieros civiles. Gratis y online.',
  keywords: [
    'diseño de acero',
    'acero estructural',
    'concreto armado',
    'vigas',
    'losas',
    'flexión',
    'área de acero',
    'cuantía',
    'espaciamiento',
    'barras de acero',
    'diseño estructural',
    'ingeniería civil',
    'calculadora online'
  ],
  openGraph: {
    title: 'Calculadora de Acero Estructural - Diseño de Vigas y Losas',
    description: 'Calcula áreas de acero, cuantías y espaciamientos para estructuras de concreto armado.',
    url: 'https://calculadoras-csw.vercel.app/steel-calculator',
    images: [
      {
        url: '/steel-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Acero Estructural - CSW Ingeniería Civil',
      },
    ],
  },
  alternates: {
    canonical: 'https://calculadoras-csw.vercel.app/steel-calculator',
  },
};

export default function SteelCalculatorPage() {
  return <SteelCalculator />;
} 