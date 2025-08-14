export const profileMenuItems = [
  { role: 'ROLE_CUSTOMER', label: '예약 내역', href: '/mypage/bookings' },
  { role: 'ROLE_CUSTOMER', label: '결제 내역', href: '/mypage/payments' },
  { role: 'ROLE_CUSTOMER', label: '개인 설정', href: '/mypage/error' },
  { role: 'ROLE_CUSTOMER', label: '고객센터', href: '/mypage/error' },
  { role: 'ROLE_PROVIDER', label: '호텔 등록', href: '/mypage/error' },
];

export const myInfoMenuItems = [
  { name: '예약 내역', href: '/mypage/bookings' },
  { name: '결제 내역', href: '/mypage/payments' },
  { name: '나의 리뷰', href: '/mypage/reviews' },
  { name: '결제 정보', href: '/mypage/support' },
];

export const accountMenuItems = [
  { name: '내 정보', href: '/mypage/settings', badge: null },
  { name: '좋아요', href: '/mypage/like', badge: null },
  { name: '알림', href: '/mypage/support', badge: null },
];
