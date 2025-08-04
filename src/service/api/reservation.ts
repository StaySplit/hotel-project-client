import type { ApiResponse, ReservationResponse } from '@/types/ReservationType';
import client from '../instance/client';

export const getReservationInfo = async () => {
  const response: ApiResponse<ReservationResponse> = await (
    await client.get('/api/reservations')
  ).data;
  return response;
};
