'use client';

import FileInput from '@/components/common/Input/FileInput';
import { useImageUpload } from '@/hooks/useImageUpload';
import { IProfileReq } from '@/shared/types/profile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AreaSearch from '@/components/common/AreaSearch/AreaSearch';
import { useEditProfile, useGetMyProfile } from '@/store/server/profile';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IAddress } from '@/shared/types/map';

export interface pageProps {
  params: { userId: string };
}

const EditProfilePage = ({ params }: pageProps) => {
  const router = useRouter();
  const {
    previewImgs,
    fileInputRef,
    handleButtonClick,
    fileHandler,
    uploadImage,
  } = useImageUpload();
  const queryOptions = useGetMyProfile(parseInt(params?.userId));
  const { data: profile } = useSuspenseQuery(queryOptions);

  const { mutate: editProfile } = useEditProfile();
  const [address, setAddress] = useState<IAddress | null>(null);

  const methods = useForm<IProfileReq>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      username: profile.username || '',
      introduction: profile.introduction || '',
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('username', e.currentTarget.value, { shouldValidate: true });
  };

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValue('introduction', e.currentTarget.value, { shouldValidate: true });
  };

  const onSubmit = async (formData: IProfileReq) => {
    // 이미지 업로드 받아오기
    const profileImage = previewImgs[0]
      ? await uploadImage()
      : profile.profileImage;

    const data: IProfileReq = {
      ...formData,
      profileImage: Array.isArray(profileImage)
        ? profileImage[0]
        : profile.profileImage,
      ...(address && { address }),
    };

    editProfile(data);
  };

  useEffect(() => {
    if (profile) {
      setAddress(profile.address);
    }
  }, [profile]);

  return (
    <div className='flex h-full flex-col'>
      <Header title='프로필 수정하기'>
        <div className='flex gap-[6px]'>
          <button
            className='box-border flex h-full grow-0 items-center justify-center rounded-lg border border-solid border-gray-500 bg-white px-2 py-1 text-xs text-black shadow-md'
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            className={`box-border h-full grow-0 rounded-lg border border-solid px-2 py-1 text-xs shadow-md ${isValid ? 'bg-olive-green border-olive-green text-white' : 'border-gray-400 bg-gray-100 text-gray-400'}`}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            저장하기
          </button>
        </div>
      </Header>
      {profile && (
        <form className='bg-hover flex h-full basis-full flex-col items-center gap-8 overflow-y-scroll px-3 py-8'>
          <div>
            <FileInput
              ref={fileInputRef}
              onChange={fileHandler}
              multiple={false}
            />
            <button onClick={handleButtonClick} className='relative'>
              <Image
                className='h-24 w-24 rounded-full object-cover shadow-md'
                src={
                  (previewImgs[0] && URL.createObjectURL(previewImgs[0])) ||
                  profile.profileImage
                }
                width={300}
                height={300}
                alt='등록 버튼'
              />
              <div className='bg-olive-green absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full p-[2px]'>
                <Image
                  className='object-cover'
                  src='/icons/icon-photo.svg'
                  width={24}
                  height={24}
                  alt='등록 버튼'
                />
              </div>
            </button>
          </div>
          <div className='flex w-full flex-col gap-3 rounded-md bg-white p-3'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>이름</span>
              <input
                className='hover:bg-hover resize-none border-b border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
                placeholder='2-10자 이내여야 합니다.'
                {...methods.register('username', {
                  required: '이름을 입력해 주세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9가-힣]{2,10}$/,
                    message:
                      '이름은 2자 이상 10자 이내의 문자 또는 숫자만 가능합니다.',
                  },
                })}
                onChange={handleUsernameChange}
              />
              {errors.username && (
                <span className='text-xs text-red-500'>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>소개</span>
              <textarea
                rows={3}
                maxLength={50}
                className='hover:bg-hover resize-none rounded-md border border-solid border-gray-500 p-2 text-xs shadow-sm focus:outline-none'
                placeholder='자신을 소개할 문구를 입력해 주세요. (최대 50자)'
                {...methods.register('introduction')}
                onChange={handleIntroductionChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-medium'>동네</span>

              <AreaSearch
                address={address}
                setAddress={setAddress}
                type='EDIT'
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfilePage;
