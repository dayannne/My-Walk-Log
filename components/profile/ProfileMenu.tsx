import { useProfileMenuStore } from '@/store/client/profile';

const ProfileMenu = () => {
  const profileMenu = useProfileMenuStore((state) => state.profileMenu);
  const setProfileMenu = useProfileMenuStore((state) => state.setProfileMenu);

  return (
    <nav className='mb-2 flex list-none border-y border-solid border-gray-200 bg-white shadow-sm'>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={0}
          className={`${profileMenu === 0 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setProfileMenu(parseInt(e.currentTarget.value))}
        >
          일기
        </button>
      </li>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={1}
          className={`${profileMenu === 1 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setProfileMenu(parseInt(e.currentTarget.value))}
        >
          장소
        </button>
      </li>
      <li className='box-border h-full basis-full pt-2 text-center text-sm'>
        <button
          value={2}
          className={`${profileMenu === 2 && 'border-b-2'} border-solid border-b-black pb-2`}
          onClick={(e) => setProfileMenu(parseInt(e.currentTarget.value))}
        >
          리뷰
        </button>
      </li>
    </nav>
  );
};

export default ProfileMenu;
