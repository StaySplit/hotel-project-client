export interface HotelDetail {
  hotelId: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  starLevel: number;
  rating: number;
  reviewCount: number;
  mainPhotoUrl: string;
}

export interface Hotel {
  hotelId: number;
  name: string;
  address: string;
  starLevel: number;
  rating: number;
  reviewCount: number;
}

export interface HotelItem {
  address: string;
  hotelId: number;
  mainImageUrl: string;
  name: string;
  rating: number;
  reviewCount: number;
  starLevel: number;
}

export interface RegisterHotelResponse {
  hotelId: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  starLevel: number;
}
