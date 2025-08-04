import { useEffect } from 'react';
import { getReservationInfo } from '@/service/api/reservation';
import { useReservationStore } from '@/stores/useReservationStore';
import PaymentCard from '@/component/mypage/payment/PaymentCard';
import PaymentAcctCard from '@/component/mypage/payment/PaymentAcctCard';

const PaymentPage = () => {
  const { setReservations } = useReservationStore();

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
