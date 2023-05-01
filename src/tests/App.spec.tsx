import '@testing-library/jest-dom';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from '../App';

// import { weatherService } from '../services/weatherService';

describe('renders app correctly', () => {
  it('renders app', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText(/Best weather app ever/i)).not.toBeNull();
  });

  it('renders search input correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByPlaceholderText(/Search city.../i)).not.toBeNull();
  });

  it('renders search button correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('Search')).not.toBeNull();
  });

  it('types city in search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = getByPlaceholderText(/Search city.../i) as HTMLInputElement;
    expect(input).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(input.value === 'Madrid').toBe(true);
  });

  it('gets city from server', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = getByPlaceholderText(/Search city.../i) as HTMLInputElement;
    expect(input).not.toBeNull();

    const searchButton = getByText(/Search/i) as HTMLButtonElement;
    expect(searchButton).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(input.value === 'Madrid').toBe(true);

    fireEvent.click(searchButton);

    waitFor(() => expect(getByText(/Madrid/)).toBe(true));
  });

  it('adds city to pinned', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = getByPlaceholderText(/Search city.../i) as HTMLInputElement;
    expect(input).not.toBeNull();

    const searchButton = getByText(/Search/i) as HTMLButtonElement;
    expect(searchButton).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(input.value === 'Madrid').toBe(true);

    fireEvent.click(searchButton);

    waitFor(() => expect(getByText('Madrid')).toBe(true));

    const addToPinnedBtn = screen.getAllByRole('button')[0] as HTMLButtonElement;
    fireEvent.click(addToPinnedBtn);

    waitFor(() => expect(getByText(/Madrid, ES/)).toBeInTheDocument());
  });

  it('goes to ', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = getByPlaceholderText(/Search city.../i) as HTMLInputElement;
    expect(input).not.toBeNull();

    const searchButton = getByText(/Search/i) as HTMLButtonElement;
    expect(searchButton).not.toBeNull();

    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(input.value === 'Madrid').toBe(true);

    fireEvent.click(searchButton);

    waitFor(() => expect(getByText('Madrid')).toBe(true));

    const addToPinnedBtn = screen.getAllByRole('button')[0] as HTMLButtonElement;
    fireEvent.click(addToPinnedBtn);

    waitFor(() => expect(getByText(/Madrid, ES/)).toBeInTheDocument());
  });
});
