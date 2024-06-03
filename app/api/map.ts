import axiosInstance from './axiosInstance';

export const fetchPlaceDetail = async (placeId: string) => {
  const response = await axiosInstance.get(`/main/v/${placeId}`);
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
};
