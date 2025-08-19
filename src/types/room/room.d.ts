export interface Room {
  hotelId: number;
  hotelName: string;
  roomId: number;
  roomType: string;
  description: string;
  maxOccupancy: number;
  price: number;
  totalQuantity: number;
  mainImageUrl: string;
  additionalPhotoUrls: string[];
}
