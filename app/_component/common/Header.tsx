import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='flex flex-col border-r-[1.5px] border-solid border-gray-200'>
      <div className='flex items-center justify-center w-full h-20 p-1 border-b border-solid border-gray-200'>
        <Link href='/'>
          <Image
            src='/icons/icon-logo-mini(default).svg'
            alt=''
            width={32}
            height={32}
          />
        </Link>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
