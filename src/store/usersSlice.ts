import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, SortConfig } from '../types/user';

const STORAGE_KEY = 'users_app_data';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const loadFromLocalStorage = (): User[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return null;
};

const saveToLocalStorage = (users: User[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const cachedUsers = loadFromLocalStorage();
  if (cachedUsers && cachedUsers.length > 0) {
    return cachedUsers;
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data: User[] = await response.json();
  const usersWithSource = data.map(user => ({ ...user, source: 'api' as const }));
  saveToLocalStorage(usersWithSource);
  return usersWithSource;
});

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  initialized: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [action.payload, ...state.users];
      saveToLocalStorage(state.users);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        saveToLocalStorage(state.users);
      }
    },
    deleteUser: (state, action: PayloadAction<number | string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
      saveToLocalStorage(state.users);
    },
    sortUsers: (state, action: PayloadAction<SortConfig>) => {
      const { field, order } = action.payload;
      state.users.sort((a, b) => {
        let aValue: string;
        let bValue: string;

        if (field === 'name') {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else {
          aValue = (a.company?.name || '').toLowerCase();
          bValue = (b.company?.name || '').toLowerCase();
        }

        if (order === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    },
    clearLocalStorage: (state) => {
      localStorage.removeItem(STORAGE_KEY);
      state.users = [];
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.initialized = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { addUser, updateUser, deleteUser, sortUsers, clearLocalStorage } = usersSlice.actions;
export default usersSlice.reducer;
