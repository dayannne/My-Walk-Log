import { useMap } from '@/app/shared/contexts/Map';
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
      return response.data;
    },
    staleTime: 0,
  });

export const useCreatePlace = () => {
  return useMutation({
    mutationFn: async (data: IPlaceInfo[]) => {
      const result = await axios.post('/api/search/result', data);
      return result;
    },
    onSuccess: async () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};

const usePlaceLike = (method: 'post' | 'delete') => {
  const queryClient = useQueryClient();
  const { mutate: search } = useSearchPlace();
  const mapContext = useMap();
  return useMutation({
    mutationFn: async ({
      placeId,
      userId,
    }: {
      placeId: string;
      userId: number;
    }) => {
      return await axios[method](
        `/api/place/${placeId}/${userId}/${method === 'post' ? 'like' : 'unlike'}`,
      );
    },
    onSuccess: async () => {
      search(mapContext?.places as IPlace[]);
      queryClient.invalidateQueries({ queryKey: ['likedPlaces'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeletePlaceLike = () => usePlaceLike('delete');

export const useCreatePlaceLike = () => usePlaceLike('post');

export const useGetLikedPlaces = (likedPlaces: string[]) =>
  queryOptions({
    queryKey: ['likedPlaces'],
    queryFn: async () => {
      const response = await axios.get(`/api/likedPlaces`, {
        params: { likedPlaces },
      });
      return response.data;
    },
    staleTime: 0,
  });
