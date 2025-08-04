import { useCallback, useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import TabNavigation from '@/component/common/Tab/TabNavigation';
import BookingCard from '@/component/mypage/reservation/BookingCard';
import { getReservationInfo } from '@/service/api/reservation';
import { useReservationStore } from '@/stores/useReservationStore';
import PaymentCard from '@/component/mypage/payment/PaymentCard';
import PaymentAcctCard from '@/component/mypage/payment/PaymentAcctCard';

const PaymentPage = () => {
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
      <PaymentCard />
      <div className="my-4"></div>
      <PaymentAcctCard />
    </>
  );
};

export default PaymentPage;
