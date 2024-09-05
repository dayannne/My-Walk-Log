'use client';

import Header from '@/app/_component/common/Header';
import Commentform from '@/app/_component/diary/Commentform';
import CommentList from '@/app/_component/diary/CommentList';
import DiaryItem from '@/app/_component/diary/DiaryItem';
import { useUserStore } from '@/app/store/client/user';
import {
  useDiaryLike,
  useDeleteDiary,
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
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  return (
    <>
      <div className='flex basis-full flex-col overflow-y-scroll'>
        {diary && (
          <DiaryItem
            diary={diary}
            onConfirm={handleConfirm}
            onClick={() =>
              toggleLike({
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
    </>
  );
};

export default DiaryPage;
