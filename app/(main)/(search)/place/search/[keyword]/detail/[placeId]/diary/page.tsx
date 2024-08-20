'use client';

import { useGetDiary } from '@/app/store/server/diary';
import { useSuspenseQuery } from '@tanstack/react-query';
import DiaryList from '@/app/_component/diary/DiaryList';
import EmptyDiaries from '@/app/_component/diary/EmpryDiaries';

export interface pageProps {}

const PlaceDiaryPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const queryOptions = useGetDiary(placeId);
  const { data: diaries } = useSuspenseQuery(queryOptions);

  if (!diaries) return null;

  if (diaries.length === 0) return <EmptyDiaries />;

  return (
    <div className='bg-white'>
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default PlaceDiaryPage;
