import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { hotelSchema, type HotelRegisterType } from '@/schema/HotelSchema';

import RHFImageInput from '@/component/common/input/RHFImageInput';
import RHFInput from '@/component/common/input/RHFInput';
import RHFDropdown from '@/component/common/input/dropdown/RHFDropdown';
import RHFTextArea from '@/component/common/input/RHFTextArea';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import { useNavigate } from 'react-router-dom';

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

interface HotelFormProps {
  image?: File;
  name?: string;
  starLevel?: string;
  description?: string;
  address?: string;
  onSubmit: (data: HotelRegisterType) => void;
}

const HotelForm = ({ image, name, starLevel, description, address, onSubmit }: HotelFormProps) => {
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm<HotelRegisterType>({
    resolver: zodResolver(hotelSchema),
    mode: 'onChange',
    defaultValues: {
      name: name ?? undefined,
      image: image ?? undefined,
      starLevel: starLevel ?? undefined,
      description: description ?? undefined,
      address: address ?? undefined,
    },
  });

  const submitHandler = (data: HotelRegisterType) => {
    try {
      onSubmit(data);
      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };

  watch();

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border-gray-primary mx-auto flex h-full w-full max-w-[700px] flex-col justify-start rounded-2xl border bg-white p-6 shadow-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">기본 정보</h3>
        <span className="bg-primary-200 text-primary-600 inline-block rounded-full px-3 py-1 text-sm font-bold">
          필수
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <RHFImageInput control={control} name="image" label="호텔 이미지" />
        <RHFInput
          control={control}
          name="name"
          label="호텔 이름"
          placeholder="예: 세렌디피티 호텔 서울"
        />
        <div className="flex items-start gap-2">
          <RHFDropdown
            name="starLevel"
            control={control}
            className="min-w-[100px]"
            label="호텔등급"
          >
            <RHFDropdown.Trigger placeholder="호텔등급" />

            <RHFDropdown.Menu>
              {HOTEL_START_LEVEL.map((option) => (
                <RHFDropdown.Item key={option.value} option={{ ...option, value: option.value }} />
              ))}
            </RHFDropdown.Menu>
          </RHFDropdown>

          <RHFInput
            control={control}
            name="address"
            label="주소"
            placeholder="예: 서울특별시 중구 을지로 OO"
          />
        </div>
        <RHFTextArea
          control={control}
          name="description"
          label="호텔 설명"
          placeholder="호텔의 특징,위치,시설,서비스 등을 소개해 주세요"
        />
      </div>
      <PrimaryButton size="lg" className="mt-3">
        등록하기
      </PrimaryButton>
    </form>
  );
};

export default HotelForm;
