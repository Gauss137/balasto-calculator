import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['www.cswingenieriacivil.com'],
  },
  experimental: {
    // appDir ya no es necesario en Next.js 15+
  },
};

export default nextConfig;
