import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

import CommonTextArea from './CommonTextArea';

// 제네릭 FieldValues 확장, value 속성 Omit
interface RHFTextAreaProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
}

const RHFTextArea = <T extends FieldValues>({
  name,
  label,
  control,
  ...rest
}: RHFTextAreaProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <CommonTextArea
      onChange={field.onChange}
      value={field.value ?? ''}
      name={name}
      label={label}
      error={fieldState.error as unknown as boolean}
      errorMessage={fieldState.error?.message}
      {...rest}
    />
  );
};

export default RHFTextArea;
