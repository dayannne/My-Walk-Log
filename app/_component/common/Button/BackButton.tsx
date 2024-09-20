'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      type='button'
      className='mr-1 flex items-center justify-center border-b border-solid border-gray-200'
      onClick={handleBack}
    >
      <Image
        src='/icons/icon-arrow-left(green).svg'
        alt='뒤로 가기'
        width={20}
        height={20}
      />
    </button>
  );
};

export default BackButton;
