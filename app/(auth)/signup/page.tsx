'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { ISignupForm } from '@/app/shared/types/auth';

import axios from 'axios';
import { useState } from 'react';

export interface pageProps {}

const SignupPage = ({}: pageProps) => {
  const [emailValid, setEmailValid] = useState({
    isValid: false,
    email: '',
  });
  const {
    watch,
    getValues,
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignupForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      adress: '',
    },
  });
  const onSubmit = (data: ISignupForm) => console.log(data);

  const handleCheckBtn = async () => {
    try {
      const response = await axios.post('/api/auth/email-check', {
        email: getValues('email'),
      });
      const { isDuplicate } = response.data;
      if (isDuplicate === true) {
        setError('email', {
          message: '이미 존재하는 이메일입니다.',
        });
        setEmailValid({ isValid: false, email: '' });
      } else {
        setEmailValid({ isValid: true, email });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-4 rounded-md border-solid border-gray-300 bg-white p-6 md:max-w-[520px] md:border md:p-10'
      >
        <label>
          <h2 className='relative mb-2'>
            이메일
            <span className='absolute -top-[2px] ml-[2px] text-[11px] font-bold text-red-500'>
              ＊
            </span>
          </h2>
          <div className='flex gap-2'>
            <input
              type='text'
              className='w-full rounded-md border border-gray-300 py-3 pl-2 outline-none'
              placeholder='이메일'
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            <button
              type='button'
              className='bg-olive-green shrink-0 rounded-md p-3 text-sm text-white'
              onClick={handleCheckBtn}
            >
              중복 확인
            </button>
          </div>
        </label>
        {emailValid.isValid === false &&
          !!getValues('email') &&
          errors.email && (
          <p className='text-sm text-red-400'>{errors.email?.message}</p>
        )}
        {emailValid.isValid === true && (
          <p className='text-sm text-green-500'>사용 가능한 이메일입니다.</p>
        )}
        <label>
          <h2 className='relative mb-2'>
            비밀번호
            <span className='absolute -top-[2px] ml-[2px] text-[11px] font-bold text-red-500'>
              ＊
            </span>
          </h2>
          <input
            type='password'
            className='border- w-full rounded-md border border-gray-300 py-3 pl-2 outline-none'
            placeholder='비밀번호 (8자리 이상)'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
              },
            })}
          />
        </label>
        {!!getValues('password') && errors.password && (
          <p className='text-sm text-red-400'>{errors.password.message}</p>
        )}

        <label>
          <h2 className='relative mb-2'>
            비밀번호 확인
            <span className='absolute -top-[2px] ml-[2px] text-[11px] font-bold text-red-500'>
              ＊
            </span>
          </h2>
          <div className='relative'>
            <input
              className='border- w-full rounded-md border border-gray-300 py-3 pl-2 outline-none'
              type='password'
              placeholder='비밀번호'
              {...register('passwordConfirm', {
                required: true,
                validate: (value) =>
                  !!watch('password') && watch('password') === value,
              })}
            />

            <Image
              src='/icons/icon-check.svg'
              alt={'체크 아이콘'}
              width={24}
              height={24}
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${!!watch('password') && watch('password') === watch('passwordConfirm') ? 'bg-olive-green' : 'bg-gray-300'}`}
            />
          </div>
        </label>
        <span className='my-2 h-[1px] w-full bg-gray-100'></span>
        <label>
          <h2 className='relative mb-2'>
            이름
            <span className='absolute -top-[2px] ml-[2px] text-[11px] font-bold text-red-500'>
              ＊
            </span>
          </h2>
          <input
            className='border- w-full rounded-md border border-gray-300 py-3 pl-2 outline-none'
            type='text'
            maxLength={8}
            placeholder='이름 입력 (8자리 이하)'
            {...register('name', { required: true, maxLength: 8 })}
          />
        </label>

        <label>
          <h2 className='mb-2'>주소</h2>
          <input
            className='border- w-full rounded-md border border-gray-300 py-3 pl-2 outline-none'
            type='password'
            placeholder='주소 입력'
            {...register('name', { required: false })}
          />
        </label>
        <div className='flex flex-col'>
          <button
            type='submit'
            className='bg-olive-green mt-6 w-full rounded-md p-4 text-sm text-white disabled:bg-gray-300'
            disabled={
              isValid === false ||
              emailValid.isValid === false ||
              emailValid.email !== watch('email')
            }
          >
            회원가입
          </button>
        </div>
        <span className='mt-4 text-center text-sm'>
          <span className='mr-1 text-gray-600'>이미 계정이 있으신가요?</span>
          <Link href='/login' className='text-olive-green underline'>
            로그인하러 가기
          </Link>
        </span>
      </form>
    </>
  );
};

export default SignupPage;
