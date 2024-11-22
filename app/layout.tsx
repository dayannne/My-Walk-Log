import type { Metadata } from 'next';
import Script from 'next/script';

import { Noto_Sans_KR } from 'next/font/google';

import '../shared/styles/globals.css';

import ReactQueryProviders from '../hooks/useReactQuery';
import MaterialProvider from '@/shared/styles/MaterialProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://my-walk-log.vercel.app'),
  title: {
    template: '%s | 나의 산책 일기(My WorkLog)',
    default:
      '나의 산책일기(My WorkLog) | 산책장소 & 산책로 탐색 및 일기 기록 서비스',
  },
  description:
    '내 집 앞 소소한 산책부터 본격적인 트래킹까지 ~ 산책 장소 & 산책로를 쉽게 찾고 나만의 산책 기록을 일기로 남겨요.',
  openGraph: {
    siteName: '나의 산책 일기(My WorkLog)',
    images: {
      url: 'public/icons/icon-logo(default).svg',
    },
  },
  twitter: {
    title: '나의 산책 일기(My WorkLog)',
    images: {
      url: 'public/icons/icon-logo(default).svg',
    },
  },
  verification: {
    google: 'dL9BfGCE-Cdx2iSc_ptmjcrO9A7YbwlaqABBt8MigF8',
  },
};

const font = Noto_Sans_KR({
  subsets: ['latin'],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${font.className} text-sm lg:text-base`}>
        <Script
          async
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`}
        ></Script>
        <ReactQueryProviders>
          <MaterialProvider>{children}</MaterialProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
