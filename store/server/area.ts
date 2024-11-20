import { Latlng } from '@/shared/types/map';
import { useQuery } from '@tanstack/react-query';

export interface AreaReq {
  areaCode?: number | null; // 지역 코드
  location?: Latlng | null;
}

export const useGetArea = ({ areaCode, location }: AreaReq) =>
  useQuery({
    queryKey: ['areaInfo', areaCode, location],
    queryFn: async () => {
      if (!areaCode && !location) {
        return null;
      }
      const qs = require('qs');
      // qs를 사용해 파라미터 직렬화 시 인코딩 방지
      const params = {
        service: 'data',
        request: 'GetFeature',
        data: 'LT_C_ADEMD_INFO',
        key: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
        size: '1000',
        format: 'json',
        errorformat: 'json',
        domain: process.env.NEXT_PUBLIC_DOMAIN || '',
        attrfilter: location ? '' : areaCode ? `emd_cd:like:${areaCode}` : '',
        geomfilter: location
          ? `POINT(${location.longitude} ${location.latitude})`
          : '',
      };

      // API 호출
      const queryString = qs.stringify(params, { encode: false });
      const response = await fetch(`/api/vworld?${queryString}`);
      const result = await response.json();

      const status = result?.response?.status;

      if (status === 'NOT_FOUND') {
        console.error(
          `해당 코드에 맞는 데이터를 찾을 수 없습니다. code: ${areaCode}`,
        );
        return null;
      }

      if (status !== 'OK') {
        const errorMessage = JSON.stringify(result?.response);
        console.error(errorMessage);
        return null;
      }

      return result?.response?.result?.featureCollection || null;
    },
    staleTime: 0,
    enabled: !!areaCode || !!location,
  });
