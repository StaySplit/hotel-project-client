import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import CommonImageInput from './CommonImageInput';
import { useMemo } from 'react';

interface RHFImageInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  multiple?: boolean;
  label?: string;
}

const RHFImageInput = <T extends FieldValues>({
  name,
  control,
  multiple = false,
  label,
  ...rest
}: RHFImageInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });
  // 이미지 Value 정규화
  const valueAsFiles: File[] = useMemo(() => {
    const v = field.value;

    if (!v) return [];

    if (multiple) {
      if (Array.isArray(v)) return v as File[];

      if (typeof FileList !== 'undefined' && (v as object) instanceof FileList)
        return Array.from(v);

      return [];
    } else {
      // single 모드 일 때
      return (v as object) instanceof File ? [v] : [];
    }
  }, [field.value, multiple]);

  const setFiles = (next: File[]) => {
    if (multiple) {
      field.onChange(next);
    } else {
      field.onChange(next[0] ?? null);
    }
    console.log(field.value);
  };

  return (
    <CommonImageInput
      name={field.name}
      setFiles={setFiles}
      files={valueAsFiles}
      error={fieldState.error as unknown as boolean}
      multiple={multiple}
      label={label}
      {...rest}
    />
  );
};

export default RHFImageInput;
