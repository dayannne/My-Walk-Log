import Image from 'next/image';
import { fetchPlaceDetail } from '@/app/api/map';

interface MarkerInfoProps {
  placeId: string;
  placeName: string;
}

const MarkerInfo = ({ placeId, placeName }: MarkerInfoProps) => {
  const handleClick = async (placeId: string) => {
    const result = await fetchPlaceDetail(placeId);
  };

  return (
    <div className='bg-white shadow-lg rounded-md  text-base flex overflow-hidden'>
      <span className='px-3 py-2 font-medium'>{placeName}</span>
      <button
        className='bg-olive-green w-10 basis-full  flex items-center justify-center'
        onClick={() => handleClick(placeId)}
      >
        <Image
          className='pt-[1px]'
          width={24}
          height={24}
          fill={false}
          src='/icons/icon-arrow-right.svg'
          alt='화살표 아이콘(오른쪽)'
          onClick={() => handleClick(placeId)}
        />
      </button>
    </div>
  );
};

export default MarkerInfo;
