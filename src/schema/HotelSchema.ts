import { z } from 'zod';

export const hotelSchema = z.object({
  name: z
    .string({ message: '호텔명을 입력해주세요' })
    .min(1, { message: '호텔명을 입력해주세요.' }),
  starLevel: z.string(),
  address: z.string({ message: '주소를 입력해주세요' }).min(1, { message: '주소를 입력해주세요' }),
  description: z.string().min(1, '호텔 설명을 입력해주세요.'),
  image: z.instanceof(File).refine((file) => file.size > 0, '호텔 이미지를 등록해주세요.'),
});

export type HotelRegisterType = z.infer<typeof hotelSchema>;
