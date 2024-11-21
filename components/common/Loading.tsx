import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  isLoading: boolean;
}

export default function Loading({ isLoading }: Props) {
  const [active, setActive] = useState('LoadingBox1');
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    if (isLoading) {
      if (active === '' || active === 'LoadingBox3')
        timeout = setTimeout(() => setActive('LoadingBox1'), 500);
      else if (active === 'LoadingBox1')
        timeout = setTimeout(() => setActive('LoadingBox2'), 500);
      else if (active === 'LoadingBox2')
        timeout = setTimeout(() => setActive('LoadingBox3'), 500);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout); // 컴포넌트가 unmount될 때 타이머를 깨끗이 정리
  }, [isLoading, active]);

  return (
    <>
      {isLoading && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/15'>
          <Image
            src='/icons/icon-marker(gray).svg'
            alt='로딩 이미지'
            className={`transition-transform duration-500 ${
              active === 'LoadingBox1' ? 'scale-125' : 'scale-100'
            }`}
            width={52}
            height={52}
          />
          <Image
            src='/icons/icon-marker(gray).svg'
            alt='로딩 이미지'
            className={`transition-transform duration-500 ${
              active === 'LoadingBox2' ? 'scale-125' : 'scale-100'
            }`}
            width={52}
            height={52}
          />
          <Image
            src='/icons/icon-marker(gray).svg'
            alt='로딩 이미지'
            className={`transition-transform duration-500 ${
              active === 'LoadingBox3' ? 'scale-125' : 'scale-100'
            }`}
            width={52}
            height={52}
          />
        </div>
      )}
    </>
  );
}
