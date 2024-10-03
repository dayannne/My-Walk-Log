import { IAddress } from './profile';

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
  address: string;
  likedDiaries: [];
  likedPlaces: [];
  likedReviews: [];
  reviews: [];
  diaries: [];
  createdAt: string;
  updatedAt: string;
}
