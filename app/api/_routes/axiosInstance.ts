import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao`,
});

export const mapInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api/vworld`, // 기본 URL에서 쿼리 파라미터 제외
});
