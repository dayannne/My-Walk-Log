'use client';

import { IDiaryReq } from '@/shared/types/diary';

import {
  useQueryClient,
  useMutation,
  queryOptions,
} from '@tanstack/react-query';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useModalStore } from '../client/modal';

export const getDiaryDetail = async (diaryId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/diary/${diaryId}`,
  );

  return response.data.data;
};

export const useGetDiaryDetail = (diaryId: number) =>
  queryOptions({
    queryKey: ['diaryDetail', diaryId],
    queryFn: () => getDiaryDetail(diaryId),
    enabled: !!diaryId,
  });

export const useCreateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      userId,
    }: {
      data: IDiaryReq;
      userId: number;
    }) => {
      return await axios.post(`/api/diary/write/${userId}`, data);
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      diaryId,
      userId,
    }: {
      diaryId: number;
      userId: number;
    }) => {
      return axios.post(`/api/diary/${diaryId}/${userId}/like`);
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
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const openInfo = useModalStore((state) => state.openInfo);

  return useMutation({
    mutationFn: async ({
      diaryId,
      userId,
    }: {
      diaryId: number;
      userId: number;
    }) => {
      return await axios.delete(`/api/diary/${diaryId}/${userId}/delete`);
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
