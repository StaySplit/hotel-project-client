export interface UserInfo {
  id: number;
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
}

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLE = {
  PROVIDER: 'ROLE_PROVIDER',
  CUSTOMER: 'ROLE_CUSTOMER',
  NONE: null,
};

export interface UserStatus {
  email: string;
  nickName: string;
  role: UserRole;
  loggedIn: boolean;
}

export interface WarnResponse {
  code: string;
  data: string;
}
