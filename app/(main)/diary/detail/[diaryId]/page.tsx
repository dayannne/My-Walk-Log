'use client';

import Header from '@/app/_component/common/Header';
import DiaryItem from '@/app/_component/diary/DiaryItem';
import { useUserStore } from '@/app/store/client/user';
import {
  useCreateDiaryLike,
  useDeleteDiary,
  useDeleteDiaryLike,
  useGetDiaryDetail,
} from '@/app/store/server/diary';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface DiaryPageProps {}

const DiaryPage = ({ params }: { params: { diaryId: number } }) => {
  const { user } = useUserStore();
  const queryOptions = useGetDiaryDetail(params.diaryId);
  const { data: diary } = useSuspenseQuery(queryOptions);
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();

  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  return (
    <div>
      <Header title='일기 상세' />
      {diary && (
        <DiaryItem
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
      )}
    </div>
  );
};

export default DiaryPage;
