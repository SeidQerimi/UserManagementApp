import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { UsersList } from '../pages/UsersList';
import usersReducer from '../store/usersSlice';
import { ToastProvider } from '../components/Toast';

const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: { name: 'Acme Inc' },
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: { name: 'Tech Corp' },
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
    preloadedState: {
      users: {
        users: mockUsers,
        loading: false,
        error: null,
        initialized: true,
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>{component}</ToastProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('UsersList', () => {
  it('renders users list successfully', () => {
    renderWithProviders(<UsersList />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('displays search input', () => {
    renderWithProviders(<UsersList />);

    const searchInput = screen.getByPlaceholderText('Search by name or email...');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays add user button', () => {
    renderWithProviders(<UsersList />);

    const addButton = screen.getByText('Add User');
    expect(addButton).toBeInTheDocument();
  });
});
