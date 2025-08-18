import type React from 'react';
import { useDropdown } from './DropdownContext';

interface DropdownMenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: DropdownMenuProps) => {
  const { isOpen } = useDropdown();

  return (
    isOpen && (
      <ul className="border-gray-primary absolute top-[110%] flex max-h-[150px] w-full flex-col overflow-y-scroll rounded-lg border bg-white md:max-h-[250px]">
        {children}
      </ul>
    )
  );
};

export default Menu;
