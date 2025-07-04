import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Layout from '@/layout/Layout';
import HotelsPage from '@/component/hotels/HotelsPage';
import HotelDetailPage from '@/component/hotel_detail/HotelDetailPage';
import BookingPage from '@/component/booking/BookingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hotels',
        element: <HotelsPage />
      }
      ,
      {
        path: 'hotels/:hotelId',
        element: <HotelDetailPage />
      }
      ,
      {
        path: 'booking',
        element: <BookingPage />
      }
    ],
  },
]);
