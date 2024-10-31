'use client';

import {
  IBusInfo,
  IBusStop,
  IPlace,
  ISubway,
  ISubwayList,
} from '@/shared/types/place';
import Image from 'next/image';

export interface PlaceFindWayInfoProps {
  place: IPlace;
}

const PlaceFindWayInfo = ({ place }: PlaceFindWayInfoProps) => {
  const { busstop: busStops, subway } = place?.findway || {};

  return (
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
            {subway.map((station: ISubway) => (
              <div className='flex gap-1' key={station.stationId}>
                <div className=''>•</div>
                <div className='flex flex-wrap items-center gap-1 text-xs'>
                  <span className='text-sm'>{station.stationSimpleName}</span>
                  {station.subwayList.map(
                    (info: ISubwayList) =>
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
            {busStops.map((busStop: IBusStop) => (
              <div className='flex items-start gap-1' key={busStop.busStopId}>
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
                  {busStop.busInfo.map((info: IBusInfo) => (
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
  );
};

export default PlaceFindWayInfo;
