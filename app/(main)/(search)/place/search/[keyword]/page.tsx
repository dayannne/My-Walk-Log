'use client';

import PlaceDetailModal from '@/components/common/Modal/PlaceDetailModal';
import { useModalStore } from '@/store/client/modal';
import { useEffect, useState } from 'react';

export interface pageProps {}

const SearchResultPage = () => {
  const { openInfo, setOpenInfo } = useModalStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setOpenInfo(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {!loading && openInfo && (
        <PlaceDetailModal placeId={openInfo as string} />
      )}
    </>
  );
};

export default SearchResultPage;
