'use client';
import PlaceKeywordsInput from '@/app/_component/review/PlaceKeywordsInput';
import { ADMISSION_FEE, WALK_DURATIONS } from '@/app/shared/constant';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useImageUpload } from '@/app/_hooks/useImageUpload';
import FileInput from '@/app/_component/common/Input/FileInput';

export interface pageProps {}

const ReviewFormPage = ({}: pageProps) => {
  const {
    previewImg,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    uploadImage,
  } = useImageUpload();

  const router = useRouter();
  const walkDurations = Object.entries(WALK_DURATIONS);
  const [placeKeywords, setPlaceKeywords] = useState<string[]>([]);

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-start justify-between border-b border-solid border-b-gray-200 bg-white px-4 py-5'>
        <span className='font-semibold'>리뷰 쓰기</span>
        <div className='flex gap-[6px]'>
          <button
            className='bg-whitep-1 box-border flex h-full grow-0 items-center justify-center rounded-lg border border-solid border-gray-500 px-2 py-1 text-xs text-black shadow-md'
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            className='bg-olive-green border-olive-green box-border h-full grow-0 rounded-lg border border-solid px-2 py-1 text-xs text-white shadow-md'
            onClick={uploadImage}
          >
            저장하기
          </button>
        </div>
      </div>
      <form className='flex flex-col gap-5 bg-white px-4 py-5'>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>상세 사진</span>
          <span className='text-xs text-gray-500'>
            장소 관련 사진을 업로드해 주세요.(1개~3개)
          </span>
          <FileInput ref={fileInputRef} onChange={fileHandler} />
          <button
            onClick={handleButtonClick}
            className='flex items-center justify-center gap-2 rounded-lg border border-solid border-gray-300 py-3 text-sm shadow-md'
          >
            <Image
              src='/icons/icon-plus.svg'
              width={24}
              height={24}
              alt='등록 버튼'
            />
            사진 등록
          </button>
          {previewImg && (
            <Image
              src={URL.createObjectURL(previewImg[0])}
              alt='이미지 미리보기'
              width={100}
              height={100}
            />
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>후기</span>
          <textarea
            rows={7}
            className='resize-none rounded-lg border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
            placeholder='이용 후기/좋았던 점/아쉬운 점/장소 이용 시 팁 등을 자유롭게 공유해 주세요.'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>소요 시간</span>
          <ul className='flex flex-wrap gap-2'>
            {walkDurations.map((duration) => (
              <li key={duration[0]}>
                <input
                  type='radio'
                  id={duration[0]}
                  name='walkDuration'
                  value={duration[0]}
                  className='peer hidden'
                  required
                />
                <label
                  htmlFor={duration[0]}
                  className='peer-checked:border-olive-green peer-checked:bg-olive-green hover:bg-hover inline-flex cursor-pointer items-center justify-between rounded-xl border border-solid border-gray-300 bg-white p-2 text-xs shadow-sm peer-checked:text-white'
                >
                  {duration[1]}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>입장료</span>
          <ul className='flex gap-2'>
            {ADMISSION_FEE.map((option) => (
              <li key={option.id}>
                <input
                  type='radio'
                  id={option.id}
                  name='admissionFee'
                  value={option.value}
                  className='peer hidden'
                />
                <label
                  htmlFor={option.id}
                  className='peer-checked:border-olive-green peer-checked:bg-olive-green hover:bg-hover inline-flex cursor-pointer items-center justify-between rounded-xl border border-solid border-gray-300 bg-white p-2 text-xs shadow-sm peer-checked:text-white'
                >
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>키워드</span>
          <span className='text-xs text-gray-500'>
            이 장소에 어울리는 키워드를 골라주세요.(1개~5개)
          </span>
          <PlaceKeywordsInput
            placeKeywords={placeKeywords}
            setPlaceKeywords={setPlaceKeywords}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewFormPage;
