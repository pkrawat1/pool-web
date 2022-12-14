/** @type {import('next').NextConfig} */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com", "placehold.jp"],
  },
  webpack: (config) => {
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    );

    return config;
  },
};

module.exports = nextConfig;
