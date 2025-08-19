import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import RHFImageInput from '@/component/common/input/RHFImageInput';
import RHFInput from '@/component/common/input/RHFInput';
import RHFTextArea from '@/component/common/input/RHFTextArea';
import { roomSchema, type RoomRegisterType } from '@/schema/RoomSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, Hotel, Image } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface HotelRoomRegisterFormProps {
  description?: string;
  image?: File[];
  roomType?: string;
  price?: number;
  occupancy?: number;
  totalQuantity?: number;
  onSubmit: (data: RoomRegisterType) => void;
}

const HotelRoomRegisterForm = ({
  description,
  image,
  roomType,
  price,
  occupancy,
  totalQuantity,
  onSubmit,
}: HotelRoomRegisterFormProps) => {
  const { control, handleSubmit } = useForm<RoomRegisterType>({
    resolver: zodResolver(roomSchema),
    mode: 'onChange',
    defaultValues: {
      description: description ?? undefined,
      image: image ?? undefined,
      price: price ?? undefined,
      occupancy: occupancy ?? undefined,
      totalQuantity: totalQuantity ?? undefined,
      roomType: roomType ?? undefined,
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div aria-describedby="객실 이미지" className="rounded-2xl bg-white p-4 shadow-md">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <Image stroke="#4a6ca0" size={20} />
            <p className="font-bold">객실 이미지</p>
          </div>
          <span className="text-gray-primary-200 text-sm">
            업로드 가능한 용량은 최대 10mb 입니다.
          </span>
        </div>
        <RHFImageInput name="image" control={control} multiple />
      </div>

      <div
        aria-describedby="객실 기본 정보"
        className="space-y-4 rounded-2xl bg-white p-4 shadow-md"
      >
        <div className="mb-2 flex items-center gap-2">
          <Hotel stroke="#4a6ca0" size={20} />
          <p className="font-bold">기본 정보</p>
        </div>
        <RHFInput
          name="roomType"
          control={control}
          label="객실 유형"
          placeholder="예: 디럭스 더블룸"
        />
        <RHFTextArea
          name="description"
          control={control}
          label="객실 설명"
          placeholder="객실에 대한 상세한 설명을 입력해주세요"
        />
      </div>

      <div className="space-y-4 rounded-2xl bg-white p-4 shadow-md">
        <div className="mb-2 flex items-center gap-2">
          <DollarSign stroke="#4a6ca0" size={20} />
          <p className="font-bold">요금 및 수용 정보</p>
        </div>

        <div className="flex items-start gap-2">
          <RHFInput
            name="price"
            control={control}
            label="1박 요금 (원)"
            placeholder="예: 129000"
            type="number"
            min={0}
          />
          <RHFInput
            name="occupancy"
            control={control}
            label="최대 수용 인원"
            placeholder="예: 2"
            type="number"
            min={1}
            max={10}
          />
        </div>

        <RHFInput
          name="totalQuantity"
          control={control}
          label="총 객실 수량"
          placeholder="예: 5"
          type="number"
          min={1}
        />
      </div>

      <div className="self-end">
        <PrimaryButton size="md">등록하기</PrimaryButton>
      </div>
    </form>
  );
};

export default HotelRoomRegisterForm;
