import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  full?: boolean;
}

export const PrimaryButton = ({
  size = 'md',
  children,
  disabled = false,
  full = false,
  ...props
}: PrimaryButtonProps) => {
  const sizeClass = {
    sm: 'py-1.5 px-4 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-6 text-lg',
  }[size];

  const baseClass = disabled
    ? 'bg-gray-300 text-white cursor-not-allowed'
    : 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 cursor-pointer';

  return (
    <button
      className={`rounded-xl ${sizeClass} ${baseClass} transition-colors duration-150 ${full && 'w-full'}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
