import { infiniteQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getFeed = async (pageParam = 1) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/feed`,
    {
      params: { page: pageParam, size: 10 },
    },
  );
  return response.data;
};

export const useGetFeed = () =>
  infiniteQueryOptions({
    queryKey: ['feed'],
    queryFn: () => getFeed(1),
    getNextPageParam: (lastPage: any) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });
