import { IDiary } from './diary';
import { IReview } from './review';

export interface IPlaceKeywords {
  [key: string]: { [key: number]: string };
}

export interface IArea {
  법정동코드: number;
  법정동명: string;
  폐지여부: string;
}

export interface IPlace {
  id: string;
  placeName: string;
  categoryName: string;
  address: string;
  distance: string;
  roadAddress: string;
  x: string;
  y: string;
  likedBy: number[];
  mainPhotoUrl: string;
  findway: IFindWay;
  basicInfo: IBasicInfo;
  photo: IPhoto;
  reviews: IReview[];
  diaries: IDiary[];
}

export interface IFindWay {
  x: number;
  y: number;
  subway: ISubway[];
  busstop: IBusStop[];
  busDirectionCheck: boolean;
}

export interface ISubway {
  exitNum: string;
  stationId: string;
  subwayList: ISubwayList[];
  toExitMinute: number;
  toExitDistance: number;
  stationSimpleName: string;
}

export interface ISubwayList {
  subwayId: string;
  subwayName?: string;
}

export interface IBusStop {
  busInfo: IBusInfo[];
  wpointx: number;
  wpointy: number;
  busStopId: string;
  busStopName: string;
  busStopDisplayId: string;
  toBusstopDistance: number;
}

export interface IBusInfo {
  busList: IBus[];
  busType: string;
  busNames: string;
  busTypeCode: string;
}

export interface IBus {
  [key: string]: string;
}

export interface IBasicInfo {
  tags: string[];
  address: IAddress;
  homepage: string;
  openHour: IOpenHour;
  phonenum: string;
  facilityInfo: IFacilityInfo;
  mainphotourl: string;
}

export interface IAddress {
  region: IRegion;
  addrbunho: string;
}

export interface IRegion {
  [key: string]: string;
}

export interface IOpenHour {
  realtime: IRealtime;
  periodList: IPeriod[];
  offdayDisplayText: string;
}

export interface IRealtime {
  open: string;
  holiday: string;
  datetime: string;
  breaktime: string;
  closedToday: string;
  currentPeriod: ICurrentPeriod;
  moreOpenOffInfoExists: string;
}

export interface ICurrentPeriod {
  timeList: ITime[];
  periodName: string;
}

export interface IPeriod {
  timeList: ITime[];
  periodName: string;
}

export interface ITime {
  [key: string]: string;
}

export interface IFacilityInfo {
  [key: string]: string;
}

export interface IPhoto {
  photoList: IPhotoList[];
}

export interface IPhotoList {
  list: IPhotoDetail[];
  photoCount: number;
  categoryName: string;
}

export interface IPhotoDetail {
  [key: string]: string;
}
