import { useCallback, useState } from 'react';
import { User, Hotel, Download } from 'lucide-react';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import TabNavigation from '@/component/common/Tab/TabNavigation';
import BookingCard from '@/component/mypage/booking/BookingCard';
import type { BookingStatus } from '@/types/booking';

const useBookingStore = () => {
  const [bookings] = useState([
    {
      id: 1,
      bookingNumber: '2387912910',
      bookingDate: '2025년 8월 1일',
      city: '서울',
      info: {
        time: '13:00',
        checkInDate: '2023년 8월 30일',
        checkOutDate: '2023년 9월 2일',
        roomType: '클럽 원 베드룸 스위트',
        max_occupancy: 2,
        totalPrice: '2,590,560원',
        description: '조식 포함',
        status: 'CONFIRMED' as BookingStatus,
      },
      hotelName: '인터컨티넨탈 파르나스',
      roomId: '2412',
      userName: 'PARKJAEYOON',
      myPrice: '2,590,560원',
      quantity: 1,
      nights: 3,
      image: '/api/placeholder/120/80',
    },
    {
      id: 2,
      bookingNumber: '2387913001',
      bookingDate: '2025년 8월 2일',
      city: '서울',
      info: {
        time: '13:00',
        checkInDate: '2023년 9월 20일',
        checkOutDate: '2023년 9월 21일',
        roomType: '주니어 스위트 패밀리 트리플',
        max_occupancy: 4,
        totalPrice: '675,560원',
        description: '온수풀, 자쿠지',
        status: 'PENDING' as BookingStatus,
      },
      hotelName: '롯데호텔 월드',
      roomId: '1402',
      userName: 'PARKJAEYOON',
      myPrice: '225,186원',
      quantity: 3,
      nights: 1,
      image: '/api/placeholder/120/80',
    },
  ]);

  return { bookings };
};

const BookingPage = () => {
  const { bookings } = useBookingStore();
  const [activeTab, setActiveTab] = useState('전체');

  const tabs = ['전체', '결제 대기', '결제 완료', '리뷰 작성'];
  const today = new Date();

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const status = booking.info.status;
    const checkOutDate = new Date(
      booking.info.checkOutDate.replace(/년|월/g, '-').replace(/일/g, ''),
    );

    if (activeTab === '전체') return true;
    if (activeTab === '결제 대기') return status === 'PENDING';
    if (activeTab === '결제 완료') return status === 'CONFIRMED';
    if (activeTab === '리뷰 작성') {
      return status === 'CONFIRMED' && checkOutDate < today;
    }
    return true;
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-800">예약 내역</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">예약을 찾을 수 없으신가요?</span>
          <Download className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 예약 카드 목록 */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <BookingCard booking={booking} key={booking.id} />
        ))}
      </div>
    </>
  );
};

export default BookingPage;
