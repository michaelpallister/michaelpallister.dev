/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.psnprofiles.com",
      },
    ],
  },
};

module.exports = nextConfig;
