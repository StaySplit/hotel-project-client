import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import CommonImageInput from './CommonImageInput';
import type { ChangeEvent } from 'react';

interface RHFImageInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const RHFImageInput = <T extends FieldValues>({
  name,
  control,
  ...rest
}: RHFImageInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      field.onChange(e.target.files[0]);
    }

    return;
  };

  return (
    <CommonImageInput
      name={field.name}
      onChange={handleChange}
      error={fieldState.error as unknown as boolean}
      imageFiles={field.value}
      {...rest}
    />
  );
};

export default RHFImageInput;
