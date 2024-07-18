'use client';

import PlaceDetailNavigation from '@/app/_component/place/PlaceDetailNavigation';
import { WALK_DURATIONS } from '@/app/shared/constant';
import PlaceBasicInfo from '@/app/_component/place/PlaceBasicInfo';
import { getPlace } from '@/app/api/_routes/place';
import { FACALTY_INFO } from '@/app/shared/constant';
import { usePlaceStore } from '@/app/store/user';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const PlaceDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const placeId = params?.placeId as string;
  const keyword = decodeURIComponent(useParams()?.keyword as string);

  const { setPlace, place, clearPlace } = usePlaceStore();
  const { isLoading, isFetching } = useQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const response = await getPlace(placeId);
      setPlace(response.data);
      return response.data;
    },
    staleTime: 0,
  });

  if (isLoading || !place || isFetching) return null;

  const { phonenum, homepage, openHour, facilityInfo } =
    place.placeDetail.basicInfo;

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
      <div className='box-content h-full w-96 border-l border-solid border-gray-200 bg-[#f0f0f3] shadow-2xl'>
        <div className='flex h-full flex-col gap-2 overflow-y-scroll'>
          {/* 1. 이미지 & 기본 정보 */}
          <PlaceBasicInfo data={place} placeId={placeId} />
          {/* 2. 장소 정보 */}
          <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
            {/* 주소 */}
            <span className='flex items-center gap-2'>
              <Image
                src='/icons/icon-place.svg'
                alt=''
                width={24}
                height={24}
              />
              {place.placeInfo.address}
            </span>
            {/* 이용 시간 */}
            {openHour && (
              <div className='flex items-start gap-2'>
                <Image
                  src='/icons/icon-clock.svg'
                  alt=''
                  width={24}
                  height={24}
                />
                <div className='flex flex-col gap-[2px]'>
                  {/* 이용시간 */}
                  {openHour.periodList && (
                    <span>
                      {openHour.periodList[0].timeList[0].dayOfWeek}{' '}
                      {openHour.periodList[0].timeList[0].timeSE}
                    </span>
                  )}
                  {/* 연중무휴 */}
                  {openHour.offdayDisplayText && (
                    <span className='mt-[2px] text-xs text-gray-500'>
                      • {openHour.offdayDisplayText}
                    </span>
                  )}
                </div>
              </div>
            )}
            {/* 전화번호 */}
            {phonenum && (
              <span className='flex items-center gap-2'>
                <Image
                  src='/icons/icon-phone.svg'
                  alt=''
                  width={24}
                  height={24}
                />
                {phonenum}
              </span>
            )}
            {/* 홈페이지 */}
            {homepage && (
              <span className='flex items-start gap-2'>
                <Image
                  src='/icons/icon-web.svg'
                  alt='웹 아이콘'
                  width={24}
                  height={24}
                />
                <Link className='text-overflow grow-0' href={homepage}>
                  {homepage}
                </Link>
              </span>
            )}
            {/* 시설 정보 */}
            {facilityInfo && (
              <div className='flex items-start gap-2'>
                <Image
                  src='/icons/icon-info.svg'
                  alt=''
                  width={24}
                  height={24}
                />
                <div className='flex flex-col gap-4'>
                  <span>시설 정보</span>
                  <div className='flex gap-4'>
                    {facilityInfo.pet && (
                      <div className='flex flex-col items-center gap-2 text-gray-500'>
                        <Image
                          src={
                            facilityInfo.pet === 'Y'
                              ? '/icons/icon-pets.svg'
                              : '/icons/icon-no-pets.svg'
                          }
                          alt=''
                          width={24}
                          height={24}
                        />
                        <span className='text-center'>
                          {FACALTY_INFO['pet']}
                        </span>
                      </div>
                    )}
                    {facilityInfo.parking && (
                      <div className='flex flex-col items-center gap-2 text-gray-500'>
                        <Image
                          src={
                            facilityInfo.parking === 'Y'
                              ? '/icons/icon-parking.svg'
                              : '/icons/icon-no-parking.svg'
                          }
                          alt=''
                          width={24}
                          height={24}
                        />
                        <span className='text-center'>
                          {FACALTY_INFO['parking']}
                        </span>
                      </div>
                    )}
                    {facilityInfo.fordisabled && (
                      <div className='flex flex-col items-center gap-2 text-gray-500'>
                        <Image
                          src={'/icons/icon-wheelchair.svg'}
                          alt=''
                          width={24}
                          height={24}
                        />
                        <span className='text-center'>
                          {FACALTY_INFO['fordisabled']}
                        </span>
                      </div>
                    )}
                    {facilityInfo.smokingroom && (
                      <div className='flex flex-col items-center gap-2 text-gray-500'>
                        <Image
                          src={
                            facilityInfo.smokingroom === 'Y'
                              ? '/icons/icon-smoking.svg'
                              : '/icons/icon-no-smoking.svg'
                          }
                          alt=''
                          width={24}
                          height={24}
                        />
                        <span className='text-center'>
                          {FACALTY_INFO['smokingroom']}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 3. 네비게이션 메뉴 */}
          <PlaceDetailNavigation placeId={placeId} keyword={keyword} />
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
