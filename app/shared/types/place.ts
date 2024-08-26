export interface PlaceKeywords {
  [key: string]: { [key: number]: string };
}

export interface Area {
  법정동코드: number;
  법정동명: string;
  폐지여부: string;
}
