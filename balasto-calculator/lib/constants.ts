// Constantes generales de la aplicación
export const APP_CONFIG = {
  name: 'CSW Ingeniería Civil',
  website: 'https://www.cswingenieriacivil.com',
  email: 'contacto@cswingenieriacivil.com',
  toolsUrl: 'https://www.cswingenieriacivil.com/herramientas',
};

// Constantes para SEO
export const SEO_CONFIG = {
  title: 'Calculadora de Coeficiente de Balasto - CSW Ingeniería Civil',
  description: 'Calculadora para determinar el coeficiente de balasto basada en las teorías de Terzaghi',
  keywords: 'coeficiente de balasto, módulo de balasto, módulo de reacción, subrasante, ingeniería geotécnica, terzaghi',
  canonical: 'https://balasto.cswingenieriacivil.com',
};

// Constantes para Google Analytics
export const ANALYTICS_CONFIG = {
  measurementId: 'G-XXXXXXXXXX',
  siteVerification: 'your-google-verification-code',
};

// Constantes para redes sociales
export const SOCIAL_CONFIG = {
  twitter: '@cswingenieria',
  facebook: 'cswingenieriacivil',
  linkedin: 'csw-ingeniería-civil',
};

// Constantes para la calculadora de balasto
export const BALASTO_CONFIG = {
  defaultValues: {
    soilType: 'granular',
    foundationType: 'flexible',
    width: 1.0,
    length: 1.0,
  },
  soilTypes: [
    { value: 'granular', label: 'Suelos Granulares' },
    { value: 'cohesive', label: 'Suelos Cohesivos' },
    { value: 'rock', label: 'Rocas' },
  ],
  foundationTypes: [
    { value: 'flexible', label: 'Fundación Flexible' },
    { value: 'rigid', label: 'Fundación Rígida' },
  ],
}; 