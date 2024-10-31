import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao`,
});

export const mapInstance = axios.create({
  baseURL: `/api/vworld`,
});
