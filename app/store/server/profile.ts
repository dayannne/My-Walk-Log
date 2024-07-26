import { IProfile } from '@/app/shared/types/profile';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const useGetMyProfile = (userId: number) =>
  queryOptions({
    queryKey: ['myProfile', userId],
    queryFn: async () => {
      const resullt = await axios.get(`/api/profile/${userId}/my`);
      return resullt.data as IProfile;
    },
    staleTime: 0,
  });
