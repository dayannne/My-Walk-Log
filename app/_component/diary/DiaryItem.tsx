import { WEATHERS } from '@/app/shared/constant';
import { formatTimeAgo } from '@/app/shared/function/format';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmModal from '../common/Modal/ConfirmModal';
import MenuModal from '../common/Modal/MenuModal';
import { useUserStore } from '@/app/store/client/user';
import { useModalStore } from '@/app/store/client/modal';

export interface DiaryItemProps {
  diary: any;
  onClick: () => void;
  onConfirm: (diaryId: number) => void;
}

const DiaryItem = ({ diary, onConfirm, onClick }: DiaryItemProps) => {
  const { user } = useUserStore();
  const { open, setOpen, setOpenInfo } = useModalStore();

  return (
    <li
      key={diary.id}
      className='flex flex-col gap-2 border-b border-solid border-gray-200 p-4'
    >
      <div className='flex items-center gap-2'>
        <Image
          className='h-9 w-9 shrink-0 rounded-full object-cover'
          key={`user_${diary.authorId}_profile_image`}
          src={diary.author.profileImage}
          alt='프로필 이미지'
          width={500}
          height={500}
        />
        <div className='flex basis-full flex-col'>
          <div className='text-sm font-semibold'>{diary.author.username}</div>
          <div className='flex gap-1 text-xs'>
            <span className='text-gray-600'>
              {formatTimeAgo(diary.createdAt)}
            </span>
            <span>
              <span className='text-gray-600'>
                {WEATHERS[diary.weather].emoji}
              </span>
              <span className='text-gray-600'>
                {WEATHERS[diary.weather].name}
              </span>
            </span>
          </div>
        </div>
        {user?.id && user?.id === diary.authorId && (
          <MenuModal
            firstMenu='일기 삭제하기'
            firstMenuClose={() => setOpen(true)}
          />
        )}
        <ConfirmModal
          description='정말로 삭제하시겠습니까?'
          onConfirm={() => onConfirm(diary.id)}
          open={open}
          handleClose={() => setOpen(false)}
        />
      </div>
      <Link className='flex flex-col gap-2' href={`/diary/detail/${diary.id}`}>
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
              <span className='bg-hover rounded-md px-2 py-1 text-xs' key={idx}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        {diary.diaryImages.length === 1 && (
          <Image
            className='aspect-video h-auto w-full rounded-xl object-cover object-center'
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
              <div className='z-1 absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2'>
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
      </Link>

      <button
        type='button'
        className='border-olive-green bg-hover flex rounded-lg border border-solid p-2'
        onClick={() => setOpenInfo(diary.placeId)}
      >
        <div className='flex basis-full items-center gap-2'>
          <Image
            src='/icons/icon-marker.svg'
            alt='마커 이미지'
            width={32}
            height={32}
          />
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>{diary.placeName}</span>
            <span className='text-xs text-gray-600'>{diary.placeAddress}</span>
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

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <button onClick={onClick}>
            <Image
              className='mt-[2px] w-6'
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
        <Link
          className='flex items-center gap-1'
          href={`/diary/detail/${diary.id}`}
        >
          <Image
            className='mt-[2px] w-6'
            src='/icons/icon-comment.svg'
            alt='댓글'
            width={32}
            height={32}
          />
          {diary.comments.length}
        </Link>
      </div>
    </li>
  );
};

export default DiaryItem;
