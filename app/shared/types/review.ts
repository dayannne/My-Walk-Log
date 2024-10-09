import { IAuthor } from './auth';

export interface IReviewReq {
  description: string;
  walkDuration: number | string | null;
  entryFee?: string | null;
  placeKeywords?: number[];
  reviewImages: string[];
  placeName: string;
  placeAddress: string;
}

export interface IReview {
  id: number;
  reviewImages: string[];
  description: string;
  keywords: number[];
  walkDuration: number;
  entryFee: string;
  likedBy: number[];
  likedCount: number;
  placeId: string;
  placeDetailId: string;
  placeName: string;
  placeAddress: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
}
