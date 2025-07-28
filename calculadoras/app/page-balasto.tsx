import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir a la calculadora de balasto
  redirect('/balasto-calculator');
} 