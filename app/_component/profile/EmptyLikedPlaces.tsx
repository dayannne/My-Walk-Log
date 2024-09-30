import Link from 'next/link';
import Image from 'next/image';

const EmptyLikedPlaces = () => {
  return (
    <div className='box-border flex basis-full flex-col items-center justify-center gap-2 bg-white p-5'>
      <Image
        className='w-24'
        src='/icons/icon-empty.png'
        width={500}
        height={500}
        alt='비어있음'
      />
      아직 즐겨찾기한 장소가 없어요
      <Link
        className='text-olive-green border-olive-green flex w-full max-w-44 items-center gap-1 rounded-lg border border-solid px-2 py-1 text-sm shadow-md'
        href='/place/search'
      >
        <Image
          className=''
          src='/icons/icon-marker.svg'
          width={18}
          height={18}
          alt='마커 아이콘'
        />
        <span className='flex basis-full justify-center'>장소 찾으러 가기</span>
      </Link>
    </div>
  );
};

export default EmptyLikedPlaces;
