import { useGetPlace } from '@/app/store/server/place';
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

  const queryOptions = useGetPlace(placeId);
  await queryClient.prefetchQuery(queryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default PlaceDetailLayout;
