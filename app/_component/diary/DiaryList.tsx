import React from 'react';
import { useDiaryLike, useDeleteDiary } from '@/app/store/server/diary';

import DiaryItem from './DiaryItem';

export interface DiaryListProps {
  diaries: any;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();

  const handleConfirm = (diaryId: number) => {
    deleteDiary(diaryId);
  };

  return (
    <ul className='flex flex-col gap-2 bg-white'>
      {diaries.map((diary: any) => (
        <DiaryItem
          key={diary.id}
          diary={diary}
          onConfirm={handleConfirm}
          onClick={() => toggleLike(diary?.id)}
        />
      ))}
    </ul>
  );
};

export default DiaryList;
