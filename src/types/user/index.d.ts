export interface UserInfo {
  id: number;
  email: string;
  name: string;
  birthDate: string;
  nickname: string;
}

export type UserRole = 'ROLE_PROVIDER' | 'ROLE_CUSTOMER' | null;

export interface UserStatus {
  email: string;
  role: UserRole;
  loggedIn: boolean;
}
