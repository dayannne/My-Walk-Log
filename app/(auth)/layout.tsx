import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface layoutProps {
  children: ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <main className='bg-hover/40 flex h-full w-full flex-col'>
      <div className='flex w-full basis-full flex-col items-center justify-center py-5'>
        <h1 className='my-10'>
          <Link href='/'>
            <Image
              src={'/icons/icon-logo(default).svg'}
              alt={''}
              width={224}
              height={80}
            />
          </Link>
        </h1>
        {children}
      </div>
    </main>
  );
};

export default layout;
