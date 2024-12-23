/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 기본 router 설정
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true, //캐쉬여부로 true를 하면 캐쉬에서 저장해서 리다이랙트 진행
      },
    ];
  },

  // 카카오맵, 국도교통부 API 경로 재설정
  async rewrites() {
    return [
      {
        source: '/api/kakao/:path*',
        destination: 'https://place.map.kakao.com/:path*',
      },
      {
        source: '/api/vworld/:path*', // 요청 경로
        destination: 'https://api.vworld.kr/req/data/:path*', // 실제 API 경로로 프록시
      },
    ];
  },

  // CORS 활성화
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  // 이미지 호스트 추가
  images: {
    remotePatterns: [
      {
        hostname: 'my-walklog.s3.ap-southeast-2.amazonaws.com',
      },
      {
        hostname: 'my-walk-log.s3.ap-northeast-2.amazonaws.com',
      },
      {
        hostname: 'storep-phinf.pstatic.net',
      },
      {
        hostname: 'postfiles.pstatic.net',
      },
      {
        hostname: 't1.daumcdn.net',
      },
      {
        hostname: 'blog.kakaocdn.net',
      },
      {
        hostname: 't1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
