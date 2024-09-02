import Link from 'next/link';
import Image from 'next/image';
import BackButton from './Button/BackButton';

export interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  enableBackButton?: boolean;
}

const Header = ({ title, children, enableBackButton }: HeaderProps) => {
  return (
    <header className='text-olive-green sticky top-0 flex items-center justify-between bg-white p-4 text-base shadow-sm'>
      <div className='flex items-center gap-2'>
        {enableBackButton && <BackButton />}
        <Link
          className='flex items-center justify-center border-b border-solid border-gray-200 lg:hidden'
          href='/'
        >
          <Image
            src='/icons/icon-logo-mini(default).svg'
            alt=''
            width={20}
            height={20}
          />
        </Link>
        <span>{title}</span>
      </div>
      {children}
    </header>
  );
};

export default Header;
