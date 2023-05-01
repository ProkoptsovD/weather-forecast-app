import { createHashRouter, RouterProvider } from 'react-router-dom';

/** LAYOUTS  */
import { SharedLayout } from '../layouts/SharedLayout';

/** CONSTANTS */
import { ROUTER_KEYS } from '../constants/appKeys';

/** PAGES */
import Page404 from '@pages/Page404';
import HomePage from '@pages/HomePage';
import SingleCityPage from '@pages/SingleCityPage';

export function MainRouter() {
  const router = createHashRouter(
    [
      {
        path: ROUTER_KEYS.HOME,
        element: <SharedLayout />,
        children: [
          {
            path: ROUTER_KEYS.HOME,
            element: <HomePage />
          },
          {
            path: ROUTER_KEYS.CITY,
            element: <SingleCityPage />
          }
        ]
      },
      {
        path: '*',
        element: <Page404 />
      }
    ],
    { basename: '/weather-forecast-app' }
  );

  return <RouterProvider router={router} />;
}

export default MainRouter;
