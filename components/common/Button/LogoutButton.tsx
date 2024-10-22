'use client';

import { useUserStore } from '@/store/client/user';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ConfirmModal from '../Modal/ConfirmModal';
import { useModalStore } from '@/store/client/modal';

export interface LogoutButtonProps {}

const LogoutButton = ({}: LogoutButtonProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { open, setOpen } = useModalStore();
  const handleLogout = () => {
    // TODO: 로그아웃 확인 팝업 추가
    alert('로그아웃 되었습니다.');

    router.push('/feed');

    setTimeout(() => {
      setUser(null);
    }, 0);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Image src='/icons/icon-logout.svg' alt='' width={32} height={32} />
      </button>
      {open && (
        <ConfirmModal
          description='정말 로그아웃 하실 건가요?'
          onConfirm={handleLogout}
          open={open}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default LogoutButton;
