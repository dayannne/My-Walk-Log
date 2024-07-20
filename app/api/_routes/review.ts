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
