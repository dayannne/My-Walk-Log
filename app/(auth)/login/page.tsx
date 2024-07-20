'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUserStore } from '@/app/store/client/user';
import { ILoginForm } from '@/app/shared/types/auth';

export interface pageProps {}

const LoginPage = ({}: pageProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    shouldUnregister: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: ILoginForm) => {
    try {
      const result = await axios.post('/api/auth/login', data);

      if (result.status === 200) {
        setUser(result.data.data);
        setError({
          isError: false,
          message: '',
        });
        alert(`${result.data.data.username}님, 반가워요 :)`);
        router.push('/place');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setError({ isError: true, message: error.response?.data.message });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col rounded-md border-solid border-gray-300 p-6 md:max-w-[520px] md:border md:p-10'
    >
      <input
        className='w-full border-b-[1.5px] border-gray-300 py-3 pl-1 outline-none'
        type='text'
        placeholder='이메일'
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <p className='mt-2 text-sm text-red-400'>잘못된 이메일 형식입니다.</p>
      )}
      <input
        className='border-b-[1.5px] border-gray-300 py-3 pl-1 outline-none'
        type='password'
        placeholder='비밀번호'
        {...register('password', { required: true })}
      />
      {error.isError && (
        <p className='mt-5 text-sm text-red-400'>{error.message}</p>
      )}

      <button
        type='submit'
        className='bg-olive-green mt-10 w-full rounded-md p-4 text-sm text-white'
      >
        로그인
      </button>
      <span className='flex items-center gap-2 py-4'>
        <span className='h-[1px] w-full basis-full bg-gray-100'></span>
        <span className='shrink-0 text-xs text-gray-400'>또는</span>
        <span className='h-[1px] w-full basis-full bg-gray-100'></span>
      </span>
      <button
        type='submit'
        className='relative flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] p-4 text-sm text-black'
      >
        <span className='after:content=[""] after:bg-kakao after:absolute after:left-4 after:top-1/2 after:h-7 after:w-7 after:-translate-y-1/2'>
          카카오 로그인
        </span>
      </button>
      <div className='mt-4 flex justify-between'>
        <Link href='/signup' className='text-sm text-gray-600'>
          회원가입
        </Link>

        <Link href='/findpassword' className='text-sm text-gray-600'>
          비밀번호 찾기
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
