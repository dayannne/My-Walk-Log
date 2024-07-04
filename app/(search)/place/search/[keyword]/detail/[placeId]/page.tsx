'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/user';

export interface PageProps {}

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['place'],
    queryFn: async () => {
      const response = await axios.get(`/api/place/${placeId}`);
      const data = await response.data;
      return data;
    },
  });

  if (isLoading || !data) return null; // 로딩 중일 때 초기 반환

  return <div></div>;
};

export default PlaceDetailPage;
