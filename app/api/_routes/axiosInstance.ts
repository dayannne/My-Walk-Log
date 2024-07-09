import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: 'http://localhost:3000/api/kakao',
});
