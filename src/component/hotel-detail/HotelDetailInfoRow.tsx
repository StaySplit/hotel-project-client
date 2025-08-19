import type React from 'react';

interface HotelDetailInfoRowProps {
  label: string;
  children: React.ReactNode;
}

const HotelDetailInfoRow = ({ label, children }: HotelDetailInfoRowProps) => {
  return (
    <div className="flex justify-between text-gray-700">
      <span>{label}</span>
      <span className="font-bold">{children}</span>
    </div>
  );
};

export default HotelDetailInfoRow;
