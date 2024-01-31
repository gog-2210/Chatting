/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.API_SERVER_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
