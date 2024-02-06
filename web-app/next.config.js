/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://back-end:4000/:path*", // Proxy to Backend
      },
      {
        source: "/file-hosting/:path*",
        destination: "http://file-hosting:5001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
