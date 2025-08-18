import { useEffect } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import hotelKeys from '@/hooks/queries/hotels/hotelKeys';
import useObserver from '@/hooks/useObserver';

import { getSearchHotels } from '@/service/api/hotel';

import buildSearchQuery from '@/utils/buildSearchQuery';

import HotelCard from '../card/HotelCard';
import type { SearchTerm } from '@/layout/SearchLayout';

interface HotelCardListProps {
  searchTerm: Partial<SearchTerm>;
}

const HotelCardList = ({ searchTerm }: HotelCardListProps) => {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: hotelKeys.searchHotels(searchTerm),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      return await getSearchHotels(
        buildSearchQuery({
          ...searchTerm,
          page: pageParam.toString(),
          size: '10',
        }),
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const { ref, isView } = useObserver();

  useEffect(() => {
    if (isView && hasNextPage) {
      fetchNextPage();
    }
  }, [isView, fetchNextPage, hasNextPage]);

  const searchResults = data?.pages.flatMap((data) => data.content) || [];

  return (
    <>
      {searchResults.length === 0 && (
        <p className="flex h-full items-center justify-center">검색 결과가 존재하지 않습니다</p>
      )}
      {searchResults.length > 0 && (
        <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-5">
          {searchResults.map((hotel) => (
            <li key={hotel.hotelId} className="w-full">
              <HotelCard {...hotel} liked={true} handleChangeLike={() => {}} />
            </li>
          ))}
        </ul>
      )}

      <div className="min-h-[1px] w-full" ref={ref} />
    </>
  );
};

export default HotelCardList;
