import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';
import Header from '@components/Header';
import { Loader } from '@components/Loader';

export function SharedLayout() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
