import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { AddUser } from '../pages/AddUser';
import usersReducer from '../store/usersSlice';
import { ToastProvider } from '../components/Toast';
import userEvent from '@testing-library/user-event';

const createMockStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
    preloadedState: {
      users: {
        users: [],
        loading: false,
        error: null,
        initialized: true,
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

describe('AddUser Form', () => {
  it('renders form fields correctly', () => {
    renderWithProviders(<AddUser />);

    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
  });

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddUser />);

    const submitButton = screen.getByText('Add User');
    await user.click(submitButton);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddUser />);

    const emailInput = screen.getByLabelText(/email \*/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByText('Add User');
    await user.click(submitButton);

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });
});
