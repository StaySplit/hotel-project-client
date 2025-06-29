import React from 'react';

interface HotelCardListProps {
  children: React.ReactNode;
  className?: string;
}

const HotelCardList = ({ children, className }: HotelCardListProps) => {
  return <div className={`grid grid-cols-4 gap-4 ${className}`}>{children}</div>;
};

export default HotelCardList;
