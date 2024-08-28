'use client';

import Image from 'next/image';

interface MarkerInfoProps {
  placeName: string;
  size?: number;
}

const MarkerInfo = ({ placeName, size }: MarkerInfoProps) => {
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
      {size && (
        <div className='border-olive-green bg-olive-green absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-solid text-white lg:-right-4 lg:-top-4 lg:h-8 lg:w-8'>
          +{size - 1}
        </div>
      )}
    </div>
  );
};

export default MarkerInfo;
