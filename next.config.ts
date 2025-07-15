import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vacgymsafyftgycnubpg.supabase.co',
        pathname: '/storage/v1/object/**'
      }
    ]
  },
  experimental: {
    ppr: 'incremental'
  }

};

export default nextConfig;
