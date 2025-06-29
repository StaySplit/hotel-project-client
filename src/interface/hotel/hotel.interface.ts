import type { IReview } from "./hotel-review.interface";
import type { IRoom } from "./hotel-room.interface";

export interface IHotel {
  hotel_id: number;
  type: string;
  name: string;
  address: string;
  rating: string;
  review_count: number;
  cheapest_price: number;
  image_url: string;
  liked: boolean;
  longtitude: number;
  latitude: number;
  description: string;
  rooms: IRoom[];
  reviews: IReview[];
}