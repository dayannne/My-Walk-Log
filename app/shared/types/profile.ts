import { IDiary } from './diary';
import { IReview } from './review';

export interface IProfile {
  id: number;
  username: string;
  email: string;
  profileImage: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  likedReviews: number[];
  likedPlaces: string[];
  reviews: IReview[];
  diaries: IDiary[];
}
