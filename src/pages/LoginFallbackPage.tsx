import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type { SocialRegisterType } from '@/schema/AuthSchema';

import useAuthStore from '@/store/useAuthStore';

import { oAuthLogin, SocialSignup } from '@/service/api/auth';

import SignupForm from '@/component/form/auth/SocialRegisterForm';
import Modal from '@/component/modal/Modal';
import ModalHeader from '@/component/modal/ModalHeader';
import ModalWrapper from '@/component/modal/ModalWrapper';
import { PrimaryButton } from '@/component/common/button/PrimaryButton';

const LoginFallbackPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const { identifier } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserRole } = useAuthStore();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code || !identifier) {
      navigate('/');
      return;
    }
  }, [code, identifier, navigate]);

  useEffect(() => {
    const handleoAuthLogin = async () => {
      try {
        await oAuthLogin(identifier as 'kakao' | 'google', code as string);
        setUserRole('ROLE_CUSTOMER');
        navigate('/');
      } catch (error) {
        if (error === 'ADDITIONAL_INFO_REQUIRED') {
          setUserRole(null);
          setModal(true);
        } else {
          setError(true);
        }
      }
    };

    handleoAuthLogin();
  }, [code, identifier, navigate, setUserRole]);

  const handleSubmit = async (data: SocialRegisterType) => {
    try {
      await SocialSignup(data);

      try {
        await oAuthLogin(identifier as 'kakao' | 'google', code as string);
        setUserRole('ROLE_CUSTOMER');
        return navigate('/');
      } catch {
        navigate('/');
      }

      navigate('/');
    } catch (error) {
      return error as string;
    }
  };

  return (
    <section className="h-full">
      {error && (
        <div className="flex h-full flex-1 flex-col items-center justify-center">
          <div>
            <p className="mb-2">가입이 완료되지 않았습니다.</p>
            <PrimaryButton size="sm" onClick={() => navigate('/')} full>
              홈으로 돌아가기
            </PrimaryButton>
          </div>
        </div>
      )}
      {modal && (
        <Modal isOpen={modal} onClose={() => setModal(false)} full>
          <ModalWrapper>
            <ModalHeader
              onClick={() => {
                setModal(false);
                setError(true);
              }}
              headerTitle="회원가입"
            />

            <div className="flex-1 py-4">
              <SignupForm onSubmit={handleSubmit} />
            </div>

            <PrimaryButton size="md" type="submit" form="sign-up-social" full>
              가입하기
            </PrimaryButton>
          </ModalWrapper>
        </Modal>
      )}
    </section>
  );
};

export default LoginFallbackPage;
