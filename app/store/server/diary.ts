import { IDiaryReq } from '@/app/shared/types/diary';

import {
  useQueryClient,
  useMutation,
  queryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useGetDiary = (placeId: string) =>
  queryOptions({
    queryKey: ['diary', placeId],
    queryFn: async () => {
      const response = await axios.get(`/api/place/${placeId}/diary`);
      return response.data;
    },
    staleTime: 0,
  });

export const useGetDiaryDetail = (diaryId: number) =>
  queryOptions({
    queryKey: ['diaryDetail', diaryId],
    queryFn: async () => {
      const response = await axios.get(`/api/diary/${diaryId}`);
      return response.data;
    },
    staleTime: 0,
  });

export const useGetAllDiary = () =>
  useInfiniteQuery({
    queryKey: ['allDiary'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/diary?page=${pageParam}&size=10`);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
  });

export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IDiaryReq) => {
      return await axios.post(`/api/diary/write`, data);
    },
    onSuccess: () => {
      alert('일기가 기록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCreateDiaryLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      diaryId,
      userId,
    }: {
      diaryId: number;
      userId: number;
    }) => {
      return axios.post(`/api/diary/like/${diaryId}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteDiaryLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      diaryId,
      userId,
    }: {
      diaryId: number;
      userId: number;
    }) => {
      return await axios.delete(`/api/diary/like/${diaryId}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      diaryId,
      userId,
    }: {
      diaryId: number;
      userId: number;
    }) => {
      return await axios.delete(`/api/diary/delete/${diaryId}/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      alert('일기가 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
