import { z } from 'zod';

const fileSchema = z.custom<File>((v) => v instanceof File && v.size > 0, {
  message: '파일을 선택해주세요.',
});

const filesSchema = z.array(fileSchema).min(1, '이미지는 최소 1장 업로드해주세요.');

export const hotelSchema = z.object({
  name: z
    .string({ message: '호텔명을 입력해주세요' })
    .min(1, { message: '호텔명을 입력해주세요.' }),
  starLevel: z.string(),
  address: z.string({ message: '주소를 입력해주세요' }).min(1, { message: '주소를 입력해주세요' }),
  description: z.string().min(1, '호텔 설명을 입력해주세요.'),
  image: z.union([fileSchema, filesSchema]),
});

export type HotelRegisterType = z.infer<typeof hotelSchema>;
export type HotelRegisterReqType = Omit<HotelRegisterType, 'image'>;
