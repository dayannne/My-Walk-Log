import getQueryClient from '@/shared/utils/getQueryCLient';
import { getMyProfile } from '@/store/server/profile';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface ProfileLayoutProps {
  children: React.ReactNode;
  params: { userId: string };
}

const ProfileLayout = async ({ children, params }: ProfileLayoutProps) => {
  const queryClient = getQueryClient();
  const userId = parseInt(params.userId);
  await queryClient.prefetchQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(userId),
    staleTime: 60 * 1000,
  });

  return (
    <div
      className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 basis-full flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
};

export default ProfileLayout;
