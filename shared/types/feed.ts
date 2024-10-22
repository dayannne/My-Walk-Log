import { IDiary } from './diary';

export interface IFeedRes {
  status: string;
  data: IDiary[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalDiaries: number;
}
