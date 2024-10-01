'use client';

import { IDiaryReq } from '@/app/shared/types/diary';

import {
  useQueryClient,
  useMutation,
  queryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useModalStore } from '../client/modal';
import { useUserStore } from '../client/user';

export const getDiaryDetail = async (diaryId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/diary/${diaryId}`,
  ).then((res) => res.json());
};

export const useGetDiaryDetail = (diaryId: number) =>
  queryOptions({
    queryKey: ['diaryDetail', diaryId],
    queryFn: async () => {
      const response = await axios.get(`/api/diary/${diaryId}`);
      return response.data;
    },
    enabled: !!diaryId,
  });

export const useCreateDiary = () => {
  const { user } = useUserStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IDiaryReq) => {
      return await axios.post(`/api/diary/${user?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDiaryLike = () => {
  const { user } = useUserStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (diaryId: number) => {
      return axios.post(`/api/diary/${diaryId}/${user?.id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place'] });
      queryClient.invalidateQueries({ queryKey: ['diaryDetail'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteDiary = () => {
  const { user } = useUserStore();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { openInfo } = useModalStore();

  return useMutation({
    mutationFn: async (diaryId: number) => {
      return await axios.delete(`/api/diary/${diaryId}/${user?.id}/delete`);
    },
    onSuccess: () => {
      alert('일기가 삭제되었습니다.');
      // 장소 상세 모달에서 삭제
      if (openInfo) queryClient.invalidateQueries({ queryKey: ['place'] });
      // 마이 프로필 페이지에서 삭제
      if (pathname.includes('profile'))
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      // 일기 상세에서 삭제
      if (pathname.includes('diary')) {
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
        queryClient.invalidateQueries({ queryKey: ['allDiary'] });
        router.back();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
