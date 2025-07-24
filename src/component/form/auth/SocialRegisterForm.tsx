import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SocialRegisterSchema, type SocialRegisterType } from '@/schema/AuthSchema';

import { formatBirthDate } from '@/utils/format/formatBirthDate';

import CommonInput from '../../common/input/CommonInput';
import RHFInput from '../../common/input/RHFInput';

const SocialRegisterFields = [
  {
    name: 'name' as const,
    label: '이름',
    placeholder: '이름을 입력해주세요.',
  },
  {
    name: 'birthdate' as const,
    label: '생년월일',
    placeholder: 'YYYYMMDD',
  },
  {
    name: 'nickname' as const,
    label: '닉네임',
    placeholder: '사용할 닉네임을 입력해주세요.',
  },
  {
    name: 'email' as const,
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
];

interface SocialRegisterFormProps {
  onSubmit: (data: SocialRegisterType) => Promise<string | void>;
}

const SocialRegisterForm = ({ onSubmit }: SocialRegisterFormProps) => {
  const { control, handleSubmit, formState, setError } = useForm({
    resolver: zodResolver(SocialRegisterSchema),
    mode: 'onSubmit',
  });

  const { field: birthField, fieldState } = useController({ name: 'birthdate', control });

  const handleSubmitRegister = async (data: SocialRegisterType) => {
    const error = await onSubmit(data);

    if (error) {
      setError('root', { message: error });
    }
  };

  return (
    <>
      {formState.errors && formState.errors.root?.message && (
        <p className="text-error pt-2 text-sm">{formState.errors.root.message}</p>
      )}
      <form
        id="sign-up-social"
        className="mb-4 space-y-2 py-2"
        onSubmit={handleSubmit(handleSubmitRegister)}
      >
        {SocialRegisterFields.map((field) =>
          field.name === 'birthdate' ? (
            (() => {
              return (
                <div key="birthdate">
                  <CommonInput
                    {...birthField}
                    value={birthField.value ?? ''}
                    label={field.label}
                    maxLength={10}
                    placeholder={field.placeholder}
                    onChange={(e) => birthField.onChange(formatBirthDate(e.target.value))}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                  />
                </div>
              );
            })()
          ) : (
            <div key={field.name}>
              <RHFInput {...field} placeholder={field.placeholder} control={control} />
            </div>
          ),
        )}
      </form>
    </>
  );
};

export default SocialRegisterForm;
