import { useState } from 'react';
import { User, Hotel, Download } from 'lucide-react';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';

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
        status: 'CONFIRMED',
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
        status: 'PENDING',
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

const PaymentPage = () => {
  const { bookings } = useBookingStore();
  const [activeTab, setActiveTab] = useState('전체');

  const tabs = ['전체', '결제 대기', '결제 완료', '리뷰 작성'];
  const today = new Date();
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
          <h1 className="text-3xl font-bold text-gray-800">결제 내역</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">예약을 찾을 수 없으신가요?</span>
          <Download className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-l cursor-pointer border-b-2 px-2 py-4 font-bold transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 예약 카드 목록 */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Hotel className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">예약번호: {booking.bookingNumber}</span>
                <span className="text-gray-600">예약날짜: {booking.bookingDate}</span>
              </div>
              <button className="font-medium text-blue-600 hover:text-blue-700">
                {booking.info.status === 'CONFIRMED' ? '예약 완료' : '결제 대기'}
              </button>
            </div>

            <div className="border-t border-gray-200 pt-2 text-right">
              <div className="text-lg font-bold text-gray-800">결제 금액: {booking.myPrice}</div>
              <div className="text-xs text-gray-700">총 금액: {booking.info.totalPrice}</div>
            </div>

            <div className="flex items-center space-x-6">
              {/* 호텔 이미지 */}
              <div className="min-h-[120px] w-28 flex-shrink-0 self-stretch rounded-lg bg-gradient-to-r from-purple-400 to-pink-400">
                <img
                  src={booking.image}
                  alt="hotel_img"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              {/* 예약 정보 */}
              <div className="flex-1">
                <div className="mb-4 flex items-center space-x-4">
                  <h3 className="text-l font-semibold text-gray-800">
                    {booking.city} → {booking.hotelName} ({booking.info.roomType})
                  </h3>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">
                      {booking.info.checkInDate}
                    </div>
                    <div className="text-sm text-gray-500">{booking.info.time}</div>
                  </div>

                  <div className="flex flex-1 items-center justify-center">
                    <div className="relative h-px w-20 bg-gray-300">
                      <Hotel className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-gray-400" />
                      <div className="pt-2 text-center text-sm text-gray-500">
                        {booking.nights}박 일정
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">
                      {booking.info.checkOutDate}
                    </div>
                    <div className="text-sm text-gray-500">{booking.info.time}</div>
                  </div>

                  <div className="ml-8">
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="rounded bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                        Room
                      </span>
                      <span className="text-sm font-medium">{booking.roomId}</span>
                    </div>
                    <div className="text-xs text-gray-500">{booking.info.roomType}</div>
                  </div>

                  <div className="ml-8 text-right">
                    <div className="font-medium text-gray-800">{booking.userName}</div>
                    <div className="text-xs text-gray-500">
                      <User className="inline-flex h-4 w-4 text-gray-400" />
                      투숙객 {booking.quantity}명 / 정원 {booking.info.max_occupancy}명
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 서비스 정보 */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="text-sm text-gray-600">
                객실정보 : 부가 서비스 (유료) / 포함 서비스: {booking.info.description}
              </div>
            </div>
            {/*FIXME: 삭제 기능이 필요한가? */}
            <div className="mt-8 text-right">
              <PrimaryButton size="md" onClick={() => {}}>
                삭제
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaymentPage;
