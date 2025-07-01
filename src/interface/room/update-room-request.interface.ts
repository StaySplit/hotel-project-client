export interface IUpdateRoomRequest {
  roomId: number;
  photoUrl: string;
  description: string;
  roomType: string;
  price: number;
  maxOccupancy: number;
}