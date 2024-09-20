import { IDiary } from './diary';

import { IReview } from './review';

export interface IProfile {
  id: number;
  username: string;
  email: string;
  address: string;
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

export interface IAddress {
  code: string;
  areaName: string;
  center: number[];
  polygonPaths: number[][];
}

export interface IProfileReq {
  username: string;
  address?: IAddress;
  introduction?: string;
  profileImage: string;
}
