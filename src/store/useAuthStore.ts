import type UserRole from '@/types/user/UserRole';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface useAuthInterface {
  role: UserRole;
  setUserRole: (role: UserRole) => void;
  removeUserRole: () => void;
}

const useAuthStore = create<useAuthInterface>()(
  persist(
    (set) => ({
      role: null,
      setUserRole: (role) => set((state) => ({ role: (state.role = role) })),
      removeUserRole: () => set({ role: null }),
    }),
    {
      name: 'user-role',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
