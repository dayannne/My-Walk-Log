import { infiniteQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const getFeed = async (pageParam = 1) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/feed?page=${pageParam}&size=10`,
  ).then((res) => res.json());
};

export const useGetFeed = () =>
  infiniteQueryOptions({
    queryKey: ['feed'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/feed?page=${pageParam}&size=10`);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
