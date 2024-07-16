'use client';

import { WALK_DURATIONS } from '@/app/shared/constant';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const PlaceDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const keyword = decodeURIComponent(useParams()?.keyword as string);

  return (
    <motion.div
      className='absolute -right-[450px] -z-10 flex h-full'
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <div className='box-content h-full w-96 border-l border-solid border-gray-200 bg-[#f0f0f3] shadow-2xl'>
        {children}
      </div>
      {/* 상세페이지 닫기 버튼 */}
      <button
        className='hover:border-olive-green relative top-8 flex h-10 w-10 items-center justify-center rounded-r-lg border-b border-r border-t border-gray-300 bg-white shadow-2xl'
        onClick={() => router.push(`/place/search/${keyword}`)}
      >
        <Image
          src='/icons/icon-cancel.svg'
          alt='취소 버튼'
          width={24}
          height={24}
        />
      </button>
    </motion.div>
  );
};

export default PlaceDetailLayout;
