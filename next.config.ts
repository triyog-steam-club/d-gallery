/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any hostname
      },
    ],
  },
};

module.exports = nextConfig;
