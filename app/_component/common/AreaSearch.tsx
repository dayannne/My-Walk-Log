import React, { useEffect, useRef, useState } from 'react';
import AreaCode from '../../../public/data/area-code.json';
import { Area } from '@/app/shared/types/place';
import { filterAreaData } from '@/app/shared/function/filter';
import { useGetArea } from '@/app/store/server/area';
import { useSuspenseQuery } from '@tanstack/react-query';
import { calculateCenter } from '@/app/shared/function/calculator';

function AreaSearch() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [areaName, setAreaName] = useState<string | null>('');
  const [filteredResults, setFilteredResults] = useState<Area[]>([]);
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const queryOptions = useGetArea(selectedCode as number);
  const { data: areaInfo } = useSuspenseQuery(queryOptions);

  const data = filterAreaData(AreaCode as Area[]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;
    setAreaName(term);

    if (term) {
      const results = (data as Area[]).filter((item) =>
        item.법정동명.includes(term),
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const handleSelect = (item: Area) => {
    setSelectedCode(Math.floor(item.법정동코드 / 100));
    setAreaName(item.법정동명);
    setFilteredResults([]);
  };

  useEffect(() => {
    if (selectedCode && mapRef.current) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCode]);

  return (
    <div>
      <div className='flex max-h-56 w-full flex-col rounded-lg border border-solid border-gray-500 text-sm shadow-sm'>
        <input
          className={`w-full rounded-lg px-2 py-3 focus:outline-none ${filteredResults.length > 0 && 'rounded-b-none border-b border-solid border-gray-400'}`}
          type='text'
          value={areaName as string}
          onChange={handleSearchChange}
          placeholder='동명(읍,면)으로 검색 (ex.고색동)'
        />
        {filteredResults.length > 0 && (
          <ul className='flex-col overflow-y-scroll rounded-b-lg'>
            {filteredResults.map((item) => (
              <li key={item.법정동코드}>
                <button
                  type='button'
                  className='hover:bg-hover group flex w-full cursor-pointer flex-col px-2 py-3'
                  onClick={() => handleSelect(item)}
                >
                  <span>{item.법정동명}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {areaInfo && (
        <div id='map-area' ref={mapRef} className='aspect-square h-56 w-full' />
      )}
    </div>
  );
}

export default AreaSearch;
