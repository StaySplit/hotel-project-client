import RadioInput from '@/component/common/input/RadioInput';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import HotelCard from '@/component/card/HotelCard';

const CategoryGroup = [
  {
    id: 'seoul',
    label: '서울',
  },
  {
    id: 'incheon',
    label: '인천',
  },
];

const HomePage = () => {
  const [radio, setRadio] = useState('seoul');
  const [like, setLike] = useState(false);

  return (
    <section className="w-full px-4">
      {/* Banner */}
      <div className="relative mb-4 flex h-[250px] w-full flex-col items-center justify-center rounded-2xl bg-[url('/main-banner.png')] bg-cover bg-center bg-no-repeat text-white md:h-[300px]">
        <p className="font-bold md:text-2xl">당신의 여행을 더 스마트하게,</p>
        <p className="text-sm md:text-lg">가장 합리적인 호텔 예약, StaySplit</p>

        <Link
          to="/"
          className="bg-primary-700 absolute bottom-6 flex items-center justify-center gap-2 rounded-full px-8 py-1.5 text-sm text-white"
        >
          <span>숙소 찾으러 가기</span>
          <ArrowRight strokeWidth={1} size="20" />
        </Link>
      </div>

      <div className="w-full">
        <h3 className="mb-2 font-bold md:text-lg">지금 인기가 가장 많은 숙소</h3>
        <ul
          aria-label="지역 카테고리"
          className="mb-4 flex flex-nowrap items-center gap-2 overflow-x-scroll"
        >
          {CategoryGroup.map((category) => (
            <li key={category.id}>
              <RadioInput
                name="category"
                id={category.id}
                label={category.label}
                checked={radio === category.id}
                onChange={(e) => setRadio(e.currentTarget.id)}
              />
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-5">
          {Array(8)
            .fill(5)
            .map((el, idx) => (
              <li key={idx} className="w-full">
                <HotelCard liked={like} handleChangeLike={() => setLike((prev) => !prev)} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
