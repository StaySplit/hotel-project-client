import type React from 'react';
import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: DropdownMenuProps) => {
  const { isOpen } = useDropdown();

  return (
    isOpen && (
      <ul className="border-gray-primary absolute top-[120%] flex w-full flex-col rounded-lg border bg-white">
        {children}
      </ul>
    )
  );
};

export default Menu;
