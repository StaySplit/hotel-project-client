import { ChevronDown } from 'lucide-react';
import { useDropdown } from './DropdownContext';

interface TriggerProps {
  placeholder: string;
}

const Trigger = ({ placeholder }: TriggerProps) => {
  const { toggleDropdown, selectedOption, isOpen } = useDropdown();
  return (
    <div
      className={`border-gray-primary relative w-full cursor-pointer rounded-lg border bg-white p-2 ${!selectedOption ? 'text-gray-primary-200' : 'text-black'}`}
      onClick={toggleDropdown}
    >
      {selectedOption?.label || placeholder}

      <div
        className={`absolute top-1/2 right-2 -translate-y-1/2 ${isOpen && 'rotate-180'} transition-transform`}
      >
        <ChevronDown stroke={isOpen ? 'black' : '#a9a9a9'} />
      </div>
    </div>
  );
};

export default Trigger;
