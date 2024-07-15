import axios from 'axios';

export const getPlace = async (placeId: string) => {
  const result = await axios.get(`/api/place/${placeId}`);
  return result;
};

export const createPlaceLike = async (placeId: string, userId: number) => {
  const result = await axios.post(`/api/place/${placeId}/like/${userId}`);
  return result;
};

export const deletePlaceLike = async (placeId: string, userId: number) => {
  const result = await axios.delete(`/api/place/${placeId}/unlike/${userId}`);
  return result;
};
