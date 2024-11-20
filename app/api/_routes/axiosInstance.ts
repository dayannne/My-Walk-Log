import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api/kakao`,
});

export const mapInstance = axios.create({
  baseURL: 'https://api.vworld.kr/req/data', // base URL을 설정합니다.
  headers: {
    'Content-Type': 'application/json', // 필요한 헤더를 설정합니다.
  },
});
