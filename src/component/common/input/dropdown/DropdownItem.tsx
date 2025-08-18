import { useDropdown, type DropdownOption } from './DropdownContext';

interface DropdownItemProps {
  option: DropdownOption;
}
const Item = ({ option }: DropdownItemProps) => {
  const { selectOption } = useDropdown();

  return (
    <li
      className="hover:bg-gray-primary/20 w-full cursor-pointer px-4 py-2 transition-colors"
      onClick={() => selectOption(option)}
    >
      {option.label}
    </li>
  );
};

export default Item;
