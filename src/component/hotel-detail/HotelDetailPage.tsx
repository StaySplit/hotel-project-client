import { useParams } from 'react-router-dom';
import { getHotelDetail } from '@/service/api/hotel';

import HotelMapView from './HotelMapView';
import { useQuery } from '@tanstack/react-query';

import HotelDetailSectionCard from './HotelDetailSectionCard';
import hotelKeys from '@/hooks/queries/hotels/hotelKeys';
import HotelDetailRoomList from './HotelDetailRoomList';
import HotelDetailInfoRow from './HotelDetailInfoRow';
import { Star } from 'lucide-react';
import HotelDetailHeader from './HotelDetailHeader';
import HotelHero from './HotelHero';
import { Suspense } from 'react';
import LoadingIndicator from '../ui/LoadingIndicator';

const HotelDetailPage = () => {
  const params = useParams();
  const { hotelId } = params;

  const { data } = useQuery({
    queryKey: hotelKeys.hotel(hotelId as string),
    queryFn: async () => await getHotelDetail(hotelId as string),
  });

  if (!data) {
    return null;
  }
  return (
    <section className="mt-4 flex flex-col items-center gap-6">
      <div className="w-full">
        <HotelDetailHeader
          title={data.name}
          address={data.address}
          rating={data.rating}
          reviewCount={data.reviewCount}
          starLevel={data.starLevel}
        />

        <HotelHero alt={data.name} imageSrc={data.mainPhotoUrl} />

        <div className="flex w-full flex-col gap-8 lg:flex-row">
          {/* 호텔 소개, 객실 정보 */}
          <div className="w-full lg:w-3/5">
            <HotelDetailSectionCard title="호텔 소개">
              <p className="tracking-normal">{data.description}</p>
            </HotelDetailSectionCard>

            <HotelDetailSectionCard title="객실 정보">
              <Suspense fallback={<LoadingIndicator />}>
                <HotelDetailRoomList hotelId={hotelId as string} />
              </Suspense>
            </HotelDetailSectionCard>
          </div>

          {/* 지도, 호텔 정보 */}
          <div className="flex w-full flex-col lg:w-2/5">
            <HotelDetailSectionCard title="위치">
              {
                <HotelMapView
                  hotelName={data.name}
                  latitude={data.latitude}
                  longitude={data.longitude}
                />
              }
            </HotelDetailSectionCard>

            <HotelDetailSectionCard title="호텔 정보">
              <div className="space-y-3">
                <HotelDetailInfoRow label="등급">{data.starLevel}</HotelDetailInfoRow>

                <HotelDetailInfoRow label="평점">
                  <Star
                    className="mr-0.5 inline size-4 fill-yellow-400 text-yellow-400"
                    aria-hidden
                  />
                  <span>{data.rating}</span>
                </HotelDetailInfoRow>

                <HotelDetailInfoRow label="리뷰 수">{data.reviewCount}</HotelDetailInfoRow>
              </div>
            </HotelDetailSectionCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelDetailPage;
