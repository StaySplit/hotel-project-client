import type { SearchType } from '@/schema/SearchSchema';

const hotelKeys = {
  searchHotels: (searchTerm: Partial<SearchType>) => ['hotels', 'search', searchTerm],
  hotel: (hotelId: string) => ['hotel', hotelId],
  hotelRooms: (hotelId: string) => ['hotel', hotelId, 'rooms'],
};

export default hotelKeys;
