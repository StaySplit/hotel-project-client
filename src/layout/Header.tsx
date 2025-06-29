import Logo from '@/assets/svg/Logo.svg';
import SymbolLogo from '/union.svg';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';
import { SecondaryButton } from '@/component/common/button/SecondaryButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from '@/component/modal/Modal';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/component/form/LoginForm';

const Header = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <header className="flex w-full items-center justify-between p-4 md:py-6">
        <h1>
          <Link to="/">
            <img src={Logo} className="hidden w-[150px] md:block" alt="stay split logo" />
            <img src={SymbolLogo} className="size-12 md:hidden" alt="stay split logo" />
          </Link>
        </h1>
        <nav className="flex gap-2">
          <SecondaryButton size="sm">회원가입</SecondaryButton>
          <PrimaryButton size="sm" onClick={handleToggleModal}>
            로그인
          </PrimaryButton>
        </nav>
      </header>

      {modal && (
        <Modal isOpen={modal} onClose={handleToggleModal} full>
          <div className="h-full md:h-auto">
            <div aria-label="modal-header">
              <ArrowLeft
                aria-label="닫기"
                role="button"
                onClick={handleToggleModal}
                className="absolute top-5 left-5 cursor-pointer md:top-5"
                strokeWidth={1}
              />
              <h4 className="text-center">로그인</h4>
            </div>

            <div
              aria-label="modal-content"
              className="flex h-[90svh] flex-col justify-center md:h-auto"
            >
              <LoginForm />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
