import { useState } from 'react';

interface HotelHeroProps {
  imageSrc: string;
  alt: string;
}

const HotelHero = ({ imageSrc, alt }: HotelHeroProps) => {
  const [fallback, setFallback] = useState<boolean>(false);

  return (
    <>
      {!fallback && (
        <img
          src={imageSrc}
          alt={alt}
          className="border-gray-primary mb-6 h-96 w-full rounded-2xl border object-fill"
          onError={() => setFallback(true)}
        />
      )}
      {fallback && (
        <div
          className="bg-primary-400 mb-8 flex h-96 w-full items-center justify-center rounded-2xl text-3xl text-white"
          aria-label="호텔 이미지 불러오기 실패"
        >
          이미지 정보 없음
        </div>
      )}
    </>
  );
};

export default HotelHero;
