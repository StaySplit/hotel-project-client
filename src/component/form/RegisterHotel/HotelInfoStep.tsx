import type { DropdownOption } from '@/component/common/input/dropdown/DropdownContext';
import RHFDropdown from '@/component/common/input/dropdown/RHFDropdown';
import RHFImageInput from '@/component/common/input/RHFImageInput';
import RHFInput from '@/component/common/input/RHFInput';
import type { HotelRegisterType } from '@/schema/HotelSchema';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const HOTEL_START_LEVEL = [
  {
    label: '1등급',
    value: '1',
  },
  {
    label: '2등급',
    value: '2',
  },
  {
    label: '3등급',
    value: '3',
  },
  {
    label: '4등급',
    value: '4',
  },
  {
    label: '5등급',
    value: '5',
  },
];

const HotelInfoStep = () => {
  const { control, getValues } = useFormContext<HotelRegisterType>();
  const [defaultStarLevel, setDefaultStarLevel] = useState<DropdownOption | undefined>(undefined);

  useEffect(() => {
    if (getValues('starLevel')) {
      setDefaultStarLevel(
        HOTEL_START_LEVEL.filter((item) => item.value === getValues('starLevel'))[0],
      );
    }
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold text-black">등록하려는 호텔의 사진과 정보를 입력해주세요.</p>
      <RHFImageInput control={control} name="image" />
      <div className="flex w-full gap-2">
        <RHFDropdown
          name="starLevel"
          control={control}
          defaultOption={defaultStarLevel}
          className="min-w-[100px]"
        >
          <RHFDropdown.Trigger placeholder="호텔등급" />

          <RHFDropdown.Menu>
            {HOTEL_START_LEVEL.map((option) => (
              <RHFDropdown.Item key={option.value} option={{ ...option, value: option.value }} />
            ))}
          </RHFDropdown.Menu>
        </RHFDropdown>
        <RHFInput control={control} name="name" placeholder="호텔명" className="w-full" />
      </div>
    </div>
  );
};

export default HotelInfoStep;
