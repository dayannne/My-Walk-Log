import Header from '@/app/_component/common/Header';
import { IDiary } from '@/app/shared/types/diary';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { getFeed } from '@/app/store/server/feed';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface FeedLayoutProps {
  children: React.ReactNode;
}

interface FeedData {
  pages: IDiary[];
  pageParams: number[];
}

const FeedLayout = async ({ children }: FeedLayoutProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['feed'],
    queryFn: () => getFeed(1),
    getNextPageParam: (lastPage: { page: number; totalPages: number }) => {
      const { page, totalPages } = lastPage;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    retry: 1,
    staleTime: 60 * 1000,
  });

  queryClient.setQueryData(['feed'], {
    pages: (queryClient.getQueryData(['feed']) as FeedData)?.pages || [],
    pageParams: [0],
  });

  return (
    <div
      className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 basis-full flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
    >
      <div className='flex h-full w-full basis-full flex-col'>
        <Header title='피드' />
        <div className='flex basis-full flex-col overflow-y-scroll'>
          <HydrationBoundary
            state={JSON.parse(JSON.stringify(dehydrate(queryClient)))}
          >
            {children}
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
