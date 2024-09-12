import React from 'react';
import { useDiaryLike, useDeleteDiary } from '@/app/store/server/diary';

import { useUserStore } from '@/app/store/client/user';
import DiaryItem from './DiaryItem';

export interface DiaryListProps {
  diaries: any;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const { user } = useUserStore();
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();

  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  return (
    <ul className='flex flex-col gap-2 bg-white'>
      {diaries.map((diary: any) => (
        <DiaryItem
          key={diary.id}
          diary={diary}
          onConfirm={handleConfirm}
          onClick={() =>
            toggleLike({
              diaryId: diary.id,
              userId: user?.id as number,
            })
          }
        />
      ))}
    </ul>
  );
};

export default DiaryList;
