import { createContext, useContext } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownContext {
  isOpen: boolean;
  selectedOption: DropdownOption | null;
  toggleDropdown: () => void;
  selectOption: (option: DropdownOption) => void;
}

export const DropdownContext = createContext<DropdownContext | null>(null);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);

  if (!ctx) {
    throw new Error('Provider가 존재하지 않습니다.');
  }

  return ctx;
};
