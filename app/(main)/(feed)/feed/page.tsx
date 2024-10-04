'use client';

import React, { useRef, useEffect } from 'react';
import { useDiaryLike } from '@/app/store/server/diary';
import { WEATHERS } from '@/app/shared/constant';
import { formatTimeAgo } from '@/app/shared/function/format';
import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/app/store/client/user';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';
import { useGetFeed } from '@/app/store/server/feed';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface FeedDiaryProps {
  diaries: any;
}

const FeedPage = () => {
  const { user } = useUserStore();
  const queryOptions = useGetFeed();
  const { mutate: toggleLike } = useDiaryLike();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(queryOptions);

  const fetchMorePortfolio = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll(loaderRef, fetchMorePortfolio);

  const flattenedDiaries = data?.pages.flatMap((page) => page)[0] || [];
  const { data: diaries } = flattenedDiaries;

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
    <>
      <ul className='grid grid-cols-2 gap-2 bg-white p-4'>
        {diaries?.map((diary: any) => (
          <li
            className='rounded-2xl'
            key={diary.id}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${diary.diaryImages[0]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Link
              className='flex h-80 max-h-80 flex-col gap-2 border-b border-solid border-gray-200 p-4 text-gray-200'
              href={`/diary/detail/${diary.id}`}
            >
              <div className='flex basis-full flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <Image
                    className='mt-[2px] h-8 w-8 shrink-0 rounded-full object-cover'
                    key={`user_${diary.authorId}_profile_image`}
                    src={diary.author.profileImage}
                    alt='프로필 이미지'
                    width={500}
                    height={500}
                  />
                  <div className='flex basis-full items-center justify-between'>
                    <span className='flex flex-col gap-[2px]'>
                      <span className='text-xs text-gray-200'>
                        {diary.author.username}
                      </span>
                      <span className='text-[10px] leading-none text-gray-400'>
                        {formatTimeAgo(diary.createdAt)}
                      </span>
                    </span>
                    <span className='text-sm'>
                      <span>{WEATHERS[diary.weather].emoji}</span>
                    </span>
                  </div>
                </div>
                <div className='basis-full after:text-xs after:content-["..."]'>
                  <p className='relative max-h-44 overflow-y-hidden text-xs text-gray-200'>
                    {diary.content
                      .split('\n')
                      .map((str: string, idx: number) => (
                        <React.Fragment key={idx}>
                          {str}
                          <br />
                        </React.Fragment>
                      ))}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <button type='button' onClick={() => handleClick(diary?.id)}>
                    <Image
                      className='w-6'
                      src={
                        diary.likedBy.some((id: number) => id === user?.id) ===
                        true
                          ? '/icons/icon-heart-fill.svg'
                          : '/icons/icon-heart.svg'
                      }
                      alt='좋아요 버튼'
                      width={32}
                      height={32}
                    />
                  </button>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-overflow-s text-xs text-gray-200'>
                    {diary.placeName}
                  </span>
                  <Image
                    src='/icons/icon-marker.svg'
                    alt='마커 이미지'
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
        {/* {isFetchingNextPage &&
          Array(12)
            .fill(0)
            .map((_, index) => <FeedDiarySkeleton key={index} />)} */}
        {/* Sentinel for Intersection Observer */}
        <div ref={loaderRef} className='h-8' />
      </ul>
    </>
  );
};

export default FeedPage;
