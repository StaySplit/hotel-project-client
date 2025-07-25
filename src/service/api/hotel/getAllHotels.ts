import client from '@/service/instance/client';
import handleApiReqeust from '../handleApiReqeust';

import type { IPaginationResult } from '@/types/pageable/pagination-result.interface';
import type HotelItem from '@/types/hotel/HotelItem';

const getAllHotels = async (searchQuery: string) => {
  const response = await handleApiReqeust<IPaginationResult<HotelItem>>(() =>
    client.get(`/api/hotels/list?${searchQuery}`),
  );
  return response;
};

export default getAllHotels;
