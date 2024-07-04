'use client';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/app/store/user';
import {
  createPlaceLike,
  deletePlaceLike,
  getPlace,
} from '@/app/api/_routes/place';

export interface PageProps {}

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const placeId = params.placeId;
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { mutate: createLike } = useMutation({
    mutationFn: () => {
      return createPlaceLike(placeId, user?.id as number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place'] });
    },
  });
  const { mutate: deleteLike } = useMutation({
    mutationFn: () => {
      return deletePlaceLike(placeId, user?.id as number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place'] });
    },
  });
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['place'],
    queryFn: async () => {
      const response = await getPlace(placeId);
      return response.data;
    },
  });

  if (isLoading || !data) return null; // 로딩 중일 때 초기 반환

  return <div></div>;
};

export default PlaceDetailPage;
