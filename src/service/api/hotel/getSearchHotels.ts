import client from '@/service/instance/client';
import handleApiReqeust from '../handleApiReqeust';

import type { IPaginationResult } from '@/types/pageable/pagination-result.interface';
import type HotelItem from '@/types/hotel/HotelItem';

const getSearchHotels = async (searchQuery: string) => {
  const response = await handleApiReqeust<IPaginationResult<HotelItem>>(() =>
    client.get(`/api/hotels/search?${searchQuery}`),
  );
  return response;
};

export default getSearchHotels;
