import { IProfile, IProfileReq } from '@/app/shared/types/profile';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../client/user';

export const useGetMyProfile = (userId: number) =>
  queryOptions({
    queryKey: ['myProfile', userId],
    queryFn: async () => {
      const resullt = await axios.get(`/api/profile/${userId}/my`);
      return resullt.data as IProfile;
    },
    staleTime: 0,
  });

export const useEditProfile = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IProfileReq) => {
      return await axios.put(`/api/profile/${user?.id}/edit`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      alert('프로필이 수정되었습니다.');
      router.push(`/profile/my`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
