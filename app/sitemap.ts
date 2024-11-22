import { MetadataRoute } from 'next';

// 사이트맵에 포함할 기본 경로 목록
const defaultPaths = [
  '/feed',
  '/place/search',
  '/trail/search',
  '/login',
  '/signup',
];

// 기본 사이트맵
const defaultSiteMap: MetadataRoute.Sitemap = defaultPaths.map((path) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'; // 기본값 설정
  return {
    url: `${domain}${path}`,
    lastModified: new Date(), // 마지막 수정 날짜
    changeFrequency: 'daily', // 업데이트 빈도
    priority: path === '/feed' ? 1 : 0.8, // 홈 페이지는 가장 높은 우선순위
  };
});

export default function sitemap(): MetadataRoute.Sitemap {
  // 기본 사이트맵과 필요한 동적 콘텐츠(예: 게시글 등)를 합쳐 반환
  return defaultSiteMap;
}
