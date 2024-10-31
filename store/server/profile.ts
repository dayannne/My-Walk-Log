'use client';

import { IProfile, IProfileReq } from '@/shared/types/profile';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../client/user';

export const getMyProfile = async (userId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/${userId}/my`,
  );

  return response.data.data;
};

export const useGetMyProfile = (userId: number) =>
  queryOptions({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(userId),
    enabled: !!userId,
    staleTime: 60 * 1000,
  });

export const useEditProfile = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: IProfileReq) => {
      return await axios.put(`/api/profile/${user?.id}/edit`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      alert('프로필이 수정되었습니다.');
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
