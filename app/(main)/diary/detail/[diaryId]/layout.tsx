import Header from '@/app/_component/common/Header';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { useGetDiaryDetail } from '@/app/store/server/diary';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export interface DiaryLayoutProps {
  children: React.ReactNode;

  params: { diaryId: number };
}

const DiaryLayout = async ({ children, params }: DiaryLayoutProps) => {
  const queryClient = getQueryClient();
  const queryOptions = useGetDiaryDetail(params?.diaryId);

  await queryClient.prefetchQuery(queryOptions);

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className='relative flex basis-full flex-col overflow-y-auto'>
      <Header title='일기 상세' enableBackButton />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </div>
  );
};

export default DiaryLayout;
