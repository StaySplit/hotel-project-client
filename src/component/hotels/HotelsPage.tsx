import React, { useState, useEffect, useRef } from 'react';
import HotelCardList from './HotelCardList';
import HotelCard from './HotelCard';
import { HotelScrollTrigger } from './HotelScrollTrigger';
import HotelsBanner from './HotelsBanner';
import HotelsSearchOptionBar from './HotelsSearchOptionBar';
import useGetHotels from '@/hooks/useGetHotels';
import type { IHotel } from '@/types/hotel/hotel.interface';

const HotelsPage = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [option, setOption] = useState<string | null>(null);

  // 각 정렬 옵션별 훅
  const HotelsByNameOrder = useGetHotels({ label: '이름 순', size: 20, sort: 'name,asc' });
  const HotelsByReviewOrder = useGetHotels({ label: '리뷰 순', size: 20, sort: 'reviewCount,asc' });
  const HotelsByRatingOrder = useGetHotels({ label: '평점 순', size: 20, sort: 'rating,asc' });

  const hasMountedRef = useRef(false);

  useEffect(() => {
    console.log(123);

    // 최초 로딩만 여기서 실행
    triggerHotelLoad('이름 순');
    setOption('이름 순');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition({ lat, lng });
      },
      (err) => {
        console.error('위치 정보 가져오기 실패:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    if (option === null) return;
    console.log(456);
    const current = getCurrentHotels();
    if (current.hotelList.length === 0) {
      triggerHotelLoad(option);
    }
  }, [option]);

  const triggerHotelLoad = async (currentOption: string) => {
    if (HotelsByNameOrder.hasLabel(currentOption)) {
      await HotelsByNameOrder.handleAddHotelsToList();
    } else if (HotelsByReviewOrder.hasLabel(currentOption)) {
      await HotelsByReviewOrder.handleAddHotelsToList();
    } else if (HotelsByRatingOrder.hasLabel(currentOption)) {
      await HotelsByRatingOrder.handleAddHotelsToList();
    }
  };

  const getCurrentHotels = (): {
    hotelList: IHotel[];
    handleAddHotelsToList: () => Promise<boolean>;
  } => {
    if (HotelsByNameOrder.hasLabel(option)) return HotelsByNameOrder;
    if (HotelsByReviewOrder.hasLabel(option)) return HotelsByReviewOrder;
    return HotelsByRatingOrder;
  };

  const { hotelList, handleAddHotelsToList } = getCurrentHotels();

  return (
    <section className="w-full px-4">
      <HotelsBanner />
      <HotelsSearchOptionBar option={option} setOption={setOption} />

      <div className="mb-8 border-b border-gray-300 pb-1 font-sans text-4xl">호텔 목록</div>
      <div className="flex justify-center">
        {hotelList.length > 0 ? (
          <HotelCardList>
            {hotelList.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} handleChangeLike={() => {}} />
            ))}
            <HotelScrollTrigger onVisible={handleAddHotelsToList} />
          </HotelCardList>
        ) : (
          <div>호텔이 존재하지 않습니다.</div>
        )}
      </div>
    </section>
  );
};

export default HotelsPage;
