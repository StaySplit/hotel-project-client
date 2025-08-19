import type React from 'react';

interface HotelDetailSectionCardProps {
  title: string;
  children: React.ReactNode;
}
const HotelDetailSectionCard = ({ title, children }: HotelDetailSectionCardProps) => {
  return (
    <section className="bg-gray-primary/35 mb-8 w-full rounded-2xl p-6 shadow-md last:mb-0">
      <h2 className="mb-2 text-lg font-bold text-gray-500">{title}</h2>
      {children}
    </section>
  );
};

export default HotelDetailSectionCard;
