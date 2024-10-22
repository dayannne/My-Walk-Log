import React from 'react';
import { useDiaryLike, useDeleteDiary } from '@/store/server/diary';

import DiaryItem from './DiaryItem';
import { useUserStore } from '@/store/client/user';
import { IDiary } from '@/shared/types/diary';

export interface DiaryListProps {
  diaries: IDiary[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const user = useUserStore((state) => state.user);
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();

  const handleConfirm = (diaryId: number) => {
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }
    deleteDiary({
      diaryId,
      userId: user?.id,
    });
  };

  const handleClick = (diaryId: number) => {
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }
    toggleLike({
      diaryId,
      userId: user?.id,
    });
  };

  return (
    <ul className='flex flex-col gap-2 bg-white'>
      {diaries.map((diary: IDiary) => (
        <DiaryItem
          key={diary.id}
          diary={diary}
          onConfirm={handleConfirm}
          onClick={() => handleClick(diary?.id)}
        />
      ))}
    </ul>
  );
};

export default DiaryList;
