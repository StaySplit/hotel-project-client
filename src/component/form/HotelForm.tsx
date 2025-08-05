import { FormProvider, useForm } from 'react-hook-form';
import { PrimaryButton } from '../common/button/PrimaryButton';
import { hotelSchema, type HotelRegisterType } from '@/schema/HotelSchema';
import HotelAddressStep from './RegisterHotel/HotelAddressStep';
import { zodResolver } from '@hookform/resolvers/zod';
import HotelInfoStep from './RegisterHotel/HotelInfoStep';
import HotelDescStep from './RegisterHotel/HotelDescStep';
import { SecondaryButton } from '../common/button/SecondaryButton';
import { useState } from 'react';
import getCoordsByAddress from '@/service/api/geocorder/getCoordsByAddress';

import { registerHotel } from '@/service/api/hotel';
import { registerPhoto } from '@/service/api/photo';
import buildSearchQuery from '@/utils/buildSearchQuery';

const formStepSchema = [
  hotelSchema.pick({ address: true }),
  hotelSchema.pick({ image: true, name: true, starLevel: true }),
  hotelSchema.pick({ description: true }),
];

interface HotelFormProps {
  image?: File;
  name?: string;
  starLevel?: string;
  description?: string;
  address?: string;
}

const HotelForm = ({ image, name, starLevel, description, address }: HotelFormProps) => {
  const [step, setStep] = useState(0);

  const lastStep = step === 2;

  const method = useForm<HotelRegisterType>({
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

  const { getValues, watch, handleSubmit, setError, formState } = method;
  watch();

  const currentSchema = formStepSchema[step];
  const isStepValid = currentSchema.safeParse(getValues()).success;

  const onSubmit = async (data: HotelRegisterType) => {
    try {
      const { lat, lon } = await getCoordsByAddress(data.address);

      const response = await registerHotel({ ...data, lat, lon });
      console.log(response);
      const hotelId = response.hotelId;

      if (hotelId && data.image) {
        const response_image = await registerPhoto(
          buildSearchQuery({
            entityType: 'HOTEL',
            entityId: '1',
            displayType: 'MAIN',
          }),
          data.image,
        );
        console.log('image :', response_image);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === '잘못된 주소입니다.') {
          setStep(0);
          setError('address', { message: error.message });
        }
      }
    }
  };

  const HotelFormStep = (step: number) => {
    switch (step) {
      case 0:
        return <HotelAddressStep />;
      case 1:
        return <HotelInfoStep />;
      case 2:
        return <HotelDescStep />;

      default:
        return null;
    }
  };

  return (
    <FormProvider {...method}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:bg-gray-primary/20 flex h-full w-full flex-col justify-between rounded-2xl md:max-h-[800px] md:max-w-[700px] md:justify-between md:p-6"
      >
        <div className="w-full space-y-4 md:mb-4">{HotelFormStep(step)}</div>

        <div className="flex gap-2">
          {step > 0 && (
            <SecondaryButton
              full
              bold
              size="lg"
              type="button"
              onClick={() => setStep((prev) => --prev)}
            >
              뒤로
            </SecondaryButton>
          )}
          {!lastStep && (
            <PrimaryButton
              full
              size="lg"
              bold
              type="button"
              onClick={() => {
                if (lastStep) return;
                setStep((prev) => ++prev);
              }}
              disabled={!isStepValid}
            >
              다음으로
            </PrimaryButton>
          )}
          {lastStep && (
            <PrimaryButton full size="lg" bold type="submit" disabled={!isStepValid}>
              제출하기
            </PrimaryButton>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default HotelForm;
