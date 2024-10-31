import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const useGetTrail = (keyword: string) =>
  queryOptions({
    queryKey: ['trail', keyword],
    queryFn: async () => {
      const response = await axios.get(`/api/trail/search/${keyword}`);
      return response.data.data;
    },
    enabled: !!keyword,
  });
