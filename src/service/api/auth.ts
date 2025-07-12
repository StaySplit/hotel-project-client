import client from '@/service/instance/client';

import handleApiReqeust from './handleApiReqeust';

import type UserInfo from '@/types/user/UserInfo';
import type UserRole from '@/types/user/UserRole';
import type { LoginType, RegisterType } from '@/schema/AuthSchema';

const getSignUpApiUrl = (role: UserRole) => {
  if (role === 'ROLE_CUSTOMER') {
    return '/api/customers/sign-up';
  } else {
    return '/api/providers/sign-up';
  }
};

export const signUp = async (role: UserRole, data: RegisterType) => {
  const response = await handleApiReqeust<UserInfo>(() => client.post(getSignUpApiUrl(role), data));

  return response;
};

export const login = async (data: LoginType) => {
  const response = await handleApiReqeust<UserRole>(() => client.post('/api/users/login', data));

  return response;
};
