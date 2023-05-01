/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import Header from '@components/Header';
import HomePage from '@pages/HomePage';
import Page404 from '@pages/Page404';
import { Loader } from '@components/Loader';
import { MyLocation } from '@components/MyLocation';

describe('renders components correctly', () => {
  it('renders header', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByText(/Best weather app ever/i)).toBeInTheDocument();
  });

  it('renders empty home page without any pinned cities added', () => {
    const { getByText } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(getByText(/Any city has not been added yet/i)).toBeInTheDocument();
  });

  it('renders not found page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Page404 />
      </Provider>
    );

    expect(getByText(/404/i)).toBeInTheDocument();
  });

  it('renders loader', () => {
    const { getByTitle } = render(<Loader />);

    expect(getByTitle(/loader/i)).toBeInTheDocument();
  });

  it('renders my geolocation', () => {
    const { getByTitle } = render(
      <MyLocation
        onClick={() => {}}
        onGeolocationSuccess={() => {}}
        onGeolocationFailure={() => {}}
        onGeolocationStart={() => {}}
        onGeolocationEnd={() => {}}
        isGettingLocation={false}
      />
    );

    expect(getByTitle(/geo/i)).toBeInTheDocument();
  });
});
