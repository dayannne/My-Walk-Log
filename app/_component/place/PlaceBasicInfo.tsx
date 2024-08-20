import {
  useCreatePlaceLike,
  useDeletePlaceLike,
} from '@/app/store/server/place';
import { useMap } from '@/app/shared/contexts/Map';
import { IPlace } from '@/app/shared/types/map';
import { IReview } from '@/app/shared/types/review';
import { useUserStore } from '@/app/store/client/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { filterUrl } from '@/app/shared/function/filter';

export interface PlaceBasicInfoProps {
  place: any;
  placeId: string;
}
const PlaceBasicInfo = ({ place, placeId }: PlaceBasicInfoProps) => {
  const { user } = useUserStore();

  const likedBy = place?.likedBy || [];
  const { mainphotourl, tags } = place?.placeDetail?.basicInfo || {};

  // API 요청
  const { mutate: createLike } = useCreatePlaceLike();
  const { mutate: deleteLike } = useDeletePlaceLike();

  // 사진 데이터 필터링
  const photos = mainphotourl
    ? [{ orgurl: mainphotourl }]
    : place?.placeDetail?.photo?.photoList[0]?.list.slice(1) || null;

  // 현재 사용자의 좋아요 여부
  const isLiked = likedBy.some((id: number) => id === user?.id);

  // 공유 url 복사

  const handleShareClick = async () => {
    const currentUrl = filterUrl(window.location.href);
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('URL이 클립보드에 복사되었습니다 :)');
    } catch (err) {
      alert('URL 복사에 실패했습니다.');
      console.error('복사 오류:', err);
    }
  };

  return (
    <div>
      {photos && photos[0] && (
        <div className='h-48'>
          <Image
            src={photos[0].orgurl}
            alt={`메인 장소 이미지`}
            width={1000}
            height={1000}
            className={`h-full w-full object-cover`}
          />
        </div>
      )}
      <div className='bg-white'>
        <div className='px-4 py-5'>
          <span className='flex items-center'>
            <span className='basis-full'>
              <span className='mr-2 text-xl font-bold'>{place?.placeName}</span>
              <span className='text-gray-500'>
                {place?.placeInfo?.categoryName}
              </span>
            </span>
            {user &&
              !place?.reviews.some(
                (review: IReview) => review.authorId === user.id,
              ) && (
                <Link
                  className='text-olive-green border-olive-green flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-xs shadow-md'
                  href={`${placeId}/review/form`}
                >
                  <Image
                    className='w-4'
                    src='/icons/icon-pencil.svg'
                    width={16}
                    height={16}
                    alt='리뷰 쓰기 아이콘'
                  />
                  리뷰 쓰기
                </Link>
              )}
          </span>
          <span className='mb-3 mt-2 flex items-center gap-2 text-sm font-light text-gray-800'>
            <span>찜 {likedBy.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>리뷰 수 {place?.reviews.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>일기 수 {place?.diaries.length}</span>
          </span>
          {/* 태그 */}
          <span className='flex flex-wrap gap-1'>
            {tags &&
              tags.map((item: string, idx: any) => (
                <span
                  key={idx}
                  className='border-olive-green rounded-lg border border-solid px-2 text-sm text-black'
                >
                  # {item}
                </span>
              ))}
          </span>
        </div>
        {/* 저장/공유 */}
        <div className='border-gray-240 flex border-t border-solid border-gray-200 py-2'>
          <button
            className='flex basis-full flex-col items-center justify-center gap-1 border-r border-solid text-sm'
            onClick={() =>
              isLiked
                ? deleteLike({ placeId, userId: user?.id as number })
                : createLike({ placeId, userId: user?.id as number })
            }
          >
            <Image
              className='w-5'
              src={
                isLiked ? `/icons/icon-star-fill.svg` : `/icons/icon-star.svg`
              }
              width={100}
              height={100}
              alt='별모양 버튼'
            />
            저장
          </button>
          <button
            className='flex basis-full flex-col items-center justify-center gap-1 border-r border-solid text-sm'
            onClick={handleShareClick}
          >
            <Image
              className='w-5'
              src={`/icons/icon-share.svg`}
              width={100}
              height={100}
              alt='별모양 버튼'
            />
            공유
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceBasicInfo;
