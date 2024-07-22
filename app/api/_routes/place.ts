import { IPlace } from '@/app/shared/types/map';
import axios from 'axios';

export const getPlace = async (placeId: string) => {
  const result = await axios.get(`/api/place/${placeId}`);
  return result;
};

export const createPlaceLike = async (placeId: string, userId: number) => {
  const result = await axios.post(`/api/place/${placeId}/${userId}/like`);
  return result;
};

export const deletePlaceLike = async (placeId: string, userId: number) => {
  const result = await axios.delete(`/api/place/${placeId}/${userId}/unlike`);
  return result;
};

export const searchPlace = async (data: IPlace[]) => {
  const result = await axios.post('/api/search/result', data);
  return result;
};
