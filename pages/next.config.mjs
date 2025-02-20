/** @type {import('next').NextConfig} */
console.log('Loading next.config.mjs');
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  // Log the environment
  onDevelopmentStart: async () => {
    console.log('Development server starting');
  },
  onBuildStart: async () => {
    console.log('Build starting');
  }
};
console.log('Next config:', nextConfig);
export default nextConfig;