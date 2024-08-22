import { mapInstance } from '@/app/api/_routes/axiosInstance';
import { queryOptions } from '@tanstack/react-query';

export const useGetArea = (areaCode: number | null) =>
  queryOptions({
    queryKey: ['areaInfo', areaCode],
    queryFn: async () => {
      if (areaCode === null) {
        return null;
      }

      const result = await mapInstance.get('', {
        params: {
          service: 'data',
          request: 'GetFeature',
          data: 'LT_C_ADEMD_INFO',
          key: `${process.env.NEXT_PUBLIC_MAP_API_KEY}`,
          size: 1000,
          domain: `${process.env.NEXT_PUBLIC_DOMAIN}`,
          format: 'json',
          errorformat: 'json',
          attrfilter: `emd_cd:like:${areaCode}`,
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
    enabled: areaCode !== null,
  });
