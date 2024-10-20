import { IPlaceKeywords } from '../types/place';

export const FILTER_CATEGORIES = [
  '도보여행',
  '둘레길',
  '하천',
  '공원',
  '도시근린공원',
  '국립공원',
  '도립공원',
  '산',
  '오름',
  '호수',
  '저수지',
  '수목원,식물원',
];

export const FACALTY_INFO = {
  pet: '동물출입',
  parking: '주차',
  fordisabled: '휠체어 사용',
  smokingroom: '흡연실',
};

type WalkDurations = {
  [key: number]: string;
};

export const WALK_DURATIONS: WalkDurations = {
  1: '10분 ~ 30분',
  2: '30분 ~ 1시간',
  3: '1시간 ~ 1시간 30분',
  4: '1시간 30분 ~ 2시간',
  5: '2시간 이상',
};

export const ENTRY_FEE = [
  { id: 'free', value: 'free', label: '무료 입장' },
  { id: 'paid', value: 'paid', label: '유료 입장' },
];

export const PLACE_KEYWORDS: IPlaceKeywords = {
  시설: {
    1: '🚍 대중교통이 편해요',
    2: '🅿️ 주차하기 편해요',
    3: '💵 무료 주차가 가능해요',
    4: '📏 규모가 커요',
    5: '👶 아이와 가기 좋아요',
    6: '🛠️ 관리가 잘 되어있어요',
    7: '🏢 편의시설이 잘 되어있어요',
    8: '🐾 반려동물과 가기 좋아요',
    9: '🚻 화장실이 깨끗해요',
  },
  분위기: {
    10: '🌅 경치가 아름다워요',
    11: '🤫 조용하고 평화로워요',
    12: '🍃 공기가 맑아요',
    13: '☕ 휴식 공간이 많아요',
    14: '📸 포토 스팟이 많아요',
    15: '🌳 다양한 식물/나무가 있어요',
    16: '🌸☀️🍂❄️ 계절별로 다른 매력이 있어요',
    17: '🌿 조경이 잘 되어 있어요',
    18: '🐿️ 동물들을 볼 수 있어요',
    19: '🚶‍♂️ 산책로가 평탄해요',
    20: '🛤️ 산책로가 잘 표시되어 있어요',
    21: '💡 가로등이 잘 설치되어 있어요 (야간 산책)',
    22: '🏞️ 긴 산책로가 있어요',
    23: '💧 물가가 깨끗해요',
    24: '🛣️ 길이 잘 정비되어 있어요',
    25: '⛰️ 경사가 급해요',
    26: '🚴‍♂️ 자전거 타기 좋아요',
    27: '🏃‍♂️ 러닝하기 좋아요',
    28: '👥 방문객이 많아요',
    29: '🚷 붐비지 않아요',
    30: '🧺 피크닉하기 좋아요',
  },
};

type weathers = {
  [key: string]: { emoji: string; name: string };
};

export const WEATHERS: weathers = {
  sunny: {
    emoji: '☀️',
    name: '맑음',
  },
  cloudy: {
    emoji: '☁️',
    name: '흐림',
  },
  partlyCloudy: {
    emoji: '⛅',
    name: '부분 흐림',
  },
  rainy: {
    emoji: '🌧️',
    name: '비',
  },
  snowy: {
    emoji: '⛄',
    name: '눈',
  },
};
