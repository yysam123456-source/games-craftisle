import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,   // 静态导出时生成 /play/2048/index.html 而非 /play/2048.html
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
