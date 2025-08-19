import { MapPin, Star } from 'lucide-react';

interface HotelDetailHeader {
  title: string;
  address: string;
  rating: number;
  reviewCount: number;
  starLevel: number;
}

const HotelDetailHeader = ({
  title,
  address,
  rating,
  reviewCount,
  starLevel,
}: HotelDetailHeader) => {
  return (
    <header className="mb-8 w-full">
      <h3 className="mb-2 text-start text-3xl font-bold text-gray-700">{title}</h3>
      <div className="flex items-center gap-2">
        <div className="bg-primary-500 rounded-md px-3 py-0.5 text-sm font-bold text-white">
          {`${starLevel}성급`}
        </div>

        <div className="flex items-center gap-1">
          <Star className="size-4 fill-yellow-400 text-yellow-400" aria-hidden />

          <span className="text-gray-700">{`${rating} (${reviewCount}개의 리뷰)`}</span>
        </div>

        <div className="flex items-center gap-1 text-gray-700">
          <span>
            <MapPin className="size-4" aria-hidden />
          </span>
          <span>{address}</span>
        </div>
      </div>
    </header>
  );
};

export default HotelDetailHeader;
