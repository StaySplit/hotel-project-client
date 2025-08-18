interface CommonTextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const CommonTextArea = ({
  name,
  label,
  onChange,
  value,
  error = false,
  errorMessage,
  className,
  ...rest
}: CommonTextAreaProps) => {
  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm text-black" htmlFor={name}>
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className={`resize-none focus:${!error ? 'border-primary-300' : 'border-error'} w-full rounded-xl border bg-white p-3 px-4 text-black transition-colors outline-none ${error ? 'border-[#e57373]' : 'border-gray-primary'} ${className && className}`}
        {...rest}
      />

      {error && errorMessage && (
        <span className="text-error inline-block pt-1 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default CommonTextArea;
