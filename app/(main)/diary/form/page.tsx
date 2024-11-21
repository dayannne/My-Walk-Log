'use client';

import { WEATHERS } from '@/shared/constant';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useImageUpload } from '@/hooks/useImageUpload';
import FileInput from '@/components/common/Input/FileInput';
import { useState } from 'react';
import { IDiaryReq } from '@/shared/types/diary';
import SearchWalkedPlace from '@/components/diary/SearchWalkedPlace';
import { useCreateDiary } from '@/store/server/diary';
import Header from '@/components/Header';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/client/user';
import Loading from '@/components/common/Loading';

const DiaryFormPage = () => {
  const {
    previewImgs,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    uploadImage,
    removeImage,
    isPending: isImagePending,
  } = useImageUpload();
  const router = useRouter();
  const queryClient = useQueryClient();
  const weathers = Object.entries(WEATHERS);
  const user = useUserStore((state) => state.user);
  const { mutate: createDiary, isPending: isDiaryPending } = useCreateDiary();
  const [placeTags, setPlaceTags] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
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
      isPublic: 'false',
    },
  });

  const onSubmit = async (formData: IDiaryReq) => {
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }
    // 이미지 업로드 받아오기
    const diaryImages = await uploadImage();
    const data: IDiaryReq = {
      // TODO 여기 장소검색 input에서 placeId 받아와야 함
      ...formData,
      diaryImages,
      isPublic: formData.isPublic === 'true' ? true : false,
      tags: placeTags,
      placeId: selectedPlace?.id || null,
      placeName: selectedPlace?.place_name || null,
      placeAddress: selectedPlace?.address_name || null,
    };
    createDiary(
      { data, userId: user?.id },
      {
        onSuccess: () => {
          alert('일기가 기록되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['myProfile'] });
          router.back();
        },
      },
    );
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('content', e.target.value, { shouldValidate: true });
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('weather', e.target.value, { shouldValidate: true });
  };

  const handleIsPublicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isPublic', e.target.value, { shouldValidate: true });
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
      {(isImagePending || isDiaryPending) && (
        <Loading isLoading={isImagePending || isDiaryPending} />
      )}

      <Header title='산책일기 쓰기'>
        <div className='flex gap-[6px]'>
          <button
            className='ep-1 box-border flex h-full grow-0 items-center justify-center rounded-lg border border-solid border-gray-500 bg-white px-2 py-1 text-xs text-black shadow-md'
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type='submit'
            className={`box-border h-full grow-0 rounded-lg border border-solid px-2 py-1 text-xs shadow-md ${isValid ? 'bg-olive-green border-olive-green text-white' : 'border-gray-400 bg-gray-100 text-gray-400'}`}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            저장하기
          </button>
        </div>
      </Header>
      <form className='bg-hover flex h-full basis-full flex-col gap-5 overflow-y-scroll px-3 py-5'>
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='flex items-center gap-1 font-medium'>
            <span>날씨</span>
            <span className='bg-hover text-olive-green shrink-0 rounded-lg px-1 text-xs'>
              필수
            </span>
          </span>
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
                  className='hover:bg-hover peer-checked:bg-olive-green box-border flex aspect-square w-auto grow-0 basis-full cursor-pointer items-center justify-center rounded-full border border-solid border-gray-300 bg-white p-2 shadow-sm peer-checked:border-gray-300 peer-checked:text-white'
                >
                  {emoji}
                </label>
                <span className='peer-checked:text-olive-green text-wrap text-xs text-gray-400'>
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
          <FileInput
            ref={fileInputRef}
            onChange={fileHandler}
            multiple={true}
          />
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
          <span className='flex items-center gap-1 font-medium'>
            <span>메모</span>
            <span className='bg-hover text-olive-green shrink-0 rounded-lg px-1 text-xs'>
              필수
            </span>
          </span>
          <textarea
            rows={7}
            className='resize-none rounded-lg border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
            placeholder='오늘, 산책하면서 어땠나요? 감정, 좋았던 점, 기억나는 순간 등 자유롭게 담아 봐요.'
            {...register('content', {
              required: '일기 내용을 입력해 주세요.',
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
            className='rounded-lg border border-solid border-gray-500 px-2 py-3 text-xs shadow-sm focus:outline-none'
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
        <div className='flex flex-col gap-2 rounded-md bg-white p-3'>
          <span className='flex items-center gap-1 font-medium'>
            <span>공개 여부</span>
            <span className='bg-hover text-olive-green shrink-0 rounded-lg px-1 text-xs'>
              필수
            </span>
          </span>
          <span className='text-xs text-gray-500'>
            일기를 공개하면 피드에 일기가 노출되고, 댓글을 통해 다른 사람들과
            소통할 수 있어요.
          </span>
          <ul className='border-olive-green flex h-11 rounded-lg border border-solid'>
            <li className='basis-full'>
              <input
                type='radio'
                id='private'
                value='false'
                className='peer hidden'
                {...register('isPublic')}
                onChange={handleIsPublicChange}
              />
              <label
                htmlFor='private'
                className='hover:bg-hover peer-checked:bg-olive-green box-border flex aspect-square h-full w-full grow-0 cursor-pointer items-center justify-center rounded-l-lg border-r border-solid border-gray-300 bg-white peer-checked:border-gray-300 peer-checked:text-white'
              >
                비공개
              </label>
            </li>

            <li className='basis-full'>
              <input
                type='radio'
                id='public'
                value='true'
                className='peer hidden'
                {...register('isPublic')}
                onChange={handleIsPublicChange}
              />
              <label
                htmlFor='public'
                className='hover:bg-hover peer-checked:bg-olive-green box-border flex aspect-square h-full w-full grow-0 cursor-pointer items-center justify-center rounded-r-lg bg-white peer-checked:border-gray-300 peer-checked:text-white'
              >
                공개
              </label>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default DiaryFormPage;
