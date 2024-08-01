import { IDiaryReq } from '@/app/shared/types/diary';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useCreateDiary = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IDiaryReq) => {
      return await axios.post(`/api/diary/write`, data);
    },
    onSuccess: () => {
      alert('일기가 기록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
