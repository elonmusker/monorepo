/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/db'],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
