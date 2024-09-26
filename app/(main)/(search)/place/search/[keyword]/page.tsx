'use client';

import PlaceDetailModal from '@/app/_component/common/Modal/PlaceDetailModal';
import { useModalStore } from '@/app/store/client/modal';
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

  return <>{!loading && openInfo && <PlaceDetailModal placeId={openInfo} />}</>;
};

export default SearchResultPage;
