/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/kakao/:path*',
        destination: 'https://place.map.kakao.com/:path*',
      },
    ];
  },
};

export default nextConfig;
