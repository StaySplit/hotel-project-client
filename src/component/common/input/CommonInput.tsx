interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const CommonInput = ({
  name,
  label,
  onChange,
  value,
  error = false,
  errorMessage,
  type = 'text',
  className,
  ...rest
}: CommonInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-black" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className={`focus:${!error ? 'border-primary-300' : 'border-error'} w-full rounded-lg border bg-white px-4 py-2 text-black transition-colors outline-none ${error ? 'border-[#e57373]' : 'border-gray-primary'} ${rest.disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : ''} ${className && className}`}
        {...rest}
      />

      {error && errorMessage && (
        <span className="text-error inline-block pt-1 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default CommonInput;
