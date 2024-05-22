import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import ClientOnly from './_component/common/ClientOnly';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Script from 'next/script';
import SearchBar from './_component/common/SearchLayout';
import SearchLayout from './_component/common/SearchLayout';
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
  const mapKey = '767f029977f8d866cc34f510ce0ae236';
  return (
    <html lang='en'>
      <body className={font.className}>
        <Script
          async
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&libraries=services,clusterer&autoload=false`}
        ></Script>
        <div className='w-full h-full flex'>
          <SearchLayout>{children}</SearchLayout>
    <html lang="en">
      <body className={inter.className}>{children}</body>
        </div>
      </body>
    </html>
  );
}
