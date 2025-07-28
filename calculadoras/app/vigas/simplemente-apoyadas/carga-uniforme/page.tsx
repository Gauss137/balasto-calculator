import { Metadata } from 'next';
import { BeamCalculator } from '@/components/BeamCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Vigas Simplemente Apoyadas - Carga Uniforme',
  description: 'Calcula momentos, cortantes y deflexiones en vigas simplemente apoyadas con carga uniforme. Herramienta profesional para análisis estructural. Gratis y online.',
  keywords: [
    'vigas simplemente apoyadas',
    'carga uniforme',
    'momento flector',
    'cortante',
    'deflexión',
    'análisis estructural',
    'diseño de vigas',
    'ingeniería estructural',
    'mecánica de materiales',
    'resistencia de materiales',
    'calculadora online',
    'ingeniería civil'
  ],
  openGraph: {
    title: 'Calculadora de Vigas Simplemente Apoyadas - Carga Uniforme',
    description: 'Calcula momentos, cortantes y deflexiones en vigas simplemente apoyadas con carga uniforme.',
    url: 'https://calculadoras-csw.vercel.app/vigas/simplemente-apoyadas/carga-uniforme',
    images: [
      {
        url: '/beam-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Vigas - CSW Ingeniería Civil',
      },
    ],
  },
  alternates: {
    canonical: 'https://calculadoras-csw.vercel.app/vigas/simplemente-apoyadas/carga-uniforme',
  },
};

export default function BeamCalculatorPage() {
  return <BeamCalculator />;
} 