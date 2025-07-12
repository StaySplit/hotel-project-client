import { createBrowserRouter } from 'react-router-dom';

import Provider from '@/provider';
import Layout from '@/layout/Layout';

import HomePage from '@/pages/HomePage';

import SignUpPage from '@/pages/SignUpPage';

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
    ],
  },
]);
