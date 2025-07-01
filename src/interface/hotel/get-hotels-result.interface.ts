import type { IHotel } from "./hotel.interface";
import type {IPageable} from "./hotel-pageable.interface"
import type { IHotelSortInfo } from "./hotel-sort-info.interface";

export interface IGetHotelsResult {
  content: IHotel[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: IHotelSortInfo;
  empty: boolean;
}