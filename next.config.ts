import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configure for Replit environment
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL',
          },
        ],
      },
    ];
  },
  // Allow all dev origins for Replit proxy
  allowedDevOrigins: ['*.replit.dev'],
};

export default nextConfig;
