'use client';

import { IReviewReq } from '@/app/shared/types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { usePlaceDetailStore } from '../client/place';
import { usePathname } from 'next/navigation';
import { useModalStore } from '../client/modal';

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { setPlaceDetailState } = usePlaceDetailStore();

  return useMutation({
    mutationFn: async ({
      placeId,
      userId,
      data,
    }: {
      placeId: string;
      userId: number;
      data: IReviewReq;
    }) => {
      return await axios.post(`/api/place/${placeId}/${userId}/review`, data);
    },
    onSuccess: () => {
      alert('리뷰가 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['place'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setPlaceDetailState(0);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      userId,
    }: {
      reviewId: number;
      userId: number;
    }) => {
      return axios.post(`/api/review/${reviewId}/${userId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { openInfo } = useModalStore();

  return useMutation({
    mutationFn: async ({
      reviewId,
      userId,
    }: {
      reviewId: number;
      userId: number;
    }) => {
      return await axios.delete(`/api/review/${reviewId}/${userId}/delete`);
    },
    onSuccess: () => {
      alert('리뷰가 삭제되었습니다.');
      // 장소 상세 모달에서 삭제
      if (openInfo) queryClient.invalidateQueries({ queryKey: ['place'] });
      // 마이 프로필 페이지에서 삭제
      if (pathname.includes('profile')) {
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
