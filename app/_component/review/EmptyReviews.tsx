import Link from 'next/link';
import Image from 'next/image';

export interface EmptyReviewsProps {
  url: string;
}

const EmptyReviews = ({ url }: EmptyReviewsProps) => {
  return (
    <div className='box-border flex basis-full flex-col items-center justify-center gap-2 bg-white p-5'>
      <Image
        className='w-24'
        src='/icons/icon-empty.png'
        width={500}
        height={500}
        alt='비어있음'
      />
      아직 작성된 리뷰가 없어요.
      <Link
        className='text-olive-green border-olive-green flex w-full max-w-44 items-center gap-1 rounded-lg border border-solid px-2 py-1 text-sm shadow-md'
        href={url}
      >
        <Image
          className=''
          src='/icons/icon-pencil.svg'
          width={18}
          height={18}
          alt='리뷰 쓰기 아이콘'
        />
        <span className='flex basis-full justify-center'>리뷰 쓰기</span>
      </Link>
    </div>
  );
};

export default EmptyReviews;
