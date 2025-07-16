import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from '../features/auth/store/authSlice';
import marketplaceReducer from '../features/marketplace/store/marketplaceSlice';
import messagingReducer from '../features/messaging/store/messagingSlice';
import profileReducer from '../features/profile/store/profileSlice';
import searchReducer from '../features/search/store/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    marketplace: marketplaceReducer,
    messaging: messagingReducer,
    profile: profileReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;