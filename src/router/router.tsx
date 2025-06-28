import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Layout from '@/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
