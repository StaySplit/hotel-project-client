import type { IGetHotelsResult } from "./get-hotels-result.interface";


export interface IGetHotelsResponse {
  resultCode: string;
  result: IGetHotelsResult;
}