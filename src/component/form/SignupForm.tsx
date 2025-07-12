import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema, type RegisterType } from '@/schema/AuthSchema';

import { formatBirthDate } from '@/utils/format/formatBirthDate';

import CommonInput from '../common/input/CommonInput';
import RHFInput from '../common/input/RHFInput';
import type UserRole from '@/types/user/UserRole';
import { login, signUp } from '@/service/api/auth';
import { useNavigate } from 'react-router-dom';

const SignUpFields = [
  {
    name: 'name' as const,
    label: '이름',
    placeholder: '이름을 입력해주세요.',
  },
  {
    name: 'birthdate' as const,
    label: '생년월일',
    placeholder: 'YYYYMMDD',
  },
  {
    name: 'nickname' as const,
    label: '닉네임',
    placeholder: '사용할 닉네임을 입력해주세요.',
  },
  {
    name: 'email' as const,
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
  {
    name: 'password' as const,
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    name: 'passwordConfirm' as const,
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호 확인',
  },
];

const SignupForm = ({ role }: { role: UserRole }) => {
  const navigate = useNavigate();

  const { control, handleSubmit, setError, formState } = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit',
  });

  const { field: birthField, fieldState } = useController({ name: 'birthdate', control });

  const onSubmit = async (data: RegisterType) => {
    try {
      const response = await signUp(role, data);
      console.log(response.id);
      if (response.id) {
        console.log('trigger');
        const response = await login({ email: data.email, password: data.password });
        console.log(response);
        return navigate('/');
      }

      navigate('/login');
    } catch (error) {
      console.log(error);
      setError('root', { message: error as string });
    }
  };
  return (
    <>
      {formState.errors && formState.errors.root?.message && (
        <p className="text-error pt-2 text-sm">{formState.errors.root.message}</p>
      )}
      <form id="sign-up" className="mb-4 space-y-2 py-2" onSubmit={handleSubmit(onSubmit)}>
        {SignUpFields.map((field) =>
          field.name === 'birthdate' ? (
            (() => {
              return (
                <div key="birthdate">
                  <CommonInput
                    {...birthField}
                    value={birthField.value ?? ''}
                    label={field.label}
                    maxLength={10}
                    placeholder={field.placeholder}
                    onChange={(e) => birthField.onChange(formatBirthDate(e.target.value))}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                </div>
              );
            })()
          ) : (
            <div key={field.name}>
              <RHFInput {...field} placeholder={field.placeholder} control={control} />
            </div>
          ),
        )}
      </form>
    </>
  );
};

export default SignupForm;
