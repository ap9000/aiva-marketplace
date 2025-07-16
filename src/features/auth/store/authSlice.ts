import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../services/authApi';
import { LoginCredentials, RegisterData, User, AuthTokens } from '../types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isGuestMode: boolean;
  isLoading: boolean;
  error: string | null;
  userType: 'client' | 'va' | null;
  isProfileComplete: boolean;
  onboardingStep: 'user-type' | 'profile-setup' | 'completed' | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isGuestMode: false,
  isLoading: false,
  error: null,
  userType: null,
  isProfileComplete: false,
  onboardingStep: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    await SecureStore.setItemAsync('authTokens', JSON.stringify(response.tokens));
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData) => {
    const response = await authApi.register(data);
    await SecureStore.setItemAsync('authTokens', JSON.stringify(response.tokens));
    return response;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authApi.logout();
    await SecureStore.deleteItemAsync('authTokens');
  }
);

export const loadStoredAuth = createAsyncThunk(
  'auth/loadStored',
  async () => {
    const storedTokens = await SecureStore.getItemAsync('authTokens');
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens);
      const user = await authApi.getCurrentUser(tokens.accessToken);
      return { user, tokens };
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<'client' | 'va'>) => {
      state.userType = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setGuestMode: (state, action: PayloadAction<boolean>) => {
      state.isGuestMode = action.payload;
    },
    convertGuestToUser: (state) => {
      state.isGuestMode = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User> & { onboardingStep?: AuthState['onboardingStep'] }>) => {
      const { onboardingStep, ...userUpdates } = action.payload;
      if (state.user && Object.keys(userUpdates).length > 0) {
        state.user = { ...state.user, ...userUpdates };
      }
      if (onboardingStep !== undefined) {
        state.onboardingStep = onboardingStep;
        state.isProfileComplete = onboardingStep === 'completed';
      }
    },
    setOnboardingStep: (state, action: PayloadAction<AuthState['onboardingStep']>) => {
      state.onboardingStep = action.payload;
      state.isProfileComplete = action.payload === 'completed';
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isGuestMode = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.userType = action.payload.user.userType;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.userType = action.payload.user.userType;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        return initialState;
      });

    // Load stored auth
    builder
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
          state.userType = action.payload.user.userType;
        }
      });
  },
});

export const { setUserType, clearError, updateUser, setGuestMode, convertGuestToUser, updateUserProfile, setOnboardingStep } = authSlice.actions;
export default authSlice.reducer;