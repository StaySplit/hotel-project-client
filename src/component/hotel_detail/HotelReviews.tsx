import type { IReview } from '@/types/review/review';
import HotelReview from './HotelReview';

const HotelReviews = ({ reviews }: { reviews: IReview[] }) => {
  if (!reviews.length) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-2 pb-4">
      <div className="border-gray-primary mb-8 border-b pb-2 text-2xl">
        {reviews.length}개의 리뷰
      </div>
      {reviews.map((review) => (
        <HotelReview review={review} />
      ))}
    </div>
  );
};

export default HotelReviews;
