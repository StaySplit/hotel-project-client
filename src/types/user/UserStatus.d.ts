import type UserRole from './UserRole';

interface UserStatus {
  email: string;
  role: UserRole;
  loggedIn: boolean;
}

export default UserStatus;
