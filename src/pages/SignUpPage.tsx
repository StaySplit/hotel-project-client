import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import SignupForm from '@/component/form/SignupForm';
import type UserRole from '@/types/user/UserRole';
import { useState } from 'react';

const getButtonStyle = (currentState: boolean) => {
  const baseStyle = 'w-full cursor-pointer rounded-full py-2 transition-colors ';
  const activeStyle = 'text-white bg-primary-500';

  if (currentState) {
    return baseStyle + activeStyle;
  } else {
    return baseStyle;
  }
};

const SignUpPage = () => {
  const [role, setRole] = useState<UserRole>('ROLE_CUSTOMER');

  return (
    <section className="mx-auto flex h-full w-full max-w-[500px] flex-col justify-between px-4 pb-4">
      <div>
        <h3 className="text-primary-500 text-lg font-bold">StaySplit에 오신 걸 환영합니다 !</h3>
        <p className="text-gray-600">가입 하기 전, 간단한 정보를 입력해주세요</p>
      </div>

      <div className="flex-1">
        <div className="border-gray-primary mt-4 mb-2 flex items-center overflow-hidden rounded-full border">
          <button
            onClick={() => setRole('ROLE_CUSTOMER')}
            className={getButtonStyle(role === 'ROLE_CUSTOMER')}
          >
            일반회원
          </button>
          <button
            onClick={() => setRole('ROLE_PROVIDER')}
            className={getButtonStyle(role === 'ROLE_PROVIDER')}
          >
            사업자
          </button>
        </div>
        <SignupForm role={role} />
      </div>

      <PrimaryButton form="sign-up" full>
        가입하기
      </PrimaryButton>
    </section>
  );
};

export default SignUpPage;
