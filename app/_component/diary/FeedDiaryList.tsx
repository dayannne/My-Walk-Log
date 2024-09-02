import React, { Fragment, useEffect, useRef } from 'react';
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

export interface FeedDiaryProps {
  diaries: any;
}

const FeedDiary = ({ diaries }: FeedDiaryProps) => {
  const { user } = useUserStore();
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const { open, handleOpen, handleClose } = useModal();

  const handleConfirm = (diaryId: number) => {
    deleteDiary({ diaryId, userId: user?.id as number });
  };

  console.log(diaries[0].author.profileImage);

  return (
    <ul className='grid grid-cols-2 gap-2 bg-white p-4'>
      {diaries.map((diary: any) => (
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
                    <span className='text-xs'>{diary.author.username}</span>
                    <span className='text-[10px] leading-none text-gray-400'>
                      {formatTimeAgo(diary.createdAt)}
                    </span>
                  </span>
                  <span className='text-sm'>
                    <span>{WEATHERS[diary.weather].emoji}</span>
                  </span>
                </div>
                {/* {user?.id && user?.id === diary.authorId && (
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
                    /> */}
              </div>
              <div className='basis-full after:text-xs after:content-["..."]'>
                <p className='relative max-h-44 overflow-y-hidden text-xs'>
                  {diary.content.split('\n').map((str: string, idx: number) => (
                    <Fragment key={idx}>
                      {str}
                      <br />
                    </Fragment>
                  ))}
                </p>
              </div>
              {/* <div className='relative'>
                  <p className='flex max-h-4 flex-wrap gap-2 overflow-hidden'>
                    {diary.tags.length > 0 &&
                      diary.tags.map((tag: string, idx: number) => (
                        <>
                          {idx < 3 && (
                            <span className='text-xs' key={idx}>
                              #{tag}
                            </span>
                          )}
                        </>
                      ))}
                  </p>
                </div> */}
            </div>
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
                <span className='text-overflow-s text-xs'>
                  {diary.placeDetail.placeName}
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
    </ul>
  );
};

export default FeedDiary;
