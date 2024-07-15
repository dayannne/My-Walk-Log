'use client';

import usePlaceDetail from '@/app/_hooks/usePlaceDetail';
import { useMap } from '@/app/shared/contexts/Map';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface MarkerInfoProps {
  placeName: string;
  size?: number;
}

const MarkerInfo = ({ placeName, size }: MarkerInfoProps) => {
  return (
    <div className='speech-bubble flex w-auto gap-2 px-3 py-2 text-lg font-medium'>
      <span>{placeName}</span>
      <Image
        className='max-w-none'
        width={20}
        height={20}
        src='/icons/icon-logo-mini(default).svg'
        alt='로고 그림'
      />
      {size && (
        <div className='border-olive-green 8 bg-olive-green absolute -right-4 -top-4 h-8 rounded-full border-2 border-solid px-1 text-white'>
          +{size}
        </div>
      )}
    </div>
  );
};

export default MarkerInfo;
