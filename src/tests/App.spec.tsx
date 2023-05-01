import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from '../App';

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

  it('updates weather', () => {
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

    waitFor(() => {
      expect(getByText(/Madrid, ES/)).toBeInTheDocument();

      const updateWeatherBtn = getByText(/update/i) as HTMLButtonElement;
      expect(updateWeatherBtn).toBeInTheDocument();

      updateWeatherBtn.click();
      waitFor(() => expect(getByText(/Madrid, ES/)).toBeInTheDocument());
    });
  });

  it('deletes card', () => {
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

    waitFor(() => {
      expect(getByText(/Madrid, ES/)).toBeInTheDocument();

      const deleteCardButton = getByText(/delete/i) as HTMLButtonElement;
      expect(deleteCardButton).toBeInTheDocument();

      deleteCardButton.click();
      waitFor(() => expect(getByText(/Madrid, ES/)).not.toBeInTheDocument());
    });
  });

  it('goes to city weather details page', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();

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

    waitFor(async () => {
      expect(getByText(/Madrid, ES/)).toBeInTheDocument();

      const seeMoreButton = getByText(/more/i) as HTMLButtonElement;
      expect(seeMoreButton).toBeInTheDocument();

      await user.click(seeMoreButton);

      waitFor(() => {
        // general weather info
        expect(screen.getByText(/Madrid, ES/i)).toBeInTheDocument();
        expect(screen.getByText(/humidity/i)).toBeInTheDocument();
        expect(screen.getByText(/visibility/i)).toBeInTheDocument();
        expect(screen.getByText(/feels like/i)).toBeInTheDocument();

        // temperature chart
        expect(screen.getByText(/temperature in/i)).toBeInTheDocument();
        expect(screen.getByText(/temperature by hours/i)).toBeInTheDocument();
      });
    });
  });

  it('goes from city weather details page to home', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();

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

    waitFor(async () => {
      expect(getByText(/Madrid, ES/)).toBeInTheDocument();

      const seeMoreButton = getByText(/more/i) as HTMLButtonElement;
      expect(seeMoreButton).toBeInTheDocument();

      await user.click(seeMoreButton);

      waitFor(() => {
        // general weather info
        expect(screen.getByText(/Madrid, ES/i)).toBeInTheDocument();
        expect(screen.getByText(/humidity/i)).toBeInTheDocument();
        expect(screen.getByText(/visibility/i)).toBeInTheDocument();
        expect(screen.getByText(/feels like/i)).toBeInTheDocument();

        // temperature chart
        expect(screen.getByText(/temperature in/i)).toBeInTheDocument();
        expect(screen.getByText(/temperature by hours/i)).toBeInTheDocument();

        const homePageBtn = screen.queryByTitle(/home link/i) as HTMLButtonElement;
        expect(homePageBtn).toBeInTheDocument();

        homePageBtn.click();

        waitFor(() => {
          expect(screen.getByText(/Madrid, ES/i)).toBeInTheDocument();

          const seeMoreButton = getByText(/more/i) as HTMLButtonElement;
          expect(seeMoreButton).toBeInTheDocument();
        });
      });
    });
  });

  it('refresh page and get saved cities', () => {
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

    waitFor(() => {
      expect(getByText(/Madrid, ES/)).toBeInTheDocument();

      // refresh page
      window.location.reload();

      waitFor(() => expect(getByText(/Madrid, ES/)).toBeInTheDocument());
    });
  });
});
