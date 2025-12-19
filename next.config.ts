import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // ✅ ใส่ Hostname ที่แจ้งเตือนใน Error ของคุณ
        hostname: 'uzoqnacumzlwoxhbkqzi.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // 2. Roadmap.sh (อันใหม่ที่ต้องเพิ่ม) ✅
      {
        protocol: 'https',
        hostname: 'roadmap.sh',
        port: '',
        pathname: '/**', // อนุญาตทุก path ในเว็บนี้
      },
    ],
  },
};

export default nextConfig;