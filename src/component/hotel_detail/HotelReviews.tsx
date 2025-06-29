import React from 'react';
import { Card } from '../common/card/Card';
import type { IReview } from '@/interface/hotel/hotel-review.interface';

const HotelReviews = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <div className="w-290">
      <Card>
        <div className="flex gap-3">
          {reviews.map((review) => (
            <div className="w-90">
              <Card>{review.content}</Card>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HotelReviews;
