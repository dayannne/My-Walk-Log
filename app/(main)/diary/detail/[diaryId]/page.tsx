'use client';

import Header from '@/app/_component/common/Header';
import Commentform from '@/app/_component/diary/Commentform';
import CommentList from '@/app/_component/diary/CommentList';
import DiaryItem from '@/app/_component/diary/DiaryItem';
import { useUserStore } from '@/app/store/client/user';
import {
  useCreateDiaryLike,
  useDeleteDiary,
  useDeleteDiaryLike,
  useGetDiaryDetail,
} from '@/app/store/server/diary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface DiaryPageProps {}

const DiaryPage = ({ params }: { params: { diaryId: number } }) => {
  const { diaryId } = params;
  const { user } = useUserStore();
  const queryOptions = useGetDiaryDetail(params.diaryId);
  const { data: diary } = useSuspenseQuery(queryOptions);
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  return (
    <div className='relative flex basis-full flex-col overflow-y-auto'>
      <Header title='일기 상세' />
      <div className='flex basis-full flex-col overflow-y-scroll'>
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
        <div className='flex-grow'>
          {
            <CommentList
              diaryId={diaryId}
              comments={diary.comments}
              setContent={setContent}
              setEditId={setEditId}
            />
          }
        </div>
      </div>
      <Commentform
        diaryId={diaryId}
        content={content}
        setContent={setContent}
        editId={editId}
        setEditId={setEditId}
      />
    </div>
  );
};

export default DiaryPage;
