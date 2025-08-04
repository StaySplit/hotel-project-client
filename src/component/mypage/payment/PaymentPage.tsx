import { useEffect } from 'react';
import { getReservationInfo } from '@/service/api/reservation';
import { useReservationStore } from '@/stores/useReservationStore';
import PaymentCard from '@/component/mypage/payment/PaymentCard';
import PaymentAcctCard from '@/component/mypage/payment/PaymentAcctCard';
import { usePaymentStore } from '@/stores/usePaymentStore';

const PaymentPage = () => {
  const { setReservations } = useReservationStore();
  const { paymentModal, togglePayment } = usePaymentStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReservationInfo();
      setReservations(response);
    };
    fetchData();
  }, []);

  //결제 내역 수행
  useEffect(() => {
    console.log('@@@', paymentModal);
  }, [paymentModal]);

  return (
    <div className="inset-0 z-50" onClick={togglePayment}>
      <PaymentCard />
      <div className="my-4"></div>
      <PaymentAcctCard />
    </div>
  );
};

export default PaymentPage;
