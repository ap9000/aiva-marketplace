import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  profile: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;