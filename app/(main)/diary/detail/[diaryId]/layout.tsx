import Header from '@/app/_component/common/Header';
import getQueryClient from '@/app/shared/utils/getQueryCLient';
import { getDiaryDetail, useGetDiaryDetail } from '@/app/store/server/diary';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';

export interface DiaryLayoutProps {
  children: React.ReactNode;

  params: { diaryId: number };
}

const DiaryLayout = async ({ children, params }: DiaryLayoutProps) => {
  const queryClient = getQueryClient();

  // 데이터 프리패치
  await queryClient.fetchQuery({
    queryKey: ['diaryDetail'],
    queryFn: () => getDiaryDetail(Number(params.diaryId)),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <div className='flex basis-full flex-col overflow-y-auto'>
      <Header title='일기 상세' enableBackButton />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </div>
  );
};

export default DiaryLayout;
