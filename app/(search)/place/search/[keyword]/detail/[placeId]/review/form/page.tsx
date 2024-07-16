'use client';
import PlaceKeywordsInput from '@/app/_component/review/PlaceKeywordsInput';
import { ADMISSION_FEE, WALK_DURATIONS } from '@/app/shared/constant';
import Image from 'next/image';
import { SetStateAction, useRef, useState } from 'react';

export interface pageProps {}

const ReviewFormPage = ({}: pageProps) => {
  const walkDurations = Object.entries(WALK_DURATIONS);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [placeKeywords, setPlaceKeywords] = useState<string[]>([]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      console.log('Selected files:', selectedFiles);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between border-b border-solid border-b-gray-200 bg-white p-5'>
        <span className='font-bold'>리뷰 쓰기</span>
        <button className='bg-olive-green rounded-2xl px-3 py-2 text-white shadow-md'>
          저장하기
        </button>
      </div>
      <form className='flex h-full flex-col gap-5 overflow-y-scroll bg-white px-5 pb-7 pt-5'>
        <div className='flex flex-col gap-2'>
          <span className='lgtext- font-medium'>상세 사진</span>
          <span className='text-sm text-gray-500'>
            장소 관련 사진을 업로드해 주세요.(1개~3개)
          </span>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='.png, .jpg, .jpeg'
            className='hidden'
            onChange={handleFileChange}
          />
          <button
            onClick={handleButtonClick}
            className='flex items-center justify-center gap-2 rounded-lg border border-solid border-gray-300 py-3 shadow-md'
          >
            <Image
              src='/icons/icon-plus.svg'
              width={28}
              height={28}
              alt='등록 버튼'
            />
            사진 등록
          </button>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>후기</span>
          <textarea
            rows={7}
            className='resize-none rounded-lg border border-solid border-gray-500 p-2 text-sm shadow-sm focus:outline-none'
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
                  className='peer-checked:border-olive-green peer-checked:bg-olive-green hover:bg-hover inline-flex cursor-pointer items-center justify-between rounded-xl border border-solid border-gray-300 bg-white p-2 text-sm shadow-sm peer-checked:text-white'
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
                  className='peer-checked:border-olive-green peer-checked:bg-olive-green hover:bg-hover inline-flex cursor-pointer items-center justify-between rounded-xl border border-solid border-gray-300 bg-white p-2 text-sm shadow-sm peer-checked:text-white'
                >
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>키워드</span>
          <span className='text-sm text-gray-500'>
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
