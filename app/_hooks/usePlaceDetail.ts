import axios from 'axios';
import { useRouter } from 'next/navigation';

const usePlaceDetail = () => {
  // const router = useRouter();
  const handleClick = async (placeId: string) => {
    // router.push(`/place/result/${placeId}`);
  };

  return { handleClick };
};

export default usePlaceDetail;
