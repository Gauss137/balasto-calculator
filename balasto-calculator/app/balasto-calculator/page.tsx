import { Metadata } from 'next';
import BalastoCalculator from '../../components/ui/BalastoCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
  description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi y otros autores. Ideal para ingenieros civiles y geotécnicos.',
  keywords: ['coeficiente de balasto', 'módulo de balasto', 'módulo de reacción', 'subrasante', 'ingeniería geotécnica', 'terzaghi'],
  authors: [{ name: 'CSW Ingeniería Civil' }],
  openGraph: {
    title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
    description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
    url: 'https://balasto.cswingenieriacivil.com',
    siteName: 'CSW Ingeniería Civil',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
    description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
  },
  alternates: {
    canonical: 'https://balasto.cswingenieriacivil.com',
  },
};

export default function BalastoCalculatorPage() {
  return (
    <div className="pt-4 pb-4">
      <BalastoCalculator />
    </div>
  );
} 