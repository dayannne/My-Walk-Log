'use client';

import PlaceDetailModal from '@/components/common/Modal/PlaceDetailModal';
import Commentform from '@/components/diary/Commentform';
import CommentList from '@/components/diary/CommentList';
import DiaryItem from '@/components/diary/DiaryItem';
import { useModalStore } from '@/store/client/modal';
import { useUserStore } from '@/store/client/user';
import {
  useDiaryLike,
  useDeleteDiary,
  useGetDiaryDetail,
} from '@/store/server/diary';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface DiaryPageProps {}

const DiaryPage = ({ params }: { params: { diaryId: number } }) => {
  const { diaryId } = params;
  const user = useUserStore((state) => state.user);
  const openInfo = useModalStore((state) => state.openInfo);
  const setOpenInfo = useModalStore((state) => state.setOpenInfo);
  const queryOptions = useGetDiaryDetail(params.diaryId);
  const { data: diary, isLoading, error } = useSuspenseQuery(queryOptions);
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
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
          onClick={() => handleClick(diary?.id)}
        />
        <div className='flex-grow'>
          {diary?.comments?.length > 0 && (
            <CommentList
              diaryId={diaryId}
              comments={diary?.comments}
              setContent={setContent}
              setEditId={setEditId}
            />
          )}
        </div>
      </div>
      <Commentform
        diaryId={diaryId}
        content={content}
        setContent={setContent}
        editId={editId}
        setEditId={setEditId}
      />
      {!loading && openInfo && (
        <PlaceDetailModal placeId={openInfo as string} />
      )}
    </>
  );
};

export default DiaryPage;
