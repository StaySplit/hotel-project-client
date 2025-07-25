import { createBrowserRouter } from 'react-router-dom';

import Provider from '@/provider';
import Layout from '@/layout/Layout';
import HotelsPage from '@/component/hotels/HotelsPage';
import HotelDetailPage from '@/component/hotel_detail/HotelDetailPage';
import BookingPage from '@/component/booking/BookingPage';

import HomePage from '@/pages/HomePage';

import SignUpPage from '@/pages/SignUpPage';

import LoginFallbackPage from '@/pages/LoginFallbackPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider>
        <Layout />
      </Provider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },

      {
        path: '/login/oauth/:identifier',
        element: <LoginFallbackPage />,
      },
      {
        path: 'hotels',
        element: <HotelsPage />,
      },
      {
        path: 'hotels/:hotelId',
        element: <HotelDetailPage />,
      },
      {
        path: 'booking',
        element: <BookingPage />,
      },
    ],
  },
]);
