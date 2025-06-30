import { Link } from 'react-router-dom';

import HeartIcon from '../common/icons/HeartIcon';

import { RatingStars } from './RatingStars';
import formatNumberWithComma from '@/utils/format/formatNumberWithComma';

interface HotelCardProps {
  // type : string;
  // name : string;
  // address : string;
  // rating : string;
  // reviewCounte : number;
  // cheapestPrice :number;
  // imageUrl : string;
  liked: boolean;
  handleChangeLike: () => void;
}

const HotelCard = ({ liked, handleChangeLike }: HotelCardProps) => {
  return (
    <Link to="/">
      <div
        aria-label="웨스턴조선 부산"
        className="hover:border-primary-200 relative flex w-full gap-4 rounded-2xl border border-gray-200 p-4 transition-colors lg:max-w-[300px] lg:flex-col"
      >
        <div className="bg-primary-700 h-[120px] w-[120px] shrink-0 rounded-2xl lg:h-[200px] lg:w-full"></div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="text-primary-700 text-xs lg:text-sm">호텔</p>
            <HeartIcon
              like={liked}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleChangeLike();
              }}
              className="z-999 lg:absolute lg:top-8 lg:right-8"
            />
          </div>

          <h3 className="font-bold lg:text-lg">웨스턴조선 부산</h3>

          <p className="mb-0.5 text-sm font-light text-gray-500">부산광역시 해운대구 동백로 12</p>

          <div className="mb-2 flex items-center gap-1">
            <RatingStars rating={1.5} />
            <span className="text-xs text-gray-500">{`(${300}+)`}</span>
          </div>

          <div className="text-end text-gray-700 lg:text-lg">{`₩${formatNumberWithComma(130000)}`}</div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
