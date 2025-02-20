/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    distDir: '.next',
    experimental: {
      // Enable if you're using App Router
      appDir: true
    },
    // Add this to ensure proper static file serving
    assetPrefix: process.env.NODE_ENV === 'production' ? '.' : ''
  };
  
  export default nextConfig;