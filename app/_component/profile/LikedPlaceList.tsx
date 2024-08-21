import { useUserStore } from '@/app/store/client/user';
import {
  useCreatePlaceLike,
  useDeletePlaceLike,
  useGetLikedPlaces,
} from '@/app/store/server/place';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

interface LikedPlaceListProps {
  likedPlaces: string[];
}

const LikedPlaceList = ({ likedPlaces }: LikedPlaceListProps) => {
  const { user } = useUserStore();
  // API 요청
  const { mutate: createLike } = useCreatePlaceLike();
  const { mutate: deleteLike } = useDeletePlaceLike();
  const queryOptions = useGetLikedPlaces(likedPlaces);
  const { data: places } = useSuspenseQuery(queryOptions);
  console.log(places);

  if (!places) return null;
  console.log(places[2].placeDetail.placeDetail.photo.photoList[0].list);
  return (
    <ul className='flex flex-col gap-2 px-4 py-2'>
      {places?.map((place: any) => (
        <li key={place.id}>
          <Link
            href={`/place/search/${place.placeName}/detail/${place.id}`}
            className='flex flex-col gap-2 rounded-xl border border-solid border-gray-300 p-2'
          >
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{place.placeName}</span>
                <span className='text-xs'>{place.address}</span>
              </div>
              <button
                onClick={() =>
                  place.placeDetail.likedBy?.includes(user?.id)
                    ? deleteLike({
                        placeId: place.id,
                        userId: user?.id as number,
                      })
                    : createLike({
                        placeId: place.id,
                        userId: user?.id as number,
                      })
                }
              >
                <Image
                  className='w-5'
                  src={
                    place.placeDetail.likedBy?.includes(user?.id)
                      ? `/icons/icon-star-fill.svg`
                      : `/icons/icon-star.svg`
                  }
                  width={100}
                  height={100}
                  alt='별모양 버튼'
                />
              </button>
            </div>
            {place.placeDetail.placeDetail.photo && (
              <div className='flex h-[90px] gap-1 rounded-xl shadow-md'>
                {place.placeDetail.placeDetail.photo.photoList[0].list
                  .slice(1, 4)
                  .map((photo: any, index: number) => (
                    <Image
                      className={`h-auto w-auto basis-full overflow-hidden object-cover object-center ${index === 0 && 'rounded-l-xl'} ${index === place.placeDetail.placeDetail.photo.photoList[0].list.slice(1, 4).length - 1 && 'rounded-r-xl'}`}
                      key={photo.photoId}
                      src={photo.orgurl}
                      alt='장소 이미지'
                      width={500}
                      height={500}
                    />
                  ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LikedPlaceList;
