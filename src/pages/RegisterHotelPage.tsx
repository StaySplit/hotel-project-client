import type { HotelRegisterType } from '@/schema/HotelSchema';

import getCoordsByAddress from '@/service/api/geocorder/getCoordsByAddress';
import { registerHotel } from '@/service/api/hotel';
import { registerPhoto } from '@/service/api/photo';

import buildSearchQuery from '@/utils/buildSearchQuery';

import HotelRegisterForm from '@/component/hotels/register/HotelRegisterForm';

const RegisterHotelPage = () => {
  const onSubmit = async (data: HotelRegisterType) => {
    const { lat: latitude, lon: longitude } = await getCoordsByAddress(data.address);

    const response = await registerHotel({
      name: data.name,
      address: data.address,
      starLevel: data.starLevel,
      description: data.description,
      latitude,
      longitude,
    });
    console.log(response);
    const hotelId = response.hotelId;
    if (hotelId && data.image) {
      const response_image = await registerPhoto(
        buildSearchQuery({
          entityType: 'HOTEL',
          entityId: '1',
          displayType: 'MAIN',
        }),
        data.image as File,
      );

      console.log('image :', response_image);
    }
  };

  return (
    <section className="bg-gray-primary/30 h-vh mx-auto rounded-2xl p-10">
      <div className="mx-auto flex h-full w-full max-w-[700px] flex-col gap-4">
        <header>
          <span className="bg-primary-200 text-primary-600 mb-1 inline-block rounded-full px-3 py-1 text-xs">
            신규 호텔 등록
          </span>
          <h3 className="mb-1 text-3xl font-bold">호텔 등록</h3>
          <p className="">
            호텔의 대표 이미지와 기본 정보를 입력하세요. 등록 후에도 언제든지 수정할 수 있습니다.
          </p>
        </header>
        <HotelRegisterForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default RegisterHotelPage;
