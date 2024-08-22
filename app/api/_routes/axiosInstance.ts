import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: 'http://localhost:3000/api/kakao',
});

export const mapInstance = axios.create({
  baseURL: 'http://localhost:3000/api/vworld', // 기본 URL에서 쿼리 파라미터 제외
});
