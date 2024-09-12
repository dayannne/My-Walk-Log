'use client';

import Image from 'next/image';

interface MarkerInfoProps {
  placeName: string;
}

const MarkerInfo = ({ placeName }: MarkerInfoProps) => {
  return (
    <div className='speech-bubble flex w-auto gap-2 px-3 py-2 text-sm font-medium lg:text-lg'>
      <span>{placeName}</span>
      <Image
        className='max-w-none'
        width={20}
        height={20}
        src='/icons/icon-logo-mini(default).svg'
        alt='로고 그림'
      />
    </div>
  );
};

export default MarkerInfo;
