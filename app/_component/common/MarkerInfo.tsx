'use client';

import usePlaceDetail from '@/app/_hooks/usePlaceDetail';
import { useMap } from '@/app/shared/contexts/Map';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface MarkerInfoProps {
  placeId: string;
  placeName: string;
  keyword: string;
}

const MarkerInfo = ({ placeId, placeName, keyword }: MarkerInfoProps) => {
  const { handleClick } = usePlaceDetail();

  return (
    <div className='flex overflow-hidden rounded-md bg-white text-base shadow-md'>
      <span className='px-3 py-2 font-medium'>{placeName}</span>
      <button className='bg-olive-green flex w-10 basis-full items-center justify-center'>
        <Image
          className='pt-[1px]'
          width={24}
          height={24}
          fill={false}
          src='/icons/icon-arrow-right.svg'
          alt='화살표 아이콘(오른쪽)'
          onClick={() => handleClick(placeId)}
        />
      </button>
    </div>
  );
};

export default MarkerInfo;
