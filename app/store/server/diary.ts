import { IDiaryReq } from '@/app/shared/types/diary';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
      alert('일기가 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
