import handleApiReqeust from '@/service/api/handleApiReqeust';
import getHotels from '@/service/api/hotel/getHotels';
import type { IHotel } from '@/types/hotel/hotel.interface';
import type { IPaginationResult } from '@/types/pageable/pagination-result.interface';
import { useState } from 'react';

const useGetHotels = ({ label, size, sort }: { label: string; size: number; sort: string }) => {
  const [hotelList, setHotelList] = useState<IHotel[]>([]);
  const [page, setPage] = useState<number>(0);
  const [canUseTrigger, setCanUseTrigger] = useState<boolean>(true);

  const handleGetHotels = async () => {
    return await getHotels({ size, page, sort });
  };

  const handleAddHotelsToList = async (): Promise<boolean> => {
    if (!canUseTrigger) return false;
    setCanUseTrigger(false);

    try {
      const result = await handleApiReqeust<IPaginationResult<IHotel>>(handleGetHotels);
      if (!result?.content?.length) return false;

      const hotels = result?.content ?? [];
      setPage((prev) => prev + 1);
      setHotelList((prev) => [...prev, ...hotels]);

      // 다음 로딩 허용 (예: 1000ms 뒤에 트리거 활성화)
      setTimeout(() => setCanUseTrigger(true), 1000);

      return true;
    } catch (e) {
      console.error('호텔 불러오기 실패', e);
      return false;
    }
  };

  const hasLabel = (val: string) => label === val;

  return {
    hotelList,
    handleAddHotelsToList,
    hasLabel,
    canUseTrigger,
  };
};

export default useGetHotels;