import {
  searchPlace,
  createPlaceLike,
  deletePlaceLike,
} from '@/app/api/_routes/place';
import { useMap } from '@/app/shared/contexts/Map';
import { IPlace } from '@/app/shared/types/map';
import { IReview } from '@/app/shared/types/review';
import { useUserStore } from '@/app/store/client/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export interface PlaceBasicInfoProps {
  data: any;
  placeId: string;
}

const PlaceBasicInfo = ({ data, placeId }: PlaceBasicInfoProps) => {
  const { user } = useUserStore();
  const mapContext = useMap();
  const queryClient = useQueryClient();
  const { likedBy } = data;
  const { mainphotourl, tags } = data.placeDetail.basicInfo;

  // API 요청
  const { mutate: search } = useMutation({
    mutationFn: () => {
      return searchPlace(mapContext?.places as IPlace[]);
    },
    onSuccess: async (result) => {
      // 비동기 처리로 동시
      await queryClient.invalidateQueries({ queryKey: ['place'] });
      mapContext?.setPlaces(result.data.data);
    },
  });
  const { mutate: createLike } = useMutation({
    mutationFn: () => {
      return createPlaceLike(placeId, user?.id as number);
    },
    onSuccess: () => {
      search();
    },
  });
  const { mutate: deleteLike } = useMutation({
    mutationFn: () => {
      return deletePlaceLike(placeId, user?.id as number);
    },
    onSuccess: () => {
      search();
    },
  });

  // 사진 데이터 필터링
  const photos = mainphotourl
    ? [{ orgurl: mainphotourl }]
    : data.placeDetail.photo
      ? data.placeDetail.photo.photoList[0].list.slice(1)
      : null;

  // 현재 사용자의 좋아요 여부
  const isLiked = likedBy.some((id: number) => id === user?.id);

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
              <span className='mr-2 text-xl font-bold'>{data.placeName}</span>
              <span className='text-gray-500'>
                {data.placeInfo.categoryName}
              </span>
            </span>
            {user &&
              !data.reviews.some(
                (review: IReview) => review.authorId === user.id,
              ) && (
                <Link
                  className='text-olive-green border-olive-green flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-xs shadow-md'
                  href={`${placeId}/review/form`}
                >
                  <Image
                    className=''
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
            <span>찜 {data.likedBy.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>리뷰 수 {data.reviews.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>별점 {data.eval}</span>
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
            onClick={() => (isLiked ? deleteLike() : createLike())}
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
          <button className='flex basis-full flex-col items-center justify-center gap-1 border-r border-solid text-sm'>
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
