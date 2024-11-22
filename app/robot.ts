import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain =
    process.env.NEXT_PUBLIC_DOMAIN || 'https://my-walk-log.vercel.app'; // 기본값 설정

  return {
    rules: [
      {
        userAgent: '*', // 모든 검색 봇에 대해
        allow: '/', // 모든 경로 허용
      },
    ],
    host: domain,
    sitemap: `${domain}/sitemap.xml`, // 동적으로 사이트맵 URL 설정
  };
}
