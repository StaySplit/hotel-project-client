import { useCallback, useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import TabNavigation from '@/component/common/Tab/TabNavigation';
import BookingCard from '@/component/mypage/reservation/BookingCard';
import { getReservationInfo } from '@/service/api/reservation';
import { useReservationStore } from '@/stores/useReservationStore';

const ReservationPage = () => {
  const { reservations, setReservations } = useReservationStore();
  const [activeTab, setActiveTab] = useState('전체');

  const tabs = ['전체', '결제 대기', '결제 완료', '리뷰 작성'];
  const today = new Date();

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const filteredBookings = reservations.filter((booking) => {
    const status = booking.reservationStatus;
    const checkOutDate = new Date(booking.checkOutDate.replace(/년|월/g, '-').replace(/일/g, ''));

    if (activeTab === '전체') return true;
    if (activeTab === '결제 대기') return status === 'PENDING';
    if (activeTab === '결제 완료') return status === 'CONFIRMED';
    if (activeTab === '리뷰 작성') {
      return status === 'CONFIRMED' && checkOutDate < today;
    }
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReservationInfo();
      setReservations(response);
    };
    fetchData();
  }, []);

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
          <BookingCard booking={booking} key={booking.reservationId} />
        ))}
      </div>
    </>
  );
};

export default ReservationPage;
