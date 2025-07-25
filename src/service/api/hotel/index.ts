import client from '@/service/instance/client';
import type Response from '@/types/Responsne';
import type { IPaginationResult } from '@/types/pageable/pagination-result.interface';
import type { IHotel } from '@/types/hotel/hotel.interface';
import type { IHotelDetail } from '@/types/hotel/hotel-detail.interface';

export const getHotels = async ({ size, page, sort }: { size: number; page: number; sort: string })=> {
    const response = await client.get<Response<IPaginationResult<IHotel>>>(`/hotels/list?page=${page}&size=${size}&sort=${sort}`)
    return response.data
};

export const getHotelDetail = async (hotelId: number) => {
    const response = await client.get<Response<IHotelDetail>>(`/hotels/${hotelId}`)
    return response.data
}

