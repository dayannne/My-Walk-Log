import { WEATHERS } from '@/app/shared/constant';
import { formatDate } from '@/app/shared/function/format';
import { useUserStore } from '@/app/store/client/user';
import { useDiaryLike, useDeleteDiary } from '@/app/store/server/diary';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import MenuModal from '../common/Modal/MenuModal';
import ConfirmModal from '../common/Modal/ConfirmModal';
import Link from 'next/link';
import { useModalStore } from '@/app/store/client/modal';

export interface ProfileDiaryListProps {
  diaries: any;
}

const ProfileDiaryList = ({ diaries }: ProfileDiaryListProps) => {
  const { user } = useUserStore();
  const { mutate: toggleLike } = useDiaryLike();
  const { mutate: deleteDiary } = useDeleteDiary();
  const { setOpenInfo, openId, setOpenId } = useModalStore();

  const handleConfirm = (diaryId: number) => {
    deleteDiary(diaryId);
  };

  return (
    <ul className='flex basis-full flex-col gap-2 bg-white py-2'>
      {diaries.map((diary: any) => (
        <li
          key={diary.id}
          className='flex gap-3 border-b border-solid border-gray-200 p-4'
        >
          <div>
            <span className='text-xl font-semibold'>
              {formatDate(diary.createdAt).day}
            </span>
          </div>
          <div className='flex basis-full flex-col gap-2'>
            <div className='flex justify-between text-xs'>
              <div className='flex flex-col'>
                <span>{formatDate(diary.createdAt).dayOfWeek}요일</span>
                <span>
                  {formatDate(diary.createdAt).year}년{' '}
                  {formatDate(diary.createdAt).month}월
                </span>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <span>{WEATHERS[diary.weather].emoji}</span>
                <span>{WEATHERS[diary.weather].name}</span>
              </div>
            </div>
            <Link
              className='flex flex-col gap-2'
              href={`/diary/detail/${diary.id}`}
            >
              {diary.content.length > 0 && (
                <div className='text-sm'>
                  {diary.content.split('\n').map((str: string, idx: number) => (
                    <p key={idx}>{str}</p>
                  ))}
                </div>
              )}
              {diary.tags.length > 0 && (
                <div className='flex flex-wrap gap-1'>
                  {diary.tags.map((tag: string, idx: number) => (
                    <span
                      className='bg-hover rounded-md px-2 py-1 text-xs'
                      key={idx}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {diary.diaryImages.length === 1 && (
                <Image
                  className='aspect-video h-full w-full rounded-xl object-cover'
                  src={diary.diaryImages[0]}
                  alt='일기 상세 사진'
                  width={300}
                  height={300}
                />
              )}
              {diary.diaryImages.length > 1 && (
                <Carousel
                  className='aspect-video h-full w-full rounded-xl object-cover'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className='z-1 absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2'>
                      {new Array(length).fill('').map((_, i) => (
                        <span
                          key={i}
                          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i
                              ? 'w-8 bg-white'
                              : 'w-4 bg-white/50'
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
            </Link>
            {diary.placeId && (
              <button
                className='border-olive-green bg-hover flex items-center rounded-lg border border-solid p-2'
                onClick={() => setOpenInfo(diary.placeId)}
              >
                <div className='flex basis-full items-center gap-2'>
                  <Image
                    src='/icons/icon-marker.svg'
                    alt='마커 이미지'
                    width={32}
                    height={32}
                  />
                  <div className='flex flex-col items-start'>
                    <span className='text-sm font-medium'>
                      {diary.placeName}
                    </span>
                    <span className='text-xs text-gray-600'>
                      {diary.placeAddress}
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
              </button>
            )}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1'>
                  <button onClick={() => toggleLike(diary.id)}>
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
                  <span className='text-sm'>{diary.likedBy.length}</span>
                </div>
                <Link
                  className='flex items-center gap-1'
                  href={`/diary/detail/${diary.id}`}
                >
                  <Image
                    className='w-6'
                    src='/icons/icon-comment.svg'
                    alt='댓글'
                    width={32}
                    height={32}
                  />
                  {diary.comments.length}
                </Link>
                {user?.id && user?.id === diary.authorId && (
                  <span className='bg-hover text-olive-green shrink-0 rounded-lg px-2 py-1 text-xs font-medium'>
                    {diary.isPublic === true ? '공개' : '비공개'}
                  </span>
                )}
              </div>
              {user?.id && user?.id === diary.authorId && (
                <MenuModal
                  firstMenu='일기 삭제하기'
                  firstMenuClose={() => setOpenId(diary.id)}
                />
              )}
            </div>
          </div>
        </li>
      ))}
      {openId && (
        <ConfirmModal
          description='정말로 삭제하시겠습니까?'
          onConfirm={() => handleConfirm(openId)}
          open={Boolean(openId)}
          handleClose={() => setOpenId(null)}
        />
      )}
    </ul>
  );
};

export default ProfileDiaryList;
