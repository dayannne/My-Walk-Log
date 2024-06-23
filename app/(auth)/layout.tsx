import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface layoutProps {
  children: ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <main className='bg-hover/40 flex h-full w-full flex-col items-center justify-center'>
      <h1>
        <Link href='/'>
          <Image
            className='mb-10'
            src={'/icons/icon-logo(default).svg'}
            alt={''}
            width={224}
            height={80}
          />
        </Link>
      </h1>
      {children}
    </main>
  );
};

export default layout;
