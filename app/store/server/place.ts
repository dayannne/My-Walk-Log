import { IPlaceInfo } from '@/app/shared/types/map';

import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

export const useGetPlace = (placeId: string) =>
  queryOptions({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const response = await axios.get(`/api/place/${placeId}`);
      return response.data.data;
    },
    staleTime: 0,
  });

export const useCreatePlace = () => {
  return useMutation({
    mutationFn: async (data: IPlaceInfo[]) => {
      const result = await axios.post('/api/place/search/result', data);
      return result;
    },
    onSuccess: async () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePlaceLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      placeId,
      userId,
    }: {
      placeId: string;
      userId: number;
    }) => {
      return await axios.post(`/api/place/${placeId}/${userId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place'] });
      queryClient.invalidateQueries({ queryKey: ['likedPlaces'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetLikedPlaces = (likedPlaces: string[]) =>
  queryOptions({
    queryKey: ['likedPlaces'],
    queryFn: async () => {
      const response = await axios.get(`/api/likedPlaces`, {
        params: { likedPlaces },
      });
      return response.data.data;
    },
    staleTime: 0,
  });
