import { ICommentReq } from '@/app/shared/types/comment';
import {
  useQueryClient,
  useMutation,
  queryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      diaryId,
      data,
    }: {
      diaryId: number;
      data: ICommentReq;
    }) => {
      return await axios.post(`/api/diary/${diaryId}/comment`, data);
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
      diaryId,
      commentId,
      data,
    }: {
      diaryId: number;
      commentId: number;
      data: ICommentReq;
    }) => {
      return await axios.put(
        `/api/diary/${diaryId}/comment/${commentId}/edit`,
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
      diaryId,
      commentId,
    }: {
      diaryId: number;
      commentId: number;
    }) => {
      return await axios.delete(
        `/api/diary/${diaryId}/comment/${commentId}/delete`,
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
