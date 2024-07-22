export interface IReviewReq {
  description: string;
  walkDuration: number | string | null;
  entryFee?: string | null;
  placeKeywords?: number[];
  reviewImages: string[];
}

export interface IReview {
  id: number;
  reviewImages: string[];
  description: string;
  keywords: number[];
  walkDuration: number;
  entryFee: string;
  likedCount: number;
  placeId: string;
  placeDetailId: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}
