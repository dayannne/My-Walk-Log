import { mapInstance } from '@/app/api/_routes/axiosInstance';
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
      const result = await mapInstance.get('', {
        params: {
          service: 'data',
          request: 'GetFeature',
          data: 'LT_C_ADEMD_INFO',
          key: `${process.env.NEXT_PUBLIC_MAP_API_KEY}`,
          size: 1000,
          format: 'json',
          errorformat: 'json',
          domain: 'https://my-walk-log.vercel.app',
          attrfilter: areaCode ? `emd_cd:like:${areaCode}` : '',
          geomfilter: location
            ? `POINT(${location?.longitude} ${location?.latitude})`
            : '',
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false }); // encode: false로 인코딩을 방지
        },
      });

      const status = result.data.response.status;

      if (status === 'NOT_FOUND') {
        console.error(
          `해당 코드에 맞는 데이터를 찾을 수 없습니다. code: ${areaCode}`,
        );
        return null;
      }

      if (status !== 'OK') {
        const errorMessage = JSON.stringify(result.data.response);
        console.error(errorMessage);
        return null;
      }

      const data = result.data.response.result.featureCollection;

      return data;
    },
    staleTime: 0,
    enabled: !!areaCode || !!location,
  });
