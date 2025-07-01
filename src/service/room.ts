import type { IRoomDetail } from '@/interface/room/room-detail.interface';
import {client} from './index'
import type { IResponse } from '@/interface';
import type { IUpdateRoomRequest } from '@/interface/room/update-room-request.interface';
import type { IDeleteRoomResponse } from '@/interface/room/delete-room-response.interface';
import type { ICreateRoomRequest } from '@/interface/room/create-room-request.interface';
import type { ICreateRoomResponse } from '@/interface/room/create-room-response.interface';

/**
 * 방 아이디를 통해 특정 방을 조회합니다.
 * @param roomId 
 * @returns 
 */
export const getRoom = async (roomId: number): Promise<IResponse<IRoomDetail>> => {
  const response = await client.get<IResponse<IRoomDetail>>(`/api/rooms/${roomId}`);
  return response.data;
};

/**
 * 방 아이디를 통해 특정 방을 업데이트 합니다.
 * @param roomId 
 * @param data 
 * @returns 
 */
export const updateRoom = async (
  roomId: number,
  data: Omit<IUpdateRoomRequest, 'roomId'>
): Promise<IResponse<IRoomDetail>> => {
  const response = await client.put<IResponse<IRoomDetail>>(
    `/api/rooms/${roomId}`,
    { roomId, ...data }
  );
  return response.data;
};

/**
 * 방 아이디를 통해 특정 방을 삭제합니다.
 * @param roomId 
 * @returns 
 */
export const deleteRoom = async (roomId: number): Promise<IResponse<IDeleteRoomResponse>> => {
  const response = await client.delete<IResponse<IDeleteRoomResponse>>(`/api/rooms/${roomId}`);
  return response.data;
};




/**
 * 방을 생성합니다.
 * @param data 
 * @returns 
 */
export const createRoom = async (
  data: ICreateRoomRequest
): Promise<IResponse<ICreateRoomResponse>> => {
  const response = await client.post<IResponse<ICreateRoomResponse>>('/api/rooms', data);
  return response.data;
};

// 너무 복잡해서 chatGPT 도움을 받음
// 리팩토링 필요
export interface IRoomItem {
  hotelId: number;
  hotelName: string;
  roomType: string;
  maxOccupancy: number;
  price: number;
}

export interface IPageableSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IPageable {
  offset: number;
  sort: IPageableSort;
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}

export interface IRoomPageResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: IRoomItem[];
  number: number;
  sort: IPageableSort;
  numberOfElements: number;
  pageable: IPageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IRoomApiResponse {
  resultCode: string;
  result: IRoomPageResponse;
}

interface GetRoomsByHotelParams {
  hotelId: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export const getRoomsByHotel = async ({
  hotelId,
  page = 0,
  size = 10,
  sort = ["id,asc"]
}: GetRoomsByHotelParams): Promise<IResponse<IRoomPageResponse>> => {
  const response = await client.get<IResponse<IRoomPageResponse>>(`/api/rooms/hotels/${hotelId}`, {
    params: {
      page,
      size,
      sort
    }
  });

  return response.data;
};