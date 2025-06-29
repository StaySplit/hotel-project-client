import React, { useState } from 'react';
import HotelCardList from './HotelCardList';
import HotelCard from './HotelCard';
import HotelSidebar from './HotelSidebar';
import SidebarToggleButton from './SideBarToggleButton';

const hotels = [
  {
    hotel_id: 1,
    type: '호텔',
    name: '웨스턴조선 부산',
    address: '부산광역시 해운대구 동백로 12',
    rating: '5',
    review_count: 300,
    cheapest_price: 10000,
    image_url: 'https://example.com/image1.jpg',
    liked: false,
  },
  {
    hotel_id: 2,
    type: '호텔',
    name: '파라다이스호텔 부산',
    address: '부산광역시 해운대구 해운로 23',
    rating: '5',
    review_count: 280,
    cheapest_price: 11000,
    image_url: 'https://example.com/image2.jpg',
    liked: true,
  },
  {
    hotel_id: 3,
    type: '게스트하우스',
    name: '전주한옥 게스트하우스',
    address: '전라북도 전주시 완산구 전주대로 45',
    rating: '4',
    review_count: 140,
    cheapest_price: 7000,
    image_url: 'https://example.com/image3.jpg',
    liked: false,
  },
  {
    hotel_id: 4,
    type: '모텔',
    name: '제주 바닷가 모텔',
    address: '제주특별자치도 제주시 해안로 77',
    rating: '3',
    review_count: 120,
    cheapest_price: 6000,
    image_url: 'https://example.com/image4.jpg',
    liked: false,
  },
  {
    hotel_id: 5,
    type: '호텔',
    name: '서울 시티 호텔',
    address: '서울특별시 중구 명동길 15',
    rating: '4',
    review_count: 250,
    cheapest_price: 9500,
    image_url: 'https://example.com/image5.jpg',
    liked: true,
  },
  {
    hotel_id: 6,
    type: '리조트',
    name: '강릉 오션 리조트',
    address: '강원도 강릉시 해변로 102',
    rating: '5',
    review_count: 400,
    cheapest_price: 15000,
    image_url: 'https://example.com/image6.jpg',
    liked: false,
  },
  {
    hotel_id: 7,
    type: '게스트하우스',
    name: '부산 스마일 게스트하우스',
    address: '부산광역시 수영구 광안로 88',
    rating: '3',
    review_count: 80,
    cheapest_price: 5000,
    image_url: 'https://example.com/image7.jpg',
    liked: true,
  },
  {
    hotel_id: 8,
    type: '모텔',
    name: '인천 에코 모텔',
    address: '인천광역시 남동구 구월로 34',
    rating: '4',
    review_count: 110,
    cheapest_price: 6500,
    image_url: 'https://example.com/image8.jpg',
    liked: false,
  },
  {
    hotel_id: 9,
    type: '호텔',
    name: '대구 프리미엄 호텔',
    address: '대구광역시 수성구 범어로 99',
    rating: '4',
    review_count: 200,
    cheapest_price: 10500,
    image_url: 'https://example.com/image9.jpg',
    liked: true,
  },
  {
    hotel_id: 10,
    type: '리조트',
    name: '속초 마운틴 리조트',
    address: '강원도 속초시 설악산로 12',
    rating: '5',
    review_count: 330,
    cheapest_price: 16000,
    image_url: 'https://example.com/image10.jpg',
    liked: false,
  },
];

const HotelsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative">
      <SidebarToggleButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <HotelSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex justify-center transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        <HotelCardList>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} />
          ))}
        </HotelCardList>
      </div>
    </div>
  );
};

export default HotelsPage;