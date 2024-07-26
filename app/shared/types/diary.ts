export interface IDiaryReq {
  description: string;
  weather: number | string | null;
  tags?: string[];
  diaryImages: string[];
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
