import CardSkeleton from '@/component/common/card/ui/CardSkeleton';
import HotelCardList from '@/component/hotels/HotelCardList';
import type { SearchTerm } from '@/layout/SearchLayout';
import { Suspense } from 'react';

import { useRouteLoaderData } from 'react-router-dom';

const SearchPage = () => {
  const searchTerm = useRouteLoaderData<SearchTerm>('search')!;

  return (
    <div className="flex h-full flex-col justify-between">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5">
            <CardSkeleton />
          </div>
        }
      >
        <HotelCardList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
