import React from 'react';
import { Card } from '../common/card/Card';
import Text from '../common/Text/Text';
import type { IHotel } from '@/interface/hotel/hotel.interface';
import halfStar from '@/assets/svg/harf-star-left.svg';
import star from '@/assets/svg/star.svg';
import getStarRating from '@/utils/rating/getStarRating';

const HotelIntro = ({ hotel }: { hotel: IHotel }) => {
  const [fullStars, hasHalfStar] = getStarRating(Number(hotel.rating));

  // 설명, 좋아요, 가장 싼 가격
  return (
    <div className="w-290">
      <Card>
        <div className='flex justify-between'>
        <Text size="text-lg">{hotel.name}</Text>
        <div>좋아요</div>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: fullStars }).map(() => (
            <img src={star} />
          ))}
          {hasHalfStar ? <img src={halfStar} /> : null}
          <Text color="sub" size="text-sm">
            {hotel.review_count}개의 리뷰
          </Text>
        </div>
        <Text size='text-sm mb-3'>위치: {hotel.address}</Text>
        <div className="flex">
          <div className="h-80 w-120 min-h-80 min-w-120 mr-3">
            <img className="h-full w-full object-cover" src={hotel.image_url} />
          </div>
          <div className='flex flex-col'>
            <Text color='primary' size='text-lg'>{hotel.description}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HotelIntro;
