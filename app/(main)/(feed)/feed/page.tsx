'use client';

import DiaryList from '@/app/_component/diary/DiaryList';
import useModal from '@/app/_hooks/useModal';
import { useUserStore } from '@/app/store/client/user';
import {
  useCreateDiaryLike,
  useDeleteDiaryLike,
  useDeleteDiary,
  useGetAllDiary,
} from '@/app/store/server/diary';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/_component/common/Header';
import FeedDiary from '@/app/_component/diary/FeedDiaryList';

const FeedPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllDiary();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastDiaryElementRef = useRef(null);

  useEffect(() => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (lastDiaryElementRef.current) {
      observerRef.current.observe(lastDiaryElementRef.current);
    }
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  if (isLoading || isFetchingNextPage) {
    return <div>Loading...</div>;
  }

  const flattenedDiaries = data?.pages.flatMap((page) => page)[0] || [];
  const {
    data: diaries,
    page,
    pageSize,
    totalPages,
    totalDiaries,
  } = flattenedDiaries;
  return (
    <div className='flex h-full w-full basis-full flex-col'>
      <Header title='피드' />
      <div className='flex basis-full flex-col overflow-y-scroll'>
        <FeedDiary diaries={diaries} />
      </div>
    </div>
  );
};

export default FeedPage;
