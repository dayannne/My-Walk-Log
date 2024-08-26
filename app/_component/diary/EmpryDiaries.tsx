import Link from 'next/link';
import Image from 'next/image';

export interface EmptyDiariesProps {
  placeId: string;
}

const EmptyDiaries = () => {
  return (
    <div className='flex basis-full flex-col items-center justify-center gap-2 bg-white p-5'>
      <Image
        className='w-24'
        src='/icons/icon-empty.png'
        width={500}
        height={500}
        alt='비어있음'
      />
      아직 올라온 일기가 없어요.
      <Link
        className='text-olive-green border-olive-green flex w-full max-w-44 items-center justify-center gap-1 rounded-lg border border-solid px-2 py-1 text-sm shadow-md'
        href={`/diary/form`}
      >
        <Image
          className=''
          src='/icons/icon-diary.svg'
          width={18}
          height={18}
          alt='다이어리 아이콘'
        />
        <span className='basis-full text-center'>
          산책하고
          <br />
          오늘의 일기 작성하기
        </span>
      </Link>
    </div>
  );
};

export default EmptyDiaries;
