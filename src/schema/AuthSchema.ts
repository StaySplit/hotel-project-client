import { z } from 'zod';

const birthdateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const RequiredValues = [
  'email',
  'password',
  'name',
  'passwordConfirm',
  'nickname',
  'birthdate',
] as const;

export const LoginSchema = z.object({
  email: z.string().email({ message: '잘못된 이메일 형식입니다.' }),
  password: z.string(),
});

export const RegisterSchema = z
  .object({
    email: z
      .string({ message: '이메일은 필수 입력입니다.' })
      .email({ message: '잘못된 이메일 형식입니다.' }),
    name: z.string({ message: '이름은 필수 입력입니다.' }),
    password: z
      .string({ message: '비밀번호는 필수 입력입니다.' })
      .min(10, { message: '비밀번호는 최소 10자 이상이어야 합니다.' }),
    passwordConfirm: z
      .string({ message: '비밀번호 확인은 필수 입력입니다.' })
      .min(10, { message: '비밀번호는 최소 10자 이상이어야 합니다.' }),
    nickname: z
      .string({ message: '닉네임은 필수 입력입니다.' })
      .min(2, { message: '닉네임은 두글자 이상이어야합니다.' })
      .max(8, { message: '닉네임은 최대 8글자 입니다.' }),
    birthdate: z
      .string({ message: '생년월일은 필수 입력입니다.' })
      .regex(birthdateRegex, '올바른 형식이 아닙니다.'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['password'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
      });
    }

    RequiredValues.forEach((value) => {
      if (!val[value] || val[value].trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [value],
          message: '필수 입력란 입니다.',
        });
      }
    });
  });

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
