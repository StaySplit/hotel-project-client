import type {IHotelSortInfo} from './hotel-sort-info.interface'

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: IHotelSortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}