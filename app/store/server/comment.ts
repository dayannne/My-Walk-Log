import { ICommentReq } from '@/app/shared/types/comment';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      userId,
      diaryId,
    }: {
      data: ICommentReq;
      userId: number;
      diaryId: number;
    }) => {
      return await axios.post(`/api/diary/${diaryId}/${userId}/comment`, data);
    },
    onSuccess: () => {
      alert('댓글이 기록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['diaryDetail'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      userId,
      diaryId,
      commentId,
    }: {
      data: ICommentReq;
      userId: number;
      diaryId: number;
      commentId: number;
    }) => {
      return await axios.put(
        `/api/diary/${diaryId}/${userId}/comment/${commentId}/edit`,
        data,
      );
    },
    onSuccess: () => {
      alert('댓글이 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['diaryDetail'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      diaryId,
      commentId,
    }: {
      userId: number;
      diaryId: number;
      commentId: number;
    }) => {
      return await axios.delete(
        `/api/diary/${diaryId}/${userId}/comment/${commentId}/delete`,
      );
    },
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['diaryDetail'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
