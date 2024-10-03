export interface IDiaryReq {
  placeId: string;
  diaryImages: string[];
  content: string;
  weather: string | null;
  tags?: string[];
  placeName: string;
  placeAddress: string;
  isPublic: boolean | string;
}

export interface IDiary {
  id: number;
  placeId: string;
  diaryImages: string[];
  content: string;
  likedCount: number;
  likedBy: number[];
  createdAt: Date;
  updatedAt: Date;
  weather: string;
  tags: string[];
  authorId: number;
}
