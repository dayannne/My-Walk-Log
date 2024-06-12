/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 기본 router 설정
  async redirects() {
    return [
      {
        source: '/',
        destination: '/place',
        permanent: true, //캐쉬여부로 true를 하면 캐쉬에서 저장해서 리다이랙트 진행
      },
    ];
  },

  // 카카오맵 place detaul api 경로 재설정
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
