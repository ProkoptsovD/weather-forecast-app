import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** LAYOUTS  */
import { SharedLayout } from '../layouts/SharedLayout';

/** CONSTANTS */
import { ROUTER_KEYS } from '../constants/appKeys';

/** PAGES */
const HomePage = React.lazy(() => import('@pages/home/HomePage'));
const CityPage = React.lazy(() => import('@pages/SingleCityPage'));
const Page404 = React.lazy(() => import('@pages/Page404'));

export function MainRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTER_KEYS.HOME,
      element: <SharedLayout />,
      children: [
        {
          path: ROUTER_KEYS.HOME,
          element: <HomePage />
        },
        {
          path: ROUTER_KEYS.CITY + '/:id',
          element: <CityPage />
        }
      ]
    },
    {
      path: '*',
      element: <Page404 />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default MainRouter;
