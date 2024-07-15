import type { Metadata } from 'next';
import Script from 'next/script';

import { Noto_Sans_KR } from 'next/font/google';

import '../styles/globals.css';

import ReactQueryProviders from './_hooks/useReactQuery';
import MaterialProvider from '@/styles/MaterialProvider';

export const metadata: Metadata = {
  title: '나의 산책 일기',
  description: '나의 산책 일기 - my walk log',
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
      <body className={font.className}>
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
