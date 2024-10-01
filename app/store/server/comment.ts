import { ICommentReq } from '@/app/shared/types/comment';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useUserStore } from '../client/user';

export const useCreateComment = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      diaryId,
      data,
    }: {
      diaryId: number;
      data: ICommentReq;
    }) => {
      return await axios.post(
        `/api/diary/${diaryId}/${user?.id}/comment`,
        data,
      );
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
  const { user } = useUserStore();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      diaryId,
      commentId,
      data,
    }: {
      diaryId: number;
      commentId: number;
      data: ICommentReq;
    }) => {
      return await axios.put(
        `/api/diary/${diaryId}/${user?.id}/comment/${commentId}/edit`,
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
  const { user } = useUserStore();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      diaryId,
      commentId,
    }: {
      diaryId: number;
      commentId: number;
    }) => {
      return await axios.delete(
        `/api/diary/${diaryId}/${user?.id}/comment/${commentId}/delete`,
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
