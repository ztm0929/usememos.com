/** @type {import('next').NextConfig} */

const { codeInspectorPlugin } = require("code-inspector-plugin");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
    return config;
  },
  output: "export",
  image: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
