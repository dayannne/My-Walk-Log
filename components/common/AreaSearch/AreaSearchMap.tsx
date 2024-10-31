import { IAddress } from '@/shared/types/map';
import React, { useEffect, useRef } from 'react';

interface AreaSearchMapProps {
  address: IAddress;
}

function AreaSearchMap({ address }: AreaSearchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapRef.current && address?.center) {
      kakao?.maps.load(() => {
        const position = new kakao.maps.LatLng(
          address.center[1],
          address.center[0],
        );
        const options = {
          center: position,
          level: 7,
        };
        const kakaoMap = new kakao.maps.Map(
          mapRef.current as HTMLDivElement,
          options,
        );

        const polygonPaths = address?.polygonPaths?.map(
          (polygonPath: number[]) =>
            new kakao.maps.LatLng(polygonPath[1], polygonPath[0]),
        );

        const polygon = new kakao.maps.Polygon({
          path: polygonPaths, // 그려질 다각형의 좌표 배열
          strokeWeight: 2, // 선의 두께
          strokeColor: '#8a9455', // 선의 색깔
          strokeOpacity: 1, // 선의 불투명도
          strokeStyle: 'solid', // 선의 스타일
          fillColor: '#8a9455', // 채우기 색깔
          fillOpacity: 0.3, // 채우기 불투명도
        });

        polygon.setMap(kakaoMap);
        kakaoMap.panTo(position);
      });
    }
  }, [address]);

  return (
    <>
      {address && (
        <div id='map-area' ref={mapRef} className='aspect-square h-56 w-full' />
      )}
    </>
  );
}

export default AreaSearchMap;
