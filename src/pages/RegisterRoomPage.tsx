import HotelRoomRegisterForm from '@/component/hotels/register/HotelRoomRegisterForm';
import type { RoomRegisterType } from '@/schema/RoomSchema';
import { registerPhotos } from '@/service/api/photo';
import { registerRoom } from '@/service/api/room';
import buildSearchQuery from '@/utils/buildSearchQuery';

const RegisterRoomPage = () => {
  const onSubmit = async (data: RoomRegisterType) => {
    const response = await registerRoom(data);
    const roomId = response.roomId;
    if (roomId && data.image) {
      const response_image = await registerPhotos(
        buildSearchQuery({
          entityType: 'Room',
          entityId: roomId.toString(),
          displayType: data.image.map((_, i) => (i === 0 ? 'MAIN' : 'ADDITIONAL')),
        }),
        data.image,
      );

      console.log('image :', response_image);
    }
  };

  return (
    <section className="bg-gray-primary/30 h-vh mx-auto rounded-2xl p-10">
      <div className="mx-auto flex h-full w-full max-w-[700px] flex-col gap-4">
        <header>
          <span className="bg-primary-200 text-primary-600 mb-1 inline-block rounded-full px-3 py-1 text-xs">
            신규 등록
          </span>
          <h3 className="mb-1 text-3xl font-bold">객실 등록</h3>
          <p className="">객실 정보를 입력해주세요. 모든 정보는 언제든지 수정 할 수 있습니다.</p>
        </header>
        <HotelRoomRegisterForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default RegisterRoomPage;
