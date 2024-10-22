import { IPhotoDetail, IPlace } from '@/shared/types/place';
import { useModalStore } from '@/store/client/modal';
import { useUserStore } from '@/store/client/user';
import { useGetLikedPlaces, usePlaceLike } from '@/store/server/place';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface LikedPlaceListProps {
  likedPlaces: string[];
}

const LikedPlaceList = ({ likedPlaces }: LikedPlaceListProps) => {
  const { user } = useUserStore();
  const { setOpenInfo } = useModalStore();
  // API 요청
  const { mutate: toggleLike } = usePlaceLike();
  const queryOptions = useGetLikedPlaces(likedPlaces);
  const { data: places } = useSuspenseQuery(queryOptions);

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
    <ul className='flex flex-col gap-2 bg-white px-4 py-2'>
      {places?.map((place: IPlace) => (
        <li
          key={place?.id}
          className='flex flex-col gap-2 rounded-xl border border-solid border-gray-300 p-2'
        >
          <div className='flex justify-between'>
            <button
              type='button'
              className='flex basis-full flex-col'
              onClick={() => setOpenInfo(place.id)}
            >
              <span className='text-sm font-medium'>{place.placeName}</span>
              <span className='text-xs'>{place.address}</span>
            </button>
            <button onClick={() => handleClick(place.id)}>
              <Image
                className='w-5'
                src={
                  place.likedBy?.includes(user?.id as number)
                    ? `/icons/icon-star-fill.svg`
                    : `/icons/icon-star.svg`
                }
                width={100}
                height={100}
                alt='별모양 버튼'
              />
            </button>
          </div>
          <button type='button' onClick={() => setOpenInfo(place.id)}>
            {place.photo && (
              <div className='flex h-[90px] gap-1 rounded-xl shadow-md'>
                {place.photo.photoList[0].list
                  .slice(1, 4)
                  .map((photo: IPhotoDetail, index: number) => (
                    <Image
                      className={`h-auto w-auto basis-full overflow-hidden object-cover object-center ${index === 0 && 'rounded-l-xl'} ${index === place.photo.photoList[0].list.slice(1, 4).length - 1 && 'rounded-r-xl'}`}
                      key={photo.photoid}
                      src={photo.orgurl}
                      alt='장소 이미지'
                      width={500}
                      height={500}
                    />
                  ))}
              </div>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LikedPlaceList;
