/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@monorepo/ui", "@monorepo/shared", "@monorepo/database"],
};

module.exports = nextConfig;
