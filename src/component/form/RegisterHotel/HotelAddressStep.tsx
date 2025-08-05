import RHFInput from '@/component/common/input/RHFInput';
import type { HotelRegisterType } from '@/schema/HotelSchema';
import { useFormContext } from 'react-hook-form';

const HotelAddressStep = () => {
  const { control } = useFormContext<HotelRegisterType>();
  return (
    <div>
      <p className="mb-4 text-lg font-bold text-black">등록하려는 호텔의 주소를 입력해주세요</p>
      <RHFInput control={control} name="address" placeholder="주소를 입력해주세요" />
    </div>
  );
};

export default HotelAddressStep;
