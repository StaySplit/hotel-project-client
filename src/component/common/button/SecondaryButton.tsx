import React from 'react';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
};

export const SecondaryButton = ({ size = 'md', children, disabled = false, ...props }: Props) => {
  const sizeClass = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  }[size];

  const baseClass = disabled
    ? 'bg-gray-300 text-white cursor-not-allowed'
    : 'bg-white border border-primary-500 text-primary-500 hover:text-primary-600 hover:border-primary-600 active:text-primary-700 active:border-primary-700 cursor-pointer';

  return (
    <button
      className={`rounded ${sizeClass} ${baseClass} transition-colors duration-150`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
