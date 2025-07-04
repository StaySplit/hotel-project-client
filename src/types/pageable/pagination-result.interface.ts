import type { IPageable } from "./pageable.interface";
import type { ISort } from "./sort.interface";

// 페이징 결과
export interface IPaginationResult<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: ISort;
  numberOfElements: number;
  pageable: IPageable;
  empty: boolean;
}