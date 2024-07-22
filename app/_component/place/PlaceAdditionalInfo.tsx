'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FACALTY_INFO } from '@/app/shared/constant';

export interface PlaceAdditionalInfoProps {
  place: any;
}

const PlaceAdditionalInfo = ({ place }: PlaceAdditionalInfoProps) => {
  const { phonenum, homepage, openHour, facilityInfo } =
    place.placeDetail.basicInfo;

  return (
    <div className='flex flex-col gap-4 bg-white px-4 py-5 text-sm'>
      {/* 주소 */}
      <span className='flex items-center gap-2'>
        <Image src='/icons/icon-place.svg' alt='' width={24} height={24} />
        {place.placeInfo.address}
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
                  <span className='text-center'>{FACALTY_INFO['parking']}</span>
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
  );
};

export default PlaceAdditionalInfo;
