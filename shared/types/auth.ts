import { IDiary } from './diary';
import { IAddress } from './map';

export interface ISignupForm {
  email: string;
  password: string;
  passwordConfirm?: string;
  username: string;
  address: IAddress | null;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  profileImage: string;
  introduction: string;
  address: IAddress | null;
  likedDiaries: [];
  likedPlaces: [];
  likedReviews: [];
  // reviews: [];
  // diaries: [];
  createdAt: string;
  updatedAt: string;
}

export interface IAuthor {
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
  likedDiaries: number[];
  likedPlaces: string[];
  diaries: IDiary[];
}
