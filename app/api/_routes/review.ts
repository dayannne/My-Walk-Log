import { IReviewReq } from '@/app/shared/types/review';
import axios from 'axios';

export const createReview = async (
  data: IReviewReq,
  placeId: string,
  userId: number,
) => {
  const result = await axios.post(
    `/api/place/${placeId}/review/${userId}`,
    data,
  );
  return result;
};

export const getReviews = async (placeId: string) => {
  const result = await axios.get(`/api/place/${placeId}/review`);
  return result;
};

export const createReviewLike = async (reviewId: number, userId: number) => {
  const result = await axios.post(`/api/review/${reviewId}/${userId}/like`);
  return result;
};

export const deleteReviewLike = async (reviewId: number, userId: number) => {
  const result = await axios.delete(`/api/review/${reviewId}/${userId}/unlike`);
  return result;
};
