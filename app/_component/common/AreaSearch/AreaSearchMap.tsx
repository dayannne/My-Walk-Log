import React, { useEffect, useRef } from 'react';
import { calculateCenter } from '@/app/shared/function/calculator';

function AreaSearchMap({ areaInfo }: { areaInfo: any }) {
  const mapRef = useRef<HTMLDivElement>(null);
  console.log(areaInfo);
  useEffect(() => {
    if (mapRef.current && areaInfo) {
      const center = calculateCenter(areaInfo.bbox);
      const position = new kakao.maps.LatLng(center.y, center.x);
      const options = {
        center: position,
        level: 7,
      };

      const kakaoMap = new kakao.maps.Map(mapRef.current, options);

      const polygonPaths =
        areaInfo?.features[0]?.geometry?.coordinates[0][0]?.map(
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
    }
  }, [areaInfo]);

  return (
    <>
      {areaInfo && (
        <div id='map-area' ref={mapRef} className='aspect-square h-56 w-full' />
      )}
    </>
  );
}

export default AreaSearchMap;
