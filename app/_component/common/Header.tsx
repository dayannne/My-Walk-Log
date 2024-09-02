import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  enableBackButton?: boolean;
}

const Header = ({ title, children, enableBackButton }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className='text-olive-green sticky top-0 flex items-center justify-between bg-white p-4 text-base shadow-sm'>
      <div className='flex items-center gap-2'>
        {enableBackButton && (
          <button
            type='button'
            className='mr-1 flex items-center justify-center border-b border-solid border-gray-200'
            onClick={() => router.back()}
          >
            <Image
              src='/icons/icon-arrow-left(green).svg'
              alt='뒤로 가기'
              width={20}
              height={20}
            />
          </button>
        )}
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
