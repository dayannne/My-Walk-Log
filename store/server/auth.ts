import { ILoginForm, ISignupForm } from '@/shared/types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../client/user';

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: ILoginForm) => {
      const result = await axios.post('/api/auth/login', data);
      return result.data;
    },
    onSuccess: (data) => {
      setUser(data.data);
      alert(`${data.data.username}님, 반가워요 :)`);
      router.push('/feed');
    },
    onError: (error: unknown) => {
      console.error(error);
    },
  });
};

export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ISignupForm) => {
      const response = await axios.post('/api/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      alert(data.message);
      router.push('/login');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    },
  });
};
