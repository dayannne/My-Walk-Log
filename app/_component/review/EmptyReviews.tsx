import Link from 'next/link';
import Image from 'next/image';

export interface EmptyReviewsProps {
  placeId: string;
}

const EmptyReviews = () => {
  return (
    <div className='box-border flex h-full flex-col items-center justify-center gap-2 bg-white p-5'>
      <Image
        className='w-24'
        src='/icons/icon-empty.png'
        width={500}
        height={500}
        alt='리뷰 쓰기 아이콘'
      />
      아직 작성된 리뷰가 없어요.
      <Link
        className='text-olive-green border-olive-green flex w-full max-w-44 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-sm shadow-md'
        href={`review/form`}
      >
        <Image
          className=''
          src='/icons/icon-pencil.svg'
          width={18}
          height={18}
          alt='리뷰 쓰기 아이콘'
        />
        리뷰 쓰기
      </Link>
    </div>
  );
};

export default EmptyReviews;
