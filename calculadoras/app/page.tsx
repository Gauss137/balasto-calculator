import { redirect } from 'next/navigation';

export default function Home() {
  // Detectar el proyecto basado en variables de entorno o configuración
  const projectName = process.env.VERCEL_PROJECT_NAME || process.env.NEXT_PUBLIC_PROJECT_NAME;
  
  // Redirigir según el proyecto
  switch (projectName) {
    case 'balasto-calculator':
      redirect('/balasto-calculator');
    case 'beam-calculator':
      redirect('/vigas/simplemente-apoyadas/carga-uniforme');
    case 'steel-calculator':
    default:
      redirect('/steel-calculator');
  }
}
