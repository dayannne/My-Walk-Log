'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/user';
import {
  createPlaceLike,
  deletePlaceLike,
  getPlace,
  searchPlace,
} from '@/app/api/_routes/place';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FACALTY_INFO } from '@/app/shared/constant';
import { useMap } from '@/app/shared/contexts/Map';
import { IPlace } from '@/app/shared/types/map';
import PlaceBasicInfo from '@/app/_component/place/PlaceBasicInfo';

export interface pageProps {}

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const response = await getPlace(placeId);
      return response.data;
    },
  });

  if (isLoading || !data) return null;

  // 데이터 추출
  const { reviews } = data;
  const { busstop: busStops, subway } = data.placeDetail.findway;
  const { phonenum, homepage, openHour, facilityInfo } =
    data.placeDetail.basicInfo;

  return (
    <div className='flex h-full flex-col gap-2 overflow-y-scroll'>
      {/* 1. 이미지 & 기본 정보 */}
      <PlaceBasicInfo data={data} placeId={placeId} />
      {/* 2. 장소 정보 */}
      <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
        {/* 주소 */}
        <span className='flex items-center gap-2'>
          <Image src='/icons/icon-place.svg' alt='' width={24} height={24} />
          {data.placeInfo.address}
        </span>
        {/* 이용 시간 */}
        {openHour && (
          <div className='flex items-start gap-2'>
            <Image src='/icons/icon-clock.svg' alt='' width={24} height={24} />
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
            <Image src='/icons/icon-phone.svg' alt='' width={24} height={24} />
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
            <Image src='/icons/icon-info.svg' alt='' width={24} height={24} />
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
                    <span className='text-center'>{FACALTY_INFO['pet']}</span>
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
      {/* 3. 리뷰 */}
      {reviews.length === 0 && (
        <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
          <div className='mb-2 flex justify-between'>
            <span className='text-base font-semibold'>
              리뷰 <span className='text-gray-500'>{reviews.length}</span>
            </span>
            <Link href={`${placeId}/review/form`}>리뷰 쓰기</Link>
          </div>
        </div>
      )}
      {/* 4. 찾아가는 길 */}
      {(busStops || subway) && (
        <div className='flex flex-col gap-4 bg-white px-4 py-5 pb-7 text-sm'>
          <span className='mb-2 text-base font-semibold'>찾아가는 길 </span>
          {/* 지하철역 */}
          {subway && (
            <div>
              <span className='mb-2 flex items-center gap-1 font-medium'>
                <Image
                  src='/icons/icon-subway.svg'
                  alt='지하철 그림'
                  width={24}
                  height={24}
                />
                지하철역
              </span>
              <div className='flex flex-col gap-2'>
                {subway.map((station: any) => (
                  <div className='flex gap-1' key={station.stationId}>
                    <div className=''>•</div>
                    <div className='flex flex-wrap items-center gap-1 text-xs'>
                      <span className='text-sm'>
                        {station.stationSimpleName}
                      </span>
                      {station.subwayList.map(
                        (info: any) =>
                          info.subwayName && (
                            <span
                              className='bg-hover shrink-0 rounded-full border border-solid border-gray-500 px-2 py-[1px] text-xs'
                              key={info.subwayId}
                            >
                              {info.subwayName}
                            </span>
                          ),
                      )}
                      <span className='h-3 w-[1px] bg-gray-300'></span>
                      <span>{station.exitNum}번 출구</span>
                      <span className='text-olive-green'>
                        도보 {station.toExitMinute}분
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {busStops && subway && <hr />}
          {/* 버스 정류장 */}
          {busStops && (
            <div>
              <span className='mb-2 flex items-center gap-1 font-medium'>
                <Image
                  src='/icons/icon-bus.svg'
                  alt='버스 그림'
                  width={24}
                  height={24}
                />
                버스정류장
              </span>
              <div className='flex flex-col gap-3'>
                {busStops.map((busStop: any) => (
                  <div
                    className='flex items-start gap-1'
                    key={busStop.busStopId}
                  >
                    <div className=''>•</div>
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-start gap-2'>
                        <span className=''>
                          {busStop.busStopName}{' '}
                          <span className='text-gray-500'>
                            {'('}
                            {busStop.busStopDisplayId}
                            {')'}
                          </span>
                        </span>
                        <div className='flex items-center gap-2'>
                          <span className='h-3 w-[1px] bg-gray-300'></span>
                          <span className='text-gray-500'>
                            {busStop.toBusstopDistance}m
                          </span>
                        </div>
                      </div>
                      {busStop.busInfo.map((info: any) => (
                        <div
                          className='flex items-start gap-2'
                          key={info.busTypeCode}
                        >
                          <span className='bg-hover shrink-0 rounded-md border border-solid border-gray-500 px-1 py-[1px] text-xs'>
                            {info.busType}
                          </span>
                          <span>{info.busNames}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceDetailPage;
