import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`rounded shadow-md bg-white p-4 w-full h-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};