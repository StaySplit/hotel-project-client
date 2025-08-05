import React from 'react';
interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  full?: boolean;
  bold?: boolean;
}

export const SecondaryButton = ({
  size = 'md',
  children,
  disabled = false,
  full = false,
  bold = false,
  ...props
}: SecondaryButtonProps) => {
  const sizeClass = {
    sm: 'py-1.5 px-4 text-sm rounded-xl',
    md: 'py-2 px-5 text-base rounded-xl',
    lg: 'py-3 px-6 text-lg rounded-2xl',
  }[size];

  const baseClass = disabled
    ? 'bg-gray-300 text-white cursor-not-allowed'
    : 'bg-white border border-primary-500 text-primary-500 hover:text-primary-600 hover:border-primary-600 active:text-primary-700 active:border-primary-700 cursor-pointer';

  return (
    <button
      className={` ${sizeClass} ${baseClass} transition-colors duration-150 ${full && 'w-full'} ${bold && 'font-bold'}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
