export interface Comment {
  id: number;
  diaryId: number;
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentReq {
  content: string;
}
