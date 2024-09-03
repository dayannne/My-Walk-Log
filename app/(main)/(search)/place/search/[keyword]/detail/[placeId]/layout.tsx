import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export interface PlaceDetailLayoutProps {
  children: React.ReactNode;
  params: { placeId: string };
}

const PlaceDetailLayout = async ({
  children,
  params,
}: PlaceDetailLayoutProps) => {
  const { placeId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}`);
      return response.json();
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['reviews', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}/review`);
      return response.json();
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['diaries', placeId],
    queryFn: async () => {
      const response = await fetch(`/api/place/${placeId}/diary`);
      return response.json();
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default PlaceDetailLayout;
