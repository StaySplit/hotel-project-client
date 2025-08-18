import { ChevronDown } from 'lucide-react';
import { useDropdown } from './DropdownContext';

interface TriggerProps {
  placeholder: string;
}

const Trigger = ({ placeholder }: TriggerProps) => {
  const { toggleDropdown, selectedOption, isOpen } = useDropdown();
  return (
    <div
      className={`relative w-full cursor-pointer rounded-lg border bg-white p-2 transition-colors ${!selectedOption ? 'text-gray-primary-200' : 'text-black'} ${isOpen ? 'border-primary-300' : 'border-gray-primary'}`}
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
