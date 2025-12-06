import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'roadmap.sh', // เพิ่ม Hostname ที่นี่
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
