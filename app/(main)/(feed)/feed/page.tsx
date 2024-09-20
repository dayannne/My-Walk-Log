import Header from '@/app/_component/common/Header';
import FeedDiary from '@/app/_component/diary/FeedDiaryList';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { getAllDiary } from '@/app/store/server/diary';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const FeedPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['allDiary'],
    queryFn: () => getAllDiary(1),
    getNextPageParam: (lastPage: any) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 30 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='flex h-full w-full basis-full flex-col'>
      <Header title='피드' />
      <div className='flex basis-full flex-col overflow-y-scroll'>
        <HydrationBoundary state={dehydratedState}>
          <FeedDiary />
        </HydrationBoundary>
      </div>
    </div>
  );
};

export default FeedPage;
