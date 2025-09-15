import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow Replit dev origins for HMR and asset loading
  allowedDevOrigins: process.env.NODE_ENV === 'development' 
    ? ['https://*.replit.dev', 'https://*.replit.com'] 
    : [],
  
  // Configure for Replit environment - development only
  async headers() {
    // Only allow embedding in Replit preview during development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: 'frame-ancestors https://*.replit.dev https://*.replit.com;',
            },
          ],
        },
      ];
    }
    // Production: prevent clickjacking
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
