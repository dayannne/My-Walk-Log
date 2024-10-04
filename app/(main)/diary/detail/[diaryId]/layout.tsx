import Header from '@/app/_component/common/Header';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { getDiaryDetail } from '@/app/store/server/diary';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export interface DiaryLayoutProps {
  children: React.ReactNode;

  params: { diaryId: number };
}

const DiaryLayout = async ({ children, params }: DiaryLayoutProps) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diaryDetail', Number(params?.diaryId)],
    queryFn: () => getDiaryDetail(Number(params?.diaryId)),
  });

  return (
    <div className='flex basis-full flex-col overflow-y-auto'>
      <Header title='일기 상세' enableBackButton />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
};

export default DiaryLayout;
