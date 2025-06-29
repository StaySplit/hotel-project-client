import { z } from 'zod';

const UserRole = ['User', 'Company'] as const;
const Gender = ['Male', 'Female'] as const;
const LoginSource = ['GOOGLE', 'KAKAO', 'NAVER', 'THIS'] as const;

// phoneNumber Validation
const phoneRegex = new RegExp(/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/);

const RequiredValues = [
  'email',
  'password',
  'username',
  'passwordConfirm',
  'role',
  'gender',
  'phone_number',
  'nink_name',
] as const;

export const LoginSchema = z.object({
  email: z.string().email({ message: '잘못된 이메일 형식입니다.' }),
  password: z.string(),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: '잘못된 이메일 형식입니다.' }),
    username: z.string(),
    password: z.string().min(10, { message: '비밀번호는 최소 10자 이상이어야 합니다.' }).max(15),
    passwordConfirm: z.string().min(10).max(15),
    role: z.enum(UserRole),
    gender: z.enum(Gender),
    phone_number: z.string().regex(phoneRegex),
    nink_name: z.string().min(2, { message: '닉네임은 두글자 이상이어야합니다.' }),
    image_url: z.string(),
    login_source: z.enum(LoginSource),
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
