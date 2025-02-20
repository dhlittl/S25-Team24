/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: '.next',
    // Fix assetPrefix to use proper URL format
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : ''
  };
  
  export default nextConfig;