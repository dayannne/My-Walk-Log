import { IReviewReq } from '@/app/shared/types/review';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useGetReviews = (placeId: string) =>
  queryOptions({
    queryKey: ['review', placeId],
    queryFn: async () => {
      const response = await axios.get(`/api/place/${placeId}/review`);
      return response.data;
    },
    staleTime: 0,
  });

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
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
      return await axios.post(`/api/place/${placeId}/review/${userId}`, data);
    },
    onSuccess: () => {
      alert('리뷰가 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['place'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCreateReviewLike = () => {
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
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewId,
      userId,
    }: {
      reviewId: number;
      userId: number;
    }) => {
      return await axios.delete(`/api/review/${reviewId}/${userId}/unlike`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['review'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      alert('리뷰가 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
