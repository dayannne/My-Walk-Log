'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='flex flex-col border-r-[1.5px] border-solid border-gray-200'>
      <div>
        <Link
          className='flex items-center justify-center w-full h-20 p-1 border-b border-solid border-gray-200'
          href='/'
        >
          <Image
            src='/icons/icon-logo-mini(default).svg'
            alt=''
            width={32}
            height={32}
          />
        </Link>
      </div>
      <Navigation />
      <div>
        <Link
          className='flex items-center justify-center w-full h-16 p-1 border-t border-solid border-gray-200'
          href='/login'
        >
          <Image src='/icons/icon-login.svg' alt='' width={32} height={32} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
