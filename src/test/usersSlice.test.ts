import { describe, it, expect, beforeEach } from 'vitest';
import usersReducer, { addUser, updateUser, deleteUser, sortUsers } from '../store/usersSlice';
import { User } from '../types/user';

describe('usersSlice', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: { name: 'Acme Inc' },
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      company: { name: 'Tech Corp' },
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a user to the beginning of the list', () => {
    const initialState = {
      users: mockUsers,
      loading: false,
      error: null,
      initialized: true,
    };

    const newUser: User = {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      source: 'local',
    };

    const state = usersReducer(initialState, addUser(newUser));

    expect(state.users).toHaveLength(3);
    expect(state.users[0]).toEqual(newUser);
  });

  it('should update an existing user', () => {
    const initialState = {
      users: mockUsers,
      loading: false,
      error: null,
      initialized: true,
    };

    const updatedUser: User = {
      id: 1,
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    const state = usersReducer(initialState, updateUser(updatedUser));

    expect(state.users[0].name).toBe('John Updated');
    expect(state.users[0].email).toBe('john.updated@example.com');
  });

  it('should delete a user', () => {
    const initialState = {
      users: mockUsers,
      loading: false,
      error: null,
      initialized: true,
    };

    const state = usersReducer(initialState, deleteUser(1));

    expect(state.users).toHaveLength(1);
    expect(state.users.find((u) => u.id === 1)).toBeUndefined();
  });

  it('should sort users by name ascending', () => {
    const initialState = {
      users: mockUsers,
      loading: false,
      error: null,
      initialized: true,
    };

    const state = usersReducer(initialState, sortUsers({ field: 'name', order: 'asc' }));

    expect(state.users[0].name).toBe('Alice Smith');
    expect(state.users[1].name).toBe('John Doe');
  });

  it('should sort users by name descending', () => {
    const initialState = {
      users: mockUsers,
      loading: false,
      error: null,
      initialized: true,
    };

    const state = usersReducer(initialState, sortUsers({ field: 'name', order: 'desc' }));

    expect(state.users[0].name).toBe('John Doe');
    expect(state.users[1].name).toBe('Alice Smith');
  });
});
