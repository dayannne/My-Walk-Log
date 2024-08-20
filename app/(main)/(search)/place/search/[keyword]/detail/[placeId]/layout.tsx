'use client';

import PlaceDetailMenu from '@/app/_component/place/PlaceDetailMenu';
import PlaceAdditionalInfo from '@/app/_component/place/PlaceAdditionalInfo';
import PlaceBasicInfo from '@/app/_component/place/PlaceBasicInfo';

import { usePlaceStore } from '@/app/store/client/place';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import LoadingSpinner from '@/app/_component/common/LoadingSpinner';

const PlaceDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const placeId = params?.placeId as string;
  const keyword = decodeURIComponent(useParams()?.keyword as string);

  const { place, clearPlace } = usePlaceStore();

  const handleCloseButton = () => {
    clearPlace();
    router.push(`/place/search/${keyword}`);
  };

  return (
    <motion.div
      className='absolute -right-[450px] -z-10 flex h-full'
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <div className='box-content flex h-full w-96 flex-col overflow-y-scroll border-l border-solid border-gray-200 bg-[#f0f0f3] shadow-2xl'>
        <div className='flex h-full flex-col gap-2'>
          {/* 1. 장소 이미지 & 기본 정보 */}
          <PlaceBasicInfo place={place} placeId={placeId} />
          {/* 2. 장소 추가 정보 */}
          <PlaceAdditionalInfo place={place} />
          {/* 3. 네비게이션 메뉴 */}
          <PlaceDetailMenu />
          {children}
        </div>
      </div>
      {/* 상세페이지 닫기 버튼 */}
      <button
        className='hover:border-olive-green relative top-8 flex h-10 w-10 items-center justify-center rounded-r-lg border-b border-r border-t border-gray-300 bg-white shadow-2xl'
        onClick={handleCloseButton}
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
