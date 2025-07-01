import type { IGetHotelsResponse } from "@/interface/hotel/get-hotels-response.interface";
import {client} from "./index"

/**
 * 호텔 목록을 가져옵니다.
 * @param page 
 * @returns 
 */
export const getHotels = async (page: number, size: number = 20, sort:string): Promise<IGetHotelsResponse> => {
  const response = await client.get<IGetHotelsResponse>('/hotels/list', {
    params: {
      page,
      size,
      sort: sort? sort : 'hotelId,asc', // hotelId 기준 오름차순 정렬
    },
    withCredentials: true, // 필요한 경우
  });

  return response.data;
};