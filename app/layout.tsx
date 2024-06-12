import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_KR } from 'next/font/google';

import './globals.css';

import Container from './_component/common/Container';
import ClientOnly from './_component/common/ClientOnly';
// import ToasterProvider from './provider/ToasterProvider';

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
        <ClientOnly>
          <Container>{children}</Container>
        </ClientOnly>
      </body>
    </html>
  );
}
