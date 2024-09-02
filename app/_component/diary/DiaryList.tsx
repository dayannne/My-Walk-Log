import React from 'react';
import {
  useCreateDiaryLike,
  useDeleteDiary,
  useDeleteDiaryLike,
} from '@/app/store/server/diary';

import { useUserStore } from '@/app/store/client/user';
import DiaryItem from './DiaryItem';

export interface DiaryListProps {
  diaries: any;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const { user } = useUserStore();
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
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
            diary.likedBy.some((id: number) => id === user?.id) === true
              ? deleteLike({
                  diaryId: diary.id,
                  userId: user?.id as number,
                })
              : createLike({
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
