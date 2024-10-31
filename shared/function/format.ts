import { PLACE_KEYWORDS } from '../constant';

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString(); // 앞의 0을 제거
  const day = date.getDate().toString(); // 앞의 0을 제거

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return { year, month, day, dayOfWeek };
}

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInSeconds < 60) {
    return '방금전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays === 1) {
    return '어제';
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else if (diffInWeeks < 4) {
    return `${Math.ceil(diffInWeeks)}주 전`;
  } else {
    const dateYear = date.getFullYear();
    const nowYear = now.getFullYear();
    if (dateYear === nowYear) {
      const month = date.getMonth() + 1; // Months are zero-based
      const day = date.getDate();
      return `${month}월 ${day}일`;
    } else {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${dateYear}년 ${month}월 ${day}일`;
    }
  }
}

export const formatPlaceKeyword = (
  keys: number[],
): { key: number; value: string }[] => {
  const result: { key: number; value: string }[] = [];

  for (const key of keys) {
    for (const category in PLACE_KEYWORDS) {
      if (PLACE_KEYWORDS[category].hasOwnProperty(key)) {
        result.push({ key, value: PLACE_KEYWORDS[category][key] });
      }
    }
  }

  return result;
};
