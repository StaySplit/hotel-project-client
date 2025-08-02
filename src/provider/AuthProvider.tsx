/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';

import useAuthStore from '@/store/useAuthStore';
import handleApiReqeust from '@/service/api/handleApiReqeust';
import client from '@/service/instance/client';
import type { UserStatus } from '@/types/user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUserRole } = useAuthStore();

  // 로그인 상태 Check
  const handleCheckLoggedIn = async () => {
    try {
      const response = await handleApiReqeust<UserStatus>(() =>
        client.get('/api/users/auth/status'),
      );
      setUserRole(response.role);
    } catch {
      setUserRole(null);
    }
  };

  useEffect(() => {
    handleCheckLoggedIn();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
