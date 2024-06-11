import { fetchPlaceDetail } from '../api/map';

const usePlaceDetail = () => {
  const handleClick = async (placeId: string) => {
    const result = await fetchPlaceDetail(placeId);
  };

  return { handleClick };
};

export default usePlaceDetail;
