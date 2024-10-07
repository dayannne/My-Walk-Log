import { IAuthor } from './auth';
import { IComment } from './comment';

export interface IDiaryReq {
  diaryImages: string[];
  content: string;
  weather: string | null;
  tags: string[];
  placeId: string | null;
  placeName: string |null;
  placeAddress: string | null;
  isPublic: boolean | string;
}

export interface IDiary {
  id: number;
  diaryImages: string[];
  content: string;
  tags: string[];
  weather: 'sunny' | 'partlyCloudy' | 'cloudy' | 'rainy' | 'snowy';
  isPublic: boolean;
  likedBy: number[];
  likedCount: number;
  placeId: string;
  placeName: string | null;
  placeAddress: string | null;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
  comments: IComment[];
}
