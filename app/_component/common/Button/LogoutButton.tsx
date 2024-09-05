'use client';

import { useUserStore } from '@/app/store/client/user';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export interface LogoutButtonProps {}

const LogoutButton = ({}: LogoutButtonProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const handleLogout = () => {
    //TODO: 로그아웃 확인 팝업 추가
    alert('로그아웃 되었습니다.');
    router.push('/feed');
    setUser(null);
  };

  return (
    <button onClick={handleLogout}>
      <Image src='/icons/icon-logout.svg' alt='' width={32} height={32} />
    </button>
  );
};

export default LogoutButton;
