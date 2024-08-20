'use client';

import PlaceKeywordsInput from '@/app/_component/review/PlaceKeywordsInput';
import { ENTRY_FEE, WALK_DURATIONS } from '@/app/shared/constant';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useImageUpload } from '@/app/_hooks/useImageUpload';
import FileInput from '@/app/_component/common/Input/FileInput';
import { useState } from 'react';
import { useUserStore } from '@/app/store/client/user';
import { useCreateReview } from '@/app/store/server/review';
import { IReviewReq } from '@/app/shared/types/review';

const ReviewFormPage = ({ params }: { params: { placeId: string } }) => {
  const {
    previewImgs,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    uploadImage,
    removeImage,
  } = useImageUpload();
  const router = useRouter();
  const { user } = useUserStore();

  const walkDurations = Object.entries(WALK_DURATIONS);
  const [placeKeywords, setPlaceKeywords] = useState<number[]>([]);
  const { placeId } = params;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IReviewReq>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      description: '',
      walkDuration: null,
      entryFee: null,
    },
  });
  const { mutate: createReview } = useCreateReview();
  const onSubmit = async (formData: IReviewReq) => {
    // 이미지 업로드 받아오기
    const reviewImages = await uploadImage();
    const data = {
      ...formData,
      walkDuration: parseInt(formData.walkDuration as string),
      keywords: placeKeywords,
      reviewImages,
    };

    createReview({ data, placeId, userId: user?.id as number });
  };

  const handledescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValue('description', e.target.value);
  };

  const handleWalkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('walkDuration', e.target.value);
  };

  const handleEntryFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('entryFee', e.target.value);
  };

  const handleRemoveImage =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      removeImage(index);
    };
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
            onClick={handleSubmit(onSubmit)}
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
          <div className='flex gap-2'>
            {previewImgs &&
              Array.from(previewImgs)?.map((file, index) => (
                <div key={index} className='relative'>
                  <Image
                    className='h-24 w-24 rounded-lg object-cover object-center'
                    src={URL.createObjectURL(file)}
                    alt={`이미지 미리보기 ${index + 1}`}
                    width={100}
                    height={100}
                    onLoad={() =>
                      URL.revokeObjectURL(URL.createObjectURL(file))
                    }
                  />
                  <button
                    className='absolute right-1 top-1 text-white'
                    onClick={handleRemoveImage(index)}
                  >
                    <Image
                      src='/icons/icon-cancel(white).svg'
                      alt={`이미지 삭제 버튼`}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>후기</span>
          <textarea
            rows={7}
            className='resize-none rounded-lg border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
            placeholder='이용 후기/좋았던 점/아쉬운 점/장소 이용 시 팁 등을 자유롭게 공유해 주세요.'
            {...register('description', {
              required: '이용 후기를 입력해 주세요.',
            })}
            onChange={handledescriptionChange}
          />
          {errors.description && (
            <span className='text-xs text-red-500'>
              {errors.description.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>소요 시간</span>
          <ul className='flex flex-wrap gap-2'>
            {walkDurations.map((duration) => (
              <li key={duration[0]}>
                <input
                  type='radio'
                  id={duration[0]}
                  value={duration[0]}
                  {...register('walkDuration', {
                    required: '소요 시간을 선택해 주세요.',
                  })}
                  className='peer hidden'
                  onChange={handleWalkDurationChange}
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
          {errors.walkDuration && (
            <span className='text-xs text-red-500'>
              {errors.walkDuration.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>입장료</span>
          <ul className='flex gap-2'>
            {ENTRY_FEE.map((option) => (
              <li key={option.id}>
                <input
                  type='radio'
                  id={option.id}
                  value={option.value}
                  {...register('entryFee')}
                  className='peer hidden'
                  onChange={handleEntryFeeChange}
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