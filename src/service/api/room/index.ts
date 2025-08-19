import client from '@/service/instance/client';
import handleApiReqeust from '../handleApiReqeust';

import type { RoomRegisterReqType } from '@/schema/RoomSchema';
import type { Room } from '@/types/room/room';

export const registerRoom = async (roomData: RoomRegisterReqType) => {
  const response = await handleApiReqeust<Room>(() => client.post('/api/rooms', { ...roomData }));

  return response;
};
