'use client';

import { WEATHERS } from '@/app/shared/constant';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useImageUpload } from '@/app/_hooks/useImageUpload';
import FileInput from '@/app/_component/common/Input/FileInput';
import { useState } from 'react';
import { useUserStore } from '@/app/store/client/user';
import { IDiaryReq } from '@/app/shared/types/diary';
import SearchWalkedPlace from '@/app/_component/diary/SearchWalkedPlace';
import { useCreateDiary } from '@/app/store/server/diary';

const DiaryFormPage = () => {
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

  const weathers = Object.entries(WEATHERS);
  const [placeTags, setPlaceTags] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IDiaryReq>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      content: '',
      weather: null,
      tags: [],
    },
  });
  const { mutate: createDiary } = useCreateDiary();
  const onSubmit = async (formData: IDiaryReq) => {
    // 이미지 업로드 받아오기
    const diaryImages = await uploadImage();
    const data: IDiaryReq = {
      // TODO 여기 장소검색 input에서 placeId 받아와야 함
      ...formData,
      authorId: user?.id as number,
      placeId: selectedPlace.id,
      diaryImages,
      tags: placeTags,
    };
    createDiary(data);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('content', e.target.value);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('weather', e.target.value);
  };

  const handleRemoveImage =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      removeImage(index);
    };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagValue = e.currentTarget.value;
      console.log(tagValue);
      if (!placeTags.includes(tagValue)) {
        setPlaceTags((prevTags) => [...prevTags, tagValue]);
        e.currentTarget.value = '';
      }
    }
  };

  const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tagValue = e.currentTarget.value;
    const newTags = placeTags.filter((tag) => tag !== tagValue);
    setPlaceTags(newTags);
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-start justify-between border-b border-solid border-b-gray-200 px-4 py-5'>
        <span className='font-semibold'>산책일기 쓰기</span>

        <div className='flex gap-[6px]'>
          <button
            className='bg-whit ep-1 box-border flex h-full grow-0 items-center justify-center rounded-lg border border-solid border-gray-500 px-2 py-1 text-xs text-black shadow-md'
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            className='bg-olive-green border-olive-green box-border h-full grow-0 rounded-lg border border-solid px-2 py-1 text-xs text-white shadow-md'
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            저장하기
          </button>
        </div>
      </div>
      <form className='bg-hover flex h-full basis-full flex-col gap-5 overflow-y-scroll px-3 py-5'>
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='font-medium'>날씨</span>
          <span className='text-xs text-gray-500'>
            오늘, 산책하면서의 날씨는 어땠나요?
          </span>
          <ul className='flex justify-around gap-1'>
            {weathers.map(([key, { emoji, name }]) => (
              <li
                key={key}
                className='flex flex-col items-center justify-center gap-1'
              >
                <input
                  type='radio'
                  id={key}
                  value={key}
                  {...register('weather', {
                    required: '날씨를 선택해 주세요.',
                  })}
                  className='peer hidden'
                  onChange={handleWeatherChange}
                />
                <label
                  htmlFor={key}
                  className='hover:bg-hover box-border flex aspect-square grow-0 basis-full cursor-pointer items-center justify-center rounded-full border border-solid border-transparent bg-gray-300 p-2 shadow-sm hover:border-gray-300 peer-checked:border-gray-300 peer-checked:bg-white peer-checked:text-white'
                >
                  {emoji}
                </label>
                <span className='peer-checked:text-olive-green text-wrap text-xs text-gray-300'>
                  {name}
                </span>
              </li>
            ))}
          </ul>
          {errors.weather && (
            <span className='text-xs text-red-500'>
              {errors.weather.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='font-medium'>상세 사진</span>
          <span className='text-xs text-gray-500'>
            일기와 함께 사진을 남겨 봐요.
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
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='font-medium'>메모</span>
          <textarea
            rows={7}
            className='resize-none rounded-lg border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
            placeholder='오늘, 산책하면서 어땠나요? 감정, 좋았던 점, 기억나는 순간 등 자유롭게 담아 봐요.'
            {...register('content', {
              required: '이용 후기를 입력해 주세요.',
            })}
            onChange={handleContentChange}
          />
          {errors.content && (
            <span className='text-xs text-red-500'>
              {errors.content.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='font-medium'>장소 등록하기</span>
          <SearchWalkedPlace
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        </div>
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='font-medium'>태그 추가</span>
          <input
            type='text'
            placeholder='입력 후 엔터를 눌러 여러 태그를 등록해 보세요.'
            className='rounded-lg border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
            onKeyDown={handleTagInputKeyDown}
          />
          <div className='flex flex-wrap gap-2'>
            {placeTags.map((tag, index) => (
              <button
                key={index}
                value={tag}
                className='bg-hover flexitems-center flex items-center rounded-lg border border-solid border-gray-500 px-2 py-1 text-xs shadow-sm'
                onClick={handleDeleteTag}
              >
                {tag}
                <Image
                  className='w-3'
                  src='/icons/icon-cancel.svg'
                  alt={`이미지 삭제 버튼`}
                  width={16}
                  height={16}
                />
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiaryFormPage;
