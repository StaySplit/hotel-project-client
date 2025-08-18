import type { Room } from '@/types/room/room';
import { Calendar, Users } from 'lucide-react';
import { PrimaryButton } from '../common/button/PrimaryButton';
import { formatNumberWithComma } from '@/utils/format/formatUtil';

const HotelRoomCard = ({
  description,
  mainImageUrl,
  maxOccupancy,
  price,
  roomType,
  totalQuantity,
}: Room) => {
  return (
    <li className="w-full">
      <div className="border-gray-primary flex gap-4 rounded-2xl border bg-white p-6">
        <img
          src={mainImageUrl}
          alt={roomType}
          className="border-gray-primary bg-gray-primary h-[160px] w-[330px] rounded-2xl border"
        />

        <div className="flex w-full flex-col justify-between">
          <div className="flex w-full items-start justify-between">
            <h6 className="text-xl font-bold text-gray-700">{roomType}</h6>
            <div>
              <p className="text-primary-500 text-lg font-bold">{`₩${formatNumberWithComma(price)}`}</p>
              <div className="text-right text-sm text-gray-500">1박 기준</div>
            </div>
          </div>

          <p className="text-md col-span-2 overflow-clip tracking-tight">{description}</p>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-gray-500" />
              <span className="text-gray-500">{`최대 ${maxOccupancy}명`}</span>
              <span className="bg-primary-500 rounded-lg px-2.5 py-1 text-xs font-bold text-white">{`${totalQuantity}개 객실 남음`}</span>
            </div>
            <PrimaryButton>
              <div className="flex items-center gap-1.5">
                <Calendar className="size-5 text-white" aria-hidden />
                <span className="font-bold text-white">예약하기</span>
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HotelRoomCard;
