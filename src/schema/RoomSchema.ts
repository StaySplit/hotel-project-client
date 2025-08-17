import { z } from 'zod';

const fileSchema = z.custom<File>((v) => v instanceof File && v.size > 0, {
  message: '파일을 선택해주세요.',
});
const filesSchema = z.array(fileSchema).min(1, '이미지는 최소 1장 업로드해주세요.');

export const roomSchema = z.object({
  roomType: z
    .string({ message: '객실 유형을 입력해주세요.' })
    .min(1, { message: '객실 유형을 입력해주세요.' }),
  price: z.coerce.number({ message: '객실의 1박 가격을 입력해주세요.' }),
  occupancy: z.coerce
    .number({ message: '최대 수용인원을 입력해주세요.' })
    .min(1, { message: '최소 수용인원은 최소 1명입니다.' })
    .max(10, { message: '최대 수용인원은 10명 입니다.' }),
  description: z
    .string({ message: '객실 설명을 입력해주세요.' })
    .min(1, '객실 설명을 입력해주세요.'),
  totalQuantity: z.coerce
    .number({ message: '최대 객실 수량을 입력해주세요.' })
    .min(1, { message: '최소 객실 수량은 1개 입니다.' }),
  image: filesSchema,
});

export type RoomRegisterType = z.infer<typeof roomSchema>;
export type RoomRegisterReqType = Omit<RoomRegisterType, 'image'>;
