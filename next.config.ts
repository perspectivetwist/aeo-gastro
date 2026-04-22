import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/aeo-scanner',
  assetPrefix: '/aeo-scanner',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/aeo-scanner',
  },
};

export default nextConfig;
