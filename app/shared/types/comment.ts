import { IAuthor } from './auth';

export interface IComment {
  id: number;
  diaryId: number;
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
}

export interface ICommentReq {
  content: string;
}
