import RHFTextArea from '@/component/common/input/RHFTextArea';
import type { HotelRegisterType } from '@/schema/HotelSchema';
import { useFormContext } from 'react-hook-form';

const HotelDescStep = () => {
  const { control } = useFormContext<HotelRegisterType>();

  return (
    <>
      <p className="mb-4 text-lg font-bold text-black">등록하려는 호텔의 소개를 입력해주세요.</p>

      <RHFTextArea
        control={control}
        name="description"
        placeholder="호텔 소개를 입력해주세요"
        className="min-h-[300px] resize-none"
      />
    </>
  );
};

export default HotelDescStep;
