export interface IRoom {
  room_id: number;
  type: string;
  baseOccupancy: number;
  maxOccupancy: number;
  description: string;
}