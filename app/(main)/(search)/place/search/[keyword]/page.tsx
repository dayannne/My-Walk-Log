'use client';

import PlaceDetail from '@/app/_component/place/PlaceDetail';
import { useModalStore } from '@/app/store/client/modal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface pageProps {}

const SearchResultPage = () => {
  const { openInfo } = useModalStore();
  const { setOpenInfo } = useModalStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setOpenInfo(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return <>{!loading && openInfo && <PlaceDetail placeId={openInfo} />}</>;
};

export default SearchResultPage;
