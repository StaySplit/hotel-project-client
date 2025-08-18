import React, { useState } from 'react';

import { DropdownContext, type DropdownOption } from './DropdownContext';

import Trigger from './DropdownTrigger';
import Menu from './DropdownMenu';
import Item from './DropdownItem';

interface DropdownProps {
  onSelect: (option: DropdownOption) => void;
  defaultOption?: DropdownOption | null;
  children: React.ReactNode;
}

const Dropdown = ({ children, onSelect, defaultOption = null }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(defaultOption);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (option: DropdownOption) => {
    setSelectedOption(option);
    onSelect?.(option);
    setIsOpen(false);
  };
  const DropdownContextDefaultValues = {
    isOpen,
    selectedOption,
    toggleDropdown,
    selectOption,
  };

  return (
    <DropdownContext value={DropdownContextDefaultValues}>
      <div className="relative">{children}</div>
    </DropdownContext>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
