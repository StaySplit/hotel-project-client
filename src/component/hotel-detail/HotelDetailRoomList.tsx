import hotelKeys from '@/hooks/queries/hotels/hotelKeys';
import { getHotelRooms } from '@/service/api/hotel';
import { useQuery } from '@tanstack/react-query';
import HotelRoomCard from './HotelRoomCard';

interface HotelDetailRoomListProps {
  hotelId: string;
}

const HotelDetailRoomList = ({ hotelId }: HotelDetailRoomListProps) => {
  const { data } = useQuery({
    queryKey: hotelKeys.hotelRooms(hotelId),
    queryFn: async () => await getHotelRooms(hotelId as string),
    select: (data) => data.content,
  });

  if (!data) return null;

  return (
    <ul className="flex flex-col gap-4">
      {data.length === 0 && <p>등록된 객실이 존재하지 않습니다.</p>}
      {data.length > 0 && data.map((room) => <HotelRoomCard key={room.roomId} {...room} />)}
    </ul>
  );
};

export default HotelDetailRoomList;
