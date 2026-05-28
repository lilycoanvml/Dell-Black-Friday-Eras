import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  images: {
    domains: ['i.dell.com', 'www.dell.com'],
  },
};

export default nextConfig;
