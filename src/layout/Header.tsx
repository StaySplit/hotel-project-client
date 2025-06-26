import logo from '@/assets/svg/Logo.svg';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import { SecondaryButton } from '@/component/common/button/SecondaryButton';

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <img src={logo} />
      </div>{' '}
      <div className="flex gap-1">
        {' '}
        <PrimaryButton>로그인</PrimaryButton>
        <SecondaryButton>회원가입</SecondaryButton>
      </div>
    </div>
  );
};

export default Header;
