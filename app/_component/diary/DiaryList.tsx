import React, { useEffect, useRef } from 'react';
import {
  useCreateDiaryLike,
  useDeleteDiary,
  useDeleteDiaryLike,
  useGetAllDiary,
} from '@/app/store/server/diary';
import { WEATHERS } from '@/app/shared/constant';
import { formatDate, formatTimeAgo } from '@/app/shared/function/format';
import { Carousel } from '@material-tailwind/react';
import Link from 'next/link';
import ConfirmModal from '../common/Modal/ConfirmModal';
import MenuModal from '../common/Modal/MenuModal';
import Image from 'next/image';
import useModal from '@/app/_hooks/useModal';
import { useUserStore } from '@/app/store/client/user';

export interface DiaryListProps {
  diaries: any;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const { user } = useUserStore();
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const { open, handleOpen, handleClose } = useModal();

  
  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  return (
    <ul className='flex basis-full flex-col gap-2 overflow-y-scroll'>
      {diaries.map((diary: any) => (
        <li
          key={diary.id}
          className='flex flex-col gap-2 border-b border-solid border-gray-200 p-4'
        >
          <div className='flex items-center gap-2'>
            <Image
              className='w-9 shrink-0'
              key={`user_${diary.authorId}_profile_image`}
              src={diary.author.profileImage}
              alt='프로필 이미지'
              width={500}
              height={500}
            />
            <div className='flex basis-full flex-col'>
              <span className='text-sm font-semibold'>
                {diary.author.username}
              </span>
              <span className='text-xs text-gray-600'>
                {formatTimeAgo(diary.createdAt)}
                <span>{WEATHERS[diary.weather].emoji}</span>
                <span>{WEATHERS[diary.weather].name}</span>
              </span>
            </div>
            {user?.id && user?.id === diary.authorId && (
              <MenuModal
                firstMenu='일기 삭제하기'
                firstMenuClose={handleOpen}
              />
            )}
            <ConfirmModal
              description='정말로 삭제하시겠습니까?'
              onConfirm={() => handleConfirm(diary.id)}
              open={open}
              handleClose={handleClose}
            />
          </div>
          <div className='text-sm'>
            {diary.content.split('\n').map((str: string, idx: number) => (
              <p key={idx}>{str}</p>
            ))}
          </div>
          <div className='flex flex-wrap gap-1'>
            {diary.tags.length &&
              diary.tags.map((tag: string, idx: number) => (
                <span
                  className='bg-hover rounded-md px-2 py-1 text-xs'
                  key={idx}
                >
                  #{tag}
                </span>
              ))}
          </div>

          {diary.diaryImages.length === 1 && (
            <Image
              className='aspect-video w-full rounded-xl object-cover object-center'
              src={diary.diaryImages[0]}
              alt='일기 상세 사진'
              width={300}
              height={300}
            />
          )}
          {diary.diaryImages.length > 1 && (
            <Carousel
              className='aspect-video w-full overflow-hidden rounded-xl object-cover object-center'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
                  {new Array(length).fill('').map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {diary.diaryImages.map((image: string, idx: number) => (
                <Image
                  className='h-full w-full object-cover object-center'
                  key={idx}
                  src={image}
                  alt='리뷰 이미지'
                  width={500}
                  height={500}
                />
              ))}
            </Carousel>
          )}

          <Link
            className='border-olive-green bg-hover flex rounded-lg border border-solid p-2'
            href={`/place/search/${diary.placeDetail.placeName}/detail/${diary.placeId}`}
          >
            <div className='flex basis-full items-center gap-2'>
              <Image
                src='/icons/icon-marker.svg'
                alt='마커 이미지'
                width={32}
                height={32}
              />
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>
                  {diary.placeDetail.placeName}
                </span>
                <span className='text-xs text-gray-600'>
                  {
                    diary.placeDetail.placeDetail.basicInfo.address.region
                      .fullname
                  }
                </span>
              </div>
            </div>

            <Image
              className='rotate-180'
              src='/icons/icon-arrow-left(green).svg'
              alt='바로가기'
              width={24}
              height={24}
            />
          </Link>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <button
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
              >
                <Image
                  className='w-6'
                  src={
                    diary.likedBy.some((id: number) => id === user?.id) === true
                      ? '/icons/icon-heart-fill.svg'
                      : '/icons/icon-heart.svg'
                  }
                  alt='좋아요 버튼'
                  width={32}
                  height={32}
                />
              </button>
              <span className='text-sm'>{diary.likedBy.length}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DiaryList;
