'use client';

import PlaceDetailModal from '@/app/_component/common/Modal/PlaceDetailModal';
import Commentform from '@/app/_component/diary/Commentform';
import CommentList from '@/app/_component/diary/CommentList';
import DiaryItem from '@/app/_component/diary/DiaryItem';
import { useModalStore } from '@/app/store/client/modal';
import { useUserStore } from '@/app/store/client/user';
import {
  useDiaryLike,
  useDeleteDiary,
  useGetDiaryDetail,
} from '@/app/store/server/diary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface DiaryPageProps {}

const DiaryPage = ({ params }: { params: { diaryId: number } }) => {
  const { diaryId } = params;
  const { user } = useUserStore();
  const { openInfo, setOpenInfo } = useModalStore();
  const queryOptions = useGetDiaryDetail(params.diaryId);
  const { data: diary, isLoading } = useSuspenseQuery(queryOptions);
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };
  console.log(isLoading);

  useEffect(() => {
    if (loading) {
      setOpenInfo(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <div className='flex basis-full flex-col overflow-y-scroll bg-white'>
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
        <div className='flex-grow'>
          <CommentList
            diaryId={diaryId}
            comments={diary.comments}
            setContent={setContent}
            setEditId={setEditId}
          />
        </div>
      </div>
      <Commentform
        diaryId={diaryId}
        content={content}
        setContent={setContent}
        editId={editId}
        setEditId={setEditId}
      />
      {!loading && openInfo && <PlaceDetailModal placeId={openInfo} />}
    </>
  );
};

export default DiaryPage;
