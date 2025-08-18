import client from '@/service/instance/client';
import handleApiReqeust from '../handleApiReqeust';

import type { PaginationResult } from '@/types/pageable';
import type { HotelDetail, HotelItem, RegisterHotelResponse } from '@/types/hotel';
import type { HotelRegisterType } from '@/schema/HotelSchema';
import type { Room } from '@/types/room/room';

export const getHotels = async ({
  size,
  page,
  sort,
}: {
  size: number;
  page: number;
  sort: string;
}) => {
  return (await client.get(`api/hotels/list?page=${page}&size=${size}&sort=${sort}`)).data;
};

export const getHotelDetail = async (hotelId: string) => {
  const response = await handleApiReqeust<HotelDetail>(() => client.get(`/api/hotels/${hotelId}`));

  return response;
};

export const getHotelRooms = async (hotelId: string) => {
  const response = await handleApiReqeust<PaginationResult<Room>>(() =>
    client.get(`/api/hotels/${hotelId}/rooms`),
  );

  return response;
};

export const getSearchHotels = async (searchQuery: string) => {
  const response = await handleApiReqeust<PaginationResult<HotelItem>>(() =>
    client.get(`/api/hotels/search?${searchQuery}`),
  );
  return response;
};

export const getAllHotels = async (searchQuery: string) => {
  const response = await handleApiReqeust<PaginationResult<HotelItem>>(() =>
    client.get(`/api/hotels/list?${searchQuery}`),
  );
  return response;
};

export const registerHotel = async (
  hotelData: HotelRegisterType & { latitude: number; longitude: number },
) => {
  const response = await handleApiReqeust<RegisterHotelResponse>(() =>
    client.post('/api/hotels/', hotelData),
  );

  return response;
};
