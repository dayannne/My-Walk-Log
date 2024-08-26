import { ENTRY_FEE, PLACE_KEYWORDS } from '../constant';
import { Area } from '../types/place';

export const filterPlacesByKeyword = (places: any[], keywords: string[]) => {
  return places.filter((place) => {
    const categories = place.category_name.split(` > `);
    return keywords.some((keyword) => categories.includes(keyword));
  });
};

export const filterPlaceKeywords = (
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

export const filterEntryFee = (id: string): string | undefined => {
  const entry = ENTRY_FEE.find((fee) => fee.id === id);
  return entry ? entry.label : undefined;
};

export const filterUrl = (url: string) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  const decodedPathname = decodeURIComponent(pathname);

  return `${urlObj.origin}${decodedPathname}`;
};

export const filterAreaData = (data: Area[]) => {
  const filteredData = data.filter((item) => {
    const history = item.폐지여부;
    const areaName = item.법정동명.split(' ');
    const lastAreaName = areaName[areaName.length - 1].slice(-1);

    // '읍면동' 체크
    const isUbMyunDong =
      lastAreaName === '읍' || lastAreaName === '면' || lastAreaName === '동';

    // 폐지여부
    const isExist = history === '존재';

    return isUbMyunDong && isExist;
  });
  return filteredData;
};
