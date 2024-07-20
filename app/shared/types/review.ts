export interface IReviewReq {
  description: string;
  walkDuration: number | string | null;
  entryFee?: string | null;
  placeKeywords?: number[];
  reviewImages: string[];
}
