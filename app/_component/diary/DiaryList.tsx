import { WEATHERS } from '@/app/shared/constant';
import { formatDate } from '@/app/shared/function/format';
import { useUserStore } from '@/app/store/client/user';
import {
  useCreateDiaryLike,
  useDeleteDiaryLike,
} from '@/app/store/server/diary';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';

export interface DiaryListProps {
  diaries: any;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const { user } = useUserStore();
  const { mutate: createLike } = useCreateDiaryLike();
  const { mutate: deleteLike } = useDeleteDiaryLike();
  return (
    <ul className='flex basis-full flex-col gap-2 overflow-y-scroll py-2'>
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
          <div className='flex flex-col gap-2'>
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
            <div className='text-sm'>
              {diary.content.split('\n').map((str: string, idx: number) => (
                <p key={idx}>{str}</p>
              ))}
            </div>
            {diary.diaryImages.length === 1 && (
              <Image
                className='aspect-square h-full w-full rounded-xl'
                src={diary.diaryImages[0]}
                alt='일기 상세 사진'
                width={300}
                height={300}
              />
            )}
            {diary.diaryImages.length > 1 && (
              <Carousel
                className='aspect-square h-full w-full overflow-hidden rounded-xl'
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
                <span className='text-sm'>{diary.likedBy.length}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DiaryList;
