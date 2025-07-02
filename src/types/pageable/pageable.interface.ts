import type { ISort } from "./sort.interface";

// 페이지 정보
export interface IPageable {
  offset: number;
  sort: ISort;
  pageSize: number;
  paged: boolean;
  pageNumber: number;
  unpaged: boolean;
}
