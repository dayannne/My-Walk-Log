'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // refetchOnWindowFocus: false,
          // retry: false,
          // SSR에서는 클라이언트에서 즉시 refetch하는 것을 피하기 위해
          // staleTime을 0보다 크게 설정하는 것이 좋다.
          staleTime: 60 * 1000,
        },
      },
    });
  }

  let browserQueryClient: QueryClient | undefined = undefined;

  function getQueryClient() {
    if (typeof window === 'undefined') {
      // Server일 경우
      // 매번 새로운 queryClient를 만든다.
      return makeQueryClient();
    } else {
      // Browser일 경우
      // queryClient가 존재하지 않을 경우에만 새로운 queryClient를 만든다.
      // React가 새 Client를 만들게 하기 위해 중요하다.
      if (!browserQueryClient) browserQueryClient = makeQueryClient();
      return browserQueryClient;
    }
  }

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
