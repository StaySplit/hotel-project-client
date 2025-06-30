import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schema/AuthSchema';

import Kakao from '../../assets/icons/Kakao.svg';
import Naver from '../../assets/icons/Naver.svg';
import Google from '../../assets/icons/Google.svg';

import RHFInput from '../common/input/RHFInput';
import { PrimaryButton } from '../common/button/PrimaryButton';
import { useState } from 'react';

const LoginFeilds = [
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
];

const oAuthLogin = [
  {
    id: 'kakao',
    path: '/',
    imageSrc: Kakao,
  },
  {
    id: 'naver',
    path: '/',
    imageSrc: Naver,
  },
  {
    id: 'google',
    path: '/',
    imageSrc: Google,
  },
];

const getButtonStyle = (currentState: boolean) => {
  const baseStyle = 'w-full cursor-pointer rounded-full py-2 transition-colors ';
  const activeStyle = 'text-white bg-primary-500';

  if (currentState) {
    return baseStyle + activeStyle;
  } else {
    return baseStyle;
  }
};

const LoginForm = () => {
  const [role, setRole] = useState<'customer' | 'provider'>('customer');

  const { control, handleSubmit, formState, setError, clearErrors } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async () => {
    setError('root', { message: 'Form error' });

    // try {
    //   //Login
    // } catch (err) {
    //setError('root',{message : err as string})
    // Error Handle
    // }
  };

  // Focus 했을 때 Error Clear
  const handleFocus = () => {
    clearErrors('root');
  };

  return (
    <>
      <div className="border-gray-primary mt-8 mb-4 flex items-center overflow-hidden rounded-full border">
        <button onClick={() => setRole('customer')} className={getButtonStyle(role === 'customer')}>
          일반회원
        </button>
        <button onClick={() => setRole('provider')} className={getButtonStyle(role === 'provider')}>
          사업자
        </button>
      </div>
      <form
        onFocus={handleFocus}
        onSubmit={handleSubmit(onSubmit)}
        className="border-gray-primary border-b pb-8"
      >
        <div className="mb-4">
          {/* Form Field */}
          {LoginFeilds.map((field) => (
            <div key={field.name} className="first:mb-4">
              <RHFInput
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                control={control}
              />
            </div>
          ))}
          {formState.errors && formState.errors.root?.message && (
            <p className="text-error pt-2 text-sm">{formState.errors.root.message}</p>
          )}
        </div>

        {/* Form Submit */}
        <PrimaryButton disabled={!formState.isValid} full>
          로그인
        </PrimaryButton>

        {/* Signup */}
        <div className="pt-1 text-right text-sm">
          <span>회원이 아니신가요?</span>
          <Link
            className="text-primary-500 hover:text-primary-600 pl-1 transition-colors"
            to={'/sign-up'}
          >
            가입하기
          </Link>
        </div>
      </form>

      {/* oAuth Buttons */}
      <div className="pt-8 pb-4">
        <p className="mb-4 text-center text-gray-500">간편 로그인</p>
        <div className="flex items-center justify-center gap-10">
          {oAuthLogin.map((oAuth) => (
            <Link to={oAuth.path} key={oAuth.id} aria-label={`${oAuth.id} login button`}>
              <img src={oAuth.imageSrc} alt={oAuth.id} className="size-12" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
