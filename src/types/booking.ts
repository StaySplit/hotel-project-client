export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'EXPIRED';

export interface BookingInfo {
  time: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  max_occupancy: number;
  totalPrice: string;
  description: string;
  status: BookingStatus;
}

export interface Booking {
  id: number;
  bookingNumber: string;
  bookingDate: string;
  city: string;
  info: BookingInfo;
  hotelName: string;
  roomId: string;
  userName: string;
  myPrice: string;
  quantity: number;
  nights: number;
  image: string;
}

// =========================================
// 서브 컴포넌트 Props 인터페이스
// =========================================

export interface BookingStatusProps {
  status: BookingStatus;
}

export interface DateDisplayProps {
  date: string;
  time: string;
}

export interface RoomInfoProps {
  roomId: string;
  roomType: string;
}

export interface GuestInfoProps {
  userName: string;
  quantity: number;
  maxOccupancy: number;
}

export interface HotelImageProps {
  image: string;
  hotelName: string;
}

// =========================================
// 메인 컴포넌트 Props 인터페이스
// =========================================

export interface BookingCardProps {
  booking: Booking;
  onDelete?: (bookingId: number) => void;
}

// =========================================
// Common Card 컴포넌트 Props 인터페이스
// =========================================

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  shadow?: string;
  border?: string;
  rounded?: string;
  background?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
