import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from '@components/Header';

export function SharedLayout() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg">
          <Suspense fallback={<div>Loader...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
