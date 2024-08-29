const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "172.17.0.2",
        port: "9000",
        pathname: '/medusa/**',
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@medusajs/medusa",],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
