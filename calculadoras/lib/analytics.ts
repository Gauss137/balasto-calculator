// Configuración de Google Analytics y otras herramientas de SEO

// Declaraciones de tipos para Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  
  // Google Search Console
  GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION || '',
  
  // Bing Webmaster Tools
  BING_SITE_VERIFICATION: process.env.BING_SITE_VERIFICATION || '',
  
  // Yandex Webmaster
  YANDEX_SITE_VERIFICATION: process.env.YANDEX_SITE_VERIFICATION || '',
} as const;

// Función para inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
    // Código de Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID);
  }
};

// Función para enviar eventos personalizados
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Función para trackear páginas vistas
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      page_path: url
    });
  }
}; 