import { IDiary } from './diary';
import { IAddress } from './map';

import { IReview } from './review';

export interface IProfile {
  id: number;
  username: string;
  email: string;
  address: IAddress;
  introduction: string;
  profileImage: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  likedReviews: number[];
  likedPlaces: string[];
  reviews: IReview[];
  diaries: IDiary[];
}

export interface IProfileReq {
  username: string;
  address?: IAddress;
  introduction?: string;
  profileImage: string;
}
