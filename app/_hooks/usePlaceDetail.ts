import axios from 'axios';

const usePlaceDetail = () => {
  const handleClick = async (placeId: string) => {
    try {
      const result = await axios.post(`/api/search/result/${placeId}`);
      console.log(result);
    } catch (error) {}
  };

  return { handleClick };
};

export default usePlaceDetail;
