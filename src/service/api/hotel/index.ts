import client from '@/service/instance/client';

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

export const getHotelDetail = async (hotelId: number) => {
  return (await client.get(`/hotels/${hotelId}`)).data;
};
