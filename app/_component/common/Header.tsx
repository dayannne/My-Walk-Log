'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navigation from './Navigation';
import { useUserStore } from '@/app/store/client/user';

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    //TODO: 로그아웃 확인 팝업 추가
    alert('로그아웃 되었습니다.');
    setUser(null);
    router.refresh();
  };
  return (
    <header className='flex flex-col border-r-[1.5px] border-solid border-gray-200'>
      <div>
        <Link
          className='flex h-20 w-full items-center justify-center border-b border-solid border-gray-200 p-1'
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
      <div className='flex h-auto w-full flex-col items-center justify-center gap-2 border-t border-solid border-gray-200 p-4'>
        {user ? (
          <>
            <Link href='/profile/my'>
              <Image
                className='rounded-full'
                src={
                  user.profileImage ? user.profileImage : '/icons/icon-user.svg'
                }
                alt=''
                width={32}
                height={32}
              />
            </Link>
            <button onClick={handleLogout}>
              <Image
                src='/icons/icon-logout.svg'
                alt=''
                width={32}
                height={32}
              />
            </button>
          </>
        ) : (
          <Link href='/login'>
            <Image src='/icons/icon-login.svg' alt='' width={32} height={32} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
