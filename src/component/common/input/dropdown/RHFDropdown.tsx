import React, { useEffect, useState } from 'react';

import { DropdownContext, type DropdownOption } from './DropdownContext';

import Trigger from './DropdownTrigger';
import Menu from './DropdownMenu';
import Item from './DropdownItem';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

interface RHFDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultOption?: DropdownOption | null;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const RHFDropdown = <T extends FieldValues>({
  name,
  control,
  children,
  defaultOption = null,
  label,
  className,
}: RHFDropdownProps<T>) => {
  const { field } = useController({ name, control });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(defaultOption);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  const selectOption = (option: DropdownOption) => {
    setSelectedOption(option);
    field.onChange(option.value);
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
      <div className={`relative ${className}`}>
        {label && <p className="mb-1 text-sm">{label}</p>}
        <input
          id={field.name}
          className="hidden"
          onChange={() => selectOption}
          value={field.value || defaultOption?.value || ''}
        />
        {children}
      </div>
    </DropdownContext>
  );
};

RHFDropdown.Trigger = Trigger;
RHFDropdown.Menu = Menu;
RHFDropdown.Item = Item;

export default RHFDropdown;
