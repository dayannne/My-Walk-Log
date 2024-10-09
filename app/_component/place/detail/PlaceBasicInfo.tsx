import { usePlaceLike } from '@/app/store/server/place';
import { IReview } from '@/app/shared/types/review';
import { useUserStore } from '@/app/store/client/user';
import Image from 'next/image';
import { Carousel } from '@material-tailwind/react';
import { usePlaceDetailStore } from '@/app/store/client/place';
import { IPhotoDetail, IPlace } from '@/app/shared/types/place';

export interface PlaceBasicInfoProps {
  place: IPlace;
  placeId: string;
}
const PlaceBasicInfo = ({ place, placeId }: PlaceBasicInfoProps) => {
  const { user } = useUserStore();
  const { mainphotourl, tags } = place?.basicInfo || {};
  const { setPlaceDetailState, setPlaceDetail } = usePlaceDetailStore();

  // API 요청
  const { mutate: toggleLike } = usePlaceLike();

  // 사진 데이터 필터링
  const photos = mainphotourl
    ? [{ orgurl: mainphotourl }]
    : place?.photo?.photoList && place.photo.photoList.length > 0
      ? place.photo.photoList[0]?.list || null
      : null;

  // 현재 사용자의 좋아요 여부
  const isLiked = place?.likedBy?.some((id: number) => id === user?.id);

  // 공유 url 복사

  const handleShareClick = async () => {
    const currentUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/place/detail/${placeId}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('URL이 클립보드에 복사되었습니다 :)');
    } catch (err) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const handleClick = (placeId: string) => {
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }
    toggleLike({
      placeId,
      userId: user?.id,
    });
  };

  return (
    <div>
      {photos && photos[0] && (
        <div className='aspect-video'>
          {photos?.length === 1 && (
            <Image
              src={photos[0].orgurl}
              alt={`메인 장소 이미지`}
              width={1000}
              height={1000}
              className={`h-full w-full object-cover`}
            />
          )}
          {photos?.length > 1 && (
            <Carousel
              className='aspect-video w-full overflow-hidden object-cover object-center'
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
              {photos.map((photo: IPhotoDetail, idx: number) => (
                <Image
                  className='h-full w-full object-cover object-center'
                  key={idx}
                  src={photo.orgurl}
                  alt='리뷰 이미지'
                  width={500}
                  height={500}
                />
              ))}
            </Carousel>
          )}
        </div>
      )}
      <div className='bg-white'>
        <div className='px-4 py-5'>
          <span className='flex items-center'>
            <span className='basis-full'>
              <span className='mr-2 text-xl font-bold'>{place?.placeName}</span>
              <span className='text-gray-500'>{place?.categoryName}</span>
            </span>
            {user &&
              place?.reviews?.some(
                (review: IReview) => review.authorId === user.id,
              ) && (
                <button
                  className='text-olive-green border-olive-green flex shrink-0 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-xs shadow-md'
                  onClick={() => {
                    setPlaceDetailState(1);
                    setPlaceDetail(place);
                  }}
                >
                  <Image
                    className='w-4'
                    src='/icons/icon-pencil.svg'
                    width={16}
                    height={16}
                    alt='리뷰 쓰기 아이콘'
                  />
                  리뷰 쓰기
                </button>
              )}
          </span>
          <span className='mb-3 mt-2 flex items-center gap-2 text-sm font-light text-gray-800'>
            <span>찜 {place?.likedBy?.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>리뷰 수 {place?.reviews?.length}</span>
            <span className='mb-[2px] text-gray-400'>|</span>
            <span>일기 수 {place?.diaries?.length}</span>
          </span>
          {/* 태그 */}
          <span className='flex flex-wrap gap-1'>
            {tags &&
              tags.map((item: string, idx: number) => (
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
            onClick={() => handleClick(placeId)}
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
