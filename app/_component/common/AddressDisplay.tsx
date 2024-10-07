import React, { useEffect, useState } from 'react';
import { useMap } from '@/app/shared/contexts/Map';
import { IRegion } from '@/app/shared/types/map';

const AddressDisplay: React.FC = () => {
  const { mapData } = useMap()!;
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!mapData) return;

    const geocoder = new kakao.maps.services.Geocoder();

    const displayCenterInfo = (
      result: IRegion[],
      status: kakao.maps.services.Status,
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === 'H') {
            setAddress(result[i].address_name);
            break;
          }
        }
      }
    };

    // 지도 중심 좌표에 대한 주소정보를 요청합니다.
    const searchAddrFromCoords = () => {
      const coords = mapData.getCenter();
      geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        displayCenterInfo,
      );
    };

    // 지도 idle 이벤트 발생 시 주소 정보 요청
    kakao.maps.event.addListener(mapData, 'idle', searchAddrFromCoords);

    // 초기 로딩 시 주소 정보 요청
    searchAddrFromCoords();

    // 컴포넌트가 언마운트될 때 이벤트 해제
    return () => {
      kakao.maps.event.removeListener(mapData, 'idle', searchAddrFromCoords);
    };
  }, [mapData]);

  return (
    <>
      {address && (
        <div
          id='centerAddr'
          className='bg-hover text-olive-green border-olive-green absolute left-4 top-4 z-10 rounded-lg border border-solid px-2 py-1 text-xs lg:text-sm'
        >
          {address}
        </div>
      )}
    </>
  );
};

export default AddressDisplay;
